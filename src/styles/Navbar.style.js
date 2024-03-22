import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const NavbarContainer = styled.nav`
    width:100%;
    height:65px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    position:sticky;
    top:0;
    left: 0;
    background-color: #D5EBF2;
    z-index: 20;

    /* PHONE */
    @media (max-width:450px) {
        height:55px;
    }
`


// LEFT CONTAINER
export const LeftContainer = styled.div`
    width:180px;
    height:65px;
    /* background-color: red; */
    display:flex;
    align-items: center;
    margin-right: 20px;

    @media (max-width: 1110px) {
        width:80px;
    }

    @media (max-width: 800px) {
        width:180px;
    }

    /* PHONE */
    @media (max-width:450px) {
        height:55px;

    }
`


// MIDDLE CONTAINER
export const MiddleContainer = styled.div`
    height:65px;
    flex-grow: 1;
    display:flex;
    align-items: center;
    padding:10px;
    box-sizing: border-box;
    position:relative;
    z-index: 2;

    @media (max-width: 800px) {
        display:none;
    }
`

export const InputSearch = styled.input`
    width:100%;
    padding:12px 20px;
    border-radius: 22px;
    border:1px solid #1A66CC;
    font-size: 17px;
    outline: none;
    box-sizing: border-box;
    

    &:focus{
        font-weight: 300;
    }
`



// RIGHT CONTAINER
export const RightContainerDesktop = styled.div`
    height:65px;
    display:flex;
    align-items: center;


`
export const LinkContainer = styled.div`
    width:160px;
    height:65px;
    display:flex;
    text-decoration:none;
    align-items: center;
    justify-content: space-around;


    @media (max-width: 1000px) {
        display:none;
    }
`

export const Links = styled.p`
    text-decoration:none;
    color:black;
    font-size: 15px;
`

export const CategoryLink = styled.p`
    font-size: 15px;
    margin-left:10px;
    cursor:pointer;
    @media (max-width: 800px) {
        display:none;
    }
`

export const ButtonsContainer = styled.div`
    height:65px;
    display:flex;
    align-items: center;
    justify-content: right;
`

export const LoginButton = styled(Link)`
    text-decoration: none;
    color:#1A66CC;
    border:1px solid #1A66CC;
    padding:10px 20px;
    font-weight: 700;
    border-radius: 20px;
    font-size: 15px;
    margin-left:30px;

    @media (max-width: 800px) {
        display:none;
    }
`

export const SignupButton = styled(Link)`
    text-decoration: none;
    color:white;
    background-color: #1A66CC;
    padding:10px 20px;
    font-weight: 700;
    border-radius: 20px;
    font-size: 15px;
    margin: 0 30px;

    @media (max-width: 800px) {
        display:none;
    }
`

export const BurgerContainer = styled.div`
    width:45px;
    height:45px;
    margin-right:15px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor:pointer;

    &:hover{
        background-color: lightgray;
    }

    @media (min-width: 800px) {
        display:none;
    }

    @media (max-width: 450px) {
        width:40px;
        height:40px;
    }
`

export const Burger = styled.img`
    width:30px;

    @media (max-width: 450px) {
        width:25px;

    }

` 

export const UserContainer = styled.div`
    height:65px;
    display:flex;
    align-items: center;
`

export const UserContainerForDesktop = styled.div`
display:flex;
align-items: center;
    @media (max-width: 800px) {
        display:none;
    }
`


export const CartIcon = styled.img`
    width:30px;
    margin:0 20px;
`

export const UserIcon = styled.img`
    width:45px;
    height:45px;
    border-radius: 50%;
    margin-right:10px;
    border:3px solid #1A66CC;
`

export const UserDetailsContainer = styled.div`
    height:65px;
    flex-grow:1;
    display:flex;
    flex-direction: column;
    justify-content: center;
`

export const Username = styled.p`
    font-weight: 700;
    margin-bottom: 3px;
`

export const Role = styled.p`
    font-size: 12px;
`

export const DropdownIconContainer = styled.div`
    width:45px;
    height:45px;
    margin: 0 10px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;

    &:hover{
        background-color: lightgray;

    }
`

export const DropdownIcon = styled.img`
    width: 14px;
`

export const UserIconDropDown = styled.img`
    width:45px;
    border-radius: 50%;
    margin-right:10px;
    border:3px solid #1A66CC;
    margin:0 20px;

    /* TABLET */
    @media (min-width: 800px){
        display:none;
    }
    /* PHONE */
    @media (max-width: 450px){
        width:35px;
        margin:0 12px;
    }
`

export const SearchIconContainer = styled.div`
    width:50px;
    height:50px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:active{
        background-color: lightgray;
    }

    /* TABLET */
    @media (min-width: 800px){
        display:none;
    }
    /* PHONE */
    @media (max-width: 450px){
        width:40px;
        height:40px;
    }

    
`
export const SearchSlide = styled.img`
    width:35px;

    /* PHONE */
    @media (max-width: 450px){
        width:30px;
    }

`


// POPUPS

export const BackgroundOpacity = styled.div`
    width:100%;
    height:100vh;
    background: gray;
    opacity:20%;
    position:absolute;
    left:0;
    top:0;
`

export const Logo = styled.img`
    height:45px;
    width:80px;
    margin-left:10px;
`

