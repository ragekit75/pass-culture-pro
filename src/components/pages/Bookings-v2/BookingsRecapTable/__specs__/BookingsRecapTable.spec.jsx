import BookingsRecapTable from '../BookingsRecapTable'
import React from 'react'
import { mount, shallow } from 'enzyme'

describe('components | pages | Bookings-v2 | BookingsRecapTable', function() {
  it('should call the Table component with columns and data props', function() {
    // Given
    const data = [
      {
        stock: {
          offer_name: 'Avez-vous déjà vu',
        },
        beneficiary: {
          lastname: 'Klepi',
          firstname: 'Sonia',
          email: 'sonia.klepi@example.com',
        },
        booking_date: '2020-04-03T12:00:00Z',
        booking_token: 'ZEHBGD',
        booking_status: 'Validé',
      },
      {
        stock: {
          offer_name: 'Avez-vous déjà vu',
        },
        beneficiary: {
          lastname: 'Klepi',
          firstname: 'Sonia',
          email: 'sonia.klepi@example.com',
        },
        booking_date: '2020-04-03T12:00:00Z',
        booking_token: 'ZEHBGD',
        booking_status: 'Validé',
      },
    ]

    const props = {
      bookingsRecap: data,
    }

    // When
    const wrapper = shallow(<BookingsRecapTable {...props} />)
    const table = wrapper.find('Table')

    // Then
    expect(table).toHaveLength(1)
    const tableProps = table.props()
    expect(tableProps['columns']).toHaveLength(5)
    expect(tableProps['data']).toHaveLength(2)
  })

  it('should render the expected table headers', function() {
    // Given
    const data = []

    const props = {
      bookingsRecap: data,
    }

    // When
    const wrapper = mount(<BookingsRecapTable {...props} />)
    const firstHeader = wrapper.find('th').at(0)
    const secondHeader = wrapper.find('th').at(1)
    const thirdHeader = wrapper.find('th').at(2)
    const fourthHeader = wrapper.find('th').at(3)
    const fifthHeader = wrapper.find('th').at(4)

    // Then
    expect(wrapper.find('th')).toHaveLength(5)
    expect(firstHeader.text()).toBe("Nom de l'offre")
    expect(secondHeader.text()).toBe('Bénéficiaire')
    expect(thirdHeader.text()).toBe('Réservation')
    expect(fourthHeader.text()).toBe('Contremarque')
    expect(fifthHeader.text()).toBe('Statut')
  })

  it('should render the expected table rows', function() {
    // Given
    const data = [
      {
        stock: {
          offer_name: 'Avez-vous déjà vu',
        },
        beneficiary: {
          lastname: 'Klepi',
          firstname: 'Sonia',
          email: 'sonia.klepi@example.com',
        },
        booking_date: '2020-04-03T12:00:00Z',
        booking_token: 'ZEHBGD',
        booking_status: 'Validé',
      },
    ]

    const props = {
      bookingsRecap: data,
    }

    // When
    const wrapper = mount(<BookingsRecapTable {...props} />)
    const firstRow = wrapper.find('tr').at(1)
    const firstRowStock = firstRow.find('td').at(0)
    const firstRowBeneficiary = firstRow.find('td').at(1)
    const firstRowBookingDate = firstRow.find('td').at(2)
    const firstRowToken = firstRow.find('td').at(3)
    const firstRowStatus = firstRow.find('td').at(4)

    // Then
    expect(firstRowStock.text()).toBe('Avez-vous déjà vu')
    expect(firstRowBeneficiary.text()).toBe('Sonia Klepisonia.klepi@example.com')
    expect(firstRowBookingDate.text()).toBe('03/04/202012:00')
    expect(firstRowToken.text()).toBe('ZEHBGD')
    expect(firstRowStatus.text()).toBe('validé')
  })
})