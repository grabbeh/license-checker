import React from 'react'
import Text from './Text'
import Box from './Box'
import {
  space,
  width,
  height,
  borders,
  borderColor,
  borderBottom,
  borderLeft,
  borderTop,
  borderRight,
  borderRadius,
  fontSize
} from 'styled-system'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from './theme'

const StyledTextArea = styled.textarea`
  outline: 0;
  border: none;
  box-sizing: border-box;
  ${space}
  ${width}
  ${height}
  ${borders}
  ${borderBottom}
  ${borderTop}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderRadius}
  ${fontSize}
`
class TextArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render () {
    const {
      label,
      type,
      placeholder,
      name,
      handleChange,
      value,
      error,
      onFocus,
      onBlur,
      readOnly,
      autoComplete
    } = this.props

    return (
      <Box borderRadius={2} bg='white' p={0} fontSize={3}>
        {label && (
          <Text>
            <label htmlFor={value}>{label}</label>
          </Text>
        )}
        <StyledTextArea
          autoComplete={autoComplete}
          id={value}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          {...this.props}
        />
        <Text color='red' fontWeight='bold' fontSize={3}>
          {error}
        </Text>
      </Box>
    )
  }
}

TextArea.defaultProps = {
  theme: theme,
  bg: 'white',
  p: 1,
  fontSize: 2,
  borderRadius: 2
}

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

TextArea.propTypes = {
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  bg: PropTypes.string,
  /** Width */
  width: numberStringOrArray,
  /** Font size */
  fontSize: numberStringOrArray,
  /** Font weight */
  fontWeight: PropTypes.string,
  /** Border top */
  borderTop: PropTypes.string,
  /** Border left */
  borderLeft: PropTypes.string,
  /** Border bottom */
  borderBottom: PropTypes.string,
  /** Border right */
  borderRight: PropTypes.string,
  /** Border color */

  ...borders.propType,
  borderColor: PropTypes.string,
  /** Margin */
  m: numberStringOrArray,
  /** Top margin */
  mt: numberStringOrArray,
  /** Right margin */
  mr: numberStringOrArray,
  /** Bottom margin */
  mb: numberStringOrArray,
  /** Left margin */
  ml: numberStringOrArray,
  /** Horizontal margin */
  mx: numberStringOrArray,
  /** Vertical margin */
  my: numberStringOrArray,
  /** Padding */
  p: numberStringOrArray,
  /** Top padding */
  pt: numberStringOrArray,
  /** Right padding */
  pr: numberStringOrArray,
  /** Bottom padding */
  pb: numberStringOrArray,
  /** Left padding */
  pl: numberStringOrArray,
  /** Horizontal padding */
  px: numberStringOrArray,
  /** Vertical padding */
  py: numberStringOrArray,
  /** Border radius */
  borderRadius: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Value */
  value: PropTypes.string,
  /** Placeholder  */
  placeholder: PropTypes.string,
  /** Handle change fn */
  handleChange: PropTypes.func.isRequired
}

export default TextArea
