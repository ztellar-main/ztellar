import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'



// STYLE
import {
    Container,
    LeftContainer,
    RightContainer,
    Button,
    ImgContainer,
    Name
} from '../styles/header.style'




function HeaderComponent() {
    const dispatch = useDispatch()

    const logoutFunction = async() => {
        
    }
  return (
    <>
        <Container>
            {/* LEFT */}
            <LeftContainer>
            
            </LeftContainer>

            {/* RIGHT */}
            <RightContainer>
                <Link to='/'>
                    <p>Home</p>
                </Link>

                <Link to='/login'>
                    <p>Login</p>
                </Link>

                <Link to='/signup'>
                    <p>Signup</p>
                </Link>

                <p style={{cursor:'pointer'}} onClick={logoutFunction}>Logout</p>

                {/* <ImgContainer>
                </ImgContainer>
                <Name>Denver Bigayan</Name> */}
            </RightContainer>


        </Container>
    </>
  )
}

export default HeaderComponent
