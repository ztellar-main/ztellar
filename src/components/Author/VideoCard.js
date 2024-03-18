import React from 'react'
import styled from 'styled-components'

// COMPONENTS

const Container = styled.div`
    width:100%;
    background-color: #E9F2F9;
    margin-top: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding:10px;
    box-sizing: border-box;
`

const VideoCard = ({data}) => {
  return (
    <>
    <Container>
      <p>TITLE: {data.title}</p>
    </Container>
    </>
  )
}

export default VideoCard
