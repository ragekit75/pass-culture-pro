import { connect } from 'react-redux'
import { compose } from 'redux'

import withTracking from 'components/hocs/withTracking'
import { showNotificationV2 } from 'store/reducers/notificationReducer'

import ActionsBar from './ActionsBar'

export const mapStateToProps = state => {
  return {
    searchFilters: state.offers.searchFilters,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    showSuccessNotification: text =>
      dispatch(
        showNotificationV2({
          type: 'success',
          text,
        })
      ),
  }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    trackActivateOffers: offerIds => {
      ownProps.tracking.trackEvent({ action: 'activateOffers', names: offerIds })
    },
    trackDeactivateOffers: offerIds => {
      ownProps.tracking.trackEvent({ action: 'deactivateOffers', names: offerIds })
    },
  }
}

export default compose(
  withTracking('OffersActionsBar'),
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(ActionsBar)
