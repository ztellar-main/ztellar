import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    background-color: #E9F2F9;
    margin-bottom: 10px;
    /* display:flex;
    align-items: center;
    justify-content: space-between; */

    padding:10px;
    box-sizing: border-box;
    border-radius: 20px;

    @media (max-width:600px) {
        flex-direction: column;
    }
`

export const ThumbnailContainer = styled.div`
    width:240px;
    height:120px;
    background-color: gray;
    min-width: 240px;
    border-radius: 20px;

    @media (max-width:450px) {
        width:100%;
        height:auto;
    }
`

export const RightContainer = styled.div`
    width:100%;
    max-width: 100%;
    height:120px;
    display: flex;
`

export const DetailsContainer = styled.div`
    flex-grow: 1;
    height:120px;
    padding:5px 20px;
    box-sizing: border-box;
`
export const Title = styled.p`
    font-size: 20px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width:925px) {
        font-size: 15px;
    }

    @media (max-width:450px) {
        font-size: 20px;
        font-weight: 700;
    }
`

export const Description = styled.div`
    margin-top: 10px;
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color:#6C6A6A;
    font-size: 15px;

    @media (max-width:925px) {
        font-size: 13px;
    }

    @media (max-width:450px) {
        font-size: 15px;
    }
`

export const ActionContainer = styled.div`
    width:130px;
    min-width: 130px;
    display: flex;
    flex-direction: column;
    height:120px;
    justify-content: space-between;
    padding:0 5px;
    box-sizing: border-box;

    @media (max-width:600px) {
        display:none;
    }
`

export const OpenButton = styled.button`
    width:100%;
    padding:7px;
    box-sizing: border-box;
    border-radius: 20px;
    border:1px solid #009900;
    color:#009900;
    font-size: 16px;
    background-color: white;
    cursor: pointer;

    @media (max-width:600px) {
        flex-grow: 1;
    }
    
`

export const EditButton = styled.button`
    width:100%;
    padding:7px;
    box-sizing: border-box;
    border-radius: 20px;
    border:1px solid #FFCC00;
    color: #FFCC00;
    font-size: 16px;
    background-color: white;
    cursor: pointer;

    @media (max-width:600px) {
        flex-grow: 1;
        margin:0 10px;
    }
`

export const DeleteButton = styled.button`
    width:100%;
    padding:7px;
    box-sizing: border-box;
    border-radius: 20px;
    border:1px solid #CC0001;
    color: #CC0001;
    font-size: 16px;
    background-color: white;
    cursor: pointer;

    @media (max-width:600px) {
        flex-grow: 1;
    }
`

export const BottomActionContainer = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    @media (min-width:600px) {
        display:none;
    }
`
export const Wrapper = styled.div`
    display:flex;

    @media (max-width:450px) {
        flex-direction: column;
    }
`

export const BackgroundCloser = styled.div`
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background-color: gray;
    z-index: 9;
    opacity: .3;
`