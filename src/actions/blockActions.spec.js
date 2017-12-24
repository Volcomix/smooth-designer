import { ADD_BLOCK } from '../constants/actionTypes'
import { addBlock } from '../actions/blockActions'

it('creates an action to add a block', () => {
  expect(addBlock()).toEqual({ type: ADD_BLOCK })
})
