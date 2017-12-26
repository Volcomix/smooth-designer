//@flow
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import DiagramContainer, {
  mapStateToProps,
  mapDispatchToProps,
} from './DiagramContainer'
import { addBlock } from '../actions/blockActions'

const mockStore = configureStore()

const setup = () => {
  const store = mockStore({ blocks: 'Blocks' })
  const wrapper = shallow(<DiagramContainer store={store} />)
  return { wrapper, store }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('maps state to Diagram props', () => {
  expect(
    mapStateToProps({ blocks: [{ name: 'Block' }], other: 'Not used' }),
  ).toEqual({ blocks: [{ name: 'Block' }] })
})

it('maps actions to Diagram props', () => {
  const dispatch = jest.fn()
  const props = mapDispatchToProps(dispatch)
  props.onAddClick()
  expect(dispatch).toHaveBeenCalledWith(addBlock())
})
