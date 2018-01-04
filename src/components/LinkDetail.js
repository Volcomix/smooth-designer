//@flow
import React from 'react'
import './LinkDetail.css'
import type { Block } from '../types'

export type Props = {
  fromBlock: Block,
  toBlock: Block,
}

const LinkDetail = ({ fromBlock, toBlock }: Props) => {
  const { x: x1, y: y1 } = fromBlock
  const { x: x2, y: y2 } = toBlock
  return (
    <svg
      className="LinkDetail"
      style={{
        left: Math.min(x1, x2),
        top: Math.min(y1, y2),
        width: Math.max(Math.abs(x2 - x1), 1),
        height: Math.max(Math.abs(y2 - y1), 1),
        transform: `scale(${x2 > x1 ? 1 : -1}, ${y2 > y1 ? 1 : -1})`,
      }}
    >
      <line x1={0} y1={0} x2="100%" y2="100%" />
    </svg>
  )
}

export default LinkDetail
