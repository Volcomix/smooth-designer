//@flow
import type { Block } from '../reducers/blocks'
import { ADD_BLOCK } from '../constants/actionTypes'

type AddBlockAction = { type: typeof ADD_BLOCK, block: Block }

export type BlockAction = AddBlockAction

export const addBlock = (block: Block): AddBlockAction => ({
  type: ADD_BLOCK,
  block,
})
