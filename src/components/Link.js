import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from './theme'
import { Link } from 'gatsby'

const InternalLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`

InternalLink.displayName = 'Link'

InternalLink.propTypes = {
  color: PropTypes.string
}

InternalLink.defaultProps = {
  theme: theme
}

export default InternalLink
