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
    <div className="Diagram-blocks">
      {blocks.map((block, index) => <BlockDetail key={index} {...block} />)}
    </div>
    <FloatingActionButton
      className="Diagram-add"
      secondary={true}
      zDepth={3}
      onClick={onAddClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default Diagram
