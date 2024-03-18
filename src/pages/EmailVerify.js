import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs'
import { useQuery } from 'react-query';
import {GetRemainingTime} from '../utils/countDownTImer'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from '../state/userSlice';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';


const Wrapper = styled.div`
  width:500px;
  margin-left: calc(50% - 250px);
  margin-top: 100px;
  border:1px solid gray;
  padding:10px;
  box-sizing: border-box;
  border-radius: 20px;
`

const Title = styled.p`
  text-align: center;
  margin: 10px 0;
  font-size: 20px;
  font-weight: 500;
`

const Message = styled.p`
  text-align: center;
`

const Input = styled.input`
  width:100%;
  box-sizing: border-box;
  padding:10px;
  border-radius: 20px;
  border: 1px solid gray;
  padding-left: 25px;
  font-size: 17px;
`
const Resend = styled.p`
  margin-top: 10px;
  text-align: right;
  margin-right: 45px;
  font-size: 15px;
  text-decoration: underline;
`

const Button = styled.button`
  width:100%;
  box-sizing: border-box;
  padding:10px;
  margin-top: 20px;
  border-radius: 20px;
  border: none;
  background-color: blue;
  color:white;
  font-size: 17px;
  font-weight: 700;


  &:active{
    opacity: .5;
  }
`

const Text = styled.p`
  text-align: center;
  margin: 10px 0;
  color:red;
`

const CountDown = styled.p`
  text-align: center;
  margin: 10px 0;
  font-size: 30px;
  font-weight: 700;
`

const ResendCodeContainer = styled.div`
  position:relative;
`

const Spinner = styled.div`
   width: 24px;
   height: 24px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,#ffffff);
   background-color: red;
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
   animation: spinner-zp9dbg 1s infinite linear;
   position:absolute;
   top:calc(50% - 12px);
   right:10px;

   @keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}
`

function EmailVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.currentUser);
      const cookies = new Cookies(null, { path: '/' });

    const data = location.state;


    // useEffect(() => {
    //   data === null && navigate('/signup')
    // },[])

    // useEffect(() => {
    //   user !== null && navigate('/')
    // },[])

    const email =  data?.email
    const pass =  data?.pass
    const fname = data?.fname
    const lname = data?.lname
    const username = data?.username
    const profile_picture = data?.profile_picture
    const loginType = data?.loginType
    
    const [otp, setOtp] = useState('');
    const [textMessage, setTextMessage] = useState('')



    const Submit = async() => {
      try{  
        // dispatch(loginStart())
        const res = await axios({
          method:'post',
          url:'/users/verify-email-then-signup',
          data:{email,pass,otp,fname,lname,username,loginType},
          include:{withCredentials:true}
        })

        console.log(res)
        cookies.set('token',res?.data?.token ,{
          secure:true,
          sameSite:'None'
        }
      );

        dispatch(loginSuccess(res.data.data))
        setTextMessage('Successful')
        window.history.replaceState({}, email)
        window.history.replaceState({}, pass)
        window.history.replaceState({}, fname)
        window.history.replaceState({}, lname)
        window.history.replaceState({}, username)
        window.history.replaceState({}, profile_picture)
        window.history.replaceState({}, loginType)
        navigate('/',{state:{message:'successfully Loggedin'}})
        console.log({email,pass,otp,fname,lname,username,profile_picture,loginType})
      }catch(err){
        setTextMessage(err.response.data || err?.response?.data.message)
        // console.log(err)
      }
    }
    const ResendOtp = async() => {
      try{

        setTextMessage(null);
  

        const res = await axios({
          method:'post',
          url:'/users/resend-otp',
          data:{email},
          include:{withCredentials:true}
        })

        setTextMessage('New Otp successfully send')
      }catch(err){
        // setTextMessage(err.response.data)
        console.log(err)
      }
    }


    // COUNT DOWN TIMER
    const defaultRemainingTime = {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00'
    }

    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const { isLoading, data : time ,isError,error} = useQuery({
    queryKey: [`data`,`${remainingTime}`,`${textMessage}`],
    queryFn: async(res) => {
      res = await axios.get(`/users/get-otp-expiry?email=${email}`,{withCredentials: "include"},{withCredentials: "include"},)
      return new Date(res.data[0]?.expiredAt).getTime();
        }
    })

    useEffect(() => {
      const intervalId = setInterval(() => {
          UpdateRemainingTime(time + 2000)

      },1000)
      return () => clearInterval(intervalId)
    },[time])

    const UpdateRemainingTime = (countDown) => {
      setRemainingTime(GetRemainingTime(countDown))
    }


  return (
    <>
    <Wrapper>
      <Title>Enter your verification code</Title>
      <Message>Your verification code was sent to your email</Message>
      <CountDown>
        {remainingTime.seconds < 0 ?
        <p>Your Otp has expired</p>
        :
        <>
        {remainingTime.minutes}:{remainingTime.seconds}
        </>
        }
        </CountDown>
      <Input placeholder='Enter code here' type='number' onChange={e => setOtp(e.target.value)}/>
      <ResendCodeContainer>
        {textMessage === null ? <Spinner /> : ''}
        <Resend onClick={ResendOtp}>Resend Code</Resend>
      </ResendCodeContainer>
      
      <Button onClick={Submit}>Submit</Button>
      <Text>{textMessage}</Text>
    </Wrapper>
    </>
  )
}

export default EmailVerify
