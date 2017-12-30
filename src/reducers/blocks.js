//@flow
import type { Block } from '../types'
import type { Action } from '../actions'
import {
  ADD_BLOCK,
  UPDATE_BLOCK_SIZE,
  UPDATE_FORCE,
} from '../constants/actionTypes'

export type BlockState = { [id: string]: Block }
const initialState: BlockState = {}

const addBlock = (state, action) => {
  const ids: number[] = Object.keys(state).map(id => parseInt(id, 10))
  let id = 0
  if (ids.length > 0) {
    id = Math.max(...ids) + 1
  }
  return {
    ...state,
    [id]: { id: `${id}`, name: '', x: 0, y: 0, width: 0, height: 0 },
  }
}

const updateBlockSize = (state, { id, width, height }) => ({
  ...state,
  [id]: { ...state[id], width, height },
})

const updateBlocksPositions = (state, action) =>
  action.blocks.reduce((nextState, { id, x, y }) => {
    nextState[id] = { ...state[id], x, y }
    return nextState
  }, {})

const blocks = (
  state: BlockState = initialState,
  action: Action,
): BlockState => {
  switch (action.type) {
    case ADD_BLOCK:
      return addBlock(state, action)
    case UPDATE_BLOCK_SIZE:
      return updateBlockSize(state, action)
    case UPDATE_FORCE:
      return updateBlocksPositions(state, action)
    default:
      return state
  }
}

export const getBlocks = (state: BlockState): Block[] =>
  (Object.values(state): any)

export const cloneBlocks = (state: BlockState): Block[] =>
  getBlocks(state).map(block => ({ ...block }))

export default blocks
