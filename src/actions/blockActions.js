//@flow
import {
  ADD_BLOCK,
  UPDATE_BLOCK_TITLE,
  UPDATE_BLOCK_SIZE,
} from '../constants/actionTypes'

type AddBlockAction = { type: typeof ADD_BLOCK }

type UpdateBlockAction = {
  type: typeof UPDATE_BLOCK_TITLE,
  id: string,
  title: string,
}

type UpdateBlockSizeAction = {
  type: typeof UPDATE_BLOCK_SIZE,
  id: string,
  width: number,
  height: number,
}

export type BlockAction =
  | AddBlockAction
  | UpdateBlockAction
  | UpdateBlockSizeAction

export const addBlock = (): AddBlockAction => ({ type: ADD_BLOCK })

export const updateBlockTitle = (id: string, title: string) => ({
  type: UPDATE_BLOCK_TITLE,
  id,
  title,
})

export const updateBlockSize = (
  id: string,
  width: number,
  height: number,
): UpdateBlockSizeAction => ({ type: UPDATE_BLOCK_SIZE, id, width, height })
