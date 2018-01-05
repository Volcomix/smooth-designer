//@flow
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { type State, getLinkedBlocks, getLinking } from '../reducers'
import { getBlocks } from '../reducers/blocks'
import type { Action } from '../actions'
import { addBlock, updateBlockName, updateBlockSize } from '../actions/blocks'
import {
  startLinking,
  updateLinking,
  endLinking,
  cancelLinking,
} from '../actions/links'
import Diagram from '../components/Diagram'

const mapStateToProps = (state: State) => ({
  blocks: getBlocks(state.blocks),
  links: getLinkedBlocks(state),
  linking: getLinking(state),
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddClick: () => dispatch(addBlock()),
  onNameChange: (id: string, name: string) =>
    dispatch(updateBlockName(id, name)),
  onSizeChange: (id: string, width: number, height: number) =>
    dispatch(updateBlockSize(id, width, height)),
  onLinkStart: (id: string, toMouseX: number, toMouseY: number) =>
    dispatch(startLinking(id, toMouseX, toMouseY)),
  onLinkMove: (toMouseX: number, toMouseY: number) =>
    dispatch(updateLinking(toMouseX, toMouseY)),
  onLinkEnd: (id: string) => dispatch(endLinking(id)),
  onLinkCancel: () => dispatch(cancelLinking()),
})

const DiagramContainer = connect(mapStateToProps, mapDispatchToProps)(Diagram)

export default DiagramContainer
