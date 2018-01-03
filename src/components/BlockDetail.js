//@flow
import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import AddLink from 'material-ui/svg-icons/action/settings-ethernet'
import './BlockDetail.css'
import type { Block } from '../types'
import Sized from './Sized'
import TextField from './TextField'

export type Props = Block & {
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string, mouseEvent: MouseEvent) => void,
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
            className="BlockDetail-title"
            title={
              <TextField
                hintText="Name"
                value={name}
                onChange={this.handleNameChange}
                inputRef={input => (this.nameInput = input)}
              />
            }
          />
          <CardActions className="BlockDetail-actions">
            <IconButton
              className="BlockDetail-action BlockDetail-addLink"
              tooltip="Add link"
              onMouseDown={this.handleLinkStart}
            >
              <AddLink />
            </IconButton>
          </CardActions>
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

  handleLinkStart = (mouseEvent: MouseEvent) =>
    this.props.onLinkStart(this.props.id, mouseEvent)
}

export default BlockDetail
