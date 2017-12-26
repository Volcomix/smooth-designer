//@flow
import React from 'react'

export type Props = {
  name: string,
}

const BlockDetail = ({ name }: Props) => <div>Name: {name}</div>

export default BlockDetail
