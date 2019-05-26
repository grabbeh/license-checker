import React from 'react'
import Box from '../components/Box'
import styled, { css } from 'styled-components'

const Tab = props => {
  return (
    <StyledTab
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
    border-bottom: 2px #4b3cfa solid;
  }
  ${props =>
    props.isActive &&
    css`
      border-bottom: 2px #4b3cfa solid;
      font-weight: bold;
    `}
`

export default Tab
