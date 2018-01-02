//@flow
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { type State, linkingFromBlock } from '../reducers'
import { getBlocks } from '../reducers/blocks'
import type { Action } from '../actions'
import { addBlock, updateBlockName, updateBlockSize } from '../actions/blocks'
import { startLinking } from '../actions/links'
import Diagram from '../components/Diagram'

const mapStateToProps = (state: State) => ({
  blocks: getBlocks(state.blocks),
  linkingFromBlock: linkingFromBlock(state),
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddClick: () => dispatch(addBlock()),
  onNameChange: (id: string, name: string) =>
    dispatch(updateBlockName(id, name)),
  onSizeChange: (id: string, width: number, height: number) =>
    dispatch(updateBlockSize(id, width, height)),
  onLinkStart: (id: string) => dispatch(startLinking(id)),
})

const DiagramContainer = connect(mapStateToProps, mapDispatchToProps)(Diagram)

export default DiagramContainer
