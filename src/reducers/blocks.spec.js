import { ADD_BLOCK } from '../constants/actionTypes'
import blocks from './blocks'

it('returns the initial state', () => {
  expect(blocks(undefined, {})).toEqual([])
})

it('adds blocks', () => {
  expect(blocks([], { type: ADD_BLOCK, block: { name: 'New block' } })).toEqual(
    [{ name: 'New block' }],
  )
  expect(
    blocks([{ name: 'Block' }], {
      type: ADD_BLOCK,
      block: { name: 'New block' },
    }),
  ).toEqual([{ name: 'Block' }, { name: 'New block' }])
})
