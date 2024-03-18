import React, { useState } from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'

// ICONS
import averageStudent from '../../icons/Author/averageStudent.png';
import courses from '../../icons/Author/courses.png';
import followers from '../../icons/Author/followers.png';
import enrolledStudents from '../../icons/Author/enrolledStudents.png';
import OpenIcon from '../../icons/openArrow.png'

// COMPONENTS
import Sidebar from '../../components/Author/Sidebar'
import SidebarTablet from '../../components/Author/SidebarTablet';
import SidebarMobile from '../../components/Author/SidebarMobile';

import {
    BodyWrapper,
    Title,
    StatsContainer,
    StatsCard,
    StatCardIconContainer,
    StatsCardImg,
    CardDetailsContainer,
    CardTitle,
    CardNumber,
    RevenueContainer,
    RevenueTitle,
    RevenueTotalMainContainer,
    RevenueTotalContainer,
    RevenueText,
    RevenueTotal,
    ChartContainer
} from '../../styles/Author/Dashboard.style'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`
const Sidings = styled.div`
    flex-grow:1;
    background-color: white;
    z-index: 5;
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

function Dashboard() {
    const [openSidebar, setOpenSidebar ] = useState(true);
    const [openSidebarTablet,setOpenSidebarTablet] = useState(false);

  return (
    <>
        {/* TABLET SIDEBAR */}
    {openSidebarTablet === true
    ?
    <>
    <SidebarTablet setOpenSidebarTablet={setOpenSidebarTablet} as={motion.div} animate={{marginLeft:0,opacity:1}} initial={{marginLeft:'-300px'}} transition={{delay:0.0,duration:0.2}}/>
    <BackGroundCloser onClick={e => setOpenSidebarTablet(false)} as={motion.div} animate={{opacity:.3}} initial={{opacity:0}} transition={{delay:0.0,duration:0.2}}/>
    </>
    :
    <SidebarTablet setOpenSidebarTablet={setOpenSidebarTablet} as={motion.div} animate={{marginLeft:'-300px'}} initial={{marginLeft:0}} transition={{delay:0.0,duration:0.2}}/>
    }

        {/* MOBILE SIDEBAR */}
    {openSidebarTablet === true
    ?
    <SidebarMobile setOpenSidebarTablet={setOpenSidebarTablet} as={motion.div} animate={{marginLeft:0,opacity:1}} initial={{marginLeft:'-100%'}} transition={{delay:0,duration:0.2}}/>
    :
    <SidebarMobile setOpenSidebarTablet={setOpenSidebarTablet} as={motion.div} animate={{marginLeft:'-100%'}} initial={{marginLeft:0}} transition={{delay:0,duration:0.2}}/>
    }
    <Container>
        <Sidings  />
        <Wrapper>
            {openSidebar
            ?
            <Sidebar setOpenSidebar={setOpenSidebar} as={motion.div} animate={{marginLeft:0,opacity:1}} initial={{marginLeft:'-300px'}} transition={{delay:0.0,duration:0.2}}/>
            :
            <Sidebar setOpenSidebar={setOpenSidebar} as={motion.div} animate={{marginLeft:'-300px'}} initial={{marginLeft:0}} transition={{delay:0.0,duration:0.2}}/>
            }
            <MainBody>
                <RouteContainer>
                    <Route>
                        {/* FOR DESKTOP AND LAPTOP */}
                        {!openSidebar
                        ?
                        <SidebarCloseContainer onClick={e => setOpenSidebar(true)}>
                            <CloseText>Open Sidebar desktop</CloseText>
                            <CloseImg src={OpenIcon} />
                        </SidebarCloseContainer>
                        :
                        <CloserBlankDiv />
                        }
                        {/* FOR MOBILE AND TABLET */}
                        {!openSidebarTablet
                        ?
                        <SidebarCloserMobileTablet onClick={e => setOpenSidebarTablet(true)}>
                            <CloseText>Open Sidebar mobile</CloseText>
                            <CloseImg src={OpenIcon} />
                        </SidebarCloserMobileTablet>
                        :
                        <div></div>
                        }




                    <RouteTextCotnainer>
                        <RouteText>Dashboard</RouteText>
                    </RouteTextCotnainer>
                    
                    </Route>

                    <BlankDiv />
                </RouteContainer>


                <BodyWrapper>
                    <Title>Dashboard</Title>
                    <StatsContainer>
                        {/* AVERAGE STUDENT */}
                        <StatsCard>
                            <StatCardIconContainer>
                                <StatsCardImg src={followers} />
                            </StatCardIconContainer>
                            <CardDetailsContainer>
                                <CardTitle>Total number of Followers</CardTitle>
                                <CardNumber style={{color:'#F89114'}}>123,456</CardNumber>
                            </CardDetailsContainer>
                        </StatsCard>

                        {/* AVERAGE STUDENT PER MONTH */}
                        <StatsCard>
                            <StatCardIconContainer>
                                <StatsCardImg src={averageStudent} />
                            </StatCardIconContainer>
                            <CardDetailsContainer>
                                <CardTitle>Average students per month </CardTitle>
                                <CardNumber style={{color:'#009900'}}>123,456</CardNumber>
                            </CardDetailsContainer>
                        </StatsCard>
                        
                        {/* TOTAL NUMBER OF ENROLLED STUDENTS */}
                        <StatsCard>
                            <StatCardIconContainer>
                                <StatsCardImg src={enrolledStudents} />
                            </StatCardIconContainer>
                            <CardDetailsContainer>
                                <CardTitle>Total number of enrolled students</CardTitle>
                                <CardNumber style={{color:'#F8D20E'}}>123,456</CardNumber>
                            </CardDetailsContainer>
                        </StatsCard>

                        {/* TOTAL NUMBER OF COURSES */}
                        <StatsCard>
                            <StatCardIconContainer>
                                <StatsCardImg src={courses} />
                            </StatCardIconContainer>
                            <CardDetailsContainer>
                                <CardTitle>Total number of courses</CardTitle>
                                <CardNumber style={{color:'#CC0001'}}>123,456</CardNumber>
                            </CardDetailsContainer>
                        </StatsCard>
                    </StatsContainer>
                    {/* STATS CONTAINER END */}
                </BodyWrapper>
                <RevenueContainer>
                    <RevenueTitle>Revenue</RevenueTitle>

                    <RevenueTotalMainContainer>
                        {/* This month */}
                        <RevenueTotalContainer>
                            <RevenueText>This month</RevenueText>
                            <RevenueTotal>P123,456</RevenueTotal>
                        </RevenueTotalContainer>
                        {/* Last month */}
                        <RevenueTotalContainer>
                            <RevenueText>Last month</RevenueText>
                            <RevenueTotal>P123,456</RevenueTotal>
                        </RevenueTotalContainer>
                    </RevenueTotalMainContainer>
                    
                    <ChartContainer>
                        <p>React Chart</p>
                    </ChartContainer>
                </RevenueContainer>
            </MainBody>
        </Wrapper>
        <Sidings />
    </Container>
    </>
  )
}

export default Dashboard