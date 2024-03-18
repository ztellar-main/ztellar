import React, { useEffect, useReducer, useRef, useState, Component  } from 'react'
import { useBeforeUnload } from "react-router-dom";
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import videojs from "video.js";
import axios from 'axios';
import Cookies from 'universal-cookie';


const Spinner = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,#ffffff);
   background-color: red;
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
   animation: spinner-zp9dbg 1s infinite linear;
    position:absolute;
    left:calc(50% - 30px);
    top:50px;


   @keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}`

const CloudinaryVideoComponent = (props) => {
  const [state, setState] = React.useState(null);
  const cookies = new Cookies(null, { path: '/' });
  const token = cookies.get('token');

  // useBeforeUnload(
  //   React.useCallback(() => {
  //     console.log('asdasdasdasd')
  //   }, [])
  // );

  // useBeforeUnload(() => {
  //   console.log('object')
  // })


    const myInterval = useRef()
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    // console.log(props?.videoData)

    // console.log(props?.videoData?.currentTime)

    const a = props.videoUrl;
    useEffect(() => {
      if(!props.videoUrl){
        return
      }else{
        if ( cloudinaryRef.current ) return;
        // TIME START
        // if(props?.videoData?.currentTime === undefined){
        //   props.setPlayState('pause')
        // }

        // videoRef.current.currentTime = 0
        // if(!videoRef.current.currentTime){
        //   videoRef.current.currentTime = props?.videoData?.currentTime
        // }

        // let b = !props?.videoData?.currentTime ? 0 : props?.videoData?.currentTime

        // videoRef.current.currentTime = props?.videoData?.currentTime


        // console.log(props?.videoData?.currentTime)

        videoRef.current.currentTime = props?.videoData?.currentTime || 0
        
        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, {
          cloud_name: 'dbagrkam0',
          sourceTypes: ['hls'],
          controls:true,
        })
      }
    },[a,props.playState]);


    const Onplay = (e) => {
      props.setPlayState('playing')
    }

    useEffect(() => {
      if(props.playState === 'playing'){
        myInterval.current = setInterval(async() => {
          const res = await axios({
            method:'put',
            url:'/course/save-video-current-time',
            data:{
              courseId: props?.courseId,
              subjectId:props?.videoData?.subject_id,
              videoId: props?.videoData?._id,
              currentTime:videoRef?.current?.currentTime,
              token
            },
            include:{withCredentials:true}
          })
  
          const res2 = await axios({
            method:'put',
            url:'/course/save-video-last-played-time',
            data:{
              courseId: props.courseId,
              currentTime: videoRef?.current?.currentTime,
              subjectIndex: props.videoData?.subjectIndex,
              videoIndex: props.videoData?.index,
              token
            },
            include:{withCredentials:true}
          });
  
          props.setCurrentTime(videoRef?.current?.currentTime);
        },10000)
      }
      
      return () => {
        console.log('stop na')
        clearInterval(myInterval.current)
      }
    },[props.playState])

    useEffect(() => {
      if(props.playState === 'pause'){
        clearInterval(myInterval.current)
      }
    },[props.playState, a ])

    const pause = () => {
      props.setPlayState('pause')
      clearInterval(myInterval.current)
    }

    // console.log(props.videoUrl)

  return (
    <>

  <>
  {!a ?
  <>
  <Spinner />
  </>
  :
  <video
  ref={videoRef}
  data-cld-public-id={`${props.videoUrl}`}
  controls
  onPlay={Onplay}
  height='400'
  style={{width:'100%'}}
  onPause={pause}
  />
  }
  </>
    </>
  )
}

export default CloudinaryVideoComponent
