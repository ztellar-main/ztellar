import React, { useState } from "react";
import styled from "styled-components";

import XIcon from "../icons/XIcon.png";
import CheckIcon from "../icons/CheckIcon.png";
import ThumbnailIcon from "../icons/CardImage.png";
import HomeDiscountCardPopup from "./HomeDiscountCardPopup";

const CardContainer = styled.div`
  /* width: 422px; */
  height: 583px;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 450px) {
    width: 100%;
    margin-bottom: 10px;
    height: 540px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 270px;
  background-color: brown;
  border-radius: 20px;
  position: relative;
`;

const BlueBottomContainer = styled.div`
  width: 100%;
  position: absolute;
  height: 20px;
  bottom: 0;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  background-color: #1d4ed8;
`;

const PriceText = styled.p`
  color: #60a5fa;
  font-size: 65px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: 700;
  transform: translate(-50%,-50%);

  @media screen and (max-width: 350px) {
    font-size: 55px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const ThumbnailTitleCon = styled.div`
  width: 85%;
  background-color: #1d4ed8;
  position: absolute;
  top: 20px;
  z-index: 1;
  font-size: 20px;
  padding: 5px 10px;
  color: white;
  font-weight: 700;
  padding:10px;
`;

const DetailContainer = styled.div`
  position: relative;
  width: 380px;
  height: 365px;
  background-color: #eff6ff;
  position: absolute;
  bottom: 0;
  left: 21px;
  border-radius: 20px;
  padding: 10px;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 450px) {
    left: 13px;
    height: 340px;
  }

  @media screen and (max-width: 410px) {
    left: 14px;
    height: 340px;
    width: 90%;
  }
`;

const DetailCon = styled.div`
  width: 100%;
  height: 295px;
  overflow: hidden;

  @media screen and (max-width: 450px) {
    height: 270px;
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

const ItemDetail = styled.p`
  font-size: 18px;
  font-weight: 300;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeeMoreButton = styled.button`
  background-color: #1d4ed8;
  color: white;
  font-size: 14px;
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

const BackgroundCloser = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 19;
`;

export const HomeDiscountCard = (data) => {
  // console.log(data.data.list)
  const [closer, setCloser] = useState(false);

      // Format the price above to PHP using the locale, style, and currency.
  let PHP = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
  });


  return (
    <>
      {closer && (
        <>
          <BackgroundCloser onClick={(e) => setCloser(false)} />
          <HomeDiscountCardPopup data={data} />
        </>
      )}

      <CardContainer>
        <ThumbnailContainer>
          <ThumbnailImage src={ThumbnailIcon} />
          <ThumbnailTitleCon>
            {data?.data?.title}
          </ThumbnailTitleCon>
          <BlueBottomContainer />
          <PriceText>{PHP.format(data?.data?.price)}</PriceText>
        </ThumbnailContainer>
        <DetailContainer>
          <DetailCon>
            {data?.data?.list.map((dat,i) => {
              return(
                <DetailItemCon>
                <ImageCon>
                  <ImageImg src={CheckIcon} />
                </ImageCon>
                <ItemDetail>{dat}</ItemDetail>
              </DetailItemCon>
              )
            })}


          </DetailCon>
          <ButtonContainer>
            <SeeMoreButton onClick={(e) => setCloser(true)}>
              More Details
            </SeeMoreButton>
          </ButtonContainer>
        </DetailContainer>
      </CardContainer>
    </>
  );
};
