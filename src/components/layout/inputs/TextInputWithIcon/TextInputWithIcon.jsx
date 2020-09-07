import React from 'react'
import PropTypes from 'prop-types'
import { ROOT_PATH } from '../../../../utils/config'
import TextInputError from '../Errors/TextInputError'

const TextInputWithIcon = ({
  disabled,
  error,
  icon,
  iconAlt,
  label,
  name,
  onChange,
  onIconClick,
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
    <div className={`it-with-icon-container ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
      <input
        className="it-input-with-icon"
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      <button
        className="it-icon"
        onClick={onIconClick}
        type="button"
      >
        <img
          alt={iconAlt}
          src={`${ROOT_PATH}/icons/${icon}.svg`}
        />
      </button>
    </div>
    {error && <TextInputError message={error} />}
  </label>
)

TextInputWithIcon.defaultProps = {
  disabled: false,
  error: null,
  onChange: null,
  required: false,
  sublabel: '',
  type: 'text',
}

TextInputWithIcon.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  sublabel: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export default TextInputWithIcon
