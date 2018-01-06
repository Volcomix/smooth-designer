//@flow
import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AddLink from 'material-ui/svg-icons/action/settings-ethernet'
import './BlockDetail.css'
import type { Block } from '../types'
import Sized from './Sized'
import TextField from './TextField'

export type Props = Block & {
  isLinking: boolean,
  onNameChange: (id: string, name: string) => void,
  onSizeChange: (id: string, width: number, height: number) => void,
  onLinkStart: (id: string, toMouseX: number, toMouseY: number) => void,
  onLinkEnd: (id: string) => void,
}

class BlockDetail extends React.Component<Props> {
  nameInput: ?HTMLInputElement

  componentDidMount() {
    this.nameInput && this.nameInput.focus()
  }

  render() {
    const { name, x, y, isLinking } = this.props
    return (
      <Sized
        className={'BlockDetail' + (isLinking ? ' BlockDetail-linking' : '')}
        style={{ left: x, top: y }}
        onSized={this.handleSized}
      >
        <Card className="BlockDetail-card" onMouseUp={this.handleMouseUp}>
          <CardTitle
            className="BlockDetail-title"
            title={
              <TextField
                hintText="Name"
                value={name}
                onChange={this.handleNameChange}
                inputRef={input => {
                  this.nameInput = input
                }}
              />
            }
          />
          <CardActions className="BlockDetail-actions">
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Delete" />
            </IconMenu>
            <IconButton
              className="BlockDetail-addLink"
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

  handleLinkStart = () =>
    this.props.onLinkStart(this.props.id, this.props.x, this.props.y)

  handleMouseUp = () => {
    if (this.props.isLinking) {
      this.props.onLinkEnd(this.props.id)
    }
  }
}

export default BlockDetail
