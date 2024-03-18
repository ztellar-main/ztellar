import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`

export const Wrapper = styled.div`
    width:1366px;
    max-width: 1366px;
    display: flex;
`
export const LeftContainer = styled.div`
    width:683px;
    max-width: 683px;
    height:calc(100vh - 65px);
    position:fixed;
    
    @media (max-width:683px) {
        width:100%;
    }
`

export const RightContainer = styled.div`
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

export const SubBackImg = styled.img`
    height:100vh;
    object-fit: cover;
    width:100%;
`

export const Title = styled.p`
    font-size: 25px;
    color:gray;
    margin-top: 70px;
    font-weight: 700;
`
export const Input = styled.input`
    width:100%;
    padding:20px;
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 15px;
    text-align: center;
    border-radius: 22px;
    border:none;
    box-shadow: 0px 5px 5px gray;
    color:black;
    background-color: #EAEAE8;
    outline:none;
`

export const ForgotPassword = styled.p`
    color:gray;
    margin-top: 10px;
`

export const LoginButton = styled.button`
    width:150px;
    padding:15px;
    background-color: #454545;
    color:white;
    border-radius: 25px;
    border:none;
    margin: 15px 0;
    font-size: 17px;
    font-weight: 500;
    box-shadow: 0px 5px 5px gray;
    border: 1px solid lightgrey;
    position: relative;
    cursor: pointer;
`
export const OrContainer = styled.div`
    width:100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

export const Hr = styled.hr`
    box-sizing: border-box;
    flex-grow: 1;
    border:none;
    border-top: 1px solid gray;;
`

export const OrText = styled.p`
    margin:0 15px;
    color:gray;
`

export const BottomButtonsContainer = styled.div`
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

export const GoogleButton = styled.button`
    width:200px;
    border-radius: 22px;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    box-sizing: border-box;
    box-shadow: 0px 5px 5px gray;
    position:relative;

    @media (max-width:500px) {
        margin-bottom: 20px;
        width:300px;
    }
`

export const FbButton = styled.button`
    width:200px;
    border-radius: 22px;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    box-sizing: border-box;
    box-shadow: 0px 5px 5px gray;

    @media (max-width:500px) {
        margin-bottom: 20px;
        width:300px;
    }
`

export const ButtonIcon = styled.img`
    width:40px;
    margin-right: 5px;
`

export const Message = styled.p`
    text-align:center;
    color:red;
    text-shadow: 1px 1px 1px white;
    font-weight: 500;
`

export const Spinner = styled.div`
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