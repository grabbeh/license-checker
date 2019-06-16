import React, { useState, useEffect } from 'react'
import Box from '../components/Box'
import TextArea from './TextArea'
import Text from './Text'
import Flex from './Flex'
import { Button } from '@zopauk/react-components'

const AttributionList = ({ dependencies }) => {
  let [deps, setDependencies] = useState(dependencies)
  let [licenseText, setLicense] = useState()
  let [editableIndex, setEditableIndex] = useState()
  let [editableLicenseIndex, setLicenseIndex] = useState()

  useEffect(() => {
    setDependencies(dependencies)
  }, [])

  const submitLicense = () => {
    let dep = deps[editableIndex]
    let license = dep.licenses[editableLicenseIndex]
    let licenses = dep.licenses.map((l, i) => {
      if (editableLicenseIndex === i) {
        return {
          ...license,
          text: licenseText
        }
      } else return l
    })

    let revisedDeps = deps.map((d, i) => {
      if (editableIndex === i) {
        return {
          ...dep,
          licenses
        }
      } else return d
    })
    setDependencies(revisedDeps)
    setEditableIndex(null)
    setLicense(null)
  }

  const deleteLicense = (dI, lI) => {
    let dep = deps[dI]
    let licenses = dep.licenses.filter((l, i) => {
      return i !== lI
    })

    let revisedDeps = deps.map((d, i) => {
      if (dI === i) {
        return {
          ...dep,
          licenses
        }
      } else return d
    })
    setDependencies(revisedDeps)
  }

  return (
    <Box mb={3}>
      {deps.map((d, dependencyIndex) => {
        return d.licenses.map(({ text }, licenseIndex) => {
          return (
            <Box>
              <Box mt={3}>
                <Text fontWeight='bold' fontSize={3}>
                  {d.name}
                </Text>
              </Box>
              {!text && !editableIndex && <Box mt={2}><Text size='l'>We couldn't find any text</Text></Box>}
              {editableIndex === dependencyIndex &&
                editableLicenseIndex === licenseIndex ? (
                  <Box mt={2}>
                    <TextArea
                      border='2px solid'
                      borderColor='#D6D7DE'
                      width={1}
                      handleChange={e => {
                        setLicense(e.target.value)
                      }}
                      value={licenseText}
                      height={400}
                      name='licenseText'
                      placeholder='Enter a license'
                    />
                    <Box my={2}>
                      <Flex flexWrap='wrap'>
                        <Button
                          sizing='compact'
                          styling='primary'
                          onClick={() => {
                            submitLicense()
                          }}
                        >
                            Submit
                        </Button>
                        <Button
                          sizing='compact'
                          styling='primary'
                          onClick={() => {
                            setEditableIndex(null)
                            setLicense(null)
                          }}
                        >
                            Cancel
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
              ) : <Box><Box mb={2} style={{overflowX: 'auto'}}><pre>{text}</pre></Box>
                <Flex flexWrap='wrap'>
                  <Button
                    onClick={() => {
                      deleteLicense(dependencyIndex, licenseIndex)
                    }}
                    styling='alert'
                    sizing='compact'
                  >
                    Delete
                  </Button>
                  <Box ml={3}>
                    <Button
                      onClick={() => {
                        setEditableIndex(dependencyIndex)
                        setLicenseIndex(licenseIndex)
                        setLicense(text)
                      }}
                      styling='warning'
                      sizing='compact'
                    >
                      Edit
                    </Button>
                  </Box>
             
                </Flex>
              </Box>}
            </Box>
          )
        })
      })}
    </Box>
  )
}

export default AttributionList
