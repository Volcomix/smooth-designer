//@flow
import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import IconMenu from 'material-ui/IconMenu'
import PopoverAnimationDefault from 'material-ui/Popover/PopoverAnimationDefault'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import More from 'material-ui/svg-icons/navigation/more-vert'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import AddLink from 'material-ui/svg-icons/action/settings-ethernet'
import './BlockDetail.css'
import type { Block } from '../types'
import Sized from './Sized'
import TextField from './TextField'

export type Props = Block & {
  isLinking: boolean,
  onDelete: (id: string) => void,
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
              className="BlockDetail-menu"
              useLayerForClickAway={true}
              animation={(props: {}) => (
                <PopoverAnimationDefault {...props} zDepth={2} />
              )}
              iconButtonElement={
                <IconButton>
                  <More />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                className="BlockDetail-delete"
                leftIcon={<Delete />}
                primaryText="Delete block"
                onClick={this.handleDelete}
              />
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

  handleDelete = () => this.props.onDelete(this.props.id)

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
