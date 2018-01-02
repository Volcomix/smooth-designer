//@flow
import { UPDATE_FORCE } from '../constants/actionTypes'
import type { Block } from '../types'

type UpdateForceAction = { type: typeof UPDATE_FORCE, blocks: Block[] }

export type ForceAction = UpdateForceAction

export const updateForce = (blocks: Block[]): UpdateForceAction => ({
  type: UPDATE_FORCE,
  blocks,
})
