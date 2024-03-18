import styled from "styled-components";

export const Container = styled.div`
    width:700px;
    max-width:700px;
    height:500px;
    background-color: #E9F2F9;
    position:fixed;
    z-index: 12;
    left:calc(50vw - 350px);
    top:calc(50vh - 250px);
    border-radius: 20px;
    overflow-y: scroll;
    box-shadow: 1px 1px 8px gray;
    overscroll-behavior: contain;
    box-sizing: border-box;

    &::-webkit-scrollbar {
    display: block;
    width: 7px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;

    }
        
    &::-webkit-scrollbar-thumb {
        border-right: none;
        border-left: none;

    }
    &::-webkit-scrollbar-track-piece:end {
        background: transparent;
        margin-bottom: 15px; 
    }

    &::-webkit-scrollbar-track-piece:start {
        background: transparent;
        margin-top: 60px;
    }

    @media (max-width:770px) {
      width:95%;
      left: 2.5%;
    }

    @media (max-height:500px) {
      height:400px;
      top:calc(50vh - 200px);
    }

    @media (max-height:400px) {
      height:300px;
      top:calc(50vh - 150px);
    }
    `

export const MainBody = styled.div`
  padding:15px;
  box-sizing: border-box;
  padding-top:0;
`

export const TitleContainer = styled.div`
  width:100%;
  padding:10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top:0;
  left:0;
  background-color: #E9F2F9;
  border-bottom: 1px solid gray;

  z-index: 5;

`
export const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  color:	#101010;
`
export const CloseContainer = styled.div`
  width:30px;
  height:30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  border:3px solid gray;


  &:active{
    background-color: lightgrey;
  }
`
export const CloseIcon = styled.img`
  width:25px;
  height:25px;
`
export const Input = styled.input`
  width:100%;
  padding:10px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 20px;
  border:1px solid #1A66CC;
  outline:none;
  margin-top: 10px;
  padding-left:20px;
`

export const SelectCategoryContainer = styled.div`
  min-width:200px;
  width:200px;
  margin-left: calc(50% - 100px);
  margin-top:10px;
`

export const SelectCategory = styled.select`
  width:200px;
  padding:10px;
  border:1px solid #1A66CC;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  color:gray;
  cursor: pointer;
  margin:0;
`

export const OptionCategory = styled.option`
  width:200px;
  padding:10px;
  border:1px solid gray;
  margin-top:10px;
  cursor: pointer;
  margin:0;
`

export const InputFile = styled.input`
  width:100%;
  padding:5px;
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 20px;
  border:1px solid #1A66CC;
  outline:none;
  margin-top: 10px;
  color:gray;
  background-color: white;
  cursor: pointer;


  &::file-selector-button{
    padding:5px 20px;
    border-radius: 20px;
    border:1px solid #1A66CC;
    cursor: pointer;
  }
`

export const UploadButton = styled.button`
  padding:10px 25px;
  color:white;
  background-color: #1A66CC;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  font-size: 17px;
  border: none;
  cursor: pointer;

  &:hover{
    opacity:.8;
    box-shadow: 1px 1px 8px #1A66CC;
    /* transition: all .15s ease .15s; */
  }

  &:active{
    opacity:1;
    background-color: #1A66CC;
    scale:1.01;
  }
`

export const FinalUploadButton = styled.button`
  padding:10px 30px;
  color:white;
  background-color: #1A66CC;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 25px;
  font-size: 19px;
  border: none;
  display:flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;


  &:hover{
    opacity:.8;
    box-shadow: 1px 1px 8px #1A66CC;
    /* transition: all .15s ease .15s; */
  }

  &:active{
    opacity:1;
    background-color: #1A66CC;
    scale:1.01;
  }
`

export const CloudUploadImg = styled.img`
  width:30px; 
  filter: invert();
  margin-right: 10px;
`

export const TitleText = styled.p`
  text-align: center;
  margin:10px 0;
  font-size: 20px;
  font-weight: 700;
`

export const TitleButton = styled.button`
  padding:10px 25px;
  color:white;
  background-color: #1A66CC;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  font-size: 17px;
  border: none;
  cursor: pointer;

  &:hover{
    opacity:.8;
    box-shadow: 1px 1px 8px #1A66CC;
    /* transition: all .15s ease .15s; */
  }

  &:active{
    opacity:1;
    background-color: #1A66CC;
    scale:1.01;
  }
`

export const FileUploadMessageContainer = styled.div`
  width:100%;
  height:50px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
  margin-top: 10px;
  border-radius: 5px;
`

export const FileUploadMessage = styled.p`
  color:white;

`

export const Spinner = styled.div`
   width: 27px;
   height: 27px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,#ffffff);
   background-color: red;
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
   animation: spinner-zp9dbg 1s infinite linear;
   /* position:absolute;
   top:calc(50% - 13.5px);
   right:10px; */
   margin-left: 10px;

   @keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}
`

export const ErrorMessageContainer = styled.div`
    width:100%;
  height:50px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
  margin-top: 10px;
  border-radius: 5px;
`

export const ErrorMessage = styled.p`
  color:white;
  font-weight: 500;
`

export const UploadErrorHandlerContainer = styled.div`
  width:100%;
  background-color: red;
  margin-top: 10px;
  padding:10px;
  box-sizing: border-box;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`