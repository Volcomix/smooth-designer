//@flow
import blocks from './blocks'
import { addBlock } from '../actions/blockActions'

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
