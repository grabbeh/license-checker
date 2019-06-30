import styled from 'styled-components'
import { layout, space, color, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'
import * as React from 'react'
import theme from './theme'

const StyledList = styled('ul')(
  {
    boxSizing: 'border-box',
    listStyle: 'none'
  },
  space,
  layout,
  border,
  color
)

// To recognise propTypes, we have to create new Box to wrap StyledBox
const List = props => {
  return <StyledList {...props}>{props.children}</StyledList>
}

List.displayName = 'List'

List.defaultProps = {
  theme: theme,
  my: 2,
  ml: 2,
  mr: 0,
  p: 0
}

List.propTypes = {
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.layout
}

export default List
