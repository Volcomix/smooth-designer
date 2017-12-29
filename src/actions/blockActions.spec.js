//@flow
import { addBlock, updateBlockSize } from '../actions/blockActions'
import { ADD_BLOCK, UPDATE_BLOCK_SIZE } from '../constants/actionTypes'

it('creates an action to add a block', () => {
  expect(addBlock()).toEqual({ type: ADD_BLOCK })
})

it('creates an action to update block size', () => {
  expect(updateBlockSize('0', 10, 20)).toEqual({
    type: UPDATE_BLOCK_SIZE,
    id: '0',
    width: 10,
    height: 20,
  })
})
