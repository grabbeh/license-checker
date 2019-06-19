import React from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import BlueOak from './BlueOak'
import ReactTooltip from 'react-tooltip'
import { Text } from '@zopauk/react-components'

// filter for uniques, except if more than one license type
// sort alphabetically
const Summary = ({ dependencies }) => {
  let colors = dependencies.map(d => {
    return d.licenses.map(({ color }) => {
      return { name: d.name, color }
    })
  })

  let licenses = dependencies.map(d => {
    return d.licenses.map(l => {
      return l.license
    })
  })

  let f = _.countBy(_.flatten(licenses))
  let u = _.flatten(colors)

  return (
    <Box>
      <Box mt={2}>
        <Flex flexWrap='wrap'>
          {u.map(({ color, name }, i) => (
            <BlueOak
              key={i}
              mr={1}
              mb={1}
              width={20}
              height={20}
              rating={color}
              position='relative'
              data-tip={name}
            />
          ))}
        </Flex>
        <ReactTooltip className='tooltip' effect='solid' />
      </Box>
      <Box my={3}>
        <Flex flexWrap='wrap'>
          {Object.keys(f).map((keyName, keyIndex) => (
            <Box key={keyIndex} mr={3}>
              <Box>
                <Text size='l' fw='bold'>
                  {keyName || 'Unknown'}
                </Text>
              </Box>
              <Box>
                <Text size='l'>{f[keyName]}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default Summary
