//@flow
import { updateForce } from './forceActions'
import { UPDATE_FORCE } from '../constants/actionTypes'

it('creates an action to update blocks positions', () => {
  const blocks = [{ id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 }]
  expect(updateForce(blocks)).toEqual({ type: UPDATE_FORCE, blocks })
})
