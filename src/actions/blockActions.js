//@flow
import { ADD_BLOCK } from '../constants/actionTypes'

type AddBlockAction = { type: typeof ADD_BLOCK }

export type BlockAction = AddBlockAction

export const addBlock = (): AddBlockAction => ({ type: ADD_BLOCK })
