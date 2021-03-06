//@flow
import type { Link } from '../types'
import type { Action } from '../actions'
import {
  START_LINKING,
  UPDATE_LINKING,
  END_LINKING,
  CANCEL_LINKING,
  DELETE_LINK,
  DELETE_BLOCK,
} from '../constants/actionTypes'

export type LinksState = {
  +links: { [id: string]: Link },
  +linking?: {
    +fromId: string,
    +toMouse: {
      +x: number,
      +y: number,
    },
  },
}

const initialState: LinksState = { links: {} }

const startLinking = ({ links }, { fromId, toMouse }) => ({
  links,
  linking: { fromId, toMouse },
})

const updateLinking = ({ links, linking }, { toMouse }) => ({
  links,
  linking: { ...linking, toMouse },
})

const isSameLink = (link: Link, fromId, toId) =>
  (link.fromId === fromId && link.toId === toId) ||
  (link.fromId === toId && link.toId === fromId)

const endLinking = (state, { toId }) => {
  const { links, linking } = state
  if (!linking) {
    throw new Error('No linking defined.')
  }
  if (toId === linking.fromId) {
    return state
  }
  if (getLinks(state).some(link => isSameLink(link, linking.fromId, toId))) {
    return state
  }
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
        fromId: linking.fromId,
        toId,
      },
    },
    linking,
  }
}

const cancelLinking = ({ links }) => ({
  links,
})

const deleteLink = (state, { id }) => ({
  links: getLinks(state).reduce((nextState, link) => {
    if (link.id !== id) {
      nextState[link.id] = link
    }
    return nextState
  }, {}),
  linking: state.linking,
})

const deleteBlock = (state, { id }) => ({
  links: getLinks(state).reduce((nextState, link) => {
    if (link.fromId !== id && link.toId !== id) {
      nextState[link.id] = link
    }
    return nextState
  }, {}),
  linking: state.linking,
})

const links = (
  state: LinksState = initialState,
  action: Action,
): LinksState => {
  switch (action.type) {
    case START_LINKING:
      return startLinking(state, action)
    case UPDATE_LINKING:
      return updateLinking(state, action)
    case END_LINKING:
      return endLinking(state, action)
    case CANCEL_LINKING:
      return cancelLinking(state)
    case DELETE_LINK:
      return deleteLink(state, action)
    case DELETE_BLOCK:
      return deleteBlock(state, action)
    default:
      return state
  }
}

export const getLinks = ({ links }: LinksState): Link[] =>
  (Object.values(links): any)

export default links
