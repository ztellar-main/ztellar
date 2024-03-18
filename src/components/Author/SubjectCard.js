import React, { useState } from 'react'
import styled from 'styled-components'
import DeletePopup from './DeletePopup'
import VideoCard from './VideoCard'
import VideoCardPopup from './VideoCardPopup'


// ICONS
import arrowDown from '../../icons/arrowDown.png'

const Container = styled.div`
    width:100%;
    display: flex;
    padding:10px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #E9F2F9;
    justify-content: space-between;
    align-items: center;
    z-index:1;
    margin-bottom: 10px;

    @media (max-width:450px) {
      flex-direction: column;
    }
`

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-left: 10px;
  color:gray;
  cursor: pointer;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items:center;

  @media (max-width: 450px) {
    width:100%;
    margin-top: 5px;
  }
`

const Buttons = styled.button`
  white-space: nowrap;
  text-align: center;
  padding:7px 0;
  box-sizing: border-box;
  border-radius: 20px;
  margin-right:5px;
  width:70px;
  cursor:pointer;

  @media (max-width: 450px) {
    flex-grow: 1;
  }
`

const ButtonsText = styled.p`

`

const ArrowDownImg = styled.img`
  width:20px;
  height:20px;
  margin:0 5px;
  cursor:pointer;
`

const BottomContainer = styled.div`
  width:100%;
  height:300px;
  background-color: red;
`

const BackgroundCloser = styled.div`
  width:100%;
  height:100%;
  position:fixed;
  background-color: gray;
  top:0;
  left:0;
  opacity: .1;
  z-index: 9;
`

const VideoContainer = styled.div`
  width:calc(100% - 20px);
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 20px;
`

const Div = styled.div`
  flex-grow: 1;
  height:30px;
  cursor: pointer;
`

const Sam = styled.div`
  width:100%;
  height:30px;
  background-color: red;
`

function SubjectCard({datas,setRefesher,}) {
  const [deleteOpener, setDeleteOpener] = useState(false);
  const [videoSlide, setVideoSlide] = useState(false);
  const [videoPopupOpener, setVideoPopupOpener] = useState(false)


  const videoSlideFunction = (e) => {
    if(videoSlide === false){
      setVideoSlide(true)
    } else{
      setVideoSlide(false)
    }
  }

  return (
    <>
    {/* ADD VIDEO POPUP */}
    {videoPopupOpener && 
    <>
    <VideoCardPopup datas={datas} setVideoPopupOpener={setVideoPopupOpener} setVideoSlide={setVideoSlide} setRefesher={setRefesher}/>
    <BackgroundCloser onClick={e => setVideoPopupOpener(false)} />
    </>
    }
    
    {/* DELETE POPUP */}
    {deleteOpener && 
    <>
    <DeletePopup datas={datas} setDeleteOpener={setDeleteOpener} setRefesher={setRefesher} />
    <BackgroundCloser onClick={e => setDeleteOpener(false)} />
    </>
    }
    
    <Container>
      <Title onClick={videoSlideFunction}>{datas?._id?.title}</Title>

      <Div onClick={videoSlideFunction}/>

      <ButtonContainer>
        <Buttons style={{border:'1px solid #1A66CC',}}>
          <ButtonsText onClick={e => setVideoPopupOpener(true)} style={{color:'#1A66CC'}}>Add Video</ButtonsText>
        </Buttons>

        <Buttons style={{border:'1px solid #FFCC00'}}>
          <ButtonsText style={{color:'#FFCC00'}}>Edit</ButtonsText>
        </Buttons>

        <Buttons onClick={e => setDeleteOpener(true)} style={{border:'1px solid #CC0001'}}>
          <ButtonsText style={{color:'#CC0001'}}>Delete</ButtonsText>
        </Buttons>
        <ArrowDownImg src={arrowDown} onClick={videoSlideFunction}/>
      </ButtonContainer>
    </Container>

      {datas?.videos?.map((data,z) => {
        console.log(datas.videos.length)
        return(
          <VideoContainer key={z}>
            {videoSlide && <VideoCard  data={data} />}
            
          </VideoContainer>
        )
      })}
      


      
      
    

    
    </>
  )
}

export default SubjectCard