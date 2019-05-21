import updateBookingLimitDatetime from '../updateBookingLimitDatetime'

describe('src | components | pages | Offer | StockManager | StockItem | decorators | updateBookingLimitDatetime', () => {
  describe('For event', () => {
    describe('bookingLimitDatetime updated', () => {
      test('When booking limit date is before beginning date then booking limit time is equal to 23h59', () => {
        // given
        const isEvent = true
        const previousBeginningDatetime = '2019-04-28T19:00:00.000Z'
        const previousBookingLimitDatetime = '2019-04-20T00:00:00.000Z'

        // when
        const result = updateBookingLimitDatetime({
          isEvent,
          previousBeginningDatetime,
          previousBookingLimitDatetime,
        })

        // then
        expect(result).toEqual({
          bookingLimitDatetime: '2019-04-20T23:59:00.000Z',
        })
      })

      test('When booking limit date is equal to beginning date then booking limit time is equal to beginning time', () => {
        // given
        const isEvent = true
        const previousBeginningDatetime = '2019-04-20T19:00:00.000Z'
        const previousBookingLimitDatetime = '2019-04-20T15:00:00.000Z'

        // when
        const result = updateBookingLimitDatetime({
          isEvent,
          previousBeginningDatetime,
          previousBookingLimitDatetime,
        })

        // then
        expect(result).toEqual({
          bookingLimitDatetime: '2019-04-20T19:00:00.000Z',
        })
      })
    })

    describe('beginningDatetime updated', () => {
      test('When booking limit date is before beginning date then booking limit time is equal to 23h59', () => {
        // given
        const isEvent = true
        const previousBeginningDatetime = '2019-04-28T19:00:00.000Z'
        const previousBookingLimitDatetime = '2019-04-27T19:00:00.000Z'

        // when
        const result = updateBookingLimitDatetime({
          isEvent,
          previousBeginningDatetime,
          previousBookingLimitDatetime,
        })

        // then
        expect(result).toEqual({
          bookingLimitDatetime: '2019-04-27T23:59:00.000Z',
        })
      })

      test('When booking limit date is equal to beginning date then booking limit time is equal to beginning time', () => {
        // given
        const isEvent = true
        const previousBeginningDatetime = '2019-04-27T15:00:00.000Z'
        const previousBookingLimitDatetime = '2019-04-27T19:00:00.000Z'

        // when
        const result = updateBookingLimitDatetime({
          isEvent,
          previousBeginningDatetime,
          previousBookingLimitDatetime,
        })

        // then
        expect(result).toEqual({
          bookingLimitDatetime: '2019-04-27T15:00:00.000Z',
        })
      })
    })
  })

  describe('For thing', () => {
    test('When booking limit date is not empty then booking limit time is equal to 23h59', () => {
      // given
      const isEvent = false
      const previousBeginningDatetime = null
      const previousBookingLimitDatetime = '2019-04-27T19:00:00.000Z'

      // when
      const result = updateBookingLimitDatetime({
        isEvent,
        previousBeginningDatetime,
        previousBookingLimitDatetime,
      })

      // then
      expect(result).toEqual({
        bookingLimitDatetime: '2019-04-27T23:59:00.000Z',
      })
    })
  })
})