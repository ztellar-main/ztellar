import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Toastify from '../Toastify'
import Cookies from 'universal-cookie';

// ICONS
import closeIcon from '../../icons/close.png'
import axios from 'axios'

const Container = styled.div`
    width:700px;
    background-color: #02093B;
    border-radius: 20px;
    position:fixed;
    z-index: 8;
    margin-left: calc(50vw - 350px);
    padding:10px;
    box-sizing: border-box;
    margin-top: 100px;

    @media (max-width:750px) {
        width:90%;
        margin-left: 5%;
    }
`

const Title = styled.div`
    color:white;
    text-align: center;
    font-size: 20px;
    padding:10px;
    box-sizing: border-box;
    font-weight: 700;
`

const TitleInput = styled.input`
    width:100%;
    box-sizing: border-box;
    padding:10px 20px;
    border-radius: 20px;
    font-size: 15px;
    border:1px solid #1A66CC;
    outline: none;
    margin-bottom: 10px;
`

const Button = styled.button`
    width:100%;
    padding:10px;
    background-color: #9747FF;
    margin: 10px 0;
    border: none;
    border-radius: 20px;
    font-size: 17px;
    color:white;
    font-weight: 500;
    cursor: pointer;

    &:hover{
        opacity: .7;
    }

    &:active{
        opacity: 1;
    }
`

const CloseImg = styled.img`
    width:25px;
    height:25px;
    position:absolute;
    top: 15px;
    right:15px;
    filter:invert();
    cursor:pointer;
    border:2px solid black;
    border-radius: 50%;
    padding:2px;
    box-sizing: border-box;
`

const ErrorHandlerContainer = styled.div`
    width:100%;
    padding: 5px;
    color:white;
    background-color: red;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`

function AddSubjectPopup({setOpenSubjectPopup,as,animate,initial,transition,courseId,setRefesher,courseTitle}) {
    const [title,setTitle] = useState('');
    const [link, setLink] = useState('');
    const [success, setSuccess] = useState('');
    const [errorHandler, setErrorHandler] = useState('');
    const [loading, setLoading] = useState(false)

    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');

    useEffect(() => {
        setRefesher(false);
    },[])

    const addSubjectButtonFunction = async() => {
        if(!title){
            setErrorHandler('Please enter your title first.')
            return
        }
        try{
            setLoading(true)
            const res = await axios({
                method:'POST',
                url:'/course/add-subject-to-course',
                data:{title,courseId,courseTitle,link,token},
                include:{withCredentials:true}
            })
            setSuccess(true);
            setTimeout(() => {
                setRefesher(true);
                setOpenSubjectPopup(false)
            },10)
            
        }catch(err){
            setLoading(false)
            setSuccess(false)
            setErrorHandler(err.response.data.message || err.message)
        }
    }
  return (
    <>
    {success && <Toastify message='Subject Successfully added.' />}
    {!loading ?
        <Container as={as} animate={animate} initial={initial} transition={transition}>
        <Title>Add Subject</Title>
        <TitleInput placeholder='Enter title' onChange={e => setTitle(e.target.value)}/>
        <TitleInput placeholder='Enter your appointment link.' onChange={e => setLink(e.target.value)}/>
        <Button onClick={addSubjectButtonFunction}>Add Subject</Button>
        <CloseImg src={closeIcon} onClick={e => setOpenSubjectPopup(false)}/>
        
        {errorHandler !== '' &&
            <ErrorHandlerContainer>{errorHandler}</ErrorHandlerContainer>
        }
        </Container>
        :
        <Container>
            <Title>Uploading</Title>
        </Container>
    }
    </>
  )
}
export default AddSubjectPopup