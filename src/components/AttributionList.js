import React from 'react'
import Box from '../components/Box'
import Text from '../components/Text'

const AttributionList = ({ dependencies }) => {
  return (
    <Box>
      <Box>
        <Text fontSize={4} fontWeight='bold'>
          License list
        </Text>
      </Box>
      {dependencies.map(d => {
        return d.licenses.map((l, i) => (
          <Box pb={2} borderBottom='1px solid' borderColor='black' key={i}>
            <Box py={2}>
              <Text fontWeight='bold'>{d.name}</Text>
            </Box>

            <Text fontSize={2}>
              <pre>{l.text}</pre>
            </Text>
          </Box>
        ))
      })}
    </Box>
  )
}

export default AttributionList
