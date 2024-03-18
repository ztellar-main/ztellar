import React, { useState } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

// ICONS
// import {FaStar} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa';
import axios from 'axios';

const Container = styled.div`
    width:600px;
    background-color: #E9F2F9;
    position:fixed;
    top:50%;
    left:50%;
    z-index: 20;
    transform: translate(-50%,-50%);
    padding:10px 20px;
    box-sizing: border-box;
    border-radius: 15px;
    border:1px solid black;

    @media (max-width:620px){
        width:90%;
    }
`

const StarContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`

const Title = styled.p`
    text-align: center;
    color:#232323;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
`

const TextArea = styled.textarea`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    border: 1px solid gray;
    border-radius: 15px;
    margin-bottom: 20px;
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

    &:hover{
        opacity: .5;
    }
`

const Error = styled.div`
    width:100%;
    padding:5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    color:white;
`

const MessageText = styled.p`
    text-align: center;
    font-size: 13px;
    color:#232323;
    margin-bottom: 20px;
`

const RatingText = styled.p`
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
`

const ReviewText = styled.p`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
`

const ErrorHandler = styled.div`
    background-color: #FF0000;
    color:white;
    padding:10px;
    box-sizing: border-box;
    border-radius:15px;
`

const Input = styled.input`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius:15px;
    border:1px solid gray;
`

const colors = {
    orange:"#FFBA5A",
    grey:"#a9a9a9"
}

const LeaveRatingPopup = ({data,setOpenRatingPopup,setRefresher}) => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)
    const [errorHandler, setErrorHandler] = useState('')
    const [linkValue, setLinkValue] = useState('')

    const [comment, setComment] = useState('');

    const handleClick = (value) => {
        setCurrentValue(value)
    }

    const handleMOuseHover = (value) => {
        setHoverValue(value)
    }

    const handleMouseLeave = (value) => {
        setHoverValue(undefined)
    }

    const submitButtonFunction = async() => {
        try{
            const res = await axios({
                method:"PUT",
                url:"/feedback/create-new-feedback",
                data:{
                    comment,
                    rating: currentValue,
                    productId: data?._id,
                    type: data?.type ,
                    link:linkValue,
                    token
                },
                include:{withCredentials:true}
            });

            setOpenRatingPopup(false);
            setRefresher(true)
            console.log(res)
        }catch(err){
            setErrorHandler(err?.response?.data?.message)
            console.log(err)
        }
    }

    
  return (
    <Container>
        <Title>Leave your review</Title>
        <MessageText>How would you rate your experience?</MessageText>
        <RatingText>Rating</RatingText>
        <StarContainer>
        {stars.map((_,index) => {
            return(
                <FaStar 
                key={index}
                size='30'
                style={{
                    marginRight:'10',
                    cursor:"pointer",
                }}
                color={(currentValue || hoverValue) > index ? colors.orange : colors.gray}
                onClick={e => handleClick(index + 1)}
                onMouseOver={e => handleMOuseHover(index + 1)}
                onMouseLeave={e => handleMouseLeave(index + 1)}
                />
            )
        })}
        </StarContainer>

        <ReviewText>Review</ReviewText>
        <TextArea placeholder='Enter your comment here' onChange={e => setComment(e.target.value)} />
        <Input  onChange={e => setLinkValue(e.target.value)} placeholder='Enter link here' />
        <SubmitButton onClick={submitButtonFunction}>Submit review</SubmitButton>
        {/* <Error>ERROR</Error> */}
        
        {errorHandler !== '' &&
        <ErrorHandler>{errorHandler}</ErrorHandler>
        }
        

    </Container>
  )
}

const styles = {
    container:{
        display:"flex",
        flexDirection: "column",
        alignItems:"center"
    }
}
export default LeaveRatingPopup
