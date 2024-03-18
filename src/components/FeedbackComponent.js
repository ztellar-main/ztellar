import React from 'react'
import styled from 'styled-components'

// COMPONENTS
import FeedbackComponentCard from './FeedbackComponentCard'

const Container = styled.div`
    width:calc(100% - 10px);
    background-color: #E9F2F9;
    margin-left: 10px;
    border-radius: 20px;
    padding:10px;
    box-sizing: border-box;

    @media (max-width:800px){
        margin-left: 0;
    }
`

const FeedbackTitleContainer = styled.div`
    width:100%;
    padding: 10px;
    /* background-color: red; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
` 

const FeedbackTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
`

const FeedbackComponent = () => {
  return (
    <>
        <Container>
            <FeedbackTitleContainer>
                <FeedbackTitle>Feedback (123)</FeedbackTitle>
            </FeedbackTitleContainer>

            <FeedbackComponentCard />
            <FeedbackComponentCard />
        </Container>
    </>
  )
}

export default FeedbackComponent
