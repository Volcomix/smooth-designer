//@flow
import links, { getLinks } from './links'
import {
  startLinking,
  updateLinking,
  endLinking,
  cancelLinking,
} from '../actions/links'

it('returns the initial state', () => {
  expect(links(undefined, { type: '@@INIT' })).toEqual({ links: {} })
})

it('starts linking', () => {
  expect(links({ links: {} }, startLinking('0', 10, 20))).toEqual({
    links: {},
    linking: { fromId: '0', toMouse: { x: 10, y: 20 } },
  })
  expect(
    links(
      { links: { '0': { id: '0', fromId: '0', toId: '1' } } },
      startLinking('2', 10, 20),
    ),
  ).toEqual({
    links: { '0': { id: '0', fromId: '0', toId: '1' } },
    linking: { fromId: '2', toMouse: { x: 10, y: 20 } },
  })
})

it('updates linking', () => {
  expect(
    links(
      { links: {}, linking: { fromId: '0', toMouse: { x: 10, y: 20 } } },
      updateLinking(30, 40),
    ),
  ).toEqual({ links: {}, linking: { fromId: '0', toMouse: { x: 30, y: 40 } } })
  expect(
    links(
      {
        links: { '0': { id: '0', fromId: '0', toId: '1' } },
        linking: { fromId: '0', toMouse: { x: 10, y: 20 } },
      },
      updateLinking(30, 40),
    ),
  )
})

it('adds a link when linking ends', () => {
  expect(
    links(
      { links: {}, linking: { fromId: '0', toMouse: { x: 0, y: 0 } } },
      endLinking('1'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
    },
    linking: { fromId: '0', toMouse: { x: 0, y: 0 } },
  })
  expect(
    links(
      {
        links: { '0': { id: '0', fromId: '0', toId: '1' } },
        linking: { fromId: '2', toMouse: { x: 0, y: 0 } },
      },
      endLinking('3'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
      '1': { id: '1', fromId: '2', toId: '3' },
    },
    linking: { fromId: '2', toMouse: { x: 0, y: 0 } },
  })
})

it('throws an error when ending an undefined linking', () => {
  expect(() => links({ links: {} }, endLinking('1'))).toThrow(
    'No linking defined.',
  )
})

it('cancels linking', () => {
  expect(
    links(
      { links: {}, linking: { fromId: '0', toMouse: { x: 0, y: 0 } } },
      cancelLinking(),
    ),
  ).toEqual({ links: {} })
})

describe('getLinks', () => {
  it('returns an empty array', () => {
    expect(getLinks({ links: {} })).toEqual([])
  })

  it('returns links as array', () => {
    expect(
      getLinks({ links: { '0': { id: '0', fromId: '0', toId: '1' } } }),
    ).toEqual([{ id: '0', fromId: '0', toId: '1' }])
  })
})
