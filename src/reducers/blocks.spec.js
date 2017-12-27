//@flow
import { ADD_BLOCK } from '../constants/actionTypes'
import blocks from './blocks'

const origin = { x: 0, y: 0 }

it('returns the initial state', () => {
  expect(blocks(undefined, { type: '@@INIT' })).toEqual([])
})

it('adds blocks', () => {
  expect(blocks([], { type: ADD_BLOCK })).toEqual([{ name: '', ...origin }])
  expect(blocks([{ name: 'Block', ...origin }], { type: ADD_BLOCK })).toEqual([
    { name: 'Block', ...origin },
    { name: '', ...origin },
  ])
})
