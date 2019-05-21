import styled from 'styled-components'
import {
  space,
  width,
  height,
  color,
  fontSize,
  fontFamily,
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  maxWidth,
  minHeight,
  minWidth,
  size,
  position,
  top,
  right,
  bottom,
  left,
  zIndex
} from 'styled-system'
import * as React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'

const boxShadow = props => {
  const boxShadows = {
    sm: {
      'box-shadow': props.theme.boxShadows[0]
    },
    md: {
      'box-shadow': props.theme.boxShadows[1]
    },
    lg: {
      'box-shadow': props.theme.boxShadows[2]
    },
    xl: {
      'box-shadow': props.theme.boxShadows[3]
    }
  }
  return boxShadows[props.boxShadowSize]
}

const StyledBox = styled.div`
  box-sizing: border-box;
  ${boxShadow} ${borders} ${space} ${size} ${maxWidth} ${minWidth} ${minHeight} ${width} ${height} ${fontWeight} ${fontSize} ${fontFamily} ${color} ${borderRadius} ${position} ${top} ${bottom} ${left} ${right} ${zIndex} ${borderColor};
`

// To recognise propTypes, we have to create new Box to wrap StyledBox
const Box = props => {
  return <StyledBox {...props}>{props.children}</StyledBox>
}

Box.displayName = 'Box'

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Box.defaultProps = {
  theme: theme
}

Box.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...size.propTypes,
  ...position.propTypes,
  borderColor: numberStringOrArray,
  boxShadow: numberStringOrArray,
  fontWeight: numberStringOrArray,
  height: numberStringOrArray,
  borderRadius: PropTypes.number
}

export default Box
