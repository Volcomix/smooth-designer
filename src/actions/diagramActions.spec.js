//@flow
import { startLinking, endLinking } from './diagramActions'
import { START_LINKING, END_LINKING } from '../constants/actionTypes'

it('creates an action to start linking', () => {
  expect(startLinking('0')).toEqual({ type: START_LINKING, fromBlock: '0' })
})
it('creates an action to end linking', () => {
  expect(endLinking('0')).toEqual({ type: END_LINKING, toBlock: '0' })
})
