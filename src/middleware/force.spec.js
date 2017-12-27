//@flow
import type { Action } from '../actions'
import { ADD_BLOCK } from '../constants/actionTypes'
import { addBlock } from '../actions/blockActions'

jest.useFakeTimers()
;(Math: any).random = jest.fn(() => 0.3087575784346488)
const force = require('./force').default

const create = state => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next: any = jest.fn((action: Action) => {
    if (action.type === ADD_BLOCK) {
      state.blocks.push({ name: 'New block', x: 1, y: 0 })
    }
  })
  const invoke = action => force(store)(next)(action)
  return { store, next, invoke }
}

describe('without blocks', () => {
  const { store, invoke } = create({ blocks: [] })
  const { dispatch, getState } = store

  it('does not simulate force if not needed', () => {
    invoke({ type: 'DO_NOTHING' })
    jest.runOnlyPendingTimers()
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('updates position when a block is added', () => {
    invoke(addBlock())
    jest.runOnlyPendingTimers()
    expect(dispatch.mock.calls).toMatchSnapshot()
    expect(getState()).toEqual({ blocks: [{ name: 'New block', x: 1, y: 0 }] })
  })
})

describe('with blocks', () => {
  const { store, invoke } = create({ blocks: [{ name: 'Block', x: -1, y: 0 }] })
  const { dispatch, getState } = store

  it('updates positions when a block is added', () => {
    invoke(addBlock())
    jest.runOnlyPendingTimers()
    expect(dispatch.mock.calls).toMatchSnapshot()
    expect(getState()).toEqual({
      blocks: [
        { name: 'Block', x: -1, y: 0 },
        { name: 'New block', x: 1, y: 0 },
      ],
    })
  })
})
