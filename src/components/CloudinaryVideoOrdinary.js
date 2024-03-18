import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';


const CloudinaryVideoOrdinary = (props) => {
    const videoRef = useRef();
    const cloudinaryRef = useRef();

    useEffect(() => {

        if ( cloudinaryRef.current ) return;

        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'dbagrkam0',
            sourceTypes: ['hls'],
            controls:true,
        })
    },[])
    
  return (
    <>
    <video
    ref={videoRef}
    data-cld-public-id={`${props.videoLink}`}
    controls
    style={{width:'100%'}}
    height='400px'
    />
    </>
  )
}

export default CloudinaryVideoOrdinary
