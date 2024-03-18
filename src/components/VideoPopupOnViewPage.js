import React from 'react'
import styled from 'styled-components'

import videoSample from '../icons/videoSample.js.mp4'
import close from '../icons/close.png'
import CloudinaryVideoComponent from './CloudinaryVideoComponent';

const Container = styled.div`
    width:800px;
    background-color: black;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:10px;
    box-sizing: border-box;
    z-index: 30;
    box-shadow: 1px 1px 8px black;


    @media (max-width:800px) {
        width:100%;
    }
`

const CloserContainer = styled.div`
    width:30px;
    height:30px;
    top:20px;
    right:20px;
    position:absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width:400px) {
        width:20px;
        height:20px;
    }
`

const CloserImg = styled.img`
    width:100%;
    height:100%;
    border: 2px solid black;
    border-radius: 50%;
    filter: invert();
    cursor:pointer;
`

const VideoPopupOnViewPage = ({setVideoOpener,videoUrl}) => {
  return (
    <>
    <Container>
    <CloudinaryVideoComponent width={'100%'} height={'auto'} videoUrl={videoUrl} />
    <CloserContainer onClick={e => setVideoOpener(false)}>
        <CloserImg src={close} />
    </CloserContainer>
    </Container>
    </>
  )
}

export default VideoPopupOnViewPage
