//@flow
import links from './links'
import { startLinking, endLinking } from '../actions/links'

it('returns the initial state', () => {
  expect(links(undefined, { type: '@@INIT' })).toEqual({ links: {} })
})

it('starts linking', () => {
  expect(links({ links: {} }, startLinking('0'))).toEqual({
    links: {},
    linkingFromId: '0',
  })
  expect(
    links(
      { links: { '0': { id: '0', fromId: '0', toId: '1' } } },
      startLinking('2'),
    ),
  ).toEqual({
    links: { '0': { id: '0', fromId: '0', toId: '1' } },
    linkingFromId: '2',
  })
})

it('adds a link when linking ends', () => {
  expect(links({ links: {}, linkingFromId: '0' }, endLinking('1'))).toEqual({
    links: { '0': { id: '0', fromId: '0', toId: '1' } },
  })
  expect(
    links(
      {
        links: { '0': { id: '0', fromId: '0', toId: '1' } },
        linkingFromId: '2',
      },
      endLinking('3'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
      '1': { id: '1', fromId: '2', toId: '3' },
    },
  })
})
