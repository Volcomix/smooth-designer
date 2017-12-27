//@flow
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import './BlockDetail.css'
import type { Block } from '../types'

export type Props = Block

const BlockDetail = ({ name, x, y }: Props) => (
  <Card className="BlockDetail" style={{ left: x, top: y }}>
    <CardTitle title={<TextField hintText="Name" value={name} />} />
  </Card>
)

export default BlockDetail
