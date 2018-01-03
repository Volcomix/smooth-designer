//@flow
import { combineReducers } from 'redux'
import blocks, { type BlocksState } from './blocks'
import links, { type LinksState } from './links'
import type { Block, Link } from '../types'

export type State = {
  +blocks: BlocksState,
  +links: LinksState,
}

const reducer = combineReducers({ blocks, links })

export const getLinks = ({
  blocks,
  links,
}: State): { id: string, fromBlock: Block, toBlock: Block }[] =>
  ((Object.values(links.links): any): Link[]).map(({ id, fromId, toId }) => ({
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
