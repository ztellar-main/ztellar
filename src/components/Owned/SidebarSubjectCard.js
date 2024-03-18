import React, { useState } from 'react'
import styled from 'styled-components'

// COMPONENTS
import SidebarVideocard from './SidebarVideocard'

// ICONS
import arrowDown from '../../icons/arrowDown.svg'
import arrowUp from '../../icons/arrowUp.svg'

const Container = styled.div`
    width:100%;
    box-sizing: border-box;
    cursor: pointer;
    padding:5px;
    border-bottom: none;
    color: #383838;
    padding: 10px;
    padding-left: 20px;
`

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;


    line-height: 20px;
    color:white;

`

const PartCount = styled.p`
    /* color:white; */
    font-size: 12px;
    margin-top: 5px;
    color:white;
`

const VideoListContainer = styled.div`
    width:100%;
`

const ArrowImg = styled.img`
    width:30px;
    height:30px;
    transition: all .3s ease .3s;
    filter:invert();
    margin-left: 10px;
`

const TitleContainer = styled.div`
    /* background-color: red; */
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: space-between;


`

const SidebarSubjectCard = (props) => {
    const [videocardContainerOpener,setVideocardContainerOpener] = useState(false);

    const videosliderfunction = () => {
        if(videocardContainerOpener === true){
            setVideocardContainerOpener(false)
        }else{
            setVideocardContainerOpener(true)
        }
    }
    const recentSubjectData = props?.recentSubjectData?.subjects.find(e => {
        return e._id === props.data._id._id
    })


    

  return (
    <>
    <Container onClick={videosliderfunction}>
        <TitleContainer>
            <Title><p style={{fontWeight:'bold',display:'inline-block'}}>Subject {props.index + 1} : </p> {props.data._id.title} asd asdas asd asda asda asd a sdasdasd asd </Title>
            {videocardContainerOpener ?
            <ArrowImg src={arrowUp} />:
            <ArrowImg src={arrowDown} />
            }
            
        </TitleContainer>
        <PartCount>Parts: {props?.data?.videos.length}</PartCount>
    </Container>
    
    {videocardContainerOpener &&
    <VideoListContainer>
        {props?.data?.videos?.map((vid,i) => {
            return(
                <SidebarVideocard subjectData={props?.data?._id?.link} setSidebarCloser={props.setSidebarCloser} isFetched={props.isFetched} setPlayState={props.setPlayState} recentSubjectData={recentSubjectData} subjectIndex={props.index} count={props?.data?.videos.length} data={vid} index={i} key={i} setVideoData={props.setVideoData}  />
            )
        })}
    </VideoListContainer>
    }
    </>
  )
}

export default SidebarSubjectCard
