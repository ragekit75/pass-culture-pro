import { shallow } from 'enzyme'
import React from 'react'
import { Form } from 'react-final-form'

import Venue from '../Venue'
import VenueProvidersManagerContainer from '../VenueProvidersManager/VenueProvidersManagerContainer'
import HeroSection from '../../../../components/layout/HeroSection/HeroSection'

describe('src | components | pages | Venue', () => {
  let push
  let props

  beforeEach(() => {
    push = jest.fn()
    props = {
      formInitialValues: {
        id: 'CM',
      },
      history: {
        location: {
          pathname: '/fake',
        },
        push: push,
      },
      handleInitialRequest: jest.fn(),
      handleSubmitRequest: jest.fn(),
      handleSubmitRequestSuccess: jest.fn(),
      handleSubmitRequestFail: jest.fn(),
      match: {
        params: {
          offererId: 'APEQ',
          venueId: 'AQYQ',
        },
      },
      offerer: {
        id: 'BQ',
        name: 'Maison du chocolat',
      },
      query: {
        changeToReadOnly: jest.fn(),
        context: jest.fn().mockReturnValue({
          isCreatedEntity: true,
          isModifiedEntity: false,
          readOnly: false
        }),
      }
    }
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // when
      const wrapper = shallow(<Venue {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('render', () => {
    it('should render component with default state', () => {
      // when
      const wrapper = shallow(<Venue {...props} />)

      // then
      expect(wrapper.state('isRequestPending')).toBe(false)
    })

    it('should not render a Form when venue is virtual', () => {
      // given
      props.formInitialValues = {
        isVirtual: true,
      }

      // when
      const wrapper = shallow(<Venue {...props} />)

      // then
      const form = wrapper.find(Form)
      expect(form).toHaveLength(0)
    })

    describe('when creating', () => {
      beforeEach(() => {
        props.match = {
          params: {
            offererId: 'APEQ',
            venueId: 'nouveau',
          },
        }
        props.query.context = () => ({
          isCreatedEntity: true,
          isModifiedEntity: false,
          readOnly: false,
        })
      })

      it('should render component with correct state values', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        expect(wrapper.state('isRequestPending')).toBe(false)
      })

      it('should display a paragraph with proper title', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        const heroSection = wrapper.find(HeroSection)
        expect(heroSection.find('p')).toBeDefined()
        expect(heroSection.find('p').prop('className')).toBe('subtitle')
        expect(heroSection.find('p').text()).toBe('Ajoutez un lieu où accéder à vos offres.')
      })

      it('should build the proper backTo link', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        expect(wrapper.prop('backTo')).toStrictEqual({
          label: 'Maison du chocolat',
          path: '/structures/APEQ',
        })
      })

      it('should not display a VenueProvidersManager component', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        expect(wrapper.find(VenueProvidersManagerContainer)).toHaveLength(0)
      })
    })

    describe('when editing', () => {
      beforeEach(() => {
        props.location = {
          search: '?modifie',
        }
        props.match = {
          params: {
            offererId: 'APEQ',
            venueId: 'AQYQ',
          },
        }
        props.query.context = () => ({
          isCreatedEntity: false,
          isModifiedEntity: true,
          readOnly: false,
        })
      })

      it('should render component with correct state values', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        expect(wrapper.state('isRequestPending')).toBe(false)
      })
    })

    describe('when reading', () => {
      beforeEach(() => {
        props.query.context = () => ({
          isCreatedEntity: false,
          isModifiedEntity: false,
          readOnly: true,
        })
      })

      it('should render component with correct state values', () => {
        // when
        const wrapper = shallow(<Venue {...props} />)

        // then
        expect(wrapper.state('isRequestPending')).toBe(false)
      })
    })
  })

  describe('form Success', () => {
    describe('handleFormSuccess', () => {
      describe('when creating a venue', () => {
        beforeEach(() => {
          props.query.context = () => ({
            isCreatedEntity: true,
            isModifiedEntity: false,
            readOnly: false,
          })
        })

        const action = {
          config: {
            apiPath: '/venues/CM',
            method: 'POST',
          },
          payload: {
            datum: {
              id: 'CM',
            },
          },
        }

        it('should redirect to offerer page', () => {
          // given
          const wrapper = shallow(<Venue {...props} />)
          const state = wrapper.state()

          // when
          wrapper.instance().handleFormSuccess(jest.fn())(state, action)

          // then
          expect(push).toHaveBeenCalledWith('/structures/APEQ')
        })

        it('should call handleSubmitRequestSuccess with the right parameters when venue is created', () => {
          // given
          const wrapper = shallow(<Venue {...props} />)
          const state = wrapper.state()

          // when
          wrapper.instance().handleFormSuccess(jest.fn())(state, action)

          // then
          expect(props.handleSubmitRequestSuccess).toHaveBeenCalledWith(
            { isRequestPending: false },
            {
              config: {
                apiPath: '/venues/CM',
                method: 'POST'
              },
              payload: {
                datum: {
                  id: 'CM'
                }
              }
            })
        })

        describe('when editing a venue', () => {
          beforeEach(() => {
            props.query.context = () => ({
              isCreatedEntity: false,
              isModifiedEntity: true,
              readOnly: false,
            })
          })

          const action = {
            config: {
              apiPath: '/venues/CM',
              method: 'PATCH',
            },
            payload: {
              datum: {
                id: 'CM',
              },
            },
          }

          it('should redirect to venue details', () => {
            // given
            const wrapper = shallow(<Venue {...props} />)
            const state = wrapper.state()

            // when
            wrapper.instance().handleFormSuccess(jest.fn())(state, action)

            // then
            expect(props.query.changeToReadOnly).toHaveBeenCalledWith(null)
          })

          it('should call handleSubmitRequestSuccess with the right parameters when venue is modified', () => {
            // given
            const wrapper = shallow(<Venue {...props} />)
            const state = wrapper.state()

            // when
            wrapper.instance().handleFormSuccess(jest.fn())(state, action)

            // then
            expect(props.handleSubmitRequestSuccess).toHaveBeenCalledWith(
              { isRequestPending: false },
              {
                config: {
                  apiPath: '/venues/CM',
                  method: 'PATCH'
                },
                payload: {
                  datum: {
                    id: 'CM'
                  }
                }
              }
            )
          })
        })
      })
    })
  })
})
