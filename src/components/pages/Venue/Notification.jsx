import React from 'react'
import { Link } from 'react-router-dom'

import { CREATION } from 'components/hocs/withFrenchQueryRouter'
import { closeNotification } from 'store/reducers/notificationReducer'

const handleOnClick = dispatch => () => dispatch(closeNotification())
const NotificationMessage = ({ venueId, offererId, dispatch }) => {
  const createOfferPathname = `/offres/${CREATION}?lieu=${venueId}&structure=${offererId}`
  return (
    <p>
      {'Lieu créé. Vous pouvez maintenant y '}
      <Link
        onClick={handleOnClick(dispatch)}
        to={createOfferPathname}
      >
        {'créer une offre'}
      </Link>
      {', ou en importer automatiquement. '}
    </p>
  )
}

export default NotificationMessage
