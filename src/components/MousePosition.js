//@flow
import React, { type Node } from 'react'

export type Props = {
  children?: Node,
  className?: string,
  isActive: boolean,
  onMouseMove: (x: number, y: number) => void,
}

class MousePosition extends React.Component<Props> {
  container: ?HTMLDivElement

  render() {
    const { children, className } = this.props
    return (
      <div
        className={className}
        onMouseMove={this.handleMouseMove}
        ref={container => (this.container = container)}
      >
        {children}
      </div>
    )
  }

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (this.props.isActive && this.container) {
      const { width, height } = this.container.getBoundingClientRect()
      this.props.onMouseMove(clientX - width / 2, clientY - height / 2)
    }
  }
}

export default MousePosition
