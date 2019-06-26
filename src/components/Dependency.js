import React, { useState } from 'react'
import Box from './Box'
import Text from './Text'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import Scoped from './Scoped'
import Latest from './Latest'

const DependencyHolder = props => {
  let [hidden, setHidden] = useState(true)
  return (
    <Box>
      <Dependency {...props} />
      {props.dependencies && (
        <Box ml={3}>
          {props.dependencies && (
            <Box
              onClick={() => {
                setHidden(!hidden)
              }}
            >
              {hidden ? (
                <FiChevronDown
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                />
              ) : (
                <FiChevronUp style={{ fontSize: '20px', cursor: 'pointer' }} />
              )}
            </Box>
          )}
          {props.dependencies.map((d, i) => (
            <HideStyled key={i} hidden={hidden}>
              <Dependency {...d} />
            </HideStyled>
          ))}
        </Box>
      )}
    </Box>
  )
}

const Dependency = ({ parent, scoped, latest }) => {
  let { name, author, licenses, version } = parent
  return (
    <Box pb={2} mr={3} mb={2} border='2px solid' borderColor='dark-gray'>
      <Box>
        <Box
          borderBottom='2px solid'
          borderColor='black'
          bg='rgba(42, 117, 146, 0.12)'
          px={2}
          py={1}
        >
          <Flex flexWrap='wrap' justifyContent='space-between'>
            <Box width={0.7}>
              <Box mb={1}>
                <Text
                  style={{ wordWrap: 'break-word' }}
                  fontSize={3}
                  fontWeight='bold'
                >
                  {name}
                </Text>
              </Box>
            </Box>
            <Box width={0.2}>
              <Flex justifyContent='flex-end'>
                {licenses.length < 2 && (
                  <Box>
                    <Text>
                      {licenses[0].license ? licenses[0].license : 'Unknown'}
                    </Text>
                  </Box>
                )}
                {licenses.length > 1 &&
                  licenses.map((l, i) => {
                    return (
                      <Text color='dark-gray' key={i}>
                        {l.license ? l.license : 'Unknown'}
                      </Text>
                    )
                  })}
              </Flex>
              <ReactTooltip className='tooltip' effect='solid' />
            </Box>
          </Flex>
        </Box>
        <Box px={2}>
          <Text fontSize={2} color='dark-gray'>
            {author ? author.name : 'Unknown'}
          </Text>
          <Scoped scoped={scoped} />
          <Box>
            <Text fontSize={2} mr={2}>
              {version}
            </Text>
            <Latest latest={latest} />
          </Box>

          <Flex justifyContent='flex-end'>
            <BlueOak
              width={20}
              height={20}
              borderRadius={4}
              rating={licenses[0].color}
              data-tip={licenses[0].color || 'Unknown'}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

const HideStyled = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
  height: ${props => (props.hide ? 0 : '100%')};
`

export default DependencyHolder
