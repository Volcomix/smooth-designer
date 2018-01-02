//@flow
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import DiagramContainer from './DiagramContainer'
import type { State } from '../reducers'
import {
  addBlock,
  updateBlockSize,
  updateBlockName,
} from '../actions/blockActions'

const mockStore = configureStore()

const setup = () => {
  const state: State = {
    blocks: {
      '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    },
    links: { links: {} },
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

it('updates a block name', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('nameChange', '0', 'New name')
  expect(store.getActions()).toEqual([updateBlockName('0', 'New name')])
})

it('updates a block size', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('sizeChange', '0', 10, 20)
  expect(store.getActions()).toEqual([updateBlockSize('0', 10, 20)])
})
