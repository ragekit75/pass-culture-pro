import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Icon from 'components/layout/Icon'
import * as pcapi from 'repository/pcapi/pcapi'

const VenueItem = ({ offerer, venue }) => {
  const [stats, setStats] = useState([])
  const [statsPerf, setStatsPerf] = useState([])

  useEffect(function fetchData() {
    pcapi.getVenueStats(venue.id).then(stats => setStats(stats))
    pcapi.getVenueStatsPerf(venue.id).then(stats => setStatsPerf(stats))
  }, [venue.id])
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
            <h3>{"Sans perf"}</h3>
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
            <h3>{"Avec perf"}</h3>
            <ul className="h-description-list">
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Offres :'}
                    </span>
                <span className="h-dl-description">
                      {statsPerf?.offersActive}
                    </span>
              </li>
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Réservations :'}
                    </span>
                <span className="h-dl-description">
                      {statsPerf?.bookingsCurrent}
                    </span>
              </li>
              <li className="h-dl-row">
                    <span className="h-dl-title">
                      {'Offres épuisées :'}
                    </span>
                <span className="h-dl-description">
                      {statsPerf?.offersSoldOut}
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
