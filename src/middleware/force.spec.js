//@flow
import force from './force'
import type { Action } from '../actions'
import { ADD_BLOCK } from '../constants/actionTypes'
import { addBlock } from '../actions/blockActions'

const mathMock: any = Math
mathMock.random = jest.fn(() => 0.3087575784346488)

const create = state => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next: any = jest.fn((action: Action) => {
    if (action.type === ADD_BLOCK) {
      state.blocks[999] = { id: '999', name: 'New block', x: 1, y: 0 }
    }
  })
  const invoke = action => force(store)(next)(action)
  return { store, next, invoke }
}

describe('without blocks', () => {
  const { store, invoke } = create({ blocks: {} })
  const { dispatch, getState } = store

  it('does not simulate force if not needed', () => {
    invoke({ type: 'DO_NOTHING' })
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('updates position when a block is added', () => {
    invoke(addBlock())
    expect(dispatch.mock.calls).toMatchSnapshot()
    expect(getState()).toEqual({
      blocks: { '999': { id: '999', name: 'New block', x: 1, y: 0 } },
    })
  })
})

describe('with blocks', () => {
  const { store, invoke } = create({
    blocks: { '0': { id: '0', name: 'Block', x: -1, y: 0 } },
  })
  const { dispatch, getState } = store

  it('updates positions when a block is added', () => {
    invoke(addBlock())
    expect(dispatch.mock.calls).toMatchSnapshot()
    expect(getState()).toEqual({
      blocks: {
        '0': { id: '0', name: 'Block', x: -1, y: 0 },
        '999': { id: '999', name: 'New block', x: 1, y: 0 },
      },
    })
  })
})
