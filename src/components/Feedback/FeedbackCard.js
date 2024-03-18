import React, { useState } from 'react'
import styled from 'styled-components'
import {FaStar} from 'react-icons/fa';

const Container = styled.div`
    width:100%;
    margin-bottom: 10px;
`

const TopContainer = styled.div`
    width:100%;
    display:flex;
    padding:5px;
    box-sizing: border-box;
    position:relative;

`

const ImgContainer = styled.div`
    width:40px;
    height:40px;
    min-width: 40px;
    border-radius:50%;
    background-color: gray;
`

const NameAndStarContainer = styled.div`
    margin-left: 5px;
    flex-grow: 1;
`

const Name = styled.p`
    font-size: 11px;
`

const Date = styled.p`
    font-size: 10px;
    right:10px;
    color:gray;
    margin-left: 5px;
`

const CommentContainer = styled.div`
    width:100%;
    font-size: 12px;
    padding:10px;
    box-sizing: border-box;
    padding-top: 0;
    margin-top:5px;
    color: #6c6a6a;
`

const Hr = styled.hr`
    width:60%;
    margin-left: 20%;
`

const LinkContainer = styled.div`
    width:100%;

`

const FeedbackCard = (props) => {
    const stars = Array(5).fill(0);
    const data = props.data;
    const [currentValue, setCurrentValue] = useState(data?.rating);

    const colors = {
        orange:"#FFBA5A",
        grey:"#a9a9a9"
    }

    var date = new window.Date(data?.createdAt);

  return (
    <Container>
        {/* TOP CONTAINER */}
        <TopContainer>
            <ImgContainer></ImgContainer>
            <NameAndStarContainer>
                <Name>{data?.user?.username}</Name>
                {stars.map((_,index) => {
                    return(
                        <FaStar 
                        key={index}
                        size='12'
                        style={{
                            marginRight:'4',
                            cursor:"pointer",
                        }}
                        color={(currentValue) > index ? colors.orange : colors.gray}
                        />
                    )
                })}
            </NameAndStarContainer>
            <Date>{date.toLocaleString()}</Date>
        </TopContainer>
        <CommentContainer>{data?.comment}</CommentContainer>
        <a href={`${data?.link}`} target="_blank"><CommentContainer>{data?.link}</CommentContainer></a>
        
        <Hr />
    </Container>
  )
}



export default FeedbackCard
