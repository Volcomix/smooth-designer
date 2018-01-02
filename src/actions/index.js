//@flow
import type { BlocksAction } from './blocks'
import type { ForceAction } from './force'
import type { LinksAction } from './links'

export type Action = BlocksAction | ForceAction | LinksAction
