import React from 'react'
import Box from './Box'
import { Text, Header3 } from '@zopauk/react-components'
import MainPackage from './MainPackage'
import Summary from './Summary'

const ResultsSideBar = props => {
  let { response } = props
  return (
    <Box>
      <Header3>Results</Header3>
      <MainPackage main={response.data} />
      <Text size='l' fw='bold'>
        Dependencies
      </Text>
      <Box>
        <Text size='l'>{response.flattened.length}</Text>
      </Box>
      <Summary dependencies={response.flattened} />
    </Box>
  )
}

export default ResultsSideBar
