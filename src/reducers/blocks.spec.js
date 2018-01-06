//@flow
import blocks, { getBlocks, cloneBlocks } from './blocks'
import {
  addBlock,
  deleteBlock,
  updateBlockName,
  updateBlockSize,
} from '../actions/blocks'
import { updateForce } from '../actions/force'

it('returns the initial state', () => {
  expect(blocks(undefined, { type: '@@INIT' })).toEqual({})
})

it('adds a block', () => {
  expect(blocks({}, addBlock())).toEqual({
    '0': { id: '0', name: '', x: 0, y: 0, width: 0, height: 0 },
  })
  expect(
    blocks(
      { '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 } },
      addBlock(),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    '1': { id: '1', name: '', x: 0, y: 0, width: 0, height: 0 },
  })
  expect(
    blocks(
      {
        '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        '1': { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      },
      addBlock(),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
    '1': { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
    '2': { id: '2', name: '', x: 0, y: 0, width: 0, height: 0 },
  })
})

it('deletes a block', () => {
  expect(
    blocks(
      {
        '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      },
      deleteBlock('5'),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
  })
})

it('updates a block name', () => {
  expect(
    blocks(
      {
        '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      },
      updateBlockName('5', 'New name'),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
    '5': { id: '5', name: 'New name', x: 0, y: 0, width: 0, height: 0 },
  })
})

it('updates a block size', () => {
  expect(
    blocks(
      {
        '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
        '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      },
      updateBlockSize('5', 30, 40),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
    '5': { id: '5', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
  })
})

it('updates blocks positions', () => {
  expect(
    blocks(
      {
        '0': { id: '0', name: 'Block 1', x: 1, y: 1, width: 0, height: 0 },
        '5': { id: '5', name: 'Block 2', x: 2, y: 2, width: 0, height: 0 },
      },
      updateForce([
        { id: '0', name: 'Block 1', x: 3, y: 3, width: 0, height: 0 },
        { id: '5', name: 'Block 2', x: 4, y: 4, width: 0, height: 0 },
      ]),
    ),
  ).toEqual({
    '0': { id: '0', name: 'Block 1', x: 3, y: 3, width: 0, height: 0 },
    '5': { id: '5', name: 'Block 2', x: 4, y: 4, width: 0, height: 0 },
  })
})

describe('getBlocks', () => {
  it('returns an empty array', () => {
    expect(getBlocks({})).toEqual([])
  })

  it('returns blocks as array', () => {
    expect(
      getBlocks({
        '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
      }),
    ).toEqual([{ id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 }])
  })
})

describe('cloneBlocks', () => {
  it('clones blocks as array', () => {
    const blocks = {
      '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    }
    const clone = cloneBlocks(blocks)
    expect(clone).toEqual([
      { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
    ])
    ;(clone[0]: any).name = 'Changed'
    expect(clone[0].name).toBe('Changed')
    expect(blocks['0'].name).toBe('Block')
  })
})
