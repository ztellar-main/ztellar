import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from'axios';
import Toastify from '../Toastify';
import Cookies from 'universal-cookie';

const Container = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:300px;
    background-color: white;
    box-shadow: 1px 1px 8px gray;
    padding:10px;
    box-sizing: border-box;
    z-index: 10;
`

const NoSubjectText = styled.p`

`

const Title = styled.p`
    font-size: 17px;
    margin-bottom: 10px;
`

const Instruction = styled.p`
    font-size: 15px;
    margin-bottom: 10px;
`

const Input = styled.input`
    width:100%;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid gray;
`

const ButtonContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px;
    box-sizing: border-box;
`

const Button = styled.button`
    width:100px;
    
`

const ErrorHandler = styled.div`
    color:white;
    text-align: center;
    font-size: 15px;
    background-color: red;
    padding: 5px;
    box-sizing: border-box;
`


const DeleteCoursePopup = ({title,videoUrl,imageUrl,subjectCount,courseId,setDeletePopupOpener,setRefresher}) => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const [subjectCountHandler, setSubjectCountHandler] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)

    const toDelete = [
        {

        }
    ]

    useEffect(() => {
        const res = () => {
            if(subjectCount > 0){
                setSubjectCountHandler('DELETE ALL YOUR SUBJECTS')
                return
            }
        }
        res();
    },[])

    useEffect(() => {
        setRefresher(false)
    },[])

    const deleteButtonFunction = async() => {
        if(titleInput !== title){
            setSubjectCountHandler('Title is not match.')
            return
        }

        setSubjectCountHandler('');

        try{
            setLoading(true)
            const res = await axios({
                method:'DELETE',
                url:'/course/delete-single-author-course',
                data: {subjectCount,courseId,token},
                include:{withCredentials:true}
                
            });
            try{
                const res = await axios({
                    method:'POST',
                    url:'/cloudinary/delete-course-video',
                    data: {videoUrl,imageUrl,token},
                    include:{withCredentials:true}
                })
                
                setSuccess(true);
                setTimeout(() => {
                    setRefresher(true);
                    setDeletePopupOpener(false)
                },10)
                return res
            }catch(err){
                setLoading(false)
                console.log(err)
            }
        }catch(err){
            setLoading(false)
            console.log(err)
        }
    }


  return (
    <>
    {success && <Toastify message='Successfully Deleted.' />}
    
    {!loading ? 
    <Container>
    {subjectCountHandler === 'DELETE ALL YOUR SUBJECTS' ?
        <NoSubjectText>DELETE ALL YOUR SUBJECTS.</NoSubjectText>
        :
    <>
    <Title>Title: {title}</Title>
    <Instruction>Please enter the title of this course to delete it.</Instruction>

    <Input placeholder='Enter title.' onChange={e => setTitleInput(e.target.value)} />

    <ButtonContainer>
        <Button onClick={deleteButtonFunction}>Delete</Button>
        <Button onClick={e => setDeletePopupOpener(false)}>Cancel</Button>
    </ButtonContainer>

    {subjectCountHandler !== '' && 
        <ErrorHandler>{subjectCountHandler}</ErrorHandler>
    }
    </>
    }
    </Container>
    :
    <Container>
        <p>DELETING...</p>
    </Container>
    }
    
    </>
  )
}

export default DeleteCoursePopup
