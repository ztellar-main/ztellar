import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width:100%;
  padding-left: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 13px;
    color: #0D0D0D;
`

const Dot = styled.div`
  background-color: #0D0D0D;
  width:8px;
  height:8px;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  margin-right: 10px;
`



const VideoCardOnViewPage = ({data,number}) => {
  return (
    <Container>
      <Dot />
      <Title><p style={{fontWeight:'bold',display:'inline-block'}}>Part {Number(number) + 1} - </p> {data?.title}</Title>
      
    </Container>
    )
}

export default VideoCardOnViewPage
