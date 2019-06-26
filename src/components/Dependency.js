import React, { Fragment, useState } from 'react'
import Box from './Box'
import Text from './Text'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import Scoped from './Scoped'
import Latest from './Latest'

const Dependency = ({ parent, dependencies, scoped, latest }) => {
  let [hidden, setHidden] = useState(true)
  let { name, author, licenses, version } = parent
  return (
    <Fragment>
      <Box
        key={name}
        pt={2}
        pb={3}
        pl={3}
        pr={2}
        mr={[0, 3]}
        mt={3}
        bg='#f4f4f2'
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
      >
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Box width={0.7}>
            <Box>
              <Text
                style={{ wordWrap: 'break-word' }}
                fontSize={3}
                fontWeight='bold'
              >
                {name}
              </Text>
            </Box>
            <Box>
              <Flex flexWrap='wrap'>
                <Text mr={2}>{version}</Text>
                <Latest latest={latest} />
              </Flex>
            </Box>
          </Box>
          <Box width={0.2}>
            <Flex justifyContent='flex-end'>
              <BlueOak
                width={20}
                height={20}
                borderRadius={4}
                rating={licenses[0].color}
                data-tip={licenses[0].color || 'Unknown'}
              />
            </Flex>
            <ReactTooltip className='tooltip' effect='solid' />
          </Box>
        </Flex>
        {licenses.length < 2 && (
          <Box>
            <Text>{licenses[0].license ? licenses[0].license : 'Unknown'}</Text>
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
        <Text color='dark-gray'>{author ? author.name : 'Unknown'}</Text>
        <Scoped scoped={scoped} />
        {dependencies && (
          <Box>
            {dependencies && (
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
            {dependencies.map((d, i) => (
              <HideStyled key={i} hidden={hidden}>
                <Dependency hidden={hidden} {...d} />
              </HideStyled>
            ))}
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

const HideStyled = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
  height: ${props => (props.hide ? 0 : '100%')};
`

export default Dependency
