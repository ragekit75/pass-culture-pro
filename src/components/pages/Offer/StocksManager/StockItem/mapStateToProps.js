import selectFormInitialValuesByStockAndOfferIdAndOffererId from './selectFormInitialValuesByStockAndOfferIdAndOffererId'
import selectOfferById from 'selectors/selectOfferById'
import selectOffererById from 'selectors/selectOffererById'
import selectProductById from 'selectors/selectProductById'
import selectVenueById from 'selectors/selectVenueById'
import selectTimezoneByVenueId from 'selectors/selectTimezoneByVenueId'
import { translateQueryParamsToApiParams } from 'utils/translate'

export default function mapStateToProps(state, ownProps) {
  const {
    match: { params },
    query,
    stock,
  } = ownProps
  const { stockIdOrNew } = translateQueryParamsToApiParams(query.parse())

  const offerId = params.offerId
  const offer = selectOfferById(state, offerId)
  const { productId, venueId } = offer || {}

  const product = selectProductById(state, productId)

  const venue = selectVenueById(state, venueId)
  const managingOffererId = venue && venue.managingOffererId

  const stockPatch = selectFormInitialValuesByStockAndOfferIdAndOffererId(
    state,
    stock,
    offerId,
    managingOffererId
  )

  const offerer = selectOffererById(state, managingOffererId)
  const hasIban =
    (venue && typeof venue.iban !== 'undefined') ||
    (offerer && typeof offerer.iban !== 'undefined')

  const timezone = selectTimezoneByVenueId(state, venueId)

  return {
    hasIban,
    offer,
    product,
    productId,
    stockPatch,
    stockIdOrNew,
    timezone,
    venue,
    venueId,
  }
}
