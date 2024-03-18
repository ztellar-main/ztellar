import React from 'react'
import styled from 'styled-components'
// sample

const Container = styled.div`
    width:500px;
    background-color: #E9F2F9;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 20;
    padding:20px;
    box-sizing: border-box;
    border-radius: 15px;
    border:1px solid black;

    @media (max-width:640px){
        width:90%;
    }
`
// 

const Title = styled.p`
    font-size: 25px;
    color: #232323;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Message = styled.p`
    color: #232323;
    text-align: center;
    font-size: 20px;
`

const SubmitButton = styled.button`
    width:100%;
    color:white;
    background-color: #1A66CC;
    border:none;
    cursor: pointer;
    border-radius: 15px;
    margin-bottom: 10px;
    font-size: 20px;
    padding:8px;
    font-size: 20px;
    margin-top: 20px;

    &:hover{
        opacity: .5;
    }
`

const AuthorDashboardRestrictionPopup = ({setRestrictPopup}) => {
  return (
    <Container>
        <Title>Hey There!</Title>

        <Message>Our dashboard feature is on its way! Stay tuned for updates.</Message>
        <SubmitButton onClick={e => setRestrictPopup(false)}>Okay</SubmitButton>
    </Container>
  )
}

export default AuthorDashboardRestrictionPopup
