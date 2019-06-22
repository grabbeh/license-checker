import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space, color, typography } from 'styled-system'
import propTypes from '@styled-system/prop-types'
import theme from './theme'

export const bold = props =>
  props.bold ? { fontWeight: props.theme.bold } : null

export const caps = props =>
  props.caps
    ? {
      textTransform: 'uppercase'
    }
    : null

export const pointer = props => (props.pointer ? { cursor: 'pointer' } : null)

const Text = styled('div')(
  { wordWrap: 'break-word' },
  typography,
  space,
  color,
  caps,
  pointer
)

Text.displayName = 'Text'

Text.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography,
  color: PropTypes.string
}

Text.defaultProps = {
  theme,
  color: 'dark-gray'
}

Text.span = Text.withComponent('span')
Text.p = Text.withComponent('p')
Text.s = Text.withComponent('s')

export default Text
