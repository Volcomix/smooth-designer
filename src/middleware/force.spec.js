//@flow
import { ADD_BLOCK } from '../constants/actionTypes'
import type { Action } from '../actions'
import { addBlock } from '../actions/blockActions'

jest.useFakeTimers()
const force = require('./force').default

const create = () => {
  let state = { blocks: [] }
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next: any = jest.fn((action: Action) => {
    if (action.type === ADD_BLOCK) {
      state.blocks.push({ name: '' })
    }
  })
  const invoke = action => force(store)(next)(action)
  return { store, next, invoke }
}

it('does not update blocks positions if not needed', () => {
  const { store, invoke } = create()
  invoke({ type: 'DO_NOTHING' })
  jest.runOnlyPendingTimers()
  expect(store.dispatch).not.toHaveBeenCalled()
})

it('updates blocks positions after a block has been added', () => {
  const { store, invoke } = create()
  const { dispatch, getState } = store
  invoke(addBlock())
  jest.runOnlyPendingTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toEqual({ blocks: [{ name: '' }] })
  dispatch.mockClear()
  invoke(addBlock())
  jest.runOnlyPendingTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toEqual({ blocks: [{ name: '' }, { name: '' }] })
})
