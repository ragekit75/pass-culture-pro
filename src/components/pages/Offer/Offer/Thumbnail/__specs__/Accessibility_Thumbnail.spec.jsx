import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router'

import ThumbnailDialog from 'components/pages/Offer/Offer/Thumbnail/ThumbnailDialog'

const renderThumbnail = () => {
  render(
    <MemoryRouter>
      <ThumbnailDialog setIsModalOpened={jest.fn()} />
    </MemoryRouter>
  )
}

describe('offer Thumbnail modal accessibilty', () => {
  it('should follow the following tab navigation order', async () => {
    // When
    renderThumbnail()

    // Then
    expect(screen.getByText('Importer')).toHaveFocus()

    // Then
    userEvent.tab()
    expect(screen.getByText('Utiliser une URL')).toHaveFocus()

    // Then
    userEvent.tab()
    screen.getByText(/importer une image depuis l’ordinateur/i)

    // Then
    userEvent.tab()
    expect(screen.getByTitle('Fermer la modale')).toHaveFocus()
  })
})
