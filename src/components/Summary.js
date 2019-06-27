import React, { useState } from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import BlueOak from './BlueOak'
import ReactTooltip from 'react-tooltip'
import Text from './Text'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

// filter for uniques, except if more than one license type
// sort alphabetically
const Summary = ({ dependencies }) => {
  let [hidden, setHidden] = useState(true)
  let colors = dependencies.map(d => {
    return d.licenses.map(({ color }) => {
      return { name: d.name, color }
    })
  })

  let licenses = dependencies.map(d => {
    return d.licenses.map(l => {
      return { license: l.license || 'Unknown', name: d.name }
    })
  })

  let flat = _.flatten(licenses)

  let ordered = _.groupBy(flat, 'license')

  console.log(ordered)

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
        {Object.entries(ordered).map(([k, v], i) => (
          <Box key={i}>
            <Text fontWeight='bold'>
              {k} {v.length}
            </Text>
                <Box

                onClick={() => {

                  setHidden(!hidden)

                }}

              >

                {hidden ? (

                  <FiChevronDown style={{ cursor: 'pointer' }} />

                ) : (

                  <FiChevronUp style={{ cursor: 'pointer' }} />

                )}

              </Box>
            <Box hidden={hidden}>
              <ul>
                {v.map((item, i) => (
                  <li key={i}>
                    <Text>{item.name}</Text>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Summary




<Box>

            {children && (

              <Box

                onClick={() => {

                  setHidden(!hidden)

                }}

              >

                {hidden ? (

                  <FiChevronDown style={{ cursor: 'pointer' }} />

                ) : (

                  <FiChevronUp style={{ cursor: 'pointer' }} />

                )}

              </Box>

            )}

            {children.map((d, i) => (

              <HideStyled key={i} hidden={hidden}>

                <Dependency hidden={hidden} {...d} />

              </HideStyled>

            ))}

          </Box>
