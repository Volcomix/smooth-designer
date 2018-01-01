//@flow
import React, { type Node } from 'react'

export type Props = {
  children?: Node,
  className?: string,
  style?: {},
  onSized: (clientRect: ClientRect) => void,
}

class Sized extends React.Component<Props> {
  container: ?HTMLDivElement

  componentDidMount() {
    this.sized()
  }

  render() {
    const { className, style } = this.props
    return (
      <div
        className={className}
        style={style}
        onBlur={this.sized}
        ref={container => (this.container = container)}
      >
        {this.props.children}
      </div>
    )
  }

  sized = () => {
    if (this.container) {
      this.props.onSized(this.container.getBoundingClientRect())
    }
  }
}

export default Sized
