import React from 'react'
import vizcomSmallLogo from '../icons/vizcomSmallLogo.svg'
import styled from 'styled-components'
import CloudinaryImg from '../components/Author/CloudinaryImg'

import {
  Container,
  Sidings,
  Wrapper,
  BannerContainer,
  TaglineContainer,
  TaglineLeftContainer,
  TaglineRightContainer,
  TaglineMessage,
  TaglineText,
  PoweredBy,
  PoweredByContainer,
  PoweredByLogo,
  PoweredByTitle,
  BottomContainer,
  BannerImg,
  BannerLeftContainer,
  BannerRightContainer,
  Hr
} from '../styles/Homepage.style'

const Img = styled.img`
  width:100%;
  object-fit: cover;
`

const HomePage = () => {
  return (
    <>
    <Container>
      <Sidings />
      <Wrapper>
        {/* TOP CONTAINER */}

        
        {/* BOTTOM CONTAINER START */}
        <BottomContainer>
        {/* TAGLINE MAIN CONTAINER */}
        <TaglineContainer>
          {/* TAGLINE LEFT CONTAINER */}
          <TaglineLeftContainer>
            <TaglineMessage>
            Connecting <b>MINDS</b>,<br /> 
            Redefining <b>LEARNING</b> and <br />
            <b>COLLABORATION</b>
            </TaglineMessage>
          </TaglineLeftContainer>

          {/* TAGLINE RIGHT CONTAINER */}
          <TaglineRightContainer>
            <TaglineText>
            <b>ZTELLAR</b> is your Reliable Companion<br />
            Streamlining Events & Learning.
            </TaglineText>

            <PoweredBy>Powered by</PoweredBy>
            <PoweredByContainer>
              <PoweredByLogo src={vizcomSmallLogo} />
              <PoweredByTitle><i>Vizcom Corporation</i></PoweredByTitle>
            </PoweredByContainer>
          </TaglineRightContainer>
        </TaglineContainer>
        {/* TAGLINE MAIN CONTAINER END */}


        </BottomContainer>

        <BannerContainer>
          <BannerLeftContainer>
            {/* <BannerImg src={bannerLeftImg} /> */}
            <CloudinaryImg imageUrl='ztellar/ztellar/sanj9kjlh7etnbglc2lv' height='350' width='683' maxWidth='100%' heightMain='auto' />
          </BannerLeftContainer>

          <BannerRightContainer>
            <CloudinaryImg imageUrl='ztellar/psme LRC 2024/qsniqu3fmmxehktnj3zc' height='350' width='683' widthMain='100%' heightMain='auto' />
          </BannerRightContainer>
        </BannerContainer>

      </Wrapper>
      <Sidings />
    </Container>
    </>
  )
}

export default HomePage
