import React from 'react'
import { Link } from 'react-router-dom'

function SampleEmpty() {
  return (
    <div>   
        <Link to='/sample-home'>HOME</Link>
        <Link to='/sample'>API</Link>
    </div>
  )
}

export default SampleEmpty
