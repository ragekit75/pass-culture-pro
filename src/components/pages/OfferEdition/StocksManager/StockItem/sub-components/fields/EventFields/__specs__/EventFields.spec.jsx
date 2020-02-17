import { shallow } from 'enzyme'
import React from 'react'

import EventFields from '../EventFields'
import DateField from '../../../../../../../../layout/form/fields/DateField'
import TimeField from '../../../../../../../../layout/form/fields/TimeField'

describe('components | OfferEdition | EventFields', () => {
  it('should match the snapshot', () => {
    // given
    const initialProps = {
      beginningMinDate: '2019-03-29T01:56:55.610Z',
      dispatch: jest.fn(),
      parseFormChild: jest.fn(),
    }

    // when
    const wrapper = shallow(<EventFields {...initialProps} />)

    // then
    expect(wrapper).toMatchSnapshot()
  })

  it('should display a DateField to inform about begginning DateTime', () => {
    // when
    const wrapper = shallow(<EventFields />)

    // then
    const dateField = wrapper.find(DateField)
    expect(dateField).toHaveLength(1)
  })

  it('should display a TimeField to inform about begginning time hour', () => {
    // when
    const wrapper = shallow(<EventFields />)

    // then
    const timeField = wrapper.find(TimeField).findWhere(timeFieldComponent => {
      return timeFieldComponent.props().name === 'beginningTime'
    })
    expect(timeField).toHaveLength(1)
  })

  it('should display a TimeField to inform about end time hour', () => {
    // when
    const wrapper = shallow(<EventFields />)

    // then
    const timeField = wrapper.find(TimeField).findWhere(timeFieldComponent => {
      return timeFieldComponent.props().name === 'endTime'
    })
    expect(timeField).toHaveLength(1)
  })
})