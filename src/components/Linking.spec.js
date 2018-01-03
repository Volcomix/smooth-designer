//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Linking from './Linking'

it('renders without crashing', () => {
  const props = {
    fromBlock: { id: '0', name: 'Block', x: 10, y: 20, width: 0, height: 0 },
    toMouse: { x: 30, y: 40 },
  }
  const wrapper = shallow(<Linking {...props} />)
  expect(wrapper).toMatchSnapshot()
})
