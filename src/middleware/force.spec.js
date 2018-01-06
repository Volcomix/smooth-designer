//@flow
import force, { radius } from './force'
import { deleteBlock, updateBlockSize } from '../actions/blocks'
import { endLinking } from '../actions/links'

jest.useFakeTimers()
const mathMock: any = Math
mathMock.random = jest.fn(() => 0.3087575784346488)

const create = () => {
  const state = {
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
    },
    links: { links: { '0': { id: '0', fromId: '0', toId: '5' } } },
  }
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next = jest.fn()
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
  const { store, next, invoke } = create()
  const action = { type: 'DO_NOTHING' }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
  jest.runAllTimers()
  expect(store.dispatch).not.toHaveBeenCalled()
})

it('updates positions when a block is deleted', () => {
  const { store, next, invoke } = create()
  const { dispatch, getState } = store
  const action = deleteBlock('5')
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
  expect(dispatch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toMatchObject({
    blocks: { '0': { x: 0, y: 0 }, '5': { x: 0, y: 0 } },
  })
})

it('updates positions when a block is sized', () => {
  const { store, next, invoke } = create()
  const { dispatch, getState } = store
  const action = updateBlockSize('5', 50, 60)
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
  expect(dispatch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toMatchObject({
    blocks: { '0': { x: 0, y: 0 }, '5': { x: 0, y: 0 } },
  })
})

it('updates positions when a link is added', () => {
  const { store, next, invoke } = create()
  const { dispatch, getState } = store
  const action = endLinking('5')
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
  expect(dispatch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toMatchObject({
    blocks: { '0': { x: 0, y: 0 }, '5': { x: 0, y: 0 } },
  })
})
