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
import classNames from 'classnames'
import './BlockDetail.css'
import type { Block } from '../types'
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
  container: ?HTMLDivElement
  nameInput: ?HTMLInputElement

  componentDidMount() {
    this.handleSizeChange()
    this.nameInput && this.nameInput.focus()
  }

  render() {
    const { name, x, y, width, height, isLinking } = this.props
    return (
      <div
        className={classNames('BlockDetail', {
          'BlockDetail-linking': isLinking,
        })}
        style={{ left: x - width / 2, top: y - height / 2 }}
        onBlur={this.handleSizeChange}
        ref={container => (this.container = container)}
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
              disableAutoFocus={true}
              animation={(props: {}) => (
                <PopoverAnimationDefault {...props} zDepth={5} />
              )}
              iconButtonElement={
                <IconButton>
                  <More />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
      </div>
    )
  }

  handleSizeChange = () => {
    if (!this.container) {
      return
    }
    const { width, height } = this.container.getBoundingClientRect()
    if (width !== this.props.width || height !== this.props.height) {
      this.props.onSizeChange(this.props.id, width, height)
    }
  }

  handleNameChange = (event: {}, newName: string) =>
    this.props.onNameChange(this.props.id, newName)

  handleDelete = () => this.props.onDelete(this.props.id)

  handleLinkStart = () =>
    this.props.onLinkStart(this.props.id, this.props.x, this.props.y)

  handleMouseUp = () => {
    if (this.props.isLinking) {
      this.props.onLinkEnd(this.props.id)
    }
  }
}

export default BlockDetail
