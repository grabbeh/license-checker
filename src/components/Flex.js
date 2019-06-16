import styled from 'styled-components'
import { flexbox } from 'styled-system'
import propTypes from '@styled-system/prop-types'
import theme from './theme'

const Flex = styled('div')({ display: 'flex' }, flexbox)

Flex.defaultProps = {
  theme
}

Flex.propTypes = {
  ...propTypes.flexbox
}

Flex.displayName = 'Flex'

export default Flex
