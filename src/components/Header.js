import React from 'react'
import Box from './Box'
import Flex from './Flex'
import { Header3, ZopaLogo } from '@zopauk/react-components'
import { MdHome } from 'react-icons/md'

const Header = props => (
  <Box>
    <Flex>
      <Flex justifyContent='flex-start'>
        <ZopaLogo style={{ pointer: 'cursor' }} width={150} color='black' />
      </Flex>
      <Flex justifyContent='flex-end'>
        <Box>
          <MdHome
            onClick={() => {
              props.clearResults(null)
            }}
          />
        </Box>
      </Flex>
    </Flex>

    <Header3>License checker</Header3>
  </Box>
)

export default Header
