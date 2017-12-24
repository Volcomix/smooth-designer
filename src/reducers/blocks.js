//@flow
import type { BlockAction } from '../actions/blockActions'
import { ADD_BLOCK } from '../constants/actionTypes'

export type Block = {
  +name: string,
}

type BlockState = Block[]

const initialState: BlockState = []

const blocks = (
  state: BlockState = initialState,
  action: BlockAction,
): BlockState => {
  switch (action.type) {
    case ADD_BLOCK:
      return [...state, action.block]
    default:
      return state
  }
}

export default blocks
