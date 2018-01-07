//@flow
import {
  startLinking,
  updateLinking,
  endLinking,
  cancelLinking,
  deleteLink,
} from './links'
import {
  START_LINKING,
  UPDATE_LINKING,
  END_LINKING,
  CANCEL_LINKING,
  DELETE_LINK,
} from '../constants/actionTypes'

it('creates an action to start linking', () => {
  expect(startLinking('0', 10, 20)).toEqual({
    type: START_LINKING,
    fromId: '0',
    toMouse: { x: 10, y: 20 },
  })
})

it('creates an action to update linking', () => {
  expect(updateLinking(10, 20)).toEqual({
    type: UPDATE_LINKING,
    toMouse: { x: 10, y: 20 },
  })
})

it('creates an action to end linking', () => {
  expect(endLinking('0')).toEqual({ type: END_LINKING, toId: '0' })
})

it('creates an action to cancel linking', () => {
  expect(cancelLinking()).toEqual({ type: CANCEL_LINKING })
})

it('creates an action to delete a link', () => {
  expect(deleteLink('0')).toEqual({ type: DELETE_LINK, id: '0' })
})
