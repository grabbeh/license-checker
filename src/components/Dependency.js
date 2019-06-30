import React, { Fragment, useState } from 'react'
import Box from './Box'
import Text from './Text'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOakBox'
import styled from 'styled-components'
import Scoped from './Scoped'
import Latest from './Latest'
import ReactTooltip from 'react-tooltip'
import Flex from './Flex'

const Dependency = ({ parent, children, scoped, latest }) => {
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
            <Text
              style={{ wordWrap: 'break-word' }}
              fontSize={3}
              fontWeight='bold'
            >
              {name}
            </Text>
          </Box>
          <Box width={0.2}>
            <Flex justifyContent='flex-end'>
              {licenses.length < 2 && (
                <Box my={1}>
                  <BlueOak p={1} borderRadius={2} rating={licenses[0].color}>
                    <Text.span fontWeight='bold'>
                      {licenses[0].license ? licenses[0].license : 'Unknown'}
                    </Text.span>
                  </BlueOak>
                </Box>
              )}
              {licenses.length > 1 &&
                licenses.map((l, i) => {
                  return (
                    <Box my={1}>
                      <BlueOak.span
                        key={i}
                        p={1}
                        borderRadius={2}
                        rating={licenses[0].color}
                      >
                        <Text.span fontWeight='bold'>
                          {l.license ? l.license : 'Unknown'}
                        </Text.span>
                      </BlueOak.span>
                    </Box>
                  )
                })}
            </Flex>
            <ReactTooltip className='tooltip' effect='solid' />
          </Box>
        </Flex>

        <Text>{author ? author.name : 'Unknown'}</Text>
        <Box>
          <Text mr={2}>{version}</Text>
          <Latest latest={latest} />
        </Box>
        <Scoped scoped={scoped} />
        {children && (
          <Box>
            {children && (
              <Box
                onClick={() => {
                  setHidden(!hidden)
                }}
              >
                {hidden ? (
                  <Box>
                    <FiChevronDown
                      style={{ fontSize: '25px', cursor: 'pointer' }}
                    />
                    <Text.span fontSize={1}> {children.length}</Text.span>
                  </Box>
                ) : (
                  <FiChevronUp
                    style={{ fontSize: '25px', cursor: 'pointer' }}
                  />
                )}
              </Box>
            )}
            {children.map((d, i) => (
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
