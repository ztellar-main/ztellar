import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../state/userSlice'


// ICONS
import googleIcon from '../icons/google.png'
import sunPic from '../icons/sun.png'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width:1366px;
    max-width: 1366px;
    display: flex;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
`

const LeftContainer = styled.div`
    width:683px;
    max-width: 683px;
    height:calc(100vh - 65px);
    position:fixed;
    
    @media (max-width:683px) {
        width:100%;
    }
`

const SubBackImg = styled.img`
    height:100vh;
    object-fit: cover;
    width:100%;
`

const RightContainer = styled.div`
    width:683px;
    max-width: 683px;
    height:calc(100vh - 65px);
    position:sticky;
    left:1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;


    @media (max-width:683px) {
        width:100%;
        padding: 10px;
    }
`


const Title = styled.p`
    font-size: 25px;
    color:gray;
    margin-top: 70px;
    font-weight: 700;
    margin-bottom: 15px;
`
const Input = styled.input`
    width:100%;
    padding:20px;
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 22px;
    border:none;
    box-shadow: 0px 5px 5px gray;
    color:black;
    background-color: #E9F2F9;
    outline:none;
    padding-left: 30px;
`

const ForgotPassword = styled.p`
    color:gray;
    margin-top: 10px;

    @media (max-width:820px) {
        color: #404040;
    }
`

const LoginButton = styled.button`
    width:150px;
    padding:15px;
    background-color: #1A66CC;
    color:white;
    border-radius: 25px;
    border:none;
    margin: 15px 0;
    font-size: 17px;
    font-weight: 500;
    position:relative;
`
const OrContainer = styled.div`
    width:100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

const Hr = styled.hr`
    box-sizing: border-box;
    flex-grow: 1;
    border:none;
    border-top: 1px solid gray;
    margin:0 10px;

    @media (max-width:820px) {
        border-top: 1px solid #404040;
    }
`

const OrText = styled.p`
    margin:0 15px;
    color:gray;

    @media (max-width:820px) {
        color: #404040;
    }
`

const BottomButtonsContainer = styled.div`
    width:100%;
    color:gray;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width:500px) {
        flex-direction: column;
    }
`

const GoogleButton = styled.button`
    width:200px;
    border-radius: 22px;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    box-sizing: border-box;
    background-color: #E9F2F9;
    box-shadow: 0px 5px 5px gray;
    position:relative;

    @media (max-width:500px) {
        margin-bottom: 20px;
        width:300px;
    }
`

const FbButton = styled.button`
    width:200px;
    border-radius: 22px;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    box-sizing: border-box;
    background-color: #E9F2F9;
    box-shadow: 0px 5px 5px gray;

    @media (max-width:500px) {
        width:300px;
    }
`

const ButtonIcon = styled.img`
    width:40px;
    margin-right: 5px;
`

const LabelContainer = styled.div`
    width:100%;
`
const PasswordInputLabel = styled.p`
    color:gray;
    margin-top: 15px;
    font-size: 14px;
    margin-left:18px;
`

const TextError = styled.p`
    color:red;
    margin-bottom: 10px;
`

const Spinner = styled.div`
   width: 27px;
   height: 27px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,#ffffff);
   background-color: red;
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
   animation: spinner-zp9dbg 1s infinite linear;
   position:absolute;
   top:calc(50% - 13.5px);
   right:10px;

   @keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}
`

function SignupPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setConPass] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        user !== null && navigate('/')
    },[])

    const SignupFunction = async() => {
        try{
            setErr(' ');
            const res = await axios({
                method:'post',
                url:'/users/signup-validate',
                data:{email,pass,passConfirm},
                include:{withCredentials:true}
            })
            navigate('/email-verify',{state:{email,pass}});
        }catch(err){
            setErr(err.response.data)
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
                            url:'/user/google-login-signup',
                            data:{email,fname,lname,profile_picture,username,loginType},
                            include:{withCredentials:true}
                        })
                        if(res2.data === 'sent'){
                            return navigate('/email-verify',{state:{email,fname,lname,username,profile_picture,loginType}});
                        }
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
                <SubBackImg src={sunPic} />
                
            </LeftContainer>
            
            {/* RIGHT CONTAINER */}
            <RightContainer>
                <Title>Create your account</Title>
                {/* EMAIL */}
                <Input placeholder='Email address' onChange={e => setEmail(e.target.value)}/>
                
                {/* PASSWORD */}
                <LabelContainer>
                    <PasswordInputLabel>Password</PasswordInputLabel>
                </LabelContainer>
                
                <Input type='password' placeholder='Enter password'onChange={e => setPass(e.target.value)}/>

                {/* CONFIRM PASSWORD */}
                <LabelContainer>
                    <PasswordInputLabel>Confirm password</PasswordInputLabel>
                </LabelContainer>
                <Input type='password' placeholder='Re-Enter password' onChange={e => setConPass(e.target.value)}/>


                <ForgotPassword>Forgot Password</ForgotPassword>

                <LoginButton onClick={SignupFunction}>
                    Signup
                    {err !== ' ' ? '' : <Spinner />}

                </LoginButton>

                <TextError>{err !== '' ? err : ''}</TextError>
                    
                <OrContainer>
                    <Hr />
                    <OrText>or Login with</OrText>
                    <Hr />
                </OrContainer>

                <BottomButtonsContainer>
                    {/* Google Button */}
                    {/* Google Button */}
                    <GoogleButton onClick={googleLogin}>
                        <ButtonIcon src={googleIcon} />
                        Google
                        {googleMessage === null &&  <Spinner />}
                        
                    </GoogleButton>

                    {/* Facebook button */}
                    <FbButton>
                        <ButtonIcon src={googleIcon} />
                        Facebook
                    </FbButton>
                </BottomButtonsContainer>
            </RightContainer>
        </Wrapper>
    </Container>
  )
}

export default SignupPage