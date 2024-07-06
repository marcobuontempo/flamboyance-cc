import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Overview({ }: Props) {
  return (
    <div>
      <Link to='/analytics/claims'>Claims</Link>
      <Link to='/analytics/total-value-locked'>Total Value Locked</Link>
      <Link to='/analytics/pools'>Pools</Link>
    </div>
  )
}