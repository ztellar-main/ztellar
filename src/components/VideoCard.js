import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    flex-grow: 1;
    padding:10px;
    font-size: 17px;
    box-sizing: border-box;
    padding-left: 50px;
    margin-left: 60px;
    box-sizing: border-box;

    display: flex;
    align-items: center;

    @media (max-width:1000px) {
    margin-left:0;
    padding-left:30px;
  }
`
const ListStyle = styled.div`
  width:10px;
  height:10px;
  background-color: black;
  margin-right:10px;
  border-radius: 50%;

  @media (max-width:1000px) {
    width:7px;
    height:7px;
  }
`
const Title = styled.p`
    font-size: 17px;
    font-weight: 500;

    @media (max-width:450px) {
        font-size: 16px;
    }
`


function VideoCard() {
  return (
    <Container>
      <ListStyle />
        <Title>Video</Title>
    </Container>
  )
}

export default VideoCard