import styled from 'styled-components'
import {
  layout,
  space,
  shadow,
  position,
  color,
  border,
  typography
} from 'styled-system'
import * as React from 'react'
import propTypes from '@styled-system/prop-types'
import theme from './theme'

const StyledButton = styled.button`
  outline: 1px solid transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background: #00449e;
  }
  ${layout} ${space} ${shadow} ${position} ${color} ${border} ${typography}
`

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

Button.displayName = 'Button'

Button.defaultProps = {
  theme: theme,
  px: 3,
  py: 2,
  fontSize: 2,
  fontWeight: 'bold',
  disabled: false,
  bg: 'blue',
  color: 'white',
  borderRadius: 1
}

Button.propTypes = {
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.position,
  ...propTypes.typography
}

export default Button
