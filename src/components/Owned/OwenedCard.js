import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';

// COMPONENTS
import CloudinaryImg from '../Author/CloudinaryImg'
import LeaveRatingPopup from './LeaveRatingPopup'
import { useSelector } from 'react-redux';
import OwnedCourseCard from './OwnedCourseCard';
import OwnedEventCard from './OwnedEventCard';

const Container = styled.div`
    width:250px;
    background-color: #FCFCFC;
    border-radius: 20px;
    padding:10px;
    box-sizing: border-box;
    border:1px solid gray;
`

const ImgContainer = styled.div`
    width:100%;
    height:120px;
    background-color: gray;
    border-radius: 16px;
`

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
            line-clamp: 1;
    -webkit-box-orient: vertical;

    margin:10px 0;
    margin-bottom: 5px;
    box-sizing: border-box;
    color:#232323;

`

const Author = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
            line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 12px;
    color: #6C6A6A;
`

const FeedbackButton = styled.button`
    background-color: #1A66CC;
    border-radius: 20px;
    color:white;
    border:none;
    padding:5px 10px;
    margin-top: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    &:hover{
        opacity: .8;
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

const OwenedCard = ({data,setRefresher}) => {
    const [openRatingPopup, setOpenRatingPopup] = useState(false);

  return (
    <>
    {openRatingPopup
    &&
    <>
    <BackgroundCloser onClick={e => setOpenRatingPopup(false)} />
    <LeaveRatingPopup setRefresher={setRefresher} data={data} setOpenRatingPopup={setOpenRatingPopup} />
    </>
    }

    {data?.type === 'course'
    ?
    <OwnedCourseCard data={data} setRefresher={setRefresher} setOpenRatingPopup={setOpenRatingPopup}/>
    :
    <OwnedEventCard data={data} setRefresher={setRefresher} setOpenRatingPopup={setOpenRatingPopup} />
    }


    
    

    


    
    
    </>
  )
}

export default OwenedCard
