//@flow
import { combineReducers } from 'redux'
import blocks, { type BlockState } from './blocks'

export type State = {
  +blocks: BlockState,
}

const reducer = combineReducers({ blocks })

export default reducer
