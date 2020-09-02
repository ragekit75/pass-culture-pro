import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  required,
  sublabel,
  type,
  value,
}) => (
  <label
    className="input-text"
    htmlFor={name}
  >
    <div className="labels">
      {label}
      <span className="it-sub-label">
        {sublabel}
      </span>
    </div>
    <input
      className="it-input"
      disabled={disabled}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  </label>
)

TextInput.defaultProps = {
  disabled: false,
  onChange: null,
  required: false,
  sublabel: '',
  type: 'text',
}

TextInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  sublabel: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export default TextInput
