import * as PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'components/layout/Icon'
import { ReactComponent as IcoPlus } from 'icons/ico-plus.svg'

import VenueStat from './VenueStat'

export const Venue = ({ id, isVirtual, name, offererId, publicName }) => {
  const venueStatData = [
    {
      amount: '- -',
      label: 'Offres actives',
      url: `/offres?lieu=${id}&statut=active`,
    },
    {
      amount: '- -',
      label: 'Reservations en cours',
      url: `/reservations?lieu=${id}`,
    },
    {
      amount: '- -',
      label: 'Reservations en validées',
      url: `/reservations?lieu=${id}`,
    },
    {
      amount: '- -',
      label: 'Offres stocks épuisés',
      url: `/offres?lieu=${id}&statut=epuisee`,
    },
  ]

  return (
    <div className="h-section-row nested">
      <div className={`h-card h-card-${isVirtual ? 'primary' : 'secondary'}`}>
        <div className="h-card-inner">
          <div className="h-card-header-row">
            <h3 className="h-card-title">
              <Icon
                className="h-card-title-ico"
                svg={isVirtual ? 'ico-screen-play' : 'ico-box'}
              />
              {publicName || name}
            </h3>
            {!isVirtual && (
              <Link
                className="tertiary-link"
                to={`/structures/${offererId}/lieux/${id}`}
              >
                <Icon svg="ico-outer-pen" />
                {'Modifier'}
              </Link>
            )}
          </div>
          <div className="h-card-cols venue-stats">
            {venueStatData.map(stat => (
              <VenueStat
                key={stat.label}
                stat={stat}
              />
            ))}

            <div className="h-card-col venue-stat">
              <Link
                className="venue-stat-link tertiary-link"
                to={`/offres/creation?structure=${offererId}&lieu=${id}`}
              >
                <IcoPlus />
                <span>
                  {isVirtual ? 'Créer une nouvelle offre numérique' : 'Créer une nouvelle offre'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Venue.defaultProps = {
  id: '',
  isVirtual: false,
  offererId: '',
  publicName: '',
}

Venue.propTypes = {
  id: PropTypes.string,
  isVirtual: PropTypes.bool,
  name: PropTypes.string.isRequired,
  offererId: PropTypes.string,
  publicName: PropTypes.string,
}
