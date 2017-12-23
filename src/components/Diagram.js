//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'

const Diagram = () => (
  <div className="Diagram">
    <FloatingActionButton className="Diagram-add" secondary={true}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default Diagram
