import React, { useState } from 'react'
import styled from 'styled-components'

import {FaStar} from 'react-icons/fa';

const Container = styled.div`
    width:600px;
    background-color: #071C34;
    z-index: 20;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 15px;
    padding:20px;
    box-sizing: border-box;

    @media (max-width:620px){
        width:90%;
    }
`

const StarContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 20px;
`

const GrayCard = styled.div`
    background-color: #E9F2F9;
    padding:20px;
    box-sizing: border-box;
    border-radius: 15px;
    width:360px;
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;

    @media (max-width:620px){
        width:90%;
        font-size: 16px;
        padding:15px;
    }
`

const Thankyou = styled.p`
    color:white;
    font-size: 40px;
    font-weight: bold;
    text-align: center;

    @media (max-width:620px){
        font-size: 30px;
    }
`

const ThankyouMessage = styled.div`
    text-align: center;
    font-size: 13px;
    color:white;
`

const Button = styled.button`
    width:80%;
    margin-left: 10%;
    border-radius: 15px;
    background-color: #1A66CC;
    border:none;
    color:white;
    padding:10px;

    font-size: 16px;
    margin-top: 20px;

    cursor: pointer;

    &:hover{
        opacity:.5;
    }

    /* @media (max-width: 1366px){
        font-size: 10px;
        margin-top: 10px;
    } */
`

const ViewRatingPopup = ({setOpenViewRating,data}) => {
    const [currentValue, setCurrentValue] = useState(data?.rating)
    const stars = Array(5).fill(0);
    const colors = {
        orange:"#FFD600",
        gray:"#a9a9a9"
    }

    console.log(data)

  return (
    <>
    <Container>
        <StarContainer>
        {stars.map((_,index) => {
            return(
                <FaStar 
                key={index}
                size='30'
                style={{
                    marginRight:'5',
                    cursor:"pointer",
                }}
                color={(currentValue) > index ? colors.orange : colors.gray}
                />
            )
        })}
        </StarContainer>
        <GrayCard>You submitted {data?.rating} out of 5</GrayCard>
        <Thankyou>Thank you!</Thankyou>
        <ThankyouMessage>
            Thank you for taking the time to rate our services. Your input helps us improve our services. We appreciate your support.
        </ThankyouMessage>

        <Button onClick={e => setOpenViewRating(false)}>Back</Button>
    </Container>
    </>
  )
}

export default ViewRatingPopup
