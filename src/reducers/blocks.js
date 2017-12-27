//@flow
import type { Block } from '../types'
import type { BlockAction } from '../actions/blockActions'
import { ADD_BLOCK } from '../constants/actionTypes'

export type BlockState = Block[]
const initialState: BlockState = []

const blocks = (
  state: BlockState = initialState,
  action: BlockAction,
): BlockState => {
  switch (action.type) {
    case ADD_BLOCK:
      return [...state, { name: '', x: 0, y: 0 }]
    default:
      return state
  }
}

export default blocks
