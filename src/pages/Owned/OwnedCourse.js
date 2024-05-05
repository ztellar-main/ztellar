import React, { useEffect, useRef, useState } from 'react'
import openArrow from '../../icons/openArrow.png'
import {useQuery} from 'react-query'
import styled from 'styled-components'
import Cookies from 'universal-cookie';

// COMPONENTS
import OutlineSidebar from '../../components/Owned/OutlineSidebar'
import CloudinaryVideoComponent from '../../components/CloudinaryVideoComponent'

// ICONS
import arrowOpen from '../../icons/arrowOpen.svg'
import {FaStar} from 'react-icons/fa';

import {
  Container,
  Sidings,
  MainWrapper,
  WrapperHeader,
  SideabarButton,
  OpenArrowContainer,
  OpenArrowImg,
  Title,
  WrapperBody,
  BackgroundCloser,
  VideoContainer,
  VideoMainContainer,
  BottomContainer,
  LeftContainer,
  RightContainer,
  CourseTitleContainer,
  CourseTitle,
  CourseDescription,
  CourseDescText,
  RatingsContainer,
  RatingsTextBlack,
  RatingStar,
  RatingsTopContainer,
  Spinner
} from '../../styles/Owned/OwnedCourse.style'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const StarContainer = styled.div`
    margin-left: 5px;
`

const LinkTitle = styled.p`
  font-weight: bold;
`

const OwnedCourse = () => {
  const [sidebarCloser, setSidebarCloser] = useState(false);
  const [videoData, setVideoData] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [playState, setPlayState] = useState('pause')
  const cookies = new Cookies(null, { path: '/' });
  const token = cookies.get('token');

  const [currentValue, setCurrentValue] = useState(0)
    const stars = Array(5).fill(0);
    const colors = {
        orange:"#FFD600",
        gray:"#a9a9a9"
    }

    // console.log(videoData)

    

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const courseId = query.get('courseId');

  console.log(currentValue)

  const {data:data, isLoading:dataLoading} = useQuery({
    queryKey:[courseId],
    queryFn: async() => {
      const res = await axios({
        method:'GET',
        url:`/course/get-single-owned-course?courseId=${courseId}&token=${token}`,
        include:{withCredentials:true}
      });
      setCurrentValue(Math.round(res?.data[0]?.average_rating))
      // console.log(res?.data[0]?.average_rating)
      return res?.data
    }
  })



  const {data:userData,isLoading:userLoading,isFetched} = useQuery({
    queryKey:['data',currentTime],
    queryFn: async() => {
      const res = await axios({
        method:'get',
        url:`/users/profile?token=${token}`,
        include:{withCredentials:true}
      })
      return res?.data?.course_recents
    }
  })

  if(dataLoading){
    return <Spinner />
  }



  var date = new window.Date(data[0]?.createdAt);



  return (
      <Container>
      <Sidings />
      <MainWrapper>
        {sidebarCloser 
        ?
        <>
        <OutlineSidebar courseTitle={data[0]?.title} isFetched={isFetched} setPlayState={setPlayState} courseId={courseId} userData={userData} videoData={videoData} setVideoData={setVideoData} data={data} setSidebarCloser={setSidebarCloser} style={{marginLeft:'0px',left:0}} />
        <BackgroundCloser onClick={e => setSidebarCloser(false)} />
        </>
        :
        <>
        <OutlineSidebar courseTitle={data[0]?.title} isFetched={isFetched} setPlayState={setPlayState} courseId={courseId} userData={userData} videoData={videoData} setVideoData={setVideoData} data={data} setSidebarCloser={setSidebarCloser} style={{marginLeft:'-400px',left:'-100%'}} />
        </>
        }
        {/* MAIN BODY */}
        <WrapperBody>
        {/* HEADER START */}
        <WrapperHeader>
          {!sidebarCloser ?
          <SideabarButton onClick={e => setSidebarCloser(true)}>
          Outline
          <OpenArrowContainer>
            <OpenArrowImg src={arrowOpen} />
          </OpenArrowContainer>
          </SideabarButton>
          :
          <div />
          }
          <Title><p style={{fontWeight:'bold',display:'inline-block'}}>Subject {Number(videoData.subjectIndex )+ 1}</p>  / Part {Number(videoData?.index) + 1} : {videoData?.title}</Title>
          
        </WrapperHeader>
        {/* HEADER END */}
        <VideoMainContainer key={videoData?.video_url} >
          <VideoContainer>
            <CloudinaryVideoComponent isFetched={isFetched} playState={playState} setPlayState={setPlayState} setCurrentTime={setCurrentTime} courseId={courseId} videoData={videoData} videoUrl={videoData?.video_url} />
          </VideoContainer>
        </VideoMainContainer>
        
        {/* COURSE DETAILS CONTAINER START */}
        
        <BottomContainer>
          {/* LEFT BOTTOM CONTAINER */}
          <LeftContainer>
            {/* COURSE TITLE CONTAINER */}
            <CourseTitleContainer>
              <CourseTitle>{data[0]?.title}</CourseTitle>
              <CourseDescription>Course Description</CourseDescription>
              <CourseDescText>{data[0]?.desc} </CourseDescText>
            </CourseTitleContainer>
            
            {/* VIDEO TIILE */}
            <CourseTitleContainer>
              <p>Video title: {videoData.title}</p>
            </CourseTitleContainer>

            {/* LINK COTNAINER */}
            
            {videoData?.subjectLink &&
            <>
              <CourseTitleContainer>
              <LinkTitle>Click the link to book an appointment.</LinkTitle>
              <p>Link: <a href={`${videoData?.subjectLink}`}>{videoData?.subjectLink}</a> </p>
              </CourseTitleContainer>
            </>
            }

            

            {/* COURSE OBJECTIVES */}
            {/* <CourseTitleContainer>
              <CourseDescription>Objectives</CourseDescription>
              <CourseDescText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </CourseDescText>
            </CourseTitleContainer> */}
          </LeftContainer>

          {/* RIGTH BOTTOM CONTAINER */}
          <RightContainer>
            <RatingsContainer>
              <RatingsTopContainer>
                <RatingsTextBlack style={{marginRight:'10px',fontWeight:'bold'}}>{Math.round(data[0]?.average_rating * 10) / 10} (stars)</RatingsTextBlack>
                <StarContainer>
                {stars.map((_,index) => {
                    return(
                        <FaStar 
                        key={index}
                        size='18'
                        style={{
                            marginRight:'5',
                            cursor:"pointer",
                        }}
                        color={(currentValue) > index ? colors.orange : colors.gray}
                      />
                    )
                })}
                </StarContainer>
                <RatingsTextBlack style={{marginLeft:'10px',fontWeight:'bold'}}>({data[0]?.feedback_count})</RatingsTextBlack>
              </RatingsTopContainer>

              <RatingsTopContainer>
                <RatingsTextBlack style={{color:'#6C6A6A',display:'inline-block'}}>Number of Enrolees:</RatingsTextBlack> <RatingsTextBlack style={{fontWeight:'bold', marginLeft:'10px'}}>{data[0]?.registered.length}</RatingsTextBlack>
              </RatingsTopContainer>
              
              <RatingsTextBlack style={{color:'#6C6A6A'}}>Date Published: {date.toLocaleDateString('en-US')}</RatingsTextBlack>
              
            </RatingsContainer>
            
          </RightContainer>
        </BottomContainer>

        </WrapperBody>
      </MainWrapper>
      <Sidings />
    </Container>
    
    
  )
}

export default OwnedCourse
