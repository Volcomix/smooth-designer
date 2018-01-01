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
    const { id, name, x, y, onNameChange, onSizeChange } = this.props
    return (
      <Sized
        className="BlockDetail"
        style={{ left: x, top: y }}
        onSized={({ width, height }) => onSizeChange(id, width, height)}
      >
        <Card className="BlockDetail-card">
          <CardTitle
            title={
              <TextField
                hintText="Name"
                value={name}
                onChange={(event: {}, newName: string) =>
                  onNameChange(id, newName)
                }
                inputRef={input => (this.nameInput = input)}
              />
            }
          />
        </Card>
      </Sized>
    )
  }
}

export default BlockDetail
