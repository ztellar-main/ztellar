import React from "react";
import styled from "styled-components";

// COMPONENT IMPORT

// import Footer from "./../Components/Footer";

// IMAGE IMPORT
// import BannerRightImg from "../icons/HomeBannerImage.png";
import LogoIcon from "../icons/SmallLogo.png";
import FeaturedOneIcon from "../icons/FeaturedImageOne.png";
import FeaturedTwoIcon from "../icons/FeaturedTwoImage.png";
import BannerMobileImage from "../icons/HomeRightImageOne.png";

import CloudinaryImg from '../components/Author/CloudinaryImg'
import {data} from '../utils/homepageCardDetails'
import {Link} from 'react-router-dom'



// STYLES IMPORT
import {
  HomepageContainer,
  BannerContainer,
  BannerImage,
  HomeContainer,
  HomeText,
  PoweredByText,
  DisplayRowCon,
  LogoContainer,
  LogoImage,
  VizcomText,
  HomeLineHr,
  GetStartedButton,
  WhatContainer,
  WhatTitle,
  WhatDescription,
  FeaturedContainer,
  FeaturedTitle,
  FeaturedHalfContainer,
  FeaturedImage,
  EarlyContainer,
  EarlyTitle,
  EarlySubTitle,
  EarlyCardContainer,
  SideCon,
  UpperCon,
  FeaturedRowCon,
  UpperBannerCon,
  UpperMobileCon,
  BannerText,
  BannerTextSpan,
  MobileGetStartedButton,
  GetStartButtonContainer,
} from "../styles/Homepage.style";
import { HomeDiscountCard } from "../components/HomeDiscountCard";

const CardsWrapper = styled.div`
    width:100%;
    display: grid;
    grid-template-columns:repeat(auto-fill,422px);
    justify-content: space-around;
    gap:10px;
    position:relative;

    @media (max-width:450px){
      width:100%;
      display: grid;
      grid-template-columns:repeat(auto-fill,90%);
      justify-content: space-around;
      gap:10px;
      position:relative;
    }
`

function HomePage() {
  return (
    <div>
      {/* <NavbarLogedIn /> */}
      <HomepageContainer>
        <UpperBannerCon>
          <SideCon />
          <BannerContainer>
            {/* <BannerImage src={BannerRightImg} /> */}
            <CloudinaryImg imageUrl='ztellar/ztellar/fzpaxecrkgom2im3kfxw' width='1366' height='400' widthMain='100%' />

            <HomeContainer>
              <GetStartButtonContainer>
                <Link to='/search?query='>
                  <GetStartedButton>Get Started</GetStartedButton>
                </Link>
                
              </GetStartButtonContainer>
              <HomeText>Start you Ztellar experience today.</HomeText>
              <PoweredByText>Powered by:</PoweredByText>
              <DisplayRowCon>
                <LogoContainer>
                  <LogoImage src={LogoIcon} />
                </LogoContainer>
                <VizcomText>Vizcom Corporation</VizcomText>
              </DisplayRowCon>
            </HomeContainer>
          </BannerContainer>
          <SideCon />
        </UpperBannerCon>

        <UpperMobileCon>
          <DisplayRowCon>
            <BannerText>
              <BannerTextSpan>Connecting</BannerTextSpan> minds
            </BannerText>
          </DisplayRowCon>
          <DisplayRowCon>
            <BannerText>
              <BannerTextSpan> Redefining</BannerTextSpan> Learning and
            </BannerText>
          </DisplayRowCon>
          <DisplayRowCon>
            <BannerTextSpan>Collaboration</BannerTextSpan>
          </DisplayRowCon>

          <BannerImage src={BannerMobileImage} />
          <Link to='/search?query='>
            <MobileGetStartedButton>Get Started</MobileGetStartedButton>
          </Link>
          <HomeContainer>
            <HomeText>Start you Ztellar experience today.</HomeText>
            <PoweredByText>Powered by:</PoweredByText>
            <DisplayRowCon>
              <LogoContainer>
                <LogoImage src={LogoIcon} />
              </LogoContainer>
              <VizcomText>Vizcom Corporation</VizcomText>
            </DisplayRowCon>
          </HomeContainer>
        </UpperMobileCon>
        <HomeLineHr />

        <WhatContainer>
          <WhatTitle>What's in it?</WhatTitle>
          <WhatDescription>
            Welcome to Ztellar, where we believe in the power of connecting
            minds to revolutionize learning and collaboration. Our platform is
            designed to streamline the process, making it easier and more
            efficient for individuals and teams to come together, share
            knowledge, and work towards common goals.
          </WhatDescription>
        </WhatContainer>

        <HomeLineHr />
        <UpperCon>
          <SideCon />
          <FeaturedContainer>
            <DisplayRowCon>
              <FeaturedTitle>Featured Events</FeaturedTitle>
            </DisplayRowCon>
            <FeaturedRowCon>
              <FeaturedHalfContainer>
                <CloudinaryImg imageUrl='ztellar/ztellar/sanj9kjlh7etnbglc2lv' width='683' height='350' widthMain='100%' />
                {/* <FeaturedImage src={FeaturedOneIcon} /> */}
              </FeaturedHalfContainer>
              <FeaturedHalfContainer>
                <CloudinaryImg imageUrl='ztellar/psme LRC 2024/qsniqu3fmmxehktnj3zc' width='683' height='350' widthMain='100%' />
              </FeaturedHalfContainer>
            </FeaturedRowCon>
          </FeaturedContainer>
          <SideCon />
        </UpperCon>

        <EarlyContainer>
          <EarlyTitle>Early Bird Discount</EarlyTitle>
          <EarlySubTitle>Valid Until April 15, 2024</EarlySubTitle>
        </EarlyContainer>
        <UpperCon>
          <SideCon />

            <CardsWrapper>
            {/* HOME DISCOUNT CARDS */}
            {data?.map((dat,i) => {
              return(
                <HomeDiscountCard key={i} data={dat} />
              )
            })}
            
            </CardsWrapper>
          <SideCon />
        </UpperCon>
      </HomepageContainer>
    </div>
  );
}

export default HomePage;
