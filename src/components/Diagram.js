//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
import BlockDetail from './BlockDetail'

export type Props = {
  blocks: Block[],
  isLinking: boolean,
  onAddClick: () => void,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string) => void,
}

const Diagram = ({
  blocks,
  isLinking,
  onAddClick,
  onNameChange,
  onSizeChange,
  onLinkStart,
}: Props) => (
  <div className="Diagram">
    <div className="Diagram-blocks">
      {blocks.map(block => (
        <BlockDetail
          key={block.id}
          {...block}
          isLinking={isLinking}
          onNameChange={onNameChange}
          onSizeChange={onSizeChange}
          onLinkStart={onLinkStart}
        />
      ))}
    </div>
    <FloatingActionButton
      className="Diagram-add"
      secondary={true}
      zDepth={4}
      onClick={onAddClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default Diagram
