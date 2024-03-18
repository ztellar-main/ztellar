import React, { useState } from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import {useLocation, useSearchParams} from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Toastify from '../../components/Toastify'
import Cookies from 'universal-cookie';
// ICONS
import OpenIcon from '../../icons/openArrow.png'

// COMPONENTS
import Sidebar from '../../components/Author/Sidebar'
import SubjectCard from '../../components/Author/SubjectCard'
import AddSubjectPopup from '../../components/Author/AddSubjectPopup'

import {
    BodyWrapper,
    PageTitle,
    HeaderCardContainer,
    CourseImgContainer,
    DetailsContainer,
    CourseTitleContainer,
    CourseDescContainer,
    CourseImg,
    AddSubjectContainer,
    AddSubButton
} from '../../styles/Author/CourseSetup.style'


const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`
const Sidings = styled.div`
    flex-grow:1;
    background-color: white;
    z-index: 9;
`
const Wrapper = styled.div`
    width:1366px;
    max-width: 1366px;
    display:flex;
`
const MainBody = styled.div`
    flex-grow: 1;
    padding:0 10px;
    box-sizing: border-box;
    position:relative;
`
const RouteContainer = styled.div`
    width:100%;
    background-color: white;
    position: sticky;
    top:65px;
    left:0;

    @media (max-width:450px) {
        top:55px;
    }
`
const Route = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
`
const BlankDiv = styled.div`
    width:100%;
    height:10px;
`
const SidebarCloseContainer = styled.div`
    height:40px;
    display:flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    border:1px solid gray;
    border-radius: 3px;
    cursor:pointer;
  
    &:hover{
        background-color: lightgray;
    }
    &:active{
        scale:.95;
    }
    @media (max-width:925px){
        display: none;
    }
`
const CloseText = styled.p`
    font-size:15px;
`
const CloseImg = styled.img`
    width:30px;
    height:30px;
`
const RouteText = styled.p`
    font-size: 20px;
    color:gray;  

    @media (max-width:430px) {
        font-size: 17px;
    }

    @media (max-width:313px) {
        font-size: 15px;
    }
`
const RouteTextCotnainer = styled.div`
    height:40px;
    display:flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 3px;
    cursor:pointer;
`
const SidebarCloserMobileTablet = styled.div`
    height:40px;
    display:flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    border:1px solid gray;
    border-radius: 3px;
    cursor:pointer;

    &:hover{
        background-color: lightgray;
    }
    &:active{
        scale:.95;
    }
    @media (min-width:925px){
        display: none;
    }
`
const CloserBlankDiv = styled.div`
    @media (max-width:925px) {
        display: none;
    }
`
const BackGroundCloser = styled.div`
    width:100%;
    height:100%;
    position:fixed;
    background-color: gray;
    opacity:.3;
    z-index: 3;

    @media (min-width:800px) {
        display: none;
    }
    @media (max-width:450px) {
        display: none;
    }
`

const PopupBackgroundCloser = styled.div`
    width:100%;
    height:100%;
    position:fixed;
    background-color: gray;
    opacity:.3;
    z-index: 3;
`

function CourseSetup() {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const [openSidebar, setOpenSidebar ] = useState(true);
    const [openSidebarTablet,setOpenSidebarTablet] = useState(false);
    const [openSubjectPopup, setOpenSubjectPopup] = useState(false);
    const [refresher, setRefesher] = useState(false)

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const courseId = query.get('course-id');

    const {data,isLoading} = useQuery({
        queryKey: ['subjects',refresher],
        queryFn: async() => {
            const res = await axios({
                method:'GET',
                url:`/course/get-single-author-course?courseId=${courseId}&token=${token}`,
                include:{withCredentials:true}
            })
            return res?.data[0];
        }
    })

    const Loading = () => {
        if(isLoading){
            return <p>LOADING...</p>
        }
    }



  return (
    <>
    {/* POPUP ADD SUBJECT */}
    {openSubjectPopup
    ?
    <>
    <AddSubjectPopup courseTitle={data?.title} courseId={courseId} setRefesher={setRefesher} setOpenSubjectPopup={setOpenSubjectPopup} as={motion.div} animate={{opacity:1,scale:1}} initial={{opacity:0,scale:.95}} transition={{delay:0,duration:0.2}}/>
    <PopupBackgroundCloser onClick={e => setOpenSubjectPopup(false)} as={motion.div} animate={{opacity:.2}} initial={{opacity:0}} transition={{delay:0,duration:0.2}}/>
    </>
    :
    ''
    }
    
    <Container>
        <Sidings  />
        <Wrapper>
            {openSidebar
            ?
            <Sidebar setOpenSidebar={setOpenSidebar} style={{marginLeft:'0'}}/>
            :
            <Sidebar setOpenSidebar={setOpenSidebar} style={{marginLeft:'-300px'}}/>
            }
            <MainBody>
                <RouteContainer>
                    <Route>
                        {/* FOR DESKTOP AND LAPTOP */}
                        {!openSidebar
                        ?
                        <SidebarCloseContainer onClick={e => setOpenSidebar(true)}>
                            <CloseText>Open Sidebar</CloseText>
                            <CloseImg src={OpenIcon} />
                        </SidebarCloseContainer>
                        :
                        <CloserBlankDiv />
                        }
                        {/* FOR MOBILE AND TABLET */}
                        {!openSidebarTablet
                        ?
                        <SidebarCloserMobileTablet onClick={e => setOpenSidebarTablet(true)}>
                            <CloseText>Open Sidebar</CloseText>
                            <CloseImg src={OpenIcon} />
                        </SidebarCloserMobileTablet>
                        :
                        <div></div>
                        }
                    <RouteTextCotnainer>
                        <RouteText>add-course/course-setup</RouteText>
                    </RouteTextCotnainer>
                    </Route>
                    <BlankDiv />


                </RouteContainer>
                {/* START HERE */}
                <BodyWrapper>   
                    <PageTitle>Setup Course</PageTitle>
                    <HeaderCardContainer>
                        <CourseImgContainer>
                            {/* <CourseImg src={mean} /> */}
                        </CourseImgContainer>
                        <DetailsContainer>
                            <CourseTitleContainer>
                            The Python Bootcamp 2023
                            </CourseTitleContainer>
                            <CourseDescContainer>
                            domised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on
                            </CourseDescContainer>
                        </DetailsContainer>

                    </HeaderCardContainer>
                    
                    {/* ADD SUBJECT CONTAINER*/}
                    <AddSubjectContainer>
                        <AddSubButton onClick={e => setOpenSubjectPopup(true)}>Add Subject</AddSubButton>
                    </AddSubjectContainer>
                    
                    {/* {isLoading && } */}
                    {data?.subjects?.map((datas,i) => {
                            return(
                                <SubjectCard key={i} datas={datas} setRefesher={setRefesher} />
                            )
                    })}
                    <Loading />
                </BodyWrapper>
            </MainBody>
        </Wrapper>
        <Sidings />
    </Container>
    </>
  )
}

export default CourseSetup