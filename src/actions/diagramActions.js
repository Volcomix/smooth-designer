//@flow
import { START_LINKING, END_LINKING } from '../constants/actionTypes'

type StartLinkingAction = {
  type: typeof START_LINKING,
  fromBlock: string,
}

type EndLinkingAction = {
  type: typeof END_LINKING,
  toBlock: string,
}

export type DiagramAction = StartLinkingAction | EndLinkingAction

export const startLinking = (fromBlock: string): StartLinkingAction => ({
  type: START_LINKING,
  fromBlock,
})

export const endLinking = (toBlock: string): EndLinkingAction => ({
  type: END_LINKING,
  toBlock,
})
