//@flow
import type { BlockAction } from './blockActions'
import type { ForceAction } from './forceActions'
import type { DiagramAction } from './diagramActions'

export type Action = BlockAction | ForceAction | DiagramAction
