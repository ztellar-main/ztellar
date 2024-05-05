import React, { useState,useEffect } from 'react'
import styled from 'styled-components'

// ICONS
import close from '../../icons/close.png'
import arrowDown from '../../icons/arrowDown.svg'
import arrowUp from '../../icons/arrowUp.svg'
import videoIcon from '../../icons/videoIcon.svg'
import arrowClose from '../../icons/arrowClose.svg'

// COMPONENTS
import SidebarSubjectCard from './SidebarSubjectCard'

import {
    Container,
    TopContainer,
    CloseImg,
    BottomContainer,
    VideoListContainer,
    TitleContainer,
    Title,
    TitleMainContainer
} from '../../styles/Owned/Components/OutlineSidebar.style'

const OutlineSidebar = ({style,setSidebarCloser,data,setVideoData,videoData,userData,courseId,setPlayState,isFetched,courseTitle}) => {

  const recentSubjectData = userData?.find(e => {
    return e._id === courseId
  })
  let subjectIndex = recentSubjectData?.resume?.split('/')[0] || 0
  let videoIndex = recentSubjectData?.resume?.split('/')[1] || 0
  let currentTime = recentSubjectData?.resume?.split('/')[2] || 0

  // console.log(recentSubjectData)

  // DI PWEDE WALANG LAMAN NA VIDEO

    useEffect(() => {
      const res = async() => {
          if(!videoData){
            let res = data[0]?.subjects[0]?.videos[0];
 
              res.subjectIndex = subjectIndex
              res.index = videoIndex;
              res.currentTime = currentTime;
            

            await setVideoData(res)

          }else{
            // console.log('meron')
          }
        }

        if(isFetched){
          res()
        }
    },[videoData,isFetched])

  return (
    <>
    <Container style={style}>
        <TopContainer>
            Outline
            <CloseImg src={arrowClose} onClick={e => setSidebarCloser(false)} />
        </TopContainer>
        <TitleMainContainer>
          <TitleContainer>
            <p style={{fontWeight:'bold',display:'inline-block'}}>Course Outline  - </p> {courseTitle}
          </TitleContainer>
        </TitleMainContainer>
        
        <BottomContainer>
          {data[0]?.subjects.map((sub,i) => {
            return(
              <SidebarSubjectCard setSidebarCloser={setSidebarCloser} isFetched={isFetched} setPlayState={setPlayState} recentSubjectData={recentSubjectData} key={i} index={i} data={sub} setVideoData={setVideoData} />
            )
          })}
          
        </BottomContainer>
    </Container>
    </>
  )
}

export default OutlineSidebar
