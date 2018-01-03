//@flow
import reducer, { getLinking } from '.'

it('combines all reducers', () => {
  expect(reducer(undefined, {})).toEqual({ blocks: {}, links: { links: {} } })
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
      fromId: '0',
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
