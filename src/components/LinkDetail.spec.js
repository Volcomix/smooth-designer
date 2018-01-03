//@flow
import React from 'react'
import { shallow } from 'enzyme'
import LinkDetail from './LinkDetail'

const setup = () => {
  const props = {
    fromBlock: { id: '0', name: 'Block 1', x: 10, y: 30, width: 0, height: 0 },
    toBlock: { id: '1', name: 'Block 2', x: 20, y: 40, width: 0, height: 0 },
  }
  const wrapper = shallow(<LinkDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})
