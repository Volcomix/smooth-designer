//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
import MousePosition from './MousePosition'
import BlockDetail from './BlockDetail'
import LinkDetail from './LinkDetail'
import Linking from './Linking'

export type Props = {
  blocks: Block[],
  links: { id: string, fromBlock: Block, toBlock: Block }[],
  linking: ?{ fromBlock: Block, toMouse: { x: number, y: number } },
  onAddClick: () => void,
  onBlockDelete: (id: string) => void,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string, mouseX: number, mouseY: number) => void,
  onLinkMove: (mouseX: number, mouseY: number) => void,
  onLinkEnd: (id: string) => void,
  onLinkCancel: () => void,
  onLinkDelete: (id: string) => void,
}

const Diagram = ({
  blocks,
  links,
  linking,
  onAddClick,
  onBlockDelete,
  onNameChange,
  onSizeChange,
  onLinkStart,
  onLinkMove,
  onLinkEnd,
  onLinkCancel,
  onLinkDelete,
}: Props) => {
  const isLinking = !!linking
  return (
    <MousePosition
      className={'Diagram' + (isLinking ? ' Diagram-linking' : '')}
      isActive={isLinking}
      onMouseMove={onLinkMove}
      onMouseUp={() => {
        document.activeElement && document.activeElement.blur()
        onLinkCancel()
      }}
    >
      <div className="Diagram-content">
        {blocks.map(block => (
          <BlockDetail
            key={block.id}
            {...block}
            isLinking={isLinking}
            onDelete={onBlockDelete}
            onNameChange={onNameChange}
            onSizeChange={onSizeChange}
            onLinkStart={onLinkStart}
            onLinkEnd={onLinkEnd}
          />
        ))}
        {links.map(({ id, fromBlock, toBlock }) => (
          <LinkDetail
            key={id}
            id={id}
            fromBlock={fromBlock}
            toBlock={toBlock}
            onDelete={onLinkDelete}
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
}

export default Diagram
