//@flow
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import DiagramContainer from './DiagramContainer'
import type { State } from '../reducers'
import { addBlock } from '../actions/blockActions'

const mockStore = configureStore()

const setup = () => {
  const state: State = { blocks: [{ name: 'Block', x: 0, y: 0 }] }
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
