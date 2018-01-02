//@flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Diagram.css'
import type { Block } from '../types'
import BlockDetail from './BlockDetail'
import Link from './Link'

export type Props = {
  blocks: Block[],
  linkingFromBlock: ?Block,
  onAddClick: () => void,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string) => void,
}

type State = {
  mouseX?: number,
  mouseY?: number,
}

class Diagram extends React.Component<Props, State> {
  container: ?HTMLDivElement

  state = {}

  render() {
    const {
      blocks,
      linkingFromBlock,
      onAddClick,
      onNameChange,
      onSizeChange,
      onLinkStart,
    } = this.props
    const { mouseX, mouseY } = this.state
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
              isLinking={!!linkingFromBlock}
              onNameChange={onNameChange}
              onSizeChange={onSizeChange}
              onLinkStart={onLinkStart}
            />
          ))}
          {linkingFromBlock &&
            mouseX !== undefined &&
            mouseY !== undefined && (
              <Link
                fromX={linkingFromBlock.x}
                fromY={linkingFromBlock.y}
                toX={mouseX}
                toY={mouseY}
              />
            )}
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
    if (this.props.linkingFromBlock && this.container) {
      const { width, height } = this.container.getBoundingClientRect()
      this.setState({
        mouseX: clientX - width / 2,
        mouseY: clientY - height / 2,
      })
    }
  }
}

export default Diagram
