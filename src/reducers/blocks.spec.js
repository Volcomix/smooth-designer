//@flow
import blocks, { getBlocks, cloneBlocks } from './blocks'
import { addBlock } from '../actions/blockActions'
import { updateForce } from '../actions/forceActions'

describe('blocks reducer', () => {
  it('returns the initial state', () => {
    expect(blocks(undefined, { type: '@@INIT' })).toEqual({})
  })

  it('adds blocks', () => {
    expect(blocks({}, addBlock())).toEqual({
      '0': { id: '0', name: '', x: 0, y: 0 },
    })
    expect(
      blocks({ '0': { id: '0', name: 'Block', x: 0, y: 0 } }, addBlock()),
    ).toEqual({
      '0': { id: '0', name: 'Block', x: 0, y: 0 },
      '1': { id: '1', name: '', x: 0, y: 0 },
    })
    expect(
      blocks(
        {
          '0': { id: '0', name: 'Block 1', x: 0, y: 0 },
          '1': { id: '1', name: 'Block 2', x: 0, y: 0 },
        },
        addBlock(),
      ),
    ).toEqual({
      '0': { id: '0', name: 'Block 1', x: 0, y: 0 },
      '1': { id: '1', name: 'Block 2', x: 0, y: 0 },
      '2': { id: '2', name: '', x: 0, y: 0 },
    })
  })

  it('updates blocks positions', () => {
    expect(
      blocks(
        {
          '0': { id: '0', name: 'Block 1', x: 1, y: 1 },
          '999': { id: '999', name: 'Block 2', x: 2, y: 2 },
        },
        updateForce([
          { id: '0', index: 0, name: 'Block 1', x: 3, y: 3 },
          { id: '999', index: 999, name: 'Block 2', x: 4, y: 4 },
        ]),
      ),
    ).toEqual({
      '0': { id: '0', name: 'Block 1', x: 3, y: 3 },
      '999': { id: '999', name: 'Block 2', x: 4, y: 4 },
    })
  })
})

describe('getBlocks', () => {
  it('returns an empty array', () => {
    expect(getBlocks({})).toEqual([])
  })

  it('returns blocks as array', () => {
    expect(getBlocks({ '0': { id: '0', name: 'Block', x: 0, y: 0 } })).toEqual([
      { id: '0', name: 'Block', x: 0, y: 0 },
    ])
  })
})

describe('cloneBlocks', () => {
  it('clones blocks as array', () => {
    const blocks = { '0': { id: '0', name: 'Block', x: 0, y: 0 } }
    const clone = cloneBlocks(blocks)
    expect(clone).toEqual([{ id: '0', name: 'Block', x: 0, y: 0 }])
    ;(clone[0]: any).name = 'Changed'
    expect(clone[0].name).toBe('Changed')
    expect(blocks['0'].name).toBe('Block')
  })
})
