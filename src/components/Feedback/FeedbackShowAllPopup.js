import React from 'react'
import styled from 'styled-components'

// COMPONENTS
import FeedbackCard from './FeedbackCard'

const Container = styled.div`
    width:600px;
    background-color: #E9F2F9;
    position:fixed;
    top:50%;
    left:50%;
    border:1px solid black;
    transform: translate(-50%,-50%);
    border-radius: 15px;
    padding:20px;
    box-sizing: border-box;
    z-index: 20;
`

const Title = styled.p`
    color:#232323;
    font-size:20px;
    font-weight: bold;
    text-align: center;
`

const BottomContainer = styled.div`
    width:100%;
    height:300px;
    overflow-y: auto;
`

const FeedbackShowAllPopup = ({data}) => {
  return (
    <Container>
        <Title>Feedback</Title>
        <BottomContainer>
        {data.map((feedback,i) => {
            return(
                <FeedbackCard data={feedback} />
            )
        })}
        </BottomContainer>

    </Container>
  )}

export default FeedbackShowAllPopup
