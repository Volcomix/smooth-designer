//@flow
import type { Action } from '../actions'
import type { State } from '../reducers'
import { UPDATE_BLOCK_SIZE, END_LINKING } from '../constants/actionTypes'
import force, { radius } from './force'
import { updateBlockSize } from '../actions/blocks'
import { endLinking } from '../actions/links'
import { updateForce } from '../actions/force'

jest.useFakeTimers()
const mathMock: any = Math
mathMock.random = jest.fn(() => 0.3087575784346488)

const create = (state: State) => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next: any = jest.fn((action: Action) => {
    switch (action.type) {
      case UPDATE_BLOCK_SIZE:
        ;(state.blocks: any)[action.id].width = action.width
        ;(state.blocks: any)[action.id].height = action.height
        break
      case END_LINKING:
        if (state.links.linking) {
          state.links.links['999'] = {
            id: '999',
            fromId: state.links.linking.fromId,
            toId: action.toId,
          }
          ;(state.links: any).linking = undefined
        }
        break
      default:
        break
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
  jest.runAllTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toEqual({
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
    },
    links: { links: {} },
  })
})

it('updates positions when a link is added', () => {
  const { store, invoke } = create({
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
      '10': { id: '10', name: 'Block 3', x: 0, y: 0, width: 50, height: 60 },
    },
    links: {
      links: {
        '0': { id: '0', fromId: '0', toId: '5' },
      },
      linking: { fromId: '5', toMouse: { x: 0, y: 0 } },
    },
  })
  const { dispatch, getState } = store
  invoke(endLinking('10'))
  jest.runAllTimers()
  expect(dispatch.mock.calls).toMatchSnapshot()
  expect(getState()).toEqual({
    blocks: {
      '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
      '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
      '10': { id: '10', name: 'Block 3', x: 0, y: 0, width: 50, height: 60 },
    },
    links: {
      links: {
        '0': { id: '0', fromId: '0', toId: '5' },
        '999': { id: '999', fromId: '5', toId: '10' },
      },
    },
  })
})

it('waits for rendering before dispatching the force update', () => {
  const { store, invoke } = create({
    blocks: {
      '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    },
    links: { links: {} },
  })
  const { dispatch } = store
  invoke(updateBlockSize('0', 0, 0))
  expect(dispatch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(dispatch).toHaveBeenCalledWith(
    updateForce([
      {
        id: '0',
        name: 'Block',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        index: 0,
        vx: 0,
        vy: 0,
      },
    ]),
  )
})
