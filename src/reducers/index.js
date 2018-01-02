//@flow
import { combineReducers } from 'redux'
import blocks, { type BlocksState } from './blocks'
import diagram, { type DiagramState } from './diagram'

export type State = {
  +blocks: BlocksState,
  +diagram: DiagramState,
}

const reducer = combineReducers({ blocks, diagram })

export default reducer
