import * as PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

import TextInput from 'components/layout/inputs/TextInput/TextInput'
import { ReactComponent as ThumbnailSampleIcon } from 'components/pages/Offer/Offer/Thumbnail/assets/thumbnail-sample.svg'
import pcapi from 'repository/pcapi/pcapi'

const ImportFromURL = ({ setStep, setURL }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')

  const checkUrl = useCallback(event => {
    const url = event.target.value

    setIsButtonDisabled(url === '')
    setUrl(url)
    setError('')
  }, [])

  const isURLFormatValid = url => /^(http|https)/.test(url)

  const getError = async url => {
    try {
      const errors = await pcapi.getURLErrors(url)
      return errors.errors[0]
    } catch {
      return 'Une erreur est survenue'
    }
  }

  const isThereAnError = useCallback(
    async event => {
      event.preventDefault()

      if (!isURLFormatValid(url)) {
        setError('Format d’URL non valide')
      } else {
        const error = await getError(url)

        if (error) {
          setError(error)
          setIsButtonDisabled(true)
        } else {
          setURL(url)
          setStep(2)
        }
      }
    },
    [setStep, setURL, url]
  )

  return (
    <form
      action="#"
      className="tnf-form"
    >
      <ThumbnailSampleIcon />
      <p className="tnf-info">
        {'Utilisez de préférence un visuel en orientation portrait'}
      </p>
      <TextInput
        error={error}
        label="URL de l’image"
        name="url"
        onChange={checkUrl}
        placeholder="Ex : http://..."
        value={url}
      />
      <button
        className="primary-button tnf-url-button"
        disabled={isButtonDisabled}
        onClick={isThereAnError}
        type="submit"
      >
        {'Valider'}
      </button>
    </form>
  )
}

ImportFromURL.propTypes = {
  setStep: PropTypes.func.isRequired,
  setURL: PropTypes.func.isRequired,
}

export default ImportFromURL
