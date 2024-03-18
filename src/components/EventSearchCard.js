import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
`

const EventSearchCard = ({data}) => {
  return (
    <div>
      <p>{data?.title}</p>
    </div>
  )
}


export default EventSearchCard
