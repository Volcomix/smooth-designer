//@flow
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import DiagramContainer from './DiagramContainer'
import type { State } from '../reducers'
import { addBlock, updateBlockSize } from '../actions/blockActions'

const mockStore = configureStore()

const setup = () => {
  const state: State = {
    blocks: {
      '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    },
  }
  const store = mockStore(state)
  const wrapper = shallow(<DiagramContainer store={store} />)
  return { wrapper, store }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('adds a block when the Add button is clicked', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('addClick')
  expect(store.getActions()).toEqual([addBlock()])
})

it('updates block size', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('sizeChange', '0', 10, 20)
  expect(store.getActions()).toEqual([updateBlockSize('0', 10, 20)])
})
