//@flow
import React from 'react'
import './LinkDetail.css'
import type { Block } from '../types'

export type Props = {
  fromBlock: Block,
  toBlock: Block,
}

const LinkDetail = ({ fromBlock, toBlock }: Props) => (
  <line
    className="LinkDetail"
    x1={fromBlock.x}
    y1={fromBlock.y}
    x2={toBlock.x}
    y2={toBlock.y}
  />
)

export default LinkDetail
