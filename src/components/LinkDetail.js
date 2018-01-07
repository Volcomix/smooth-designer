//@flow
import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import PopoverAnimationDefault from 'material-ui/Popover/PopoverAnimationDefault'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import More from 'material-ui/svg-icons/navigation/more-vert'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import './LinkDetail.css'
import type { Block } from '../types'

export type Props = {
  id: string,
  fromBlock: Block,
  toBlock: Block,
  onDelete: (id: string) => void,
}

const LinkDetail = ({ id, fromBlock, toBlock, onDelete }: Props) => {
  const { x: x1, y: y1 } = fromBlock
  const { x: x2, y: y2 } = toBlock
  return (
    <div
      className="LinkDetail"
      style={{
        left: Math.min(x1, x2),
        top: Math.min(y1, y2),
        width: Math.max(Math.abs(x2 - x1), 1),
        height: Math.max(Math.abs(y2 - y1), 1),
      }}
    >
      <svg
        className="LinkDetail-link"
        style={{ transform: `scale(${x2 > x1 ? 1 : -1}, ${y2 > y1 ? 1 : -1})` }}
      >
        <line className="LinkDetail-hover" x1={0} y1={0} x2="100%" y2="100%" />
        <line className="LinkDetail-line" x1={0} y1={0} x2="100%" y2="100%" />
      </svg>
      <IconMenu
        className="LinkDetail-menu"
        disableAutoFocus={true}
        animation={(props: {}) => (
          <PopoverAnimationDefault {...props} zDepth={2} />
        )}
        iconButtonElement={
          <IconButton>
            <More />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
      >
        <MenuItem
          className="LinkDetail-delete"
          leftIcon={<Delete />}
          primaryText="Delete link"
          onClick={() => onDelete(id)}
        />
      </IconMenu>
    </div>
  )
}

export default LinkDetail
