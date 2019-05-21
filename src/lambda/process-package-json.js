import _ from 'lodash'
import semver from 'semver'
import axios from 'axios'
import convert from './addAttributes'
// import test from './test.json'

export async function handler (event, context) {
  try {
    let input = JSON.parse(event.body)
    let data = await checkInput(input)
    let { dependencies } = data
    // No dependencies
    if (!dependencies) {
      return {
        statusCode: 400,
        body: "I can't seem to find any dependencies"
      }
    }

    // scoped packages error
    // version not found error - just grab repository details and then get latest version?
    let tree = await getTreeData(dependencies)
    // test code
    // let tree = await getTreeDataco(test)

    // TODO: Add license text to combined rather than tree
    let flattened = process(tree)

    // let data = { msg: 'Hello World' }
    return {
      statusCode: 200,
      body: JSON.stringify({ tree, flattened, data })
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

const process = a => {
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
    return dependencies ? process(dependencies) : parent
  })

  let arr = _.flattenDeep(_.concat(topLevel, children))
  // get uniq deps where only one license
  let lone = _.uniqBy(
    arr.filter(a => {
      return a.licenses.length === 1
    }),
    'name'
  )
  // keep record of deps where more than 1 license
  let licenses = arr.filter(a => {
    return a.licenses.length > 1
  })

  return _.orderBy(_.concat(lone, licenses), ['name'], ['asc'])
}

const getURLs = dependencies => {
  // reduce works to filter out false urls returned from getNpmUrl fn below
  return _.reduce(
    Object.entries(dependencies),
    (result, [key, value]) => {
      return [...result, getNpmURL(key, value) || []]
    },
    []
  )
}

const getNpmURL = (name, version) => {
  let clean = semver.valid(semver.coerce(version))
  if (!clean) {
    return false
    // filter out scoped packages for the time being
  } else if (name.startsWith('@')) {
    return false
  } else {
    return `https://registry.npmjs.org/${name}/${clean}`
  }
}

const getTreeData = async dependencies => {
  let urls = getURLs(dependencies)
  let promises = urls.map(async url => {
    let { data } = await axios(url)
    let picked = _.pick(
      data,
      'license',
      'licenses',
      'licenseText',
      'name',
      'dependencies',
      'version',
      'repository',
      'author'
    )
    let { dependencies } = data
    if (dependencies && Object.keys(dependencies).length > 0) {
      return {
        parent: await convert(picked),
        dependencies: await getTreeData(dependencies)
      }
    } else {
      return { parent: await convert(picked) }
    }
  })
  // https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all
  let results = await Promise.all(
    promises.map(p =>
      p.catch(e => {
        return e
      })
    )
  )
  // const errors = results.filter(result => result instanceof Error)
  const valid = results.filter(result => !(result instanceof Error))
  return valid
}
