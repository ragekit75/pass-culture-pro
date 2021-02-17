import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Icon from 'components/layout/Icon'
import Select, { buildSelectOptions } from 'components/layout/inputs/Select'
import Spinner from 'components/layout/Spinner'
import * as pcapi from 'repository/pcapi/pcapi'

import { steps, STEP_ID_OFFERERS } from './HomepageBreadcrumb'

const VenueItem = ({ offerer, venue }) => {
  const [stats, setStats] = useState([])

  useEffect(function fetchData() {
    pcapi.getVenueStats(venue.id).then(stats => setStats(stats))
  }, [])
  return (
    <div
      className="h-section-row nested"
    >
      <div className="h-card h-card-secondary">
        <div className="h-card-inner">
          <div className="h-card-header-row">
            <h3 className="h-card-title">
              <Icon
                className="h-card-title-ico"
                svg="ico-box"
              />
              {venue.name}
            </h3>
            <Link
              className="tertiary-button"
              to={`/structures/${offerer.id}/lieux/${venue.id}`}
            >
              <Icon svg="ico-outer-pen" />
              {'Modifier'}
            </Link>
          </div>
          <div className="h-card-content">
            <ul className="h-description-list">
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Offres :'}
                    </span>
                <span className="h-dl-description">
                      {stats?.offersActive}
                    </span>
              </li>
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Réservations :'}
                    </span>
                <span className="h-dl-description">
                      {stats?.bookingsCurrent}
                    </span>
              </li>
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Offres épuisées :'}
                    </span>
                <span className="h-dl-description">
                      {stats?.offersSoldOut}
                    </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueItem
