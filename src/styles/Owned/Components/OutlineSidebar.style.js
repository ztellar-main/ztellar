import styled from "styled-components";

export const Container = styled.div`
    width:400px;
    height:calc(100vh - 65px);
    min-width: 400px;
    box-shadow: 1px 1px 8px black;
    transition:all .2s ease .0s;
    z-index: 7;
    position: sticky;
    top:65px;
    margin-left: 0;
    background-color: #2B6EC1;

    @media (max-width:1100px){
        position:fixed;
    }

    @media (max-width:450px) {
        height:calc(100vh - 55px);
        width:100%;
        left:-100%;
        min-width: 200px;
        top:55px;
    }
`

export const TopContainer = styled.div`
    border-bottom:1px solid #1A66CC;
    box-sizing: border-box;
    font-size: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1A66CC;
    height:40px;
    font-size: 18px;
    color:white;
    padding:0 10px;
`

export const CloseImg = styled.img`
    width:60px;
    height:30px;
    cursor: pointer;
`

export const TitleMainContainer = styled.div`
    width:100%;
    box-sizing: border-box;
    padding:10px;
    padding-left: 20px;

`

export const TitleContainer = styled.div`
    width:100%;
    color:white;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    font-weight: 18px;
    padding-bottom: 10px;
`

export const BottomContainer = styled.div`
    width:100%;
    height:calc(100vh - 180px);
    overflow-y: auto;
    overflow-x: hidden;
`
export const VideoListContainer = styled.div`
    width:100%;
`