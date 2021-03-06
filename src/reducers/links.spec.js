//@flow
import links, { getLinks } from './links'
import {
  startLinking,
  updateLinking,
  endLinking,
  cancelLinking,
  deleteLink,
} from '../actions/links'
import { deleteBlock } from '../actions/blocks'

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
  expect(
    links(
      {
        links: {
          '0': { id: '0', fromId: '0', toId: '1' },
          '5': { id: '5', fromId: '1', toId: '2' },
        },
        linking: { fromId: '2', toMouse: { x: 0, y: 0 } },
      },
      endLinking('3'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
      '5': { id: '5', fromId: '1', toId: '2' },
      '6': { id: '6', fromId: '2', toId: '3' },
    },
    linking: { fromId: '2', toMouse: { x: 0, y: 0 } },
  })
})

it('does not add a link if start and end is the same block', () => {
  expect(
    links(
      { links: {}, linking: { fromId: '0', toMouse: { x: 0, y: 0 } } },
      endLinking('0'),
    ),
  ).toEqual({ links: {}, linking: { fromId: '0', toMouse: { x: 0, y: 0 } } })
})

it('does not add a link if it already exists', () => {
  expect(
    links(
      {
        links: {
          '0': { id: '0', fromId: '0', toId: '1' },
          '5': { id: '5', fromId: '2', toId: '3' },
        },
        linking: { fromId: '0', toMouse: { x: 0, y: 0 } },
      },
      endLinking('1'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
      '5': { id: '5', fromId: '2', toId: '3' },
    },
    linking: { fromId: '0', toMouse: { x: 0, y: 0 } },
  })
  expect(
    links(
      {
        links: {
          '0': { id: '0', fromId: '0', toId: '1' },
          '5': { id: '5', fromId: '2', toId: '3' },
        },
        linking: { fromId: '3', toMouse: { x: 0, y: 0 } },
      },
      endLinking('2'),
    ),
  ).toEqual({
    links: {
      '0': { id: '0', fromId: '0', toId: '1' },
      '5': { id: '5', fromId: '2', toId: '3' },
    },
    linking: { fromId: '3', toMouse: { x: 0, y: 0 } },
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

it('deletes a link', () => {
  expect(
    links(
      {
        links: {
          '0': { id: '0', fromId: '0', toId: '1' },
          '5': { id: '5', fromId: '2', toId: '3' },
        },
      },
      deleteLink('5'),
    ),
  ).toEqual({ links: { '0': { id: '0', fromId: '0', toId: '1' } } })
})

it('deletes a block', () => {
  expect(
    links(
      {
        links: {
          '0': { id: '0', fromId: '0', toId: '1' },
          '5': { id: '5', fromId: '1', toId: '2' },
          '10': { id: '10', fromId: '2', toId: '0' },
        },
      },
      deleteBlock('2'),
    ),
  ).toEqual({ links: { '0': { id: '0', fromId: '0', toId: '1' } } })
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
