//@flow
import {
  START_LINKING,
  UPDATE_LINKING,
  END_LINKING,
  CANCEL_LINKING,
} from '../constants/actionTypes'

type StartLinkingAction = {
  type: typeof START_LINKING,
  fromId: string,
  toMouse: { x: number, y: number },
}

type UpdateLinkingAction = {
  type: typeof UPDATE_LINKING,
  toMouse: { x: number, y: number },
}

type EndLinkingAction = {
  type: typeof END_LINKING,
  toId: string,
}

type CancelLinkingAction = {
  type: typeof CANCEL_LINKING,
}

export type LinksAction =
  | StartLinkingAction
  | UpdateLinkingAction
  | EndLinkingAction
  | CancelLinkingAction

export const startLinking = (
  fromId: string,
  toMouseX: number,
  toMouseY: number,
): StartLinkingAction => ({
  type: START_LINKING,
  fromId,
  toMouse: { x: toMouseX, y: toMouseY },
})

export const updateLinking = (
  toMouseX: number,
  toMouseY: number,
): UpdateLinkingAction => ({
  type: UPDATE_LINKING,
  toMouse: { x: toMouseX, y: toMouseY },
})

export const endLinking = (toId: string): EndLinkingAction => ({
  type: END_LINKING,
  toId,
})

export const cancelLinking = (): CancelLinkingAction => ({
  type: CANCEL_LINKING,
})
