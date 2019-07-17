import get from 'lodash.get'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Mediation from './Mediation'

import { withRequiredLogin } from '../../hocs'
import selectMediationById from '../../../selectors/selectMediationById'
import selectOfferById from '../../../selectors/selectOfferById'
import selectOffererById from '../../../selectors/selectOffererById'
import selectVenueById from '../../../selectors/selectVenueById'

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { mediationId, offerId },
    },
  } = ownProps
  const offer = selectOfferById(state, offerId)
  const venue = selectVenueById(state, get(offer, 'venueId'))
  return {
    offer,
    offerer: selectOffererById(state, get(venue, 'managingOffererId')),
    mediation: selectMediationById(state, mediationId),
  }
}

export default compose(
  withRequiredLogin,
  connect(mapStateToProps)
)(Mediation)