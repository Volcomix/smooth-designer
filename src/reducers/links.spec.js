//@flow
import links, { isLinking } from './links'
import { startLinking, endLinking } from '../actions/links'

describe('links reducer', () => {
  it('returns the initial state', () => {
    expect(links(undefined, { type: '@@INIT' })).toEqual({ links: {} })
  })

  it('starts linking', () => {
    expect(links({ links: {} }, startLinking('0'))).toEqual({
      links: {},
      linkingFromBlock: '0',
    })
    expect(
      links(
        { links: { '0': { id: '0', fromBlock: '0', toBlock: '1' } } },
        startLinking('2'),
      ),
    ).toEqual({
      links: { '0': { id: '0', fromBlock: '0', toBlock: '1' } },
      linkingFromBlock: '2',
    })
  })

  it('adds a link when linking ends', () => {
    expect(
      links({ links: {}, linkingFromBlock: '0' }, endLinking('1')),
    ).toEqual({
      links: { '0': { id: '0', fromBlock: '0', toBlock: '1' } },
    })
    expect(
      links(
        {
          links: { '0': { id: '0', fromBlock: '0', toBlock: '1' } },
          linkingFromBlock: '2',
        },
        endLinking('3'),
      ),
    ).toEqual({
      links: {
        '0': { id: '0', fromBlock: '0', toBlock: '1' },
        '1': { id: '1', fromBlock: '2', toBlock: '3' },
      },
    })
  })
})

describe('isLinking', () => {
  it('returns true if linkingFromBlock is defined', () => {
    expect(isLinking({ links: {}, linkingFromBlock: '0' })).toBeTruthy()
  })

  it('returns false if linkingFromBlock is undefined', () => {
    expect(isLinking({ links: {} })).toBeFalsy()
  })
})
