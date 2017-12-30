//@flow
import {
  ADD_BLOCK,
  UPDATE_BLOCK_NAME,
  UPDATE_BLOCK_SIZE,
} from '../constants/actionTypes'

type AddBlockAction = { type: typeof ADD_BLOCK }

type UpdateBlockNameAction = {
  type: typeof UPDATE_BLOCK_NAME,
  id: string,
  name: string,
}

type UpdateBlockSizeAction = {
  type: typeof UPDATE_BLOCK_SIZE,
  id: string,
  width: number,
  height: number,
}

export type BlockAction =
  | AddBlockAction
  | UpdateBlockNameAction
  | UpdateBlockSizeAction

export const addBlock = (): AddBlockAction => ({ type: ADD_BLOCK })

export const updateBlockName = (
  id: string,
  name: string,
): UpdateBlockNameAction => ({ type: UPDATE_BLOCK_NAME, id, name })

export const updateBlockSize = (
  id: string,
  width: number,
  height: number,
): UpdateBlockSizeAction => ({ type: UPDATE_BLOCK_SIZE, id, width, height })
