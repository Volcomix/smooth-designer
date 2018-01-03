//@flow
import reducer, { getLinks, getLinking } from '.'

it('combines all reducers', () => {
  expect(reducer(undefined, {})).toEqual({ blocks: {}, links: { links: {} } })
})

describe('getLinks', () => {
  it('returns an empty array', () => {
    expect(getLinks({ blocks: {}, links: { links: {} } })).toEqual([])
  })

  it('returns links as array', () => {
    expect(
      getLinks({
        blocks: {
          '0': { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
          '1': { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
        },
        links: { links: { '0': { id: '0', fromId: '0', toId: '1' } } },
      }),
    ).toEqual([
      {
        id: '0',
        fromBlock: {
          id: '0',
          name: 'Block 1',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        toBlock: {
          id: '1',
          name: 'Block 2',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      },
    ])
  })
})

describe('getLinking', () => {
  it('returns the start block if linking', () => {
    expect(
      getLinking({
        blocks: {
          '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
        },
        links: { links: {}, linking: { fromId: '0', toMouse: { x: 0, y: 0 } } },
      }),
    ).toEqual({
      fromBlock: { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
      toMouse: { x: 0, y: 0 },
    })
  })

  it('returns undefined if not linking', () => {
    expect(
      getLinking({
        blocks: {
          '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
        },
        links: { links: {} },
      }),
    ).not.toBeDefined()
  })
})
