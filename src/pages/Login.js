import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'universal-cookie';

// ICONS
import googleIcon from '../icons/google.png'
import moonImg from '../icons/moon.png'
import { useNavigate } from 'react-router-dom'

import {
    Container,
    Wrapper,
    LeftContainer,
    RightContainer,
    SubBackImg,
    Title,
    Input,
    ForgotPassword,
    LoginButton,
    OrContainer,
    Hr,
    OrText,
    BottomButtonsContainer,
    GoogleButton,
    FbButton,
    ButtonIcon,
    Message,
    Spinner
} from '../styles/Login.style';
import { loginSuccess } from '../state/userSlice'
import { useSelector } from 'react-redux'



function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorHandler, setErrorHandler] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const cookies = new Cookies(null, { path: '/' });

    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[])

    const normalLoginFunction = async() => {
        try{
            const res = await axios({
                method:'POST',
                url:'/users/auth',
                data:{email,password},
                include:{withCredentials:true}
            })

            cookies.set('token',res?.data?.token ,{
                secure:true,
                sameSite:'None'
              }
            );
            setErrorHandler('')
            dispatch(loginSuccess(res?.data?.data))
            navigate('/')
        }catch(err){
            setErrorHandler(err.response.data.message || err.message)
        }
    }

    // GOOGLE LOGIN
    const [googleMessage, setGoogleMessage] = useState('')
    const googleLogin = useGoogleLogin({
        onSuccess: async(tokenResponse) => {
            try{
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
                {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
                })
                // dispatch(loginSuccess(res.data));
                const email = res.data.email
                const fname = res.data.given_name
                const lname = res.data.family_name
                const username = res.data.name
                const profile_picture = res.data.picture
                const loginType = 'google';

                try{
                    setGoogleMessage(null)
                    const res2 = await axios({
                        method:'post',
                        url:'/users/google-login-signup',
                        data:{email,fname,lname,profile_picture,username,loginType},
                        include:{withCredentials:true}
                    })
                    if(res2.data === 'sent'){
                        return navigate('/email-verify',{state:{email,fname,lname,username,profile_picture,loginType}});
                    }

                    cookies.set('token',res2?.data?.token ,{
                        secure:true,
                        sameSite:'None'
                      }
                    );
                    dispatch(loginSuccess(res2.data.data))
                    navigate('/',{state:{message:'successfully Loggedin'}})
                }catch(err){
                    console.log(err)
                }
            }catch(err){
                console.log(err)
            }
        }
      });
  return (
    <Container>
        <Wrapper>
            {/* LEFT CONTAINER */}
            <LeftContainer>
                <SubBackImg src={moonImg} />
            </LeftContainer>
            
            {/* RIGHT CONTAINER */}
            <RightContainer>
                <Title>Login to your account</Title>
                <Input placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />

                <ForgotPassword>Forgot Password</ForgotPassword>

                <LoginButton onClick={normalLoginFunction}>
                Login
                {/* {message == null && <Spinner />} */}
                </LoginButton>

                <Message>{errorHandler}</Message>

                <OrContainer>
                    <Hr />
                    <OrText>or login with</OrText>
                    <Hr />
                </OrContainer>

                <BottomButtonsContainer>
                    {/* Google Button */}
                    <GoogleButton onClick={googleLogin}>
                        <ButtonIcon src={googleIcon} />
                        Google
                        {googleMessage === null &&  <Spinner />}
                        
                    </GoogleButton>

                    {/* Facebook button */}
                    {/* <FbButton>
                        <ButtonIcon src={googleIcon} />
                        Facebook
                    </FbButton> */}
                </BottomButtonsContainer>

                
            </RightContainer>
        </Wrapper>
    </Container>
  )
}

export default Login