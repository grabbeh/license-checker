import React from 'react'
import Box from '../components/Box'
import Text from '../components/Text'

const MainRepository = ({ main }) => (
  <Box mt={2}>
    <Box>
      <Text fontWeight='bold' fontSize={3}>
        Main repository
      </Text>
    </Box>
    <Text fontSize={3}>{main.name}</Text>
  </Box>
)

export default MainRepository
