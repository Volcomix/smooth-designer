//@flow
import { combineReducers } from 'redux'
import blocks, { type BlocksState } from './blocks'
import links, { type LinksState } from './links'
import type { Block } from '../types'

export type State = {
  +blocks: BlocksState,
  +links: LinksState,
}

const reducer = combineReducers({ blocks, links })

export const linkingFromBlock = ({ blocks, links }: State): ?Block => {
  if (links.linkingFromId !== undefined) {
    return blocks[links.linkingFromId]
  }
}

export default reducer
