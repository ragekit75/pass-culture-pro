import React, { useState, useEffect, useCallback } from 'react'

import PageTitle from 'components/layout/PageTitle/PageTitle'
import * as pcapi from 'repository/pcapi/pcapi'

import Select, { buildSelectOptions } from '../../layout/inputs/Select'

const Home = () => {
  const [offerers, setOfferers] = useState([])
  const [selectedOffererId, setSelectedOffererId] = useState('')
  const [offererDetails, setOffererDetails] = useState(null)

  useEffect(() => {
    pcapi.getValidatedOfferers().then(receivedOfferers => {
      setOfferers(buildSelectOptions('id', 'name', receivedOfferers))
      setSelectedOffererId(receivedOfferers[0].id)
    })
  }, [])

  useEffect(() => {
    if (selectedOffererId !== '') {
      pcapi.getOffererById(selectedOffererId).then(receivedOfferer => {
        setOffererDetails(receivedOfferer)
      })
    }
  }, [selectedOffererId])

  const selectOfferer = useCallback(event => setSelectedOffererId(event.target.value), [])

  return (
    <div className="">
      <PageTitle title="Accueil" />
      <Select
        defaultOption={{
          displayName: 'Sélectionnez une structure',
          id: '',
        }}
        handleSelection={selectOfferer}
        label="Structure"
        name="offererId"
        options={offerers}
        selectedValue={selectedOffererId}
      />

      {offererDetails &&
        offererDetails.venues.map(venue => {
          return (
            <section key={venue.id}>
              <h3 className="section-title">
                {venue.name}
              </h3>
              <div>
                {`Réservations en cours : ${venue.onGoingBookingsCount}`}
              </div>
              <div>
                {`Réservations validées : ${venue.validatedBookingsCount}`}
              </div>
              <div>
                {`Offres actives : ${venue.offers.length}`}
              </div>
              <div>
                {`Offres épuisées : ${venue.offers.length}`}
              </div>
            </section>
          )
        })}
    </div>
  )
}

export default Home
