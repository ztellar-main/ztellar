import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { usePrevious } from "@uidotdev/usehooks";

// ICONS
import videoIcon from '../../icons/videoIcon.svg'

const Container = styled.div`
    width:100%;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: none;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-right: 10px;
`

const TopContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  color:white;
  /* margin-left: 10px; */
`

const Title = styled.div`
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;
    flex-grow: 1;
`

const VideoIcon = styled.img`
  width:20px;
  height:20px;
  margin-right: 10px;
  filter: invert();
`

const NoVideo = styled.div`
  width:100%;
  background-color: red;
`

const ProgressBar = styled.progress`
  width:100%;
  background-color:blue;
  height:10px;
  border-radius: 7px; 
  
  &::-webkit-progress-bar {
    background-color: gray;
  }
  &::-webkit-progress-value {
    background-color: #071C34;
  }
  &::-moz-progress-bar {
    /* style rules */
  }
`

const Time = styled.p`
  color:white;
`

const SidebarVideocard = (props) => {
  props.data.index = props.index
  props.data.subjectIndex = props.subjectIndex
  props.data.subjectLink = props.subjectData

  const [remainingTime,setRemainingTime] = useState('');
  
  const onClickVideoFunction = () => {
    props.setPlayState('pause')

    setTimeout(() => {
      props.setVideoData(props.data)
      
    },500)
    props.setSidebarCloser(false)
  }
  
  let recentVideoData = props.recentSubjectData?.videos.find(e => {
    return e._id === props.data._id
  })

  props.data.currentTime = recentVideoData?.current_time;

  const minutes = Math.floor(remainingTime / 60) || '00';
  const seconds = Math.floor(remainingTime - minutes * 60) === 0 ? '00' : Math.floor(remainingTime - minutes * 60) || '00';

useEffect(() => {
  if(props.isFetched){
    setRemainingTime(recentVideoData?.current_time)
  }
},[recentVideoData?.current_time])

  return (
    <>
    <Container onClick={onClickVideoFunction}>
      
    <TopContainer>
      <VideoIcon  src={videoIcon}/>
      <Title>Part {props.index + 1} : {props.data.title}  das d</Title>  
      <Time style={{marginLeft:'10px'}}>{minutes}:{seconds}</Time>
    </TopContainer>

    <ProgressBar value={!remainingTime ? 0 : remainingTime}  max={props.data?.duration} />
    </Container>
    </>
  )
}

export default SidebarVideocard
