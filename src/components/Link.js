//@flow
import React from 'react'
import './Link.css'

export type Props = {
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
}

const Link = ({ fromX, fromY, toX, toY }: Props) => (
  <svg className="Link">
    <line className="Link-line" x1={fromX} y1={fromY} x2={toX} y2={toY} />
  </svg>
)

export default Link
