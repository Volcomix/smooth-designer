//@flow
import React from 'react'
import './Linking.css'
import type { Block } from '../types'

export type Props = {
  fromBlock: Block,
  toMouse: { x: number, y: number },
}

const Linking = ({ fromBlock, toMouse }: Props) => {
  const { x: x1, y: y1 } = fromBlock
  const { x: x2, y: y2 } = toMouse
  return (
    <svg
      className="Linking"
      style={{
        left: Math.min(x1, x2),
        top: Math.min(y1, y2),
        width: Math.max(Math.abs(x2 - x1), 1),
        height: Math.max(Math.abs(y2 - y1), 1),
        transform: `scale(${x2 > x1 ? 1 : -1}, ${y2 > y1 ? 1 : -1})`,
      }}
    >
      <line className="Linking-link" x1={0} y1={0} x2="100%" y2="100%" />
    </svg>
  )
}

export default Linking
