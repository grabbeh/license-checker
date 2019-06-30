import React, { Fragment, useState } from 'react'
import Box from './Box'
import Text from './Text'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled from 'styled-components'
import Scoped from './Scoped'
import Latest from './Latest'

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
        <Text style={{ wordWrap: 'break-word' }} fontSize={3} fontWeight='bold'>
          {name}
        </Text>
        {licenses.length < 2 && (
          <Box my={1}>
            <BlueOak p={1} borderRadius={1} rating={licenses[0].color}>
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
                <BlueOak
                  key={i}
                  p={1}
                  borderRadius={1}
                  rating={licenses[0].color}
                >
                  <Text.span fontWeight='bold'>
                    {l.license ? l.license : 'Unknown'}
                  </Text.span>
                </BlueOak>
              </Box>
            )
          })}
        <Text>{author ? author.name : 'Unknown'}</Text>
        <Box>
          <Text mr={2}>{version}</Text>
          <Latest latest={latest} />
        </Box>
        <Scoped scoped={scoped} />
        {children && (
          <Box>
            {children.length}
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
