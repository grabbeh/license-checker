import React from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import Logo from './Logo'

const Header = () => (
  <Box mb={2}>
    <Flex flexWrap='wrap'>
      <Text fontWeight='bold' fontSize={5}>
        License checker
      </Text>
    </Flex>
  </Box>
)

export default Header
