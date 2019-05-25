import React from 'react'
import Box from '../components/Box'
import { Text } from '@zopauk/react-components'

const MainRepository = ({ main }) => (
  <Box>
    <Box>
      <Text fw='bold' size='l'>
        Main repository
      </Text>
    </Box>
    <Text>{main.name}</Text>
  </Box>
)

export default MainRepository
