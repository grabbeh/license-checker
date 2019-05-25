import React from 'react'
import Box from './Box'
import { Header3, ZopaLogo } from '@zopauk/react-components'
import Flex from './Flex'
// import Logo from './Logo'

const Header = () => (
  <Box>
    <Flex flexWrap='wrap'>
      <ZopaLogo width={150} color='black' />
      <Header3 fontWeight='bold' fontSize={5}>
        License checker
      </Header3>
    </Flex>
  </Box>
)

export default Header
