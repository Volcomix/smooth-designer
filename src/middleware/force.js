//@flow
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import type { Middleware } from 'redux'
import type { Block } from '../types'
import type { State } from '../reducers'
import type { Action } from '../actions'
import { UPDATE_BLOCK_SIZE } from '../constants/actionTypes'
import { cloneBlocks } from '../reducers/blocks'
import { updateForce } from '../actions/forceActions'

export const radius = ({ width, height }: Block) =>
  Math.hypot(width, height) / 2

const simulation = forceSimulation()
  .force('collision', forceCollide(radius))
  .force('x', forceX().strength(0.09))
  .force('y', forceY().strength(0.16))
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
  if (action.type === UPDATE_BLOCK_SIZE) {
    const blocks = cloneBlocks(getState().blocks)
    simulation.nodes(blocks).alpha(1)
    computeStaticLayout()
    dispatch(updateForce(blocks))
  }
  return result
}

export default force
