//@flow
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import DiagramContainer from './DiagramContainer'
import type { State } from '../reducers'
import {
  addBlock,
  deleteBlock,
  updateBlockSize,
  updateBlockName,
} from '../actions/blocks'
import {
  startLinking,
  updateLinking,
  endLinking,
  cancelLinking,
  deleteLink,
} from '../actions/links'

const mockStore = configureStore()

const setup = () => {
  const state: State = {
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
      '1': { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
    },
    links: {
      links: { '0': { id: '0', fromId: '0', toId: '1' } },
      linking: { fromId: '0', toMouse: { x: 0, y: 0 } },
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

it('deletes a block', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('blockDelete', '0')
  expect(store.getActions()).toEqual([deleteBlock('0')])
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

it('starts linking', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('linkStart', '0', 10, 20)
  expect(store.getActions()).toEqual([startLinking('0', 10, 20)])
})

it('updates linking', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('linkMove', 10, 20)
  expect(store.getActions()).toEqual([updateLinking(10, 20)])
})

it('ends linking', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('linkEnd', '1')
  expect(store.getActions()).toEqual([endLinking('1')])
})

it('cancels linking', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('linkCancel')
  expect(store.getActions()).toEqual([cancelLinking()])
})

it('deletes a link', () => {
  const { wrapper, store } = setup()
  wrapper.find('Diagram').simulate('linkDelete', '0')
  expect(store.getActions()).toEqual([deleteLink('0')])
})
