//@flow
import {
  addBlock,
  updateBlockTitle,
  updateBlockSize,
} from '../actions/blockActions'
import {
  ADD_BLOCK,
  UPDATE_BLOCK_TITLE,
  UPDATE_BLOCK_SIZE,
} from '../constants/actionTypes'

it('creates an action to add a block', () => {
  expect(addBlock()).toEqual({ type: ADD_BLOCK })
})

it('creates an action to update a block title', () => {
  expect(updateBlockTitle('0', 'Block')).toEqual({
    type: UPDATE_BLOCK_TITLE,
    id: '0',
    title: 'Block',
  })
})

it('creates an action to update a block size', () => {
  expect(updateBlockSize('0', 10, 20)).toEqual({
    type: UPDATE_BLOCK_SIZE,
    id: '0',
    width: 10,
    height: 20,
  })
})
