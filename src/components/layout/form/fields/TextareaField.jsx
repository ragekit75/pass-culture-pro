/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React, { Fragment } from 'react'
import Textarea from 'react-autosize-textarea'
import { Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { composeValidators } from 'react-final-form-utils'

import FieldErrors from 'components/layout/form/FieldErrors'
import getRequiredValidate from 'components/layout/form/utils/getRequiredValidate'

function formatInputValueWhenTooLong(value, maxLength) {
  const valueLength = value.length
  const valueIsTooLong = valueLength > maxLength - 1
  return valueIsTooLong ? value.slice(0, maxLength - 1) : value
}

export const TextareaField = ({
  autoComplete,
  className,
  disabled,
  label,
  maxLength,
  name,
  placeholder,
  readOnly,
  required,
  validate,
  validating,
  // see https://github.com/buildo/react-autosize-textarea
  ...ReactAutosizeProps
}) => (
  <Field
    name={name}
    validate={composeValidators(validate, getRequiredValidate(required))}
    render={({ input, meta }) => {
      const value = formatInputValueWhenTooLong(input.value, maxLength)
      return (
        <div
          className={classnames('field textarea-field', className, {
            'is-label-aligned': label,
            'is-read-only': readOnly,
          })}>
          <label
            htmlFor={name}
            className={classnames('field-label', { empty: !label })}>
            {label && (
              <span>
                <span>{label}</span>
                {required && !readOnly && (
                  <span className="field-asterisk">*</span>
                )}
                {!readOnly && (
                  <Fragment>
                    <br />
                    <span className="fs12">
                      {' '}
                      ({input.value.length} / {maxLength}){' '}
                    </span>
                  </Fragment>
                )}
              </span>
            )}
          </label>
          <div className="field-control">
            <div className="field-value flex-columns items-center">
              <span className="field-inner">
                <Textarea
                  {...input}
                  autoComplete={autoComplete ? 'on' : 'off'}
                  className="field-textarea"
                  disabled={disabled || readOnly}
                  id={name}
                  placeholder={readOnly ? '' : placeholder}
                  readOnly={readOnly}
                  required={!!required}
                  value={value}
                  {...ReactAutosizeProps}
                />
              </span>
            </div>
            <FieldErrors meta={meta} />
          </div>
        </div>
      )
    }}
  />
)

TextareaField.defaultProps = {
  autoComplete: false,
  className: '',
  disabled: false,
  label: '',
  maxLength: 1000,
  placeholder: '',
  readOnly: false,
  required: false,
  validate: null,
  validating: false,
}

TextareaField.propTypes = {
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  validate: PropTypes.func,
  validating: PropTypes.bool,
}

export default TextareaField