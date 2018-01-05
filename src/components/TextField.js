//@flow
import React from 'react'
import MuiTextField from 'material-ui/TextField'
import './TextField.css'

export type Props = {
  hintText: string,
  value: string,
  onChange: (event: {}, newValue: string) => void,
  inputRef: (input: ?HTMLInputElement) => void,
}

const TextField = ({ hintText, value, onChange, inputRef }: Props) => (
  <div className="TextField">
    <MuiTextField
      className="TextField-input"
      fullWidth={true}
      hintText={hintText}
      value={value}
      onChange={onChange}
      ref={inputRef}
    />
    <div className="TextField-size">{value}</div>
  </div>
)

export default TextField
