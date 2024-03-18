import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import CloudinaryImg from './Author/CloudinaryImg'

// ICONS
import { logout } from '../state/userSlice'
import axios from 'axios'

const Container = styled.div`
    width:300px;
    position:absolute;
    box-shadow: -1px 1px 8px 1px #1A66CC;
    top:75px;
    padding:10px;
    box-sizing: border-box;
    border-top:1px solid #1A66CC;
    border-right:1px solid #1A66CC;
    border-radius: 0 0 0 20px;
    background-color: white;
    right:10px;
    z-index: 2;

    @media (max-width:800px){
      display:none;
    }
`

const TopContainer = styled.div`
    width:100%;
    background-color: #1A66CC;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius:3px;
`

const UserIconContainer = styled.div`
    width:100px;
    height:100px;
    margin: 10px 0;
    border-radius: 50%;
    border:5px solid white;
    background-color: gray;
`

const UserIcon = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`
const Username = styled.p`
    color:white;
    font-size: 20px;
`

const Gmail = styled.p`
    color:lightgray;
    font-size: 15px;
    margin-bottom: 10px;
`

const Hr = styled.hr`
    width:100%;
    border:0;
    border-bottom: 1px solid #1A66CC;
    margin:15px 0;
    box-sizing: border-box;
`
const Links = styled.div`
    width:100%;
    margin-bottom: 5px;
    padding:10px;
    box-sizing: border-box;
    cursor: pointer;
    border:1px solid #1A66CC;
    border-radius:3px;
    background-color: #CDDDF4;

    &:hover{
        background-color: #1A66CC;
        color:white;
    }

    &:active{
        background-color: #CDDDF4;
        color:black;
    }
`
const LinkTitle = styled.p`
    text-align: center;
`

const LogoutButton = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    cursor: pointer;
    border:1px solid #1A66CC;
    background-color: #1A66CC;
    color:white;

    border-radius: 3px 3px 3px 18px;

    &:hover{
        background-color: #1A66CC;
        color:white;
    }

    &:active{
        background-color: #CDDDF4;
        color:black;
    }
`

const BackgroundCloser = styled.div`
    width:100%;
    height:100vh;
    background-color: black;
    z-index: 19;
    position: fixed;
    top:0;
    left:0;
    opacity:.4;
`

function DropDownContainerPopup({as,animate,initial,transition,user_data,setOpenDropdownContainer,setRestrictPopup}) {
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            dispatch(logout())
            setOpenDropdownContainer(false)
            cookies.remove('token')
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    const restrictPopupFunction = () => {
        setRestrictPopup(true);
        setOpenDropdownContainer(false)
    }
  return (
    <>
    <Container as={as} animate={animate} initial={initial} transition={transition}>
        <TopContainer>
            <UserIconContainer>
                {/* <UserIcon src={userIcon} /> */}
                <CloudinaryImg imageUrl='ztellar/ztellar/pzoz9wj3y3onkg62dcdx' height='100' width='100' heightMain='100%' boxSizing='border-box' widthMain='100%'  borderRadius='50%' border='2px solid #2B6EC1' />
            </UserIconContainer>
            
            <Username>{user?.fname} {user?.lname}</Username>
            <Gmail>{user?.email}</Gmail>
        </TopContainer>
        
        <Hr />

        <Link to='/owned' style={{textDecoration:'none',color:'black'}} onClick={e => setOpenDropdownContainer(false)}>
            <Links>
                <LinkTitle>Acquired Courses and Events</LinkTitle>
            </Links>
        </Link>
        


        {user?.role !== 'superAuthorUser'
        ?

            <Links onClick={restrictPopupFunction}>
                <LinkTitle>Author Dashboard</LinkTitle>
            </Links>

        :
        <Link onClick={e => setOpenDropdownContainer(false)} to='/author/add-course' style={{textDecoration:'none',color:'black'}}>
            <Links>
                <LinkTitle>Author Dashboard</LinkTitle>
            </Links>
        </Link>
        }

        
        <Link onClick={e => setOpenDropdownContainer(false)} to='/settings/account-settings' style={{textDecoration:'none',color:'black'}}>
            <Links>
                <LinkTitle>Account Settings</LinkTitle>
            </Links>
        </Link>

        <Hr />

        <LogoutButton onClick={LogoutFunction}>
            <LinkTitle>Logout</LinkTitle>
        </LogoutButton>

    </Container>
    </>
  )
}

export default DropDownContainerPopup