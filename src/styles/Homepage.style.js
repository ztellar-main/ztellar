import styled from 'styled-components'

export const Container = styled.div`
  width:100%;
  display: flex;
`

export const Sidings = styled.div`
  flex-grow: 1;
`

export const Wrapper = styled.div`
  max-width:1366px;
  width:1366px;
  box-sizing: border-box;

  /* @media (max-width: 1366px) {
    padding:0 20px;
  } */

  @media (max-width:450px) {
    padding:0;
  }

`
export const BannerContainer = styled.div`
  width:100%;
  display: flex;
  /* margin-top: 30px; */
  margin:0;
  margin-bottom: 20px;
  box-sizing: border-box;
  /* background-color: gray;
  height:350px; */


  @media (max-width:450px) {
    flex-direction: column;
  }
  

  /* @media (max-width:830px) {
    flex-direction: column;
    margin-top: 0;
  } */
`

export const BannerLeftContainer = styled.div`
  width:50%;

  @media (max-width:450px) {
    width:100%;
  }
`


export const BannerRightContainer = styled.div`
  width:50%;

  @media (max-width:450px) {
    width:100%;
    margin-top:-5px;
  }
`

export const Hr = styled.hr`
  width:80%;
  border:none;
  border-top: 1px solid gray;
  margin:0;
  margin:10px 0;
  margin-left: 10%;

  @media (min-width:450px){
    display: none;
  }
`

export const BannerImg = styled.img`
  width:100%;
  background-color: red;
  box-sizing: border-box;
  margin:0;
  margin:0;
  padding:0;
`

export const BottomContainer = styled.div`
  width:100%;
  box-sizing: border-box;

  /* @media (max-width:1366px) {
    padding:0 10px;
  } */
`

export const TaglineContainer = styled.p`
  width:100%;
  display: flex;
  /* border-radius: 10px; */
  box-shadow: 1px 1px 8px gray;
  /* margin:10px 0; */
  height:180px;
  /* background-color: red; */
  margin-bottom: 10px;

  @media (max-width:800px){
    flex-direction: column;
  }
`

export const TaglineLeftContainer = styled.div`
  width:50%;
  padding:20px;
  box-sizing: border-box;

  @media (max-width:800px){
    text-align: center;
    width:100%;
  }
`
export const TaglineMessage = styled.p`
  font-size: 30px;
  color: #18181B;

  @media (max-width:1150px){
    font-size: 18px;
  }

  @media (max-width:880px){
    font-size: 16px;
  }
  



  
`

export const TaglineRightContainer = styled.div`
  width:50%;
  padding:20px;
  box-sizing: border-box;

  @media (max-width:800px){
    width:100%;
  }
`



export const TaglineText = styled.p`
  font-size: 20px;
  margin-bottom: 20px;

  @media (max-width:1150px){
    font-size: 16px;
  }

  @media (max-width:820px){
    font-size: 12px;
  }

  @media (max-width:800px){
    text-align: center;
  }

`

export const PoweredBy = styled.p`
    margin-top: 10px;
    color:#808080;

    @media (max-width:800px){
    text-align: center;
    font-size: 12px;
  }

`

export const PoweredByContainer = styled.div`
  display: flex;
  margin-top: 5px;


  @media (max-width:800px){
    margin-left: 50%;
    transform: translateX(-50%);
    justify-content: center;
  }
`

export const PoweredByLogo = styled.img`
  width:18px;
`

export const PoweredByTitle = styled.p`
  color:#808080;
  padding:0;
  font-size: 10px;
`

