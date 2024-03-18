import React, { useEffect } from 'react'
import { useState } from 'react'
import Toastify from '../Toastify'
import Cookies from 'universal-cookie';

// ICONS
import closeImg from '../../icons/close.png'
import cloudUpload from '../../icons/cloudUpload.png'
import axios from 'axios'

import {
  Container,
  MainBody,
  TitleContainer,
  Title,
  CloseContainer,
  CloseIcon,
  Input,
  SelectCategoryContainer,
  SelectCategory,
  OptionCategory,
  InputFile,
  UploadButton,
  FinalUploadButton,
  CloudUploadImg,
  TitleText,
  TitleButton,
  FileUploadMessageContainer,
  FileUploadMessage,
  Spinner,
  ErrorMessageContainer,
  ErrorMessage,
  UploadErrorHandlerContainer
} from '../../styles/Author/UploadCoursePopup.style'

function UploadCoursePopup({as,animate,initial,transition,setUploadOpener,setRefresher}) {
  const cookies = new Cookies(null, { path: '/' });
  const token = cookies.get('token');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [type, setType] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setRefresher(false);
  },[])

  // TITLE BUTTON FUNCTION
  const [titleHandler, setTitleHandler] = useState(false);
  const [titleErrorHandler, setTitleErrorHandler] = useState('');
  const titleButtonFunction = async() => {
      if(title.length < 10){
          setTitleErrorHandler('Title must be 10 and above characters.');
          return
      }
      try{
        const res = await axios({
          method:'POST',
          url:'/course/find-title',
          data:{title,token},
          include:{withCredentials:true}
        })
        setTitleErrorHandler('')
        setTitleHandler(true);
      }catch(err){
        setTitleErrorHandler(err?.response?.data?.message)
      }
  }

  // UPLOAD IMAGE FUNCTION START //
  // error handlers
  const [imageError, seTImageError] = useState('');
  const [imageLoading, setImageLoading] = useState('');

  const uploadImageFunction = async() => {
    if(!image) return
    if(!title){
      seTImageError('Please enter your course title first.')
      return
    }
    const formData = new FormData()
    formData.append('image',image)
    
    setImageLoading('loading')
    seTImageError('')
    try{
      const res = await axios({
        method:'post',
        url:`/cloudinary/course-image-upload?title=${title}&token=${token}`,
        data:formData,
        include:{withCredentials:true}
      });
      seTImageError('')
      setImageLoading('success')

      setImageUrl(res?.data?.public_id)
    }catch(err){
      setImageLoading('')
      seTImageError(err?.response?.data?.message)
    }
  }
  // UPLOAD IMAGE FUNCTION END //

  // UPLOAD VIDEO FUNCTION START //
  // error handlers
  const [videoError, setVideoError] = useState('');
  const [videoLoading, setVideoLoading] = useState('');

  const uploadVideoFunction = async() => {
    if(!video) return
    if(!title){
      setVideoError('Please enter your course title first.')
      return
    }
    const formData = new FormData()
    formData.append('vid',video)
    
    setVideoLoading('loading')
    setVideoError('')
    try{
      const res = await axios({
        method:'post',
        url:`/cloudinary/course-video-upload?title=${title}&token=${token}`,
        data:formData,
        include:{withCredentials:true}
      })
      setVideoError('');
      setVideoLoading('success');
      setVideoUrl(res?.data?.public_id)
    }catch(err){
      setVideoLoading('')
      setVideoError(err?.response?.data?.message)
    }
  }
  // UPLOAD VIDEO FUNCTION END //

  // UPLOAD ALL FUNCTION START
  const [allErrorHandler, setAllErrorHandler] = useState('');
  const [success, setSuccess] = useState(false)
  const uploadAllFunction = async() => {
    try{
      const res = await axios({
        method:'POST',
        url:'/course/create-course',
        data:{title,price,category,desc,imageUrl,videoUrl,type,token},
        include:{withCredentials:true}
      })
      setAllErrorHandler('');
      setSuccess(true);
      setRefresher(true)
      setTimeout(() => {
        setUploadOpener(false)
      },100)
    }catch(err){
      setAllErrorHandler(err?.response?.data?.message)
    }
  }

  return (
    <>
    {success && <Toastify message='Successfully uploaded!!!' />}
    
    <Container as={as} animate={animate} initial={initial} transition={transition}>
      {/* <CloudinaryImg thumbnailUrl={thumbnailUrl}/> */}

      {/* TITLE CONTAINER */}
        <TitleContainer>
          <Title>Add Course</Title>
          <CloseContainer onClick={e => setUploadOpener(false)}>
            <CloseIcon src={closeImg} />
          </CloseContainer>
        </TitleContainer>

        <MainBody>
        {/* TITLE INPUT START */}
        {!titleHandler ?
          <>
          <Input placeholder='Enter Title' onChange={e => setTitle(e.target.value)}/>
          <TitleButton onClick={titleButtonFunction}>ENTER TITLE</TitleButton>
          </>
          :
          <TitleText >Title: {title}</TitleText>
        }

        {titleErrorHandler !== '' &&
          <UploadErrorHandlerContainer>{titleErrorHandler}</UploadErrorHandlerContainer>
        }
        {/* TITLE INPUT END */}
        
        {/* DESCRIPTION INPUT */}
        <Input placeholder='Enter Course Description' onChange={e => setDesc(e.target.value)}/>

        {/* PRICE INPUT */}
        <Input type='number' placeholder='Enter Price' onChange={e => setPrice(e.target.value)}/>

        {/* CATEGORY INPUT */}
        <SelectCategoryContainer>
          <SelectCategory onChange={e => setCategory(e.target.value)}>
            <OptionCategory value='Engineering'>Engineering</OptionCategory>
            <OptionCategory value='IT'>IT</OptionCategory>
          </SelectCategory>
        </SelectCategoryContainer>

        {/* TYPE INPUT */}
        <SelectCategoryContainer>
          <SelectCategory onChange={e => setType(e.target.value)}>
            <OptionCategory value='Course'>Course</OptionCategory>
            <OptionCategory value='Event'>Event</OptionCategory>
          </SelectCategory>
        </SelectCategoryContainer>

        {/* IMAGE UPLOAD START */}
        {imageLoading === '' &&
          <>
          <InputFile type='file' onChange={e => setImage(e.target.files[0])}/>
          <UploadButton onClick={uploadImageFunction}>Upload Thumbnail</UploadButton>
          </>
        }

        {imageLoading === 'loading' &&
          <FileUploadMessageContainer>
          <FileUploadMessage>Please wait. Your image is uploading.</FileUploadMessage>
          <Spinner />
          </FileUploadMessageContainer>
        }
        
        {imageLoading === 'success' &&
          <>
          <FileUploadMessageContainer>
            <FileUploadMessage>Thumbnail was uploaded successfully !!!</FileUploadMessage>
          </FileUploadMessageContainer>
          </>
        }

        {imageError !== '' &&
          <UploadErrorHandlerContainer>{imageError}</UploadErrorHandlerContainer>
        }
        {/* IMAGE UPLOAD END */}
        
        {/* VIDEO UPLOAD START */}
        {videoLoading === '' && 
          <>
          <InputFile type='file' onChange={e => setVideo(e.target.files[0])} />
          <UploadButton onClick={uploadVideoFunction}>Upload Thumbnail</UploadButton> 
          </>
        }

        {videoLoading === 'loading' && 
          <>
          <FileUploadMessageContainer>
            <FileUploadMessage>Please wait. Your video is uploading.</FileUploadMessage>
            <Spinner />
          </FileUploadMessageContainer>
          </>
        }

        {videoLoading === 'success' && 
          <>
          <FileUploadMessageContainer>
            <FileUploadMessage>Video was uploaded successfully !!!</FileUploadMessage>
          </FileUploadMessageContainer>
          </>
        }

        {videoError !== '' &&
          <UploadErrorHandlerContainer>{videoError}</UploadErrorHandlerContainer>
        }
        {/* VIDEO UPLOAD END */}

        {/* ERROR MESSAGE */}
        {allErrorHandler !== '' &&
          <>
          <ErrorMessageContainer>
            <ErrorMessage>{allErrorHandler}</ErrorMessage>
          </ErrorMessageContainer>
          </>
        }
        {/* ERROR MESSAGE END */}

        {/* UPLOAD ALL START */}
          <FinalUploadButton onClick={uploadAllFunction}>
            <CloudUploadImg src={cloudUpload} />
              Upload
          </FinalUploadButton>
        {/* UPLOAD ALL END */}
        
      </MainBody>
    </Container>
    </>
  )
}

export default UploadCoursePopup