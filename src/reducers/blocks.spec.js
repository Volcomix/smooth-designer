//@flow
import blocks from './blocks'
import { addBlock } from '../actions/blockActions'
import { updateForce } from '../actions/forceActions'

it('returns the initial state', () => {
  expect(blocks(undefined, { type: '@@INIT' })).toEqual([])
})

it('adds blocks', () => {
  expect(blocks([], addBlock())).toEqual([{ name: '', x: 0, y: 0 }])
  expect(blocks([{ name: 'Block', x: 0, y: 0 }], addBlock())).toEqual([
    { name: 'Block', x: 0, y: 0 },
    { name: '', x: 0, y: 0 },
  ])
})

it('updates blocks positions', () => {
  expect(
    blocks(
      [{ name: 'Block 1', x: 1, y: 1 }, { name: 'Block 2', x: 2, y: 2 }],
      updateForce([
        { index: 0, name: 'Block 1', x: 3, y: 3 },
        { index: 1, name: 'Block 2', x: 4, y: 4 },
      ]),
    ),
  ).toEqual([{ name: 'Block 1', x: 3, y: 3 }, { name: 'Block 2', x: 4, y: 4 }])
})
