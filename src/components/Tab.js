import React from 'react'
import Box from '../components/Box'
import styled, { css } from 'styled-components'

const Tab = props => {
  return (
    <StyledTab
      mb={3}
      mr={4}
      {...props}
      onClick={props.isDisabled ? null : props.onSelect}
    >
      {props.children}
    </StyledTab>
  )
}

const StyledTab = styled(Box)`
  cursor: pointer;
  &:hover {
    border-bottom: 1px black solid;
  }
  ${props =>
    props.isActive &&
    css`
      border-bottom: 1px black solid;
      font-weight: bold;
    `}
`

export default Tab
