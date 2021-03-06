import PropTypes from 'prop-types'
import React from 'react'

const BookingOfferCellForBook = ({ offerIsbn, offerName }) => (
  <span className="booking-offer-info">
    <p className="offer-name">
      {offerName}
    </p>
    <p className="offer-additional-info">
      {offerIsbn}
    </p>
  </span>
)

BookingOfferCellForBook.propTypes = {
  offerIsbn: PropTypes.string.isRequired,
  offerName: PropTypes.string.isRequired,
}

export default BookingOfferCellForBook
