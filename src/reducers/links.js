//@flow
import type { Link } from '../types'
import type { Action } from '../actions'
import { START_LINKING, END_LINKING } from '../constants/actionTypes'

export type LinksState = {
  +links: { [id: string]: Link },
  +linkingFromId?: string,
}

const initialState: LinksState = { links: {} }

const startLinking = (state, { fromId }) => ({
  ...state,
  linkingFromId: fromId,
})

const endLinking = ({ links, linkingFromId }, { toId }) => {
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
        fromId: linkingFromId,
        toId,
      },
    },
    linkingFromId: undefined,
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

export default links
