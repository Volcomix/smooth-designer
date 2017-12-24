//@flow
import { combineReducers } from 'redux'
import type { BlockState } from './blocks'
import blocks from './blocks'

export type State = {
  +blocks: BlockState,
}

const reducer = combineReducers({ blocks })

export default reducer
