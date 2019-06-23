import React from 'react'
import Box from './Box'
import Text from './Text'
import Summary from './Summary'

const ResultsSideBar = props => {
  let {
    response: { flat, tree }
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
        <Text fontSize={2}>{tree.data.name}</Text>
      </Box>
      <Box my={2}>
        <Text fontSize={2} fontWeight='bold'>
          Dependencies
        </Text>
      </Box>

      <Box>
        <Text fontSize={2}>{flat.length}</Text>
      </Box>
      <Summary dependencies={flat} />
    </Box>
  )
}

export default ResultsSideBar
