//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
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

class Diagram extends React.Component<Props> {
  content: ?HTMLDivElement

  render() {
    const {
      blocks,
      links,
      linking,
      onAddClick,
      onBlockDelete,
      onNameChange,
      onSizeChange,
      onLinkStart,
      onLinkEnd,
      onLinkDelete,
    } = this.props
    const isLinking = !!linking
    const { width, height } = blocks.reduce(
      ({ width, height }, block) => ({
        width: Math.max(width, Math.abs(block.x) + block.width / 2),
        height: Math.max(height, Math.abs(block.y) + block.height / 2),
      }),
      { width: 0, height: 0 },
    )
    return (
      <div
        className={'Diagram' + (isLinking ? ' Diagram-linking' : '')}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div
          className="Diagram-content"
          style={{ width, height }}
          ref={content => (this.content = content)}
        >
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
              isLinking={isLinking}
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
      </div>
    )
  }

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (this.props.linking && this.content) {
      const { left, top } = this.content.getBoundingClientRect()
      this.props.onLinkMove(clientX - left, clientY - top)
    }
  }

  handleMouseUp = () => {
    if (this.props.linking) {
      document.activeElement && document.activeElement.blur()
      this.props.onLinkCancel()
    }
  }
}

export default Diagram
