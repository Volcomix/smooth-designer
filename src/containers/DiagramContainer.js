//@flow
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { State } from '../reducers'
import type { Action } from '../actions'
import Diagram from '../components/Diagram'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({})

const DiagramContainer = connect(mapStateToProps, mapDispatchToProps)(Diagram)

export default DiagramContainer
