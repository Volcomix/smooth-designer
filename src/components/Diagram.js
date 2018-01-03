//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
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

class Diagram extends React.Component<Props> {
  container: ?HTMLDivElement

  render() {
    const {
      blocks,
      linking,
      onAddClick,
      onNameChange,
      onSizeChange,
    } = this.props
    return (
      <div
        className="Diagram"
        ref={container => (this.container = container)}
        onMouseMove={this.handleMouseMove}
      >
        <div className="Diagram-content">
          {blocks.map(block => (
            <BlockDetail
              key={block.id}
              {...block}
              onNameChange={onNameChange}
              onSizeChange={onSizeChange}
              onLinkStart={this.handleLinkStart}
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

  handleLinkStart = (id: string, { clientX, clientY }: MouseEvent) => {
    if (this.container) {
      const { width, height } = this.container.getBoundingClientRect()
      this.props.onLinkStart(id, clientX - width / 2, clientY - height / 2)
    }
  }

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (this.props.linking && this.container) {
      const { width, height } = this.container.getBoundingClientRect()
      this.props.onLinkMove(clientX - width / 2, clientY - height / 2)
    }
  }
}

export default Diagram
