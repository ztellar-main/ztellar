import React from 'react'
import styled from 'styled-components';

// COMPONENTS
import VideoCard from './VideoCard';

const Container = styled.div`
    width:90%;
    box-sizing: border-box;
    display:flex;
`
const NumberContainer = styled.div`
  width:50px;
  height:50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius:3px; */
  /* background-color: #D5EBF2; */

  @media (max-width:450px) {
      width:40px;
      height:40px;
    }
`

const Number = styled.p`
  font-size: 20px;
  font-weight: 700;

  @media (max-width:450px) {
      font-size: 17px;
    }
`

const TitleContainer = styled.p`
  flex-grow: 1;
  /* background: #D3D3D3; */
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding:10px;
  box-sizing: border-box;
  border-radius: 25px;
  padding-left:20px;

  @media (max-width:1000px) {
    margin-left:0;
    padding-left:0;
  }
`

const Title = styled.p`
  font-weight: 700;

  @media (max-width:450px) {
      font-size: 16px;
    }
`

const Hr = styled.hr`
  width:90%;
  margin-top: 0;
  margin-bottom: 0;
`

function SubjectCard() {
  return (
    <>
    <Container>
        <NumberContainer>
            <Number>1</Number>
        </NumberContainer>
        <TitleContainer>
          <Title>SAMPLE TITLE</Title>
        </TitleContainer>
        
    </Container>
    <Hr />
    <VideoCard />
    <VideoCard />
    <VideoCard />
    </>

  )
}

export default SubjectCard