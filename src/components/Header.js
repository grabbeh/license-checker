import React from 'react'
import Box from './Box'
import { Header3, ZopaLogo } from '@zopauk/react-components'

const Header = props => (
  <Box>
    <ZopaLogo style={{ pointer: 'cursor' }} width={150} color='black' />
    <Header3>License checker</Header3>
  </Box>
)

export default Header
