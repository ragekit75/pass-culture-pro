import { mapStateToProps, mapDispatchToProps } from '../FilterByOfferContainer'

describe('src | components | pages | Bookings | FilterByOfferContainer', () => {
  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      // given
      const state = {
        bookingSummary: {
          isFilteredByDigitalVenues: false,
          offerId: '',
          venueId: 'CY',
        },
        data: {
          offers: [],
          venues: [],
        },
      }

      // when
      const props = mapStateToProps(state)

      // then
      expect(props).toStrictEqual({
        isFilteredByDigitalVenues: false,
        offersOptions: [
          {
            id: 'all',
            name: 'Toutes les offres',
          },
        ],
        offerId: '',
        venueId: 'CY',
        showDateSection: false,
      })
    })

    describe('showDateSection', () => {
      it('should be false by default', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: '',
            venueId: '',
          },
          data: {
            offers: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toHaveProperty('showDateSection', false)
      })

      it('should be true when a specific offer is selected', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: 'CY',
            venueId: '',
          },
          data: {
            offers: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toHaveProperty('showDateSection', true)
      })

      it('should be false when offerId is `all`', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: 'all',
            venueId: '',
          },
          data: {
            offers: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toHaveProperty('showDateSection', false)
      })

      it('should be false when offerId is null', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: null,
            venueId: '',
          },
          data: {
            offers: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toHaveProperty('showDateSection', false)
      })
    })

    describe('offerOptions', () => {
      it('should return an array of digital offers when isFilteredByDigitalVenues is true', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: true,
            offerId: '',
            venueId: '',
          },
          data: {
            offers: [
              {
                id: 'CY',
                name: 'abonnement streaming',
                isDigital: true,
              },
              {
                id: 'DA',
                name: 'livre en librairie',
                isDigital: false,
              },
            ],
            venues: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toStrictEqual({
          isFilteredByDigitalVenues: true,
          offersOptions: [
            {
              id: 'all',
              name: 'Toutes les offres',
            },
            {
              id: 'CY',
              name: 'abonnement streaming',
              isDigital: true,
            },
          ],
          offerId: '',
          venueId: '',
          showDateSection: false,
        })
      })

      it('should return an empty array when venueId is `all`', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: '',
            venueId: 'all',
          },
          data: {
            offers: [
              {
                id: 'CY',
                name: 'abonnement streaming',
                isDigital: true,
              },
              {
                id: 'DA',
                name: 'livre en librairie',
                isDigital: false,
              },
              {
                id: 'BA',
                name: 'place de cinéma',
                isDigital: false,
              },
            ],
            venues: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toStrictEqual({
          isFilteredByDigitalVenues: false,
          offersOptions: [],
          offerId: '',
          venueId: 'all',
          showDateSection: false,
        })
      })

      it('should return an array of physical offers related to the given venueId ', () => {
        // given
        const state = {
          bookingSummary: {
            isFilteredByDigitalVenues: false,
            offerId: '',
            venueId: 'AB',
          },
          data: {
            offers: [
              {
                id: 'CY',
                name: 'abonnement streaming',
                venueId: 'AB',
              },
              {
                id: 'DA',
                name: 'livre en librairie',
                venueId: 'CD',
              },
            ],
            venues: [],
          },
        }

        // when
        const props = mapStateToProps(state)

        // then
        expect(props).toStrictEqual({
          isFilteredByDigitalVenues: false,
          offersOptions: [
            {
              id: 'all',
              name: 'Toutes les offres',
            },
            {
              id: 'CY',
              name: 'abonnement streaming',
              venueId: 'AB',
            },
          ],
          offerId: '',
          venueId: 'AB',
          showDateSection: false,
        })
      })
    })
  })

  describe('mapDispatchToProps', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
    })

    describe('loadOffers', () => {
      it('should load offers using API', () => {
        // given
        const functions = mapDispatchToProps(dispatch)
        const { loadOffers } = functions

        //when
        loadOffers()

        // then
        expect(dispatch).toHaveBeenCalledWith({
          config: { apiPath: '/offers', method: 'GET', stateKey: 'offers' },
          type: 'REQUEST_DATA_GET_OFFERS',
        })
      })
    })

    describe('updateOfferId', () => {
      it('should update offerId from store', () => {
        // given
        const functions = mapDispatchToProps(dispatch)
        const { updateOfferId } = functions

        // when
        updateOfferId({ target: { value: 'AVJA' } })

        // then
        expect(dispatch).toHaveBeenCalledWith({
          payload: 'AVJA',
          type: 'BOOKING_SUMMARY_UPDATE_OFFER_ID',
        })
      })
    })
  })
})