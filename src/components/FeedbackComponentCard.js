import React from 'react'
import styled from 'styled-components'

// ICONS
import star from '../icons/five-star.png'

const Container = styled.div`
    width:100%;
    margin-bottom: 10px;


`

const TopContainer = styled.div`
    display: flex;
    position:relative;
`

const ProfilePictureContainer = styled.div`
    width:45px;
    height:45px;
    border-radius: 50%;
    background-color: gray;

`

const NameContainer = styled.div`
    margin-left: 10px;
`

const Name = styled.p`
    margin-top: 7px;
    font-weight: bold;
`

const Star = styled.img`
    height:17px;
`

const Date = styled.p`
    position: absolute;
    top:7px;
    right:7px;
`

const Comment = styled.p`
    padding:10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

const Hr = styled.hr`
    border:none;
    border-top: 1px solid gray;
    width:250px;
    margin-left: calc(50% - 125px);
`

const FeedbackComponentCard = () => {
  return (
    <Container>
        <TopContainer>
            <ProfilePictureContainer>

            </ProfilePictureContainer>
            <NameContainer>
                <Name>Kim Jisoo</Name>
                <Star src={star} />
            </NameContainer>
            <Date>10/10/2024</Date>
        </TopContainer>

        <Comment>I love the way the instructor goes about the course. So easy to follow, even though a little bit challenging as expected.
        </Comment>

        <Hr />
    </Container>
  )
}

export default FeedbackComponentCard
