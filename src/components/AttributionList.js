import React, { useState, useEffect } from 'react'
import Box from '../components/Box'
import Text from '../components/Text'
import TextArea from './TextArea'
import Button from './Button'

const AttributionList = ({ dependencies }) => {
  // map over items and return new array with new content
  // https://www.robinwieruch.de/react-state-array-add-update-remove/
  let [deps, setDependencies] = useState(dependencies)
  let [licenseText, setLicense] = useState()
  let [editableIndex, setEditableIndex] = useState()
  let [editableLicenseIndex, setLicenseIndex] = useState()

  useEffect(() => {
    setDependencies(dependencies)
  }, [])

  const submitLicense = () => {
    // TODO: Cleaner way of doing adding license text
    let dep = deps[editableIndex]
    let license = dep.licenses[editableLicenseIndex]
    let revised = (license = {
      ...license,
      text: licenseText
    })
    let licenses = dep.licenses.map((l, i) => {
      if (editableLicenseIndex === i) {
        return revised
      } else {
        return {
          l
        }
      }
    })
    let revisedDep = {
      ...dep,
      licenses
    }
    let revisedDeps = deps.map((d, i) => {
      if (editableIndex === i) {
        return revisedDep
      } else return d
    })
    setDependencies(revisedDeps)
    setEditableIndex(null)
    setLicense(null)
  }
  return (
    <Box>
      <Box>
        <Text fontSize={4} fontWeight='bold'>
          License list
        </Text>
      </Box>
      {deps.map((d, dependencyIndex) => {
        return d.licenses.map(({ text }, licenseIndex) => {
          return (
            <Box
              pb={2}
              borderBottom='1px solid'
              borderColor='black'
              key={dependencyIndex}
            >
              <Box py={2}>
                <Text fontWeight='bold'>{d.name}</Text>
              </Box>
              {text ? (
                <Text fontSize={2}>
                  <pre>{text}</pre>
                </Text>
              ) : (
                <Box>
                  <Text>Sorry, we can't seem to find a license</Text>
                  <Text
                    onClick={() => {
                      setEditableIndex(dependencyIndex)
                      setLicenseIndex(licenseIndex)
                    }}
                  >
                    Add one
                  </Text>
                </Box>
              )}
              {!text &&
                editableIndex === dependencyIndex &&
                editableLicenseIndex === licenseIndex && (
                <Box>
                  <TextArea
                    border='1px solid'
                    borderColor='black'
                    width={1}
                    handleChange={e => {
                      setLicense(e.target.value)
                    }}
                    value={licenseText}
                    height={400}
                    name='licenseText'
                    placeholder='Enter a license'
                  />
                  <Button
                    onClick={() => {
                      submitLicense()
                    }}
                  >
                    <Text color='white' fontSize={2}>
                        Submit
                    </Text>
                  </Button>
                </Box>
              )}
            </Box>
          )
        })
      })}
    </Box>
  )
}

export default AttributionList
