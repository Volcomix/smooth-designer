//@flow
import type { BlockAction } from '../actions/blockActions'
import { ADD_BLOCK } from '../constants/actionTypes'

type Block = {
  +name: string,
}

export type BlockState = Block[]

const initialState: BlockState = []

const blocks = (
  state: BlockState = initialState,
  action: BlockAction,
): BlockState => {
  switch (action.type) {
    case ADD_BLOCK:
      return [...state, { name: '' }]
    default:
      return state
  }
}

export default blocks
