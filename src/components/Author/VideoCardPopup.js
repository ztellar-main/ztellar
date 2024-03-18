import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Toastify from '../Toastify'
import Cookies from 'universal-cookie';

const Container = styled.div`
    width:300px;
    background-color: white;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    box-shadow: 1px 1px 8px gray;
    padding:10px;
    box-sizing: border-box;
`

const Title = styled.p`
    margin-bottom: 10px;
`

const Input = styled.input`
    width:100%;
    padding:5px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-bottom: 10px;
`

const UploadButton = styled.button`
    width:100%;
    padding:5px;
    cursor:pointer;
`

const ErrorHandler = styled.div`
    width:100%;
    background-color: red;
    padding:5px;
    box-sizing: border-box;
    margin-bottom:10px;
    font-size: 14px;
`

const UploadVideoButton = styled.button`
    width:100%;
    padding:5px;
    margin-bottom: 10px;
`
const TitleEnterButton = styled.button`
    width:100%;
    padding:5px;

`

const VideoLoading = styled.div`
    width:100%;
    background-color: gray;
    padding:5px;
    box-sizing: border-box;
    margin:10px 0;
`



const VideoCardPopup = ({datas,setRefesher,setVideoSlide,setVideoPopupOpener}) => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');

    const [titleInput, setTitleInput] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const [success, setSuccess] = useState(false);
    const [video, setVideo] = useState('');
    const [duration, setDuaration] = useState('');
    const subjectId = datas?._id?._id;
    const courseId = datas?._id?.course_id;
    const courseTitle = datas?._id?.course_title;
    const subjectTitle = datas?._id?.title;

    useEffect(() => {
        setRefesher(false);
    },[])

    // INPUT ONCHANGE
    const inputOnchangeFunction = (e) => {
        setVideo(e.target.files[0])
        let dataurl = URL.createObjectURL(e.target.files[0]);
        let el = document.createElement('video');
        el.src = dataurl;
        
        el.onloadedmetadata = () => {
            setDuaration(el.duration)
        };
    }

    // ENTER TITLE BUTTON FUNCTION
    const [titleError, setTitleError] = useState('');
    const [titleHandler, setTitleHandler] = useState(false)
    const titleButtonFunction = async() => {
        const wordCount = titleInput.split(" ").length;
    
        // if(wordCount > 1){
        //     setTitleError('Title must be 30 words and below.');
        //     return;
        // }

        if(titleInput === ''){
            setTitleError('Please enter your title.');
            return;
        }

        try{
            const res = await axios({
                method:'POST',
                url:'/course/find-video-title',
                data:{titleInput,token},
                include:{withCredentials:true}
            });
            setTitleError('success')
            setTitleHandler(true)
        }catch(err){
            setTitleError(err?.response?.data?.message || err.message)
        }

    }

    // UPLOAD ALL BUTTON FUNCTION
    const [uploadAllErrorHandler, setUploadAllErrorHandler] = useState('');
    const [loading, setLoading] = useState(false);
    const uploadButtonFunction = async() => {
        try{
            setLoading(true)
            const res = await axios({
                method:'PUT',
                url:"/course/add-video-to-subject",
                data:{title:titleInput,subjectId,courseId,videoUrl,duration,token},
                include:{withCredentials:true}
            });
            setUploadAllErrorHandler('');
            setVideoSlide(true);
            setSuccess(true);
            setTimeout(() => {
                setVideoPopupOpener(false)
                setRefesher(true);
            },100)
        }catch(err){
            setLoading(false);
            setUploadAllErrorHandler(err?.response?.data?.message);
        }
    }

    // UPLOAD VIDEO BUTTON FUNCTION
    const [uploadVideoErrorHandler, setUploadVIdeoErrorHandler] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadVideoSuccess, setUploadVideoSuccess] = useState(false)
    const uploadVideoButtonFunction = async() => {
        if(titleHandler === false){
            setUploadVIdeoErrorHandler('Please enter your video title first.');
            return
        }

        if(!video){
            setUploadVIdeoErrorHandler('Please choose your video file to upload.')
            return
        }

        const formData = new FormData();
        formData.append('vid',video);

        try{
            setUploadLoading(true)
            const res = await axios({
                method:'POST',
                url:`/cloudinary/course-subject-video-upload?subjectTitle=${subjectTitle}&courseTitle=${courseTitle}&title=${titleInput}&token=${token}`,
                data:formData,
                include:{withCredentials:true}
            });
            setUploadVideoSuccess(true)
            setUploadVIdeoErrorHandler('');
            setVideoUrl(res?.data?.public_id);
        }catch(err){
            setUploadLoading(false);
            setUploadVIdeoErrorHandler(err?.response?.data?.message)
        }
    }


  return (
    <>
    {success && <Toastify message='Video successfully uploaded.' />}

    {!loading
    ?
    <Container>
        <Title>Add Video on: {datas?._id?.title}</Title>
        
        {/* TITLE INPUT START */}
        {!titleHandler && 
            <>
            <Input placeholder='Enter Title' onChange={e => setTitleInput(e.target.value)} />
            <TitleEnterButton onClick={titleButtonFunction}>Enter title.</TitleEnterButton>
            </>
        }
        
        {titleError === 'Title must be 30 words and below.' &&
            <ErrorHandler>{titleError}</ErrorHandler>
        }

        {titleError === 'Please enter your title.' &&
            <ErrorHandler>{titleError}</ErrorHandler>
        }

        {titleError === 'success' && 
            <p>Title: {titleInput}</p>
        }
        {/* TITLE INPUT END */}

        {/* UPLOAD VIDEO START */}
        {!uploadLoading ?
        <>
            <Input type='file' onChange={inputOnchangeFunction} />
            
            <UploadVideoButton onClick={uploadVideoButtonFunction}>Upload Video</UploadVideoButton>

            {uploadVideoErrorHandler !== '' && 
                <ErrorHandler>{uploadVideoErrorHandler}</ErrorHandler>
            }
        </>
        :
        uploadVideoSuccess ? 
        <VideoLoading>Video upload success.</VideoLoading>
        :
        <VideoLoading>Uploading please wait</VideoLoading>
        }
        
        {/* UPLOAD VIDEO END */} 

        <UploadButton onClick={uploadButtonFunction}>Upload</UploadButton>
        
        {uploadAllErrorHandler !== '' && 
            <ErrorHandler>{uploadAllErrorHandler}</ErrorHandler>
        }
        
    </Container>
    :
    <Container>
        <p>UPLOADING</p>
    </Container>
    }
    </>
  )
}

export default VideoCardPopup
