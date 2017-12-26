//@flow
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import './BlockDetail.css'

export type Props = {
  name: string,
}

const BlockDetail = ({ name }: Props) => (
  <Card className="BlockDetail">
    <CardTitle title={<TextField hintText="Name" value={name} />} />
  </Card>
)

export default BlockDetail
