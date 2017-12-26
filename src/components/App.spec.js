//@flow
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

const setup = () => {
  const wrapper = shallow(<App />)
  return { wrapper }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})
