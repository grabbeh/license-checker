import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from './theme'

const InternalLink = styled('a')`
  cursor: pointer;
  text-decoration: none;
  color: #357edd;
`

InternalLink.displayName = 'Link'

InternalLink.propTypes = {
  color: PropTypes.string
}

InternalLink.defaultProps = {
  theme: theme
}

export default InternalLink
