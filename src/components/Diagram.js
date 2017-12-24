//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'

type Props = {
  onAddClick: () => void,
}

const Diagram = ({ onAddClick }: Props) => (
  <div className="Diagram">
    <FloatingActionButton
      className="Diagram-add"
      secondary={true}
      onClick={onAddClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default Diagram
