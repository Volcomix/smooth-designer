//@flow
import reducer, { linkingFromBlock } from '.'

describe('root reducer', () => {
  it('combines all reducers', () => {
    expect(reducer(undefined, {})).toEqual({ blocks: {}, links: { links: {} } })
  })
})

describe('linkingFromBlock', () => {
  it('returns the start block if linking', () => {
    expect(
      linkingFromBlock({
        blocks: {
          '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
        },
        links: { links: {}, linkingFromId: '0' },
      }),
    ).toEqual({ id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 })
  })

  it('returns undefined if not linking', () => {
    expect(
      linkingFromBlock({
        blocks: {
          '0': { id: '0', name: 'Block', x: 0, y: 0, width: 0, height: 0 },
        },
        links: { links: {} },
      }),
    ).not.toBeDefined()
  })
})
