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
  isLinking: boolean,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string) => void,
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

  handleNameChange = (event: {}, newName: string) => {
    const { id, onNameChange } = this.props
    onNameChange(id, newName)
  }

  handleSized = ({ width, height }: ClientRect) => {
    const { id, onSizeChange } = this.props
    if (width !== this.props.width || height !== this.props.height) {
      onSizeChange(id, width, height)
    }
  }

  handleLinkStart = () => {
    const { id, isLinking, onLinkStart } = this.props
    if (!isLinking) {
      onLinkStart(id)
    }
  }
}

export default BlockDetail
