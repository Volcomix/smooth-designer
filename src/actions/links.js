//@flow
import { START_LINKING, END_LINKING } from '../constants/actionTypes'

type StartLinkingAction = {
  type: typeof START_LINKING,
  fromId: string,
}

type EndLinkingAction = {
  type: typeof END_LINKING,
  toId: string,
}

export type LinksAction = StartLinkingAction | EndLinkingAction

export const startLinking = (fromId: string): StartLinkingAction => ({
  type: START_LINKING,
  fromId,
})

export const endLinking = (toId: string): EndLinkingAction => ({
  type: END_LINKING,
  toId,
})
