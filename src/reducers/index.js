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

export const getLinking = ({
  blocks,
  links,
}: State): ?{
  +fromId: string,
  +fromBlock: Block,
  +toMouse: { +x: number, +y: number },
} =>
  links.linking && { ...links.linking, fromBlock: blocks[links.linking.fromId] }

export default reducer
