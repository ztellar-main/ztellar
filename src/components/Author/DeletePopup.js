import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
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
    padding:10px;
    box-sizing: border-box;
`

const Title = styled.p`
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

const Instruction = styled.p`
  margin-bottom: 10px;
`

const Input = styled.input`
  width:100%;
  padding:5px;
  box-sizing: border-box;
  margin-bottom: 10px;
`

const ButtonContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`

const Button = styled.button`
  width:100px;
  padding:5px;
  box-sizing: border-box;
`

const ErrorHandler = styled.p`
  text-align: center;
  color:red;
`

const DeletePopup = ({datas,setDeleteOpener,setRefesher}) => {
  const cookies = new Cookies(null, { path: '/' });
  const token = cookies.get('token');
  const [title, setTitle] = useState('');
  const [errorHandler, setErrorHandler] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const subjectId = datas._id._id;
  const courseId = datas._id.course_id;

  useEffect(() => {
    setRefesher(false)
  },[])

  const deleteButtonFunction = async() => {
    if(datas?._id?.title !== title){
      setErrorHandler('Subject title does not match.');
      return
    }

    

    try{
      setErrorHandler('');
      setLoading(true)
      const res = await axios({
        method:'PUT',
        url:'/course/delete-subject',
        data: {subjectId,courseId,token},
        include:{withCredentials:true}
      })
      setSuccess(true)
      setErrorHandler('');
      setTimeout(() => {
        setRefesher(true);
        setDeleteOpener(false)
      },10)
    }catch(err){
      setLoading(false)
      setSuccess(false)
      console.log(err)
    }
  }

  return (
    <>
    {success && <Toastify message='Successfully deleted.' />}
    {!loading ?
    <Container>
    <Title>Subject: {datas._id.title}</Title>
    <Instruction>Please enter the subject title to delete the subject.</Instruction>
    <Input placeholder='Enter subject Title' onChange={e => setTitle(e.target.value)} />
    <ButtonContainer>
      <Button onClick={deleteButtonFunction}>Delete</Button>
      <Button onClick={e => setDeleteOpener(false)}>Cancel</Button>
    </ButtonContainer>

    <ErrorHandler>{errorHandler}</ErrorHandler>
    </Container>
    :
    <Container>
      <p>DELETING..</p>
    </Container>
     }
    
    </>
  )
}

export default DeletePopup
