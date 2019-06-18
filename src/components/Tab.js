import React from 'react'
import Box from '../components/Box'
import styled, { css } from 'styled-components'

const Tab = props => {
  return (
    <StyledTab
      mr={3}
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
    border-bottom: 3px #357edd solid;
  }
  ${props =>
    props.isActive &&
    css`
      border-bottom: 3px #357edd solid;
      font-weight: bold;
    `}
`

export default Tab
