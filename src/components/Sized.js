//@flow
import React, { type Node } from 'react'

type Props = {
  children?: Node,
  className?: string,
  style?: {},
  onSized: (clientRect: ClientRect) => void,
}

class Sized extends React.Component<Props> {
  container: ?HTMLDivElement

  componentDidMount() {
    if (this.container) {
      this.props.onSized(this.container.getBoundingClientRect())
    }
  }

  render() {
    const { className, style } = this.props
    return (
      <div
        className={className}
        style={style}
        ref={container => (this.container = container)}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Sized
