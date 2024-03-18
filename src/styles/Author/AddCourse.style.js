import styled from 'styled-components'

export const MainBodyWrapper = styled.div`
    width:100%;
    border:1px solid #1A66CC;
    box-sizing: border-box;
    border-radius: 20px;
    box-sizing: border-box;
    padding:10px;
    margin-top: 2px;
`

export const Title = styled.p`
    color:gray;
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
`

export const InstructionContainer = styled.div`
    width:100%;
    background-color: #E9F2F9;
    padding:20px;
    box-sizing: border-box;
    border-radius:20px;
    display: flex;
    flex-direction: column;

`
export const IntructionTitle = styled.p`
    font-weight: 700;
    color:gray;
    font-size: 25px;
    width:100%;
`

export const IntructionTextContainer = styled.div`
    width:calc(100% - 30px);
    box-sizing: border-box;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
`
export const UploadButtonContainer = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const UploadButton = styled.button`
    background-color: #1A66CC;
    border:none;
    padding:10px 30px;
    font-size: 17px;
    color:white;
    border-radius: 20px;
    cursor: pointer;

    &:hover{
        opacity: .8;
    }
`

export const SidebarCloseContainer = styled.button`
    width:130px;
    padding:5px;
    border-radius: 5px;
    border:1px solid gray;
    font-size: 17px;
    font-weight: 500;
    background-color: white;
    cursor:pointer;

    &:hover{
        background-color: lightgray;
    }

    &:active{
        scale:.95;
    }
`






