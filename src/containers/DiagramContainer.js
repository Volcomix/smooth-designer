//@flow
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { State } from '../reducers'
import type { Action } from '../actions'
import { addBlock } from '../actions/blockActions'
import Diagram from '../components/Diagram'

export const mapStateToProps = (state: State) => ({
  blocks: state.blocks,
})

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddClick: () => dispatch(addBlock()),
})

const DiagramContainer = connect(mapStateToProps, mapDispatchToProps)(Diagram)

export default DiagramContainer
