//@flow
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { State } from '../reducers'
import { getBlocks } from '../reducers/blocks'
import type { Action } from '../actions'
import { addBlock, updateBlockSize } from '../actions/blockActions'
import Diagram from '../components/Diagram'

const mapStateToProps = (state: State) => ({
  blocks: getBlocks(state.blocks),
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddClick: () => dispatch(addBlock()),
  onSizeChange: (id: string, width: number, height: number) =>
    dispatch(updateBlockSize(id, width, height)),
})

const DiagramContainer = connect(mapStateToProps, mapDispatchToProps)(Diagram)

export default DiagramContainer
