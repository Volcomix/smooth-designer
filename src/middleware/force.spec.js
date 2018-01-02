//@flow
import force, { radius } from './force'
import type { Action } from '../actions'
import { UPDATE_BLOCK_SIZE } from '../constants/actionTypes'
import { updateBlockSize } from '../actions/blockActions'

const mathMock: any = Math
mathMock.random = jest.fn(() => 0.3087575784346488)

const create = state => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next: any = jest.fn((action: Action) => {
    if (action.type === UPDATE_BLOCK_SIZE) {
      state.blocks[action.id].width = action.width
      state.blocks[action.id].height = action.height
    }
  })
  const invoke = action => force(store)(next)(action)
  return { store, next, invoke }
}

it('computes a block radius', () => {
  expect(
    radius({
      id: '0',
      name: 'Block',
      x: 0,
      y: 0,
      width: 10 * Math.cos(Math.PI / 3),
      height: 10 * Math.sin(Math.PI / 3),
    }),
  ).toEqual(5)
})

it('does not simulate force if not needed', () => {
  const { store, invoke } = create({ blocks: {}, links: { links: {} } })
  invoke({ type: 'DO_NOTHING' })
  expect(store.dispatch).not.toHaveBeenCalled()
})

it('updates positions when a block is sized', () => {
  const { store, invoke } = create({
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
    },
    links: { links: {} },
  })
  const { dispatch, getState } = store
  invoke(updateBlockSize('5', 30, 40))
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toEqual({
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
    },
    links: { links: {} },
  })
})
