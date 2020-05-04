import moment from 'moment/moment'
import React from 'react'

function BookingDateCell(props) {
  const { bookingDateInfos } = props
  let bookingDate = moment(bookingDateInfos).utc()
  let bookingDateDay = bookingDate.format('DD/MM/YYYY')
  let bookingDateHour = bookingDate.format('HH:mm')
  return (
    <div>
      <span>
        {bookingDateDay}
      </span>
      <br />
      <span className="cell-subtitle">
        {bookingDateHour}
      </span>
    </div>
  )
}

export default BookingDateCell