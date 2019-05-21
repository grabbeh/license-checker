import React from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import BlueOak from './BlueOak'
import ToolTip from './ToolTip'
import ReactTooltip from 'react-tooltip'

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
              borderRadius={4}
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
                <Text fontWeight='bold'>{keyName || 'Unknown'}</Text>
              </Box>
              <Box>
                <Text>{f[keyName]}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default Summary
