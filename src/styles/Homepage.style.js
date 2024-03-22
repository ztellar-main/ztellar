import styled from "styled-components";

export const HomepageContainer = styled.div`
  width: 100%;
  height: 100%;
  /* margin-top: 65px; */
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    margin-top: 55px;
  }
`;

export const UpperBannerCon = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export const UpperMobileCon = styled.div`
  display: none;

  @media screen and (max-width: 450px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const BannerText = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

export const BannerTextSpan = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #2563eb;
`;

export const UpperCon = styled.div`
  width: 100%;
  display: flex;
`;

export const SideCon = styled.div`
  flex-grow: 1;
`;

export const BannerContainer = styled.div`
  max-width: 1366px;
  margin: auto;
  position: relative;
  /* background-color: red; */

  @media screen and (max-width: 450px) {
    margin: 0 5px;
  }
`;

export const MobileGetStartedButton = styled.button`
  font-size: 16px;
  padding: 8px 20px;
  border-radius: 100px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  font-weight: 300;
  margin-top: 10px;

  &:hover {
    background-color: #3b82f6;
    color: black;
  }
`;

export const GetStartButtonContainer = styled.div`
  width: 100%;
  z-index: 9;
  position: absolute;
  top: -70px;
  padding-left: 10px;

  @media screen and (max-width: 900px) {
    top: -50px;
  }

  @media screen and (max-width: 700px) {
    top: -30px;
  }
`;

export const GetStartedButton = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 100px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  font-weight: 300;
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

  @media screen and (max-width: 1100px) {
    font-size: 18px;
    padding: 10px 20px;
  }

  @media screen and (max-width: 700px) {
    font-size: 16px;
    padding: 8px 18px;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  z-index: 0;
`;

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: relative;
`;

export const HomeText = styled.p`
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

export const PoweredByText = styled.p`
  color: #808080;
  font-size: 20px;
  font-weight: 300;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

export const DisplayRowCon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const LogoImage = styled.img`
  height: 98%;
`;

export const VizcomText = styled.p`
  color: #808080;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

export const HomeLineHr = styled.hr`
  width: 60%;
  border: 1px solid #d8d8d8;
  margin: 40px auto;

  @media screen and (max-width: 450px) {
    margin: 30px auto;
  }
`;

// WHAT'S IN IT STYLES
export const WhatContainer = styled.div`
  width: 100%;
  background-color: #172554;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 150px;
  margin: 10px 0;

  @media screen and (max-width: 1440px) {
    padding: 35px;
  }

  @media screen and (max-width: 450px) {
    padding: 35px 10px;
  }
`;

export const WhatTitle = styled.p`
  color: white;
  font-weight: 700;
  font-size: 40px;

  @media screen and (max-width: 450px) {
    font-size: 25px;
  }
`;

export const WhatDescription = styled.p`
  color: white;
  font-weight: 300;
  font-size: 30px;
  text-align: center;

  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;

// FEATURED EVENTS STYLES
export const FeaturedContainer = styled.div`
  max-width: 1366px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FeaturedRowCon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export const FeaturedTitle = styled.div`
  color: black;
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 450px) {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

export const FeaturedHalfContainer = styled.div`
  width: 50%;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

export const FeaturedImage = styled.img`
  width: 100%;
`;

// EARLY BIRD DISCOUNT STYLES
export const EarlyContainer = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

  @media screen and (max-width: 450px) {
    padding: 10px 0;
  }
`;

export const EarlyTitle = styled.p`
  font-size: 35px;
  font-weight: 700;
  color: #030712;

  @media screen and (max-width: 450px) {
    font-size: 25px;
  }
`;

export const EarlySubTitle = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: #030712;

  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;

export const EarlyCardContainer = styled.div`
  max-width: 1366px;
  display: flex;
  margin-bottom: 40px;
  gap: 20px;

  @media screen and (max-with: 1024px) {
    grid-template-columns: 422px 422px;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 0 10px;
  }
`;
