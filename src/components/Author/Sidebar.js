import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// ICONS
import dashboardIcon from '../../icons/Author/dashboard.png'
import addcourseIcon from '../../icons/Author/AddCourse.png'
import CloseIcon from '../../icons/close.png'


const Container = styled.div`
    width:300px;
    height:calc(100vh - 65px);
    top:65px;
    background-color: #E9F2F9;
    padding:10px;
    box-sizing: border-box;
    min-width: 300px;
    position:sticky;
    transition: all .1s ease 0s;
    margin-left: 0;
    z-index:8;
    

    @media (max-width:925px) {
       position:fixed;
    }

    @media(max-width:450px){
        width:100%;
        top:55px;
        height:calc(100vh - 55px);
        left:-100%;
    }
`

const TopContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid gray;
    margin-bottom: 5px;

`
const AdminIconContainer = styled.div`
    width:80px;
    height:80px;
    background-color: gray;
    border-radius: 50%;
    margin:10px 0;
`
const TopText = styled.p`
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
`

const LinkContainers = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    display:flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 25px;
    font-size: 17px;
    transition:all .2s ease .2s;

    &:hover{
        background-color: lightblue;
        font-size:18px;
    }
`

const LinkIcon = styled.img`
    width:30px;
    height:30px;
    margin-right: 10px;
    margin-left: 25px;

`

const LinkText = styled.p`
    font-weight: 500;

`

const CloseImgContainer =styled.div`
    width:35px;
    height:35px;
    position: absolute;
    top:10px;
    right:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;

    &:active{
        background-color: gray;
    }
`

const CloseImg = styled.img`
    width:25px;
    height:25px;
`

function Sidebar({as,animate,initial,transition,setOpenSidebar,style}) {
  return (
    <Container style={style}>
        {/* Top container */}
        <TopContainer>
            <CloseImgContainer>
                <CloseImg src={CloseIcon} onClick={e => setOpenSidebar(false)} />
            </CloseImgContainer>
            

            <AdminIconContainer>

            </AdminIconContainer>
            <TopText>Author</TopText>
        </TopContainer>

        
        {/* DASHBOARD */}
        <Link to='/author/dashboard' style={{textDecoration:'none',color:'black'}}>  
            <LinkContainers>
                <LinkIcon src={dashboardIcon} />
                <LinkText>Dashboard</LinkText>
            </LinkContainers>
        </Link>

        {/* ADD COURSE */}
        <Link to='/author/add-course' style={{textDecoration:'none',color:'black'}}>
            <LinkContainers>
                <LinkIcon src={addcourseIcon} />
                <LinkText>Add Course</LinkText>
            </LinkContainers>
        </Link>








    </Container>
  )
}

export default Sidebar