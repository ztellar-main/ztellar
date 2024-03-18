import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const PaymongoPageRefresher = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/paymongo-save')
  },[])

  return (
    <div>
        <p>PLEASE wAIT . RELOADING THE PAGE</p>
    </div>
  )
}

export default PaymongoPageRefresher
