//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Link from './Link'

it('renders without crashing', () => {
  const props = { fromX: 10, fromY: 20, toX: 30, toY: 40 }
  const wrapper = shallow(<Link {...props} />)
  expect(wrapper).toMatchSnapshot()
})
