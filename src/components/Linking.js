//@flow
import React from 'react'
import './Linking.css'
import type { Block } from '../types'

export type Props = {
  fromBlock: Block,
  toMouse: { x: number, y: number },
}

const Linking = ({ fromBlock, toMouse }: Props) => (
  <svg className="Linking">
    <line
      className="Linking-link"
      x1={fromBlock.x}
      y1={fromBlock.y}
      x2={toMouse.x}
      y2={toMouse.y}
    />
  </svg>
)

export default Linking
