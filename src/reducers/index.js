//@flow
import { combineReducers } from 'redux'
import blocks, { type BlocksState } from './blocks'
import links, { type LinksState, getLinks } from './links'
import type { Block } from '../types'

export type State = {
  +blocks: BlocksState,
  +links: LinksState,
}

const reducer = combineReducers({ blocks, links })

export const getLinkedBlocks = ({
  blocks,
  links,
}: State): { id: string, fromBlock: Block, toBlock: Block }[] =>
  getLinks(links).map(({ id, fromId, toId }) => ({
    id,
    fromBlock: blocks[fromId],
    toBlock: blocks[toId],
  }))

export const getLinking = ({
  blocks,
  links,
}: State): ?{
  +fromBlock: Block,
  +toMouse: { +x: number, +y: number },
} =>
  links.linking && {
    fromBlock: blocks[links.linking.fromId],
    toMouse: links.linking.toMouse,
  }

export default reducer
