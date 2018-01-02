//@flow
import type { Block } from '../types'
import type { Action } from '../actions'
import {
  ADD_BLOCK,
  UPDATE_BLOCK_NAME,
  UPDATE_BLOCK_SIZE,
  UPDATE_FORCE,
} from '../constants/actionTypes'

export type BlocksState = { [id: string]: Block }

const initialState: BlocksState = {}

const addBlock = state => {
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

const updateBlockName = (state, { id, name }) => ({
  ...state,
  [id]: { ...state[id], name },
})

const updateBlockSize = (state, { id, width, height }) => ({
  ...state,
  [id]: { ...state[id], width, height },
})

const updateBlocksPositions = (state, { blocks }) =>
  blocks.reduce((nextState, { id, x, y }) => {
    nextState[id] = { ...state[id], x, y }
    return nextState
  }, {})

const blocks = (
  state: BlocksState = initialState,
  action: Action,
): BlocksState => {
  switch (action.type) {
    case ADD_BLOCK:
      return addBlock(state)
    case UPDATE_BLOCK_NAME:
      return updateBlockName(state, action)
    case UPDATE_BLOCK_SIZE:
      return updateBlockSize(state, action)
    case UPDATE_FORCE:
      return updateBlocksPositions(state, action)
    default:
      return state
  }
}

export const getBlocks = (state: BlocksState): Block[] =>
  (Object.values(state): any)

export const cloneBlocks = (state: BlocksState): Block[] =>
  getBlocks(state).map(block => ({ ...block }))

export default blocks
