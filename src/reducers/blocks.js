//@flow
import type { Block } from '../types'
import type { Action } from '../actions'
import { ADD_BLOCK, UPDATE_FORCE } from '../constants/actionTypes'

export type BlockState = Block[]
const initialState: BlockState = []

const addTodo = (state, action) => [...state, { name: '', x: 0, y: 0 }]

const updateBlocksPositions = (state, action) =>
  state.map((block, index) => {
    const position = action.blocks[index]
    return { ...block, x: position.x, y: position.y }
  })

const blocks = (
  state: BlockState = initialState,
  action: Action,
): BlockState => {
  switch (action.type) {
    case ADD_BLOCK:
      return addTodo(state, action)
    case UPDATE_FORCE:
      return updateBlocksPositions(state, action)
    default:
      return state
  }
}

export default blocks
