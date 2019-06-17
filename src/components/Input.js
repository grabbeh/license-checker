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

/*
const StyledInput = styled('input')(
  { border: 'none', boxSizing: 'border-box' },
  layout,
  space,
  shadow,
  position,
  color,
  border,
  typography
) */

const StyledInput = styled('input')`
  ${layout}
  ${space}
  ${shadow}
  ${position}
  ${color}
  ${border}
  ${typography}
  outline: 0;
  box-sizing: border-box;
  &:focus {
    border: 2px solid #4B3CFA;
  }
  `
class Input extends React.Component {
  render () {
    const {
      label,
      type,
      placeholder,
      name,
      onChange,
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
          <Box mb={1}>
            <Text fontWeight={600}>
              <label htmlFor={value}>{label}</label>
            </Text>
          </Box>
        )}
        <StyledInput
          autoComplete={autoComplete}
          id={value}
          onChange={onChange}
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
  onChange: PropTypes.func.isRequired
}

export default Input
