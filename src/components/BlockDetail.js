//@flow
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import './BlockDetail.css'
import type { Block } from '../types'
import Sized from './Sized'
import TextField from './TextField'

export type Props = Block & {
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
}

class BlockDetail extends React.Component<Props> {
  nameInput: ?HTMLInputElement

  componentDidMount() {
    this.nameInput && this.nameInput.focus()
  }

  render() {
    const { name, x, y } = this.props
    return (
      <Sized
        className="BlockDetail"
        style={{ left: x, top: y }}
        onSized={this.handleSized}
      >
        <Card className="BlockDetail-card">
          <CardTitle
            title={
              <TextField
                hintText="Name"
                value={name}
                onChange={this.handleNameChange}
                inputRef={input => (this.nameInput = input)}
              />
            }
          />
        </Card>
      </Sized>
    )
  }

  handleNameChange = (event: {}, newName: string) =>
    this.props.onNameChange(this.props.id, newName)

  handleSized = ({ width, height }: ClientRect) => {
    if (width !== this.props.width || height !== this.props.height) {
      this.props.onSizeChange(this.props.id, width, height)
    }
  }
}

export default BlockDetail
