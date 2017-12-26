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
  const store = mockStore()
  const wrapper = shallow(<DiagramContainer store={store} />)
  return { wrapper, store }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('maps state to Diagram props', () => {
  expect(mapStateToProps({ blocks: 'Blocks', other: 'Not used' })).toEqual({
    blocks: 'Blocks',
  })
})

it('maps actions to Diagram props', () => {
  const dispatch = jest.fn()
  const props = mapDispatchToProps(dispatch)
  props.onAddClick()
  expect(dispatch).toHaveBeenCalledWith(addBlock())
})
