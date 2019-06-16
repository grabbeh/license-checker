import React from 'react'
import Text from './Text'
import Box from './Box'
import {
  layout,
  space,
  shadow,
  position,
  color,
  border,
  typography
} from 'styled-system'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import PropTypes from 'prop-types'
import theme from './theme'

const StyledInput = styled('input')(
  { border: 'none', boxSizing: 'border-box' },
  layout,
  space,
  shadow,
  position,
  color,
  border,
  typography
)

class Input extends React.Component {
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
      <Box borderRadius={2}>
        {label && (
          <Box bg='#f8f8f9'>
            <Text>
              <label htmlFor={value}>{label}</label>
            </Text>
          </Box>
        )}
        <StyledInput
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

Input.defaultProps = {
  theme: theme
}

Input.propTypes = {
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.position,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default Input
