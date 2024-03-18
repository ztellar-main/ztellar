import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// COMPONENTS
import CloudinaryImg from '../Author/CloudinaryImg'
import { useSelector } from 'react-redux'
import LeaveRatingPopup from './LeaveRatingPopup'
import ViewRatingPopup from './ViewRatingPopup'


const Container = styled.div`
    height:292px;
    margin-bottom: 5px;
    position:relative;

    @media (max-width: 1366px){
        height: 216px;
    }
`

const ImageContainer = styled.div`
    width:100%;
    height: 210px;
    z-index: 1;
    background-color: lightgray;
    border-radius: 15px;
    border:1px solid black;
    box-sizing: border-box;

    @media (max-width: 1366px){
        height: 160px;
    }
`

const DetailsContainer = styled.div`
    width:90%;
    background-color: #E9F2F9;
    margin-left: 5%;
    border-radius: 15px;
    position:absolute;
    top:150px;
    border:1px solid black;
    box-sizing: border-box;
    padding:10px 15px;

    @media (max-width: 1366px){
        top:110px;
    }
    
`

const Title = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 3px;

    

    @media (max-width: 1366px){
        font-size: 12px;
    }
`

const Author = styled.p`
    font-size:14px;
    color:#232323;
    margin-bottom: 3px;

    @media (max-width: 1366px){
        font-size: 10px;
    }
`

const Button = styled.button`
    width:80%;
    margin-left: 10%;
    border-radius: 20px;
    background-color: #1A66CC;
    border:none;
    color:white;
    padding:5px;

    font-size: 16px;
    margin-top: 20px;

    cursor: pointer;

    &:hover{
        opacity:.5;
    }

    @media (max-width: 1366px){
        font-size: 10px;
        margin-top: 10px;
    }
`

const TypeContainer = styled.div`
    width:90px;
    z-index: 2;
    position: absolute;
    top:1px;
    right:15px;

    @media (max-width: 1366px){
        width:70px;
    }
`

const Rec = styled.div`
  width:90px;
  height:30px;
  background-color: #1A66CC;
  position:relative;
  @media (max-width: 1366px){
        width:70px;
        height:20px;
    }
`

const Arrow = styled.div`
  width: 0; 
  height: 0; 
  border-left: 45px solid transparent;
  border-right: 45px solid transparent;
  
  border-top: 15px solid #1A66CC;
  @media (max-width: 1366px){
    border-left: 35px solid transparent;
  border-right: 35px solid transparent;
    }
`

const TypeText = styled.p`
    position:absolute;
    font-size: 14px;
    top:8px;
    margin-left: 50%;
    transform: translateX(-50%);
    color:white;

    @media (max-width: 1366px){
        font-size: 10px;
    }
`

const BackgroundCloser = styled.div`
    width:100%;
    height:100vh;
    background-color: black;
    z-index: 19;
    position: fixed;
    top:0;
    left:0;
    opacity:.4;
`

const OwnedEventCard = ({data,setRefresher}) => {
  const user = useSelector(state => state.user.currentUser);
  const [openRatingPopup, setOpenRatingPopup] = useState(false);
  const [openViewRating, setOpenViewRating] = useState(false)

  const feedbackExist = data?.feedback?.find(e => {
    return e.user === user._id
})

  var date = new window.Date(data?.createdAt);
  return (
    <>
    {openRatingPopup && 
    <>
    <LeaveRatingPopup data={data} setRefresher={setRefresher} setOpenRatingPopup={setOpenRatingPopup} />
    <BackgroundCloser onClick={e => setOpenRatingPopup(false)} />
    </>
    }

    {openViewRating && 
    <>
    <ViewRatingPopup data={feedbackExist} setOpenViewRating={setOpenViewRating} />
    <BackgroundCloser onClick={e => setOpenViewRating(false)} />
    </>
    }


    <Container>
        <Link to={`/owned/event/?eventId=${data?._id}`}>
        {/* IMAGE CONTAINER */}
        <ImageContainer>
            <CloudinaryImg imageUrl={data?.image_url} width='1280' height='720' widthMain='100%' heightMain='100%' objectFit='cover' borderRadius='15px' />
        </ImageContainer>

        {/* TYPE CONTAINER */}
        <TypeContainer>
                <Rec>
                    <TypeText>{data?.type}</TypeText>
                </Rec>
                <Arrow />
        </TypeContainer>
        </Link>

        {/* DETAILS CONTAINER */}
        <DetailsContainer>
            <Link to={`/owned/event/?eventId=${data?._id}`} style={{textDecoration:"none"}}>
            {/* TITLE */}
            <Title>{data?.title}</Title>

            {/* AUTHOR */}
            <Author><i>By</i> {data?.author_id?.username}</Author>

            {/* DATE PUBLLISHED */}
            <Author><i>Published</i> {date.toLocaleDateString('en-US')}</Author>
            </Link>

            {!feedbackExist 
            ?
            <Button onClick={e => setOpenRatingPopup(true)}>Leave rating</Button>
            :
            <Button onClick={e => setOpenViewRating(true)}>View rating</Button>
            }

            
        </DetailsContainer>

        

    </Container>
    </>
  )
}

export default OwnedEventCard
