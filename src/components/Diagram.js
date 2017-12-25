//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
import BlockDetail from './BlockDetail'

type Props = {
  blocks: Block[],
  onAddClick: () => void,
}

const Diagram = ({ blocks, onAddClick }: Props) => (
  <div className="Diagram">
    {blocks.map(({ name }, index) => <BlockDetail key={index} name={name} />)}
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
