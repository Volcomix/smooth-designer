//@flow
import { combineReducers } from 'redux'
import blocks, { type BlocksState } from './blocks'
import links, { type LinksState } from './links'

export type State = {
  +blocks: BlocksState,
  +links: LinksState,
}

const reducer = combineReducers({ blocks, links })

export default reducer
