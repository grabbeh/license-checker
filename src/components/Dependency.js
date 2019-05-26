import React, { Fragment, useState } from 'react'
import Box from './Box'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled from 'styled-components'
import { colors, fonts, Text } from '@zopauk/react-components'

const Dependency = ({ parent, dependencies }) => {
  let [hidden, setHidden] = useState(true)
  let { name, author, licenses, version } = parent
  return (
    <Fragment>
      <Box
        key={name}
        backgroundColor={colors.primary.teal600}
        p={2}
        pl={3}
        mr={3}
        mb={3}
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
      >
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Box width={0.7}>
            <Box>
              <Text
                style={{ wordWrap: 'break-word' }}
                fontFamily={fonts.alverata}
                size='xl'
                fw='bold'
              >
                {name}
              </Text>
            </Box>
            <Box>
              <Text>{version}</Text>
            </Box>
          </Box>
          <Box width={0.2}>
            <Flex justifyContent='flex-end'>
              <BlueOak
                width={20}
                height={20}
                borderRadius={4}
                rating={licenses[0].color}
              />
            </Flex>
          </Box>
        </Flex>
        {licenses.length < 2 && (
          <Box>
            <Text>{licenses[0].license ? licenses[0].license : 'Unknown'}</Text>
          </Box>
        )}
        {licenses.length > 1 &&
          licenses.map((l, i) => {
            return <Text key={i}>{l.license ? l.license : 'Unknown'}</Text>
          })}
        <Text>{author ? author.name : 'Unknown'}</Text>
        {dependencies && (
          <Text>
            {dependencies && (
              <Box
                onClick={() => {
                  setHidden(!hidden)
                }}
              >
                {hidden ? (
                  <Text size='l' style={{ cursor: 'pointer' }} fw='bold'>
                    <FiChevronDown />
                  </Text>
                ) : (
                  <Text size='l' style={{ cursor: 'pointer' }} fw='bold'>
                    <FiChevronUp />
                  </Text>
                )}
              </Box>
            )}
            {dependencies.map((d, i) => (
              <HideStyled key={i} hidden={hidden}>
                <Dependency hidden={hidden} {...d} />
              </HideStyled>
            ))}
          </Text>
        )}
      </Box>
    </Fragment>
  )
}

const HideStyled = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
  height: ${props => (props.hide ? 0 : '100%')};
  transition: opacity 300ms, height 300ms ease-in;
`

export default Dependency
