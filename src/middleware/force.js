//@flow
import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceCenter,
  forceLink,
} from 'd3-force'
import type { Middleware } from 'redux'
import type { Block } from '../types'
import type { State } from '../reducers'
import type { Action } from '../actions'
import { UPDATE_BLOCK_SIZE, END_LINKING } from '../constants/actionTypes'
import { cloneBlocks } from '../reducers/blocks'
import { getLinks } from '../reducers/links'
import { updateForce } from '../actions/force'

export const radius = ({ width, height }: Block) =>
  Math.hypot(width, height) / 2

const simulation = forceSimulation()
  .force('x', forceX().strength(0.09))
  .force('y', forceY().strength(0.16))
  .force('collision', forceCollide(radius))
  .force('center', forceCenter())
  .stop()

const computeStaticLayout = () => {
  for (
    let i = 0,
      n = Math.ceil(
        Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()),
      );
    i < n;
    ++i
  ) {
    simulation.tick()
  }
}

const force: Middleware<State, Action> = ({
  dispatch,
  getState,
}) => next => action => {
  const result = next(action)
  if (action.type === UPDATE_BLOCK_SIZE || action.type === END_LINKING) {
    const state = getState()
    const blocks = cloneBlocks(state.blocks)
    const links = getLinks(state.links).map(({ fromId, toId }) => ({
      source: fromId,
      target: toId,
    }))
    simulation
      .nodes(blocks)
      .force('link', forceLink(links).id(({ id }: Block) => id))
      .alpha(1)
    computeStaticLayout()
    setTimeout(() => dispatch(updateForce(blocks)))
  }
  return result
}

export default force
