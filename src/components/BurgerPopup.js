import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// ICONS
import closeImg from '../icons/close.png'

const Container = styled.div`
    width:100%;
    height:100vh;
    background-color: white;
    z-index: 20;
    position: fixed;
    top:0;
    left:0;

    @media (min-width:800px) {
        display: none;
    }
`

const TopContainer = styled.div`
    width:100%;
    height:75px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const CloserContainer = styled.div`
    width:45px;
    height:45px;
    background-color: lightgray;
    margin-right: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const CloserImg = styled.img`
    width:70%;
    height:70%;
`

const BottomContainer = styled.div`
    padding:20px;
    box-sizing: border-box;
`

const Links = styled.button`
    width:100%;
    padding:10px;
    background-color: #CDDDF4;
    font-size: 20px;
    cursor: pointer;


`


const BurgerPopup = ({setOpenBurgerDropdown}) => {
  return (
    <>
    <Container>
        <TopContainer>
            <CloserContainer onClick={e => setOpenBurgerDropdown(false)}>
                <CloserImg src={closeImg} />
            </CloserContainer>
        </TopContainer>



        {/* LOGIN */}
        <Link to='/login' onClick={e => setOpenBurgerDropdown(false)}>
        <BottomContainer>
            <Links>Login</Links>
        </BottomContainer>
        </Link>

        {/* SIGNUP */}
        <Link to='/signup' onClick={e => setOpenBurgerDropdown(false)}>
        <BottomContainer>
            <Links>Signup</Links>
        </BottomContainer>
        </Link>

        {/* HOME */}
        <Link to='/' onClick={e => setOpenBurgerDropdown(false)}>
        <BottomContainer>
            <Links>Home</Links>
        </BottomContainer>
        </Link>
        
        
    </Container>
    </>
  )
}

export default BurgerPopup
