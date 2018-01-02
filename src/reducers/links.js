//@flow
import type { Link } from '../types'
import type { Action } from '../actions'
import { START_LINKING, END_LINKING } from '../constants/actionTypes'

export type LinksState = {
  +links: { [id: string]: Link },
  +linkingFromBlock?: string,
}

const initialState: LinksState = { links: {} }

const startLinking = (state, { fromBlock }) => ({
  ...state,
  linkingFromBlock: fromBlock,
})

const endLinking = ({ links, linkingFromBlock }, { toBlock }) => {
  const ids: number[] = Object.keys(links).map(id => parseInt(id, 10))
  let id = 0
  if (ids.length > 0) {
    id = Math.max(...ids) + 1
  }
  return {
    links: {
      ...links,
      [id]: {
        id: `${id}`,
        fromBlock: linkingFromBlock,
        toBlock: toBlock,
      },
    },
    linkingFromBlock: undefined,
  }
}

const links = (
  state: LinksState = initialState,
  action: Action,
): LinksState => {
  switch (action.type) {
    case START_LINKING:
      return startLinking(state, action)
    case END_LINKING:
      return endLinking(state, action)
    default:
      return state
  }
}

export const isLinking = (state: LinksState): boolean =>
  state.linkingFromBlock !== undefined

export default links
