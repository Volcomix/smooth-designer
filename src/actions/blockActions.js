//@flow
import { ADD_BLOCK, UPDATE_BLOCK_SIZE } from '../constants/actionTypes'

type AddBlockAction = { type: typeof ADD_BLOCK }

type UpdateBlockSizeAction = {
  type: typeof UPDATE_BLOCK_SIZE,
  id: string,
  width: number,
  height: number,
}

export type BlockAction = AddBlockAction | UpdateBlockSizeAction

export const addBlock = (): AddBlockAction => ({ type: ADD_BLOCK })

export const updateBlockSize = (
  id: string,
  width: number,
  height: number,
): UpdateBlockSizeAction => ({ type: UPDATE_BLOCK_SIZE, id, width, height })
