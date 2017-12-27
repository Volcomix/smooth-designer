//@flow
import { updateForce } from './forceActions'
import { UPDATE_FORCE } from '../constants/actionTypes'

it('creates an action to update blocks positions', () => {
  const blocks = [{ name: 'Block' }]
  expect(updateForce(blocks)).toEqual({ type: UPDATE_FORCE, blocks })
})
