//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
import MousePosition from './MousePosition'
import BlockDetail from './BlockDetail'
import Linking from './Linking'

export type Props = {
  blocks: Block[],
  linking: ?{ fromBlock: Block, toMouse: { x: number, y: number } },
  onAddClick: () => void,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string, mouseX: number, mouseY: number) => void,
  onLinkMove: (mouseX: number, mouseY: number) => void,
}

const Diagram = ({
  blocks,
  linking,
  onAddClick,
  onNameChange,
  onSizeChange,
  onLinkStart,
  onLinkMove,
}: Props) => (
  <MousePosition
    className="Diagram"
    isActive={!!linking}
    onMouseMove={onLinkMove}
  >
    <div className="Diagram-content">
      {blocks.map(block => (
        <BlockDetail
          key={block.id}
          {...block}
          onNameChange={onNameChange}
          onSizeChange={onSizeChange}
          onLinkStart={onLinkStart}
        />
      ))}
      {linking && <Linking {...linking} />}
    </div>
    <FloatingActionButton
      className="Diagram-add"
      secondary={true}
      zDepth={4}
      onClick={onAddClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </MousePosition>
)

export default Diagram
