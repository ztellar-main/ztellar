import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginSuccess } from '../../state/userSlice'
import Cookies from 'universal-cookie';



const Container = styled.div`
    width:600px;
    background-color: #E9F2F9;
    margin-left: 50%;
    margin-top: 20px;
    transform: translateX(-50%);
    border:1px solid black;
    padding:20px;
    box-sizing: border-box;
    border-radius: 15px;

    @media (max-width: 620px) {
        width:90%;
    }
    
`   

const Title = styled.p`
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #232323;
    margin-bottom: 20px;
`

const InputContainer = styled.div`

`

const Label = styled.p`

`

const Input = styled.input`
    width:100%;
    box-sizing: border-box;
    padding:10px;
    margin-bottom: 10px;
    font-size: 18px;

    @media (max-width: 450px) {
        font-size: 16px;
    }
`

const SubmitButton = styled.button`
    width:100%;
    background-color: #1A66CC;
    color:white;
    border:none;
    padding:10px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;

    &:hover{
        opacity: .5;
    }

    @media (max-width: 450px) {
        font-size: 16px;
    }
`

const CancelButton = styled.button`
    width:100%;
    background-color: #1A66CC;
    color:white;
    border:none;
    padding:10px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;

    &:hover{
        opacity: .5;
    }
    
    @media (max-width: 450px) {
        font-size: 16px;
    }
`



const AccountSettings = () => {
    const user = useSelector(state => state.user.currentUser);
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [fname, setFName] = useState(user?.fname || '')
    const [mname, setMName] = useState(user?.mname || '')
    const [lname, setLName] = useState(user?.lname || '')
    const [username, setUsername] = useState(user?.username || '')

    // console.log({fname,mname,lname,username})

    const submitButtonFunction = async() => {
        const res = await axios({
            method:"PUT",
            url:"/users/profile",
            data:{fname,mname,lname,username,token},
            include:{withCredentials:true}
        })
        dispatch(loginSuccess(res?.data))
        navigate('/')
    }


  return (
    <>
    <Container>
        <Title>Update Account</Title>
        
        {/* FIRST NAME */}
        <InputContainer>
            <Label>First Name</Label>
            <Input value={fname} placeholder='Enter your first name.' onChange={e => setFName(e.target.value)} />
        </InputContainer>
        

        {/* MIDDLE NAME */}
        <InputContainer>
            <Label>Middle Name</Label>
            <Input value={mname} placeholder='Enter your middle name' onChange={e => setMName(e.target.value)} />
        </InputContainer>

        {/* LAST NAME */}
        <InputContainer>
            <Label>Last Name</Label>
            <Input value={lname} placeholder='Enter your Last name' onChange={e => setLName(e.target.value)} />
        </InputContainer>

        {/* LAST NAME */}
        <InputContainer>
            <Label>Username Name</Label>
            <Input value={username} placeholder='Enter your Last name' onChange={e => setUsername(e.target.value)} />
        </InputContainer>

        {/* SUBMIT BUTTON */}
        <SubmitButton onClick={submitButtonFunction}>Update Account</SubmitButton>

        {/* CANCEL BUTTON */}
        <Link to='/'>
            <CancelButton>Cancel</CancelButton>
        </Link>
    
    </Container>
    </>
  )
}

export default AccountSettings
