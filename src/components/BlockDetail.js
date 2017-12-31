//@flow
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import './BlockDetail.css'
import type { Block } from '../types'
import Sized from './Sized'

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
            className="BlockDetail-name"
            hintText="Name"
            value={name}
            ref={(nameField: ?HTMLInputElement) =>
              nameField && nameField.focus()
            }
            onChange={(event: {}, newName: string) => onNameChange(id, newName)}
          />
        }
      />
    </Card>
  </Sized>
)

export default BlockDetail
