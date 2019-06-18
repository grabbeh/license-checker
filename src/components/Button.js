import styled from 'styled-components'
import {
  space,
  width,
  color,
  fontWeight,
  fontSize,
  borderRadius,
  borders
} from 'styled-system'
import * as React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'

const StyledButton = styled.button`
  outline: 1px solid transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background: #00449e;
  }
  ${space} ${width} ${fontSize} ${color} ${fontWeight} ${borderRadius} ${borders}
`

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

Button.displayName = 'Box'

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

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Button.propTypes = {
  fontSize: numberStringOrArray,
  fontWeight: PropTypes.string,
  color: PropTypes.string,
  bg: PropTypes.string,
  width: numberStringOrArray,
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray,
  p: numberStringOrArray,
  pt: numberStringOrArray,
  pr: numberStringOrArray,
  pb: numberStringOrArray,
  pl: numberStringOrArray,
  px: numberStringOrArray,
  py: numberStringOrArray,
  borderRadius: PropTypes.number
}

export default Button
