import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    display: flex;
`

export const Sidings = styled.div`
    flex-grow: 1;
    z-index: 8;
    background-color: white;
`

export const MainWrapper = styled.div`
    width:1366px;
    max-width: 1366px;
    box-sizing: border-box;
    display: flex;
`

export const WrapperBody = styled.div`
    width:100%;
    box-sizing: border-box;
    flex-grow: 1;
`

export const WrapperHeader = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 0;
    box-sizing: border-box;
    height:40px;
    background-color: #071C34;

    position: sticky;
    top:55px;
    z-index: 5;
`

export const SideabarButton = styled.button`
    cursor: pointer;
    font-size: 13px;
    background-color: #1A66CC;
    font-weight: bold;
    color:white;
    display: flex;
    align-items: center;
    height:40px;
    border:none;
    padding:0 10px;
`

export const OpenArrowContainer = styled.div`
    width:35px;
    margin-top: 5px;
    margin-left: 5px;
`

export const OpenArrowImg = styled.img`
    width:100%;

`

export const Title = styled.div`
    color:white;
    margin-right: 10px;
`

export const BackgroundCloser = styled.div`
    width:100%;
    height:100vh;
    background-color: black;
    opacity:.8;
    position:fixed;
    z-index: 6;

    @media (min-width:1100px) {
        display:none;
    }

    @media (max-width:400px) {
        display:none;
    }
`

export const VideoMainContainer = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: black;
`

export const VideoContainer = styled.div`
    width:80%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width:800px) {
        width:100%;
    }
` 

export const BottomContainer = styled.div`
    width:100%;
    display: flex;

    @media (max-width:530px){
        flex-direction: column;
    }
`

export const LeftContainer = styled.div`
    flex-grow: 1;
    padding:10px;
    box-sizing: border-box;
    padding-bottom: 0;
`

export const RightContainer = styled.div`
    width:300px;
    padding:10px 0;
    box-sizing: border-box;
    min-width: 300px;

    @media (max-width:530px) {
        width:100%;
        padding:10px;
        padding-top: 0;
    }
`

export const CourseTitleContainer = styled.div`
    width:100%;
    background-color: #E9F2F9;
    border-radius: 15px;
    padding:10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

export const CourseTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color:#0D0D0D;
    margin-bottom: 5px;
`
export const CourseDescription = styled.p`
    color:#6C6A6A;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
`

export const CourseDescText = styled.p`
    color: #6C6A6A;
    font-size: 13px;
`

export const RatingsContainer = styled.div`
    width:100%;
    background-color: #E9F2F9;
    border-radius: 15px;
    padding:20px;
    box-sizing: border-box;
`

export const RatingsTopContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

export const RatingsTextBlack = styled.p`
    font-size: 12px;
`

export const RatingStar = styled.img`
    width:100px;
`
export const Spinner = styled.div`
  color: gray;
  font-size: 45px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
  position:absolute;
    left:calc(50% - 30px);
    top:50px;


@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes round {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
 
`

