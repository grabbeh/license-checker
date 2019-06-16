import React from 'react'
import Box from './Box'
import Text from './Text'
import Summary from './Summary'

const ResultsSideBar = props => {
  let {
    response: { flattened, data }
  } = props
  return (
    <Box>
      <Text fontSize={3} fontWeight='bold'>
        Results
      </Text>
      <Box>
        <Box my={2}>
          <Text fontSize={2} fontWeight='bold'>
            Main repository
          </Text>
        </Box>
        <Text fontSize={2}>{data.name}</Text>
      </Box>
      <Box my={2}>
        <Text fontSize={2} fontWeight='bold'>
          Dependencies
        </Text>
      </Box>

      <Box>
        <Text fontSize={2}>{flattened.length}</Text>
      </Box>
      <Summary dependencies={flattened} />
    </Box>
  )
}

export default ResultsSideBar
