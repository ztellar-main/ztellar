import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import CloudinaryImg from './Author/CloudinaryImg'

// ICONS
import closeIcon from '../icons/close.png'
import axios from 'axios'
import { logout } from '../state/userSlice'
// import { BottomContainer } from '../styles/ViewCourse.style'

const Container = styled.div`
    width:100%;
    height:calc(100vh - 1px);
    position:absolute;
    top:1px;
    background-color: white;
    display:flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    @media (min-width:800px) {
        display:none;
    }

    @media (max-width:450px) {
        width:100%;
    }

`

const TopContainer = styled.div`
    width:100%;
    background-color: #1A66CC;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CloseContainer = styled.div`
    width:40px;
    height:40px;
    position:absolute;
    right:15px;
    top:15px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    &:active{
        background-color: green;
    }
`
const CloseImg = styled.img`
    width:30px;
    filter:invert();
`

const UserImage = styled.img`
    width:170px;
    height:170px;
    background-color: green;
    border-radius: 50%;
    margin-top: 40px;
    border:10px solid white;
    margin-bottom:15px;
`

const Username = styled.p`
    color:white;
    font-size: 30px;
`

const Email = styled.p`
    color:lightgray;
    font-size: 15px;
    margin-bottom: 20px;;
`

const Hr = styled.hr`
    width:100%;
    border-top: 1px solid #1A66CC;
    margin:20px 0;
`
const LinksMainContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LinksContainer = styled.div`
    width:100%;
    margin-top:10px;
    border: 1px solid #1A66CC;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:15px;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: white;
`


const LinksText = styled.p`
    font-size: 18px;
`

const HomeAboutContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`

const HomeAbourButton = styled.div`
    width:95%;
    border: 1px solid #1A66CC;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:15px;
    border-radius: 3px;
    box-sizing: border-box;
`

const LogoutButton = styled.div`
    width:100%;

    border: 1px solid #1A66CC;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:15px;
    border-radius: 3px;
    box-sizing: border-box;
    margin-bottom: 20px;
`

const BottomContainer = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
`






function MobileIconSlide({setOpenMobileIconSlide,as,animate,initial,transition,setRestrictPopup}) {
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cookies = new Cookies(null, { path: '/' });


    // LOGOUT
    const LogoutFunction = async() => {
        try{
            const res = await axios({
                method:'POST',
                url:'/users/logout',
               include:{withCredentials:true}
            })
            console.log(res)
            cookies.remove('token')
            dispatch(logout())
            setOpenMobileIconSlide(false)
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    const restrictPopupFunction = () => {
        setRestrictPopup(true);
        setOpenMobileIconSlide(false)
    }


  return (
    <Container as={as} animate={animate} initial={initial} transition={transition}>
        <TopContainer>
            <CloseContainer onClick={e => setOpenMobileIconSlide(false)}>
                <CloseImg src={closeIcon}/>
                
            </CloseContainer>
            {/* USER ICON */}
            <CloudinaryImg imageUrl='ztellar/ztellar/pzoz9wj3y3onkg62dcdx' marginTop='30px' height='100' width='100' heightMain='100%' boxSizing='border-box' widthMain='140px'  borderRadius='50%' border='4px solid black' />
            <Username>{user?.fname} {user?.lname}</Username>
            <Email>{user?.email}</Email>
        </TopContainer>

        {/* <LinksMainContainer>
            <Link to='/owned' style={{width:'100%'}} onClick={e => setOpenMobileIconSlide(false)}>
                <LinksContainer>
                    <LinksText>Enrolled Courses</LinksText>
                </LinksContainer>
            </Link>
            
            {user?.role !== 'superAuthorUser'
            ?
            <LinksContainer style={{marginLeft:'0'}} onClick={restrictPopupFunction}>
                <LinksText>AuthorDashboard</LinksText>
            </LinksContainer>
            :
            <Link to='/author/add-course' style={{width:'100%'}} onClick={e => setOpenMobileIconSlide(false)}>
            <LinksContainer>
                <LinksText>AuthorDashboard</LinksText>
            </LinksContainer>
            </Link>
            }
            
            <Link onClick={e => setOpenMobileIconSlide(false)} to='/settings/account-settings' style={{textDecoration:'none',width:'100%'}}>
                <LinksContainer>
                    <LinksText>Account Settings</LinksText>
                </LinksContainer>
            </Link>

        </LinksMainContainer>



        <Hr />

        

        <Hr /> */}

        <BottomContainer>
            <Link style={{textDecoration:'none',width:'100%',color:'black'}} onClick={e => setOpenMobileIconSlide(false)} to='/owned'>
                <LinksContainer>
                    <LinksText>Acquired Courses and Events</LinksText>
                </LinksContainer>
            </Link>

            {user?.role !== 'superAuthorUser'
            ?
            <LinksContainer style={{marginLeft:'0'}} onClick={restrictPopupFunction}>
                <LinksText>AuthorDashboard</LinksText>
            </LinksContainer>
            :
            <Link style={{textDecoration:'none',width:'100%',color:'black'}} onClick={e => setOpenMobileIconSlide(false)} to='/author/add-course' >
                <LinksContainer>
                    <LinksText>Author Dashboard</LinksText>
                </LinksContainer>
            </Link>
            }



            <Link style={{textDecoration:'none',width:'100%',color:'black'}} onClick={e => setOpenMobileIconSlide(false)} to='/settings/account-settings'>
                <LinksContainer>
                    <LinksText>Account Settings</LinksText>
                </LinksContainer>
            </Link>

            <Hr />

            <HomeAboutContainer>
            <Link style={{textDecoration:'none',width:'100%',color:'black'}} onClick={e => setOpenMobileIconSlide(false)} to='/'>
                <HomeAbourButton>
                    <LinksText>Home</LinksText>
                </HomeAbourButton>
            </Link>

            <HomeAbourButton>
                <LinksText>About Us</LinksText>
            </HomeAbourButton>
            </HomeAboutContainer>

            <Hr />

            {/* LOGOUT BUTTON */}
            <LogoutButton onClick={LogoutFunction}>
                <LinksText>Logout</LinksText>
            </LogoutButton>
            
        </BottomContainer>

        
        



    </Container>
  )
}

export default MobileIconSlide