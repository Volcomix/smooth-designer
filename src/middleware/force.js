//@flow
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import type { Middleware } from 'redux'
import type { State } from '../reducers'
import type { Action } from '../actions'
import { ADD_BLOCK } from '../constants/actionTypes'
import { updateForce } from '../actions/forceActions'

const simulation = forceSimulation()
  .force('collision', forceCollide(Math.sqrt(288 * 288 + 88 * 88) / 2))
  .force('x', forceX().strength(0.09))
  .force('y', forceY().strength(0.16))

const force: Middleware<State, Action> = ({
  dispatch,
  getState,
}) => next => action => {
  const result = next(action)
  if (action.type === ADD_BLOCK) {
    const blocks = getState().blocks.map(block => ({ ...block }))
    simulation.on('tick', () => dispatch(updateForce(blocks)))
    simulation
      .nodes(blocks)
      .alpha(1)
      .restart()
  }
  return result
}

export default force
