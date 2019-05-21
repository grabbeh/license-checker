import styled from 'styled-components'
import {
  space,
  width,
  height,
  color,
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection
} from 'styled-system'
import theme from './theme'

const Flex = styled.div`
  display: flex;
  ${space} ${width} ${height} ${color} ${alignItems} ${justifyContent} ${flexWrap} ${flexDirection};
`

Flex.defaultProps = {
  theme
}

Flex.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
  ...flexWrap.propTypes,
  ...flexDirection.propTypes
}

Flex.displayName = 'Flex'

export default Flex
