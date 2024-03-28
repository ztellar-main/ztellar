import React from "react";
import styled from "styled-components";

import ThumnailImage from "../icons/CardImage.png";
import XIcon from "../icons/XIcon.png";
import CheckIcon from "../icons/CheckIcon.png";
import HomePopImage from "../icons/HomePopupImage.png";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 800px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 8px black;

  @media screen and (max-width: 820px) {
    width: 90%;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Thumnail = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const PSMEImage = styled.img`
  width: 100%;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ItemDetail = styled.p`
  font-size: 18px;
  font-weight: 300;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

const RightContainer = styled.div`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const UpperCon = styled.div`
  height: calc(100% - 70px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1a66cc26;
    border-radius: 5px;

    &:hover {
      background-color: #00296b;
    }
  }

  @media screen and (max-width: 450px) {
    height: 300px;
  }
`;

const DetailItemCon = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const ImageCon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;

  @media screen and (max-width: 450px) {
    width: 25px;
    height: 25px;
  }
`;

const ImageImg = styled.img`
  height: 90%;
`;

const RegisterButtonContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  background-color: #1d4ed8;
  color: white;
  padding: 10px 30px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #3b82f6;
    color: black;
  }

  &:active {
    background-color: #1d4ed8;
    color: white;
  }
`;

const ExitButton = styled.div`
  @media screen and (max-width: 450px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: black;
    z-index: 99;
  }
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  z-index: 21;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

const PopTitleContainer = styled.div`
  width: 90%;
  background-color: #1d4ed8;
  position: absolute;
  top: 20px;
  left:0;
  color: white;
  font-size: 20px;
  padding: 5px 10px;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    width: 96%;
    box-sizing: border-box;
  }

  @media screen and (max-width: 450px) {
    width: 94%;
    box-sizing: border-box;
  }
`;

const FromText = styled.p`
  font-size: 20px;
  font-weight: 700;
  position: absolute;

  color: #93c5fd;
  top:55px;
  left:50%;
  transform: translateX(-50%);

  /* @media screen and (max-width: 600px) {
    top: 100px;
    left: 60px;
    font-size: 30px;
  } */
`;

const ToText = styled.p`
  font-size: 18px;
  font-weight: 700;
  /* position: absolute; */
  color: #93c5fd;
  margin-right: 10px;
  /* top:50%;
  left:20px; */

  /* @media screen and (max-width: 700px) {
    left: 50px;
    top: 130px;
  }

  @media screen and (max-width: 600px) {
    top: 180px;
    left: 100px;
    font-size: 25px;
  } */
`;

const NewPrice = styled.div`
  font-size: 60px;
  font-weight: 700;
  position: absolute;
  color: #93c5fd;
  text-decoration: underline;
  top:50%;
  left:50%;
  transform: translate(-50%,-20%);
  display: flex;
  align-items: center;

  @media screen and (max-width: 810px) {
    font-size: 40px;
  }

  @media screen and (max-width: 700px) {
    /* left: 90px;
    top: 120px; */
  }

  @media screen and (max-width: 600px) {
    /* top: 150px;
    left: 150px;
    font-size: 60px; */
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  background-color: gray;
  position:relative;
`

const HomeDiscountCardPopup = ({data}) => {

  // Format the price above to PHP using the locale, style, and currency.
  let PHP = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
  });


  return (
    <Container>
      {/* LEFT CONTAINER */}
      <LeftContainer>
        <ImageContainer>
          <Thumnail src={ThumnailImage} />
          <PopTitleContainer>{data?.data?.title}</PopTitleContainer>
          <FromText>From P 3,500</FromText>
          
          <NewPrice><ToText>To </ToText> {PHP.format(data?.data?.price)}</NewPrice>
        </ImageContainer>

        {/* <AbsoluteContainer>

          <FromText>From P 3,500</FromText>
          <ToText>To </ToText>
          <NewPrice>{PHP.format(data?.data?.price)}</NewPrice>
        </AbsoluteContainer> */}

        <PSMEImage src={HomePopImage} />
        <ExitButton />
      </LeftContainer>

      {/* RIGHT CONTAINER */}
      <RightContainer>
        <UpperCon>
          {data?.data?.list?.map((dat,i) => {
            return(
              <DetailItemCon key={i}>
              <ImageCon>
                <ImageImg src={CheckIcon} />
              </ImageCon>
              <ItemDetail>{dat}</ItemDetail>
            </DetailItemCon>
            )
          })}


        </UpperCon>
        <RegisterButtonContainer>
          <Link to="/course?id=65fd60b6881c189c54553606">
            <RegisterButton>Register Now</RegisterButton>
          </Link>
        </RegisterButtonContainer>
      </RightContainer>
    </Container>
  );
};

export default HomeDiscountCardPopup;
