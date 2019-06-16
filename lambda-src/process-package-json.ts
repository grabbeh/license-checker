import _ from 'lodash'
import semver from 'semver'
import axios from 'axios'
import convert from './addAttributes'
//import test from './test.json'
import { Handler, APIGatewayEvent } from 'aws-lambda';

interface Response {
  statusCode: number;
  body: string;
}

// better to run on tree process
const getScopedAsDeps = (o) => {
  return Object.entries(o).map(([k, v]) => ({ "name": k, "version": v }))
}

const getDep = (name, version, scoped) => {
  return { name, parent: { name, version, licenses: [{ license: null, color: null }] }, scoped }
}

const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    let data = await checkInput(JSON.parse(event.body))
    //let data = { name: 'Test package', msg: 'Hello World' }
    let { dependencies } = data
    //let dependencies = test
    // No dependencies
    if (!dependencies) {
      const response: Response = {
        statusCode: 400,
        body: "I can't seem to find any dependencies"
      }
      return response
    }
    // scoped packages error
    // version not found error - just grab repository details and then get latest version?
    let tree = await getTreeData(dependencies)
    let fullTree = { parent: null, name: data.name, children: tree }
    // TODO: Add license text to combined rather than tree as not needed in full tree
    let flattened = flatten(tree)
    let sorted = sortLicenses(flattened)
    return {
      statusCode: 200,
      body: JSON.stringify({ tree, flattened: sorted, data, fullTree })
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}

const checkInput = async input => {
  // could include validation here
  if (input.url) {
    let { data } = await axios(input.url)
    return data
  } else if (input.json) {
    return JSON.parse(input.json)
  } else {
    return new Error('Neither URL or JSON')
  }
}

const flatten = a => {
  // if top level has dependencies then it won't return its own data under the next fn below
  // hence this fn
  let topLevel = _.reduce(
    a,
    (result, { dependencies, parent }) => {
      return [...result, dependencies ? parent : []]
    },
    []
  )
  let children = a.map(({ dependencies, parent }) => {
    return dependencies ? flatten(dependencies) : parent
  })
  return _.flattenDeep(_.concat(topLevel, children))
}

const sortLicenses = arr => {
  // get uniq deps where only one license
  let lone = _.uniqBy(
    arr.filter(({ licenses }) => {
      return licenses.length === 1
    }),
    'name'
  )
  // keep record of deps where more than 1 license
  let licenses = arr.filter(({ licenses }) => {
    return licenses.length > 1
  })

  let ordered = _.orderBy(_.concat(lone, licenses), ['name'], ['asc'])
  return ordered
}

const getNpmURL = (name, version) => {
  let clean = semver.valid(semver.coerce(version))
  return `https://registry.npmjs.org/${name}/${clean}`
}

const getAllNpm = (name) => {
  return `https://registry.npmjs.org/${name}`
}

const pickAttributes = o => {
  return _.pick(o,
    'license',
    'licenses',
    'licenseText',
    'name',
    'dependencies',
    'version',
    'repository',
    'author')
}

// given a set of dependencies it will map over them and first attempt to get npm data.
// Where that fails it will return basic data in format equivalent to npm form or grab all
// data in case there was a version error 
const getTreeData = async dependencies => {
  const promises = Object.entries(dependencies).map(async ([k, v]) => {
    let { data } = await axios(getNpmURL(k, v))
    // if data returned from npm url process it
    let picked = pickAttributes(data)
    let { dependencies, name } = data
    // if a module has further dependencies run fn again
    // sometimes dependencies are an empty object hence check for length
    if (dependencies && Object.keys(dependencies).length > 0) {
      // TODO: Align children and dependencies (children added for viz data)
      return {
        parent: await convert(picked),
        name,
        children: await getTreeData(dependencies),
        dependencies: await getTreeData(dependencies)
      }
      // if no dependencies return parent data
    } else return { name, parent: await convert(picked) }
  })
  // https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all
  // we use this code to give an array of all results, both errors and valid 
  let responses = await Promise.all(
    promises.map(p =>
      p.catch(e => {
        return e
      })
    )
  )
  // Map over response objects to replace errors with data
  let mopUp = responses.map((r) => {
    // check for r.response as that indicates an error in the original request
    if (r.response) {
      let { config, data, status, headers } = r.response
      let url = config.url
      let urlParts = url.replace(/\/\s*$/, '').split('/')
      let rev = urlParts.slice(3)
      let version = rev[rev.length - 1]
      let dependency = ""
      if (rev[0].startsWith('@')) {
        dependency = rev.slice(0, -1).join('/')
      }
      else {
        dependency = rev[0]
      }
      if (headers['npm-notice'] === 'ERROR: you cannot fetch versions for scoped packages') {
        return getDep(dependency, version, true)
      }
      if (status === 404 && data.startsWith('version not found')) {
        return getDep(dependency, version, false)
      }
    }
    return r
  })
  // do further for any remaining errors
  const valid = mopUp.filter(result => !(result instanceof Error))
  return valid
}

export { handler }