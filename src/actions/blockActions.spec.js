//@flow
import { addBlock } from '../actions/blockActions'
import { ADD_BLOCK } from '../constants/actionTypes'

it('creates an action to add a block', () => {
  expect(addBlock()).toEqual({ type: ADD_BLOCK })
})
