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

const BlockDetail = ({ id, name, x, y, onNameChange, onSizeChange }: Props) => (
  <Sized
    className="BlockDetail"
    style={{ left: x, top: y }}
    onSized={({ width, height }) => onSizeChange(id, width, height)}
  >
    <Card zDepth={2}>
      <CardTitle
        title={
          <TextField
            hintText="Name"
            value={name}
            onChange={(event: {}, newName: string) => onNameChange(id, newName)}
            inputRef={input => input && input.focus()}
          />
        }
      />
    </Card>
  </Sized>
)

export default BlockDetail
