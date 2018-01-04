//@flow
import React from 'react'
import { shallow } from 'enzyme'
import LinkDetail from './LinkDetail'

const setup = props => {
  const wrapper = shallow(<LinkDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup({
    fromBlock: { id: '0', name: 'Block 1', x: 10, y: 30, width: 0, height: 0 },
    toBlock: { id: '1', name: 'Block 2', x: 20, y: 40, width: 0, height: 0 },
  })
  expect(wrapper).toMatchSnapshot()
})

it('renders without crashing when inverted', () => {
  const { wrapper } = setup({
    fromBlock: { id: '0', name: 'Block 1', x: 20, y: 40, width: 0, height: 0 },
    toBlock: { id: '1', name: 'Block 2', x: 10, y: 30, width: 0, height: 0 },
  })
  expect(wrapper).toMatchSnapshot()
})
