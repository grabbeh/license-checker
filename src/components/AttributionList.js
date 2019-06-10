import React, { useState, useEffect } from 'react'
import Box from '../components/Box'
import TextArea from './TextArea'
import { Button, Header3, FlexContainer, FlexRow, SizedContainer, Text } from '@zopauk/react-components'

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
              <Box>
                <Header3 size='xl' fw='bold'>
                  {d.name}
                </Header3>   
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
                      <SizedContainer size='medium'>
                        <FlexContainer>
                          <FlexRow justify='space-between'>
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
                          </FlexRow>
                        </FlexContainer>
                      </SizedContainer>
                    </Box>
                  </Box>
              ) : <Box><Box mb={2} style={{overflowX: 'auto'}}><pre>{text}</pre></Box>
              <SizedContainer size='medium'>
                <FlexContainer>
                  <FlexRow justify='space-between' >
                    <Button
                      onClick={() => {
                        deleteLicense(dependencyIndex, licenseIndex)
                      }}
                      styling='alert'
                      sizing='compact'
                    >
                      Delete
                    </Button>
               
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
                  </FlexRow>
                </FlexContainer>
              </SizedContainer>
              </Box>}
             
            </Box>
          )
        })
      })}
    </Box>
  )
}

export default AttributionList
