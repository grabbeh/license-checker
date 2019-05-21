import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  fontSize,
  space,
  fontWeight,
  color,
  textAlign,
  lineHeight
} from 'styled-system'
import theme from './theme'

export const bold = props =>
  props.bold ? { fontWeight: props.theme.bold } : null

export const regular = props =>
  props.regular ? { fontWeight: props.theme.regular } : null

export const caps = props =>
  props.caps
    ? {
      textTransform: 'uppercase'
    }
    : null

export const pointer = props => (props.pointer ? { cursor: 'pointer' } : null)

const Text = styled.div`
  word-wrap: break-word;
  ${space} ${fontSize} ${fontWeight} ${color} ${textAlign} ${lineHeight} ${pointer} ${caps} ${regular} ${bold};
`

Text.displayName = 'Text'

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Text.propTypes = {
  ...space.propTypes,
  /** Font size */
  fontSize: numberStringOrArray,
  /** Alignment */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  /** Font weight */
  fontWeight: PropTypes.string,
  /** Color */
  color: PropTypes.string
}

Text.defaultProps = {
  color: 'black',
  theme: theme
}

Text.span = Text.withComponent('span')
Text.p = Text.withComponent('p')
Text.s = Text.withComponent('s')

export default Text
