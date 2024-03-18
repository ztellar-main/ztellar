import React, { useState } from 'react'
import styled from 'styled-components'

// COMPONENTS
import CloudinaryImg from './Author/CloudinaryImg'

// ICONS
import {FaStar} from 'react-icons/fa';

const Container = styled.div`
    padding:10px;
    box-sizing: border-box;
    border:1px solid gray;
    /* box-shadow: 1px 1px 8px gray; */
    border-radius: 20px;
    margin: 0 auto;
    margin-bottom: 10px;
    transition: all .01s ease .01s;

    &:active{
        scale: 1.03;
    }
`

const ThumbnailContainer = styled.div`
    width:100%;
    height:140px;
    background: gray;
    border-radius: 3px;
    border-radius: 18px;

`

const ThumbnailImg = styled.img`
    width:100%;
    height:100%;
    object-fit: fill;
    border-radius: 18px;
`

const Title = styled.div`
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 17px;
    margin-top: 5px;

`

const Author = styled.div`
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow: ellipsis; 
    font-size: 13px;
    margin-top: 5px;
    font-weight: 700;
    color:gray;
`

const RatingsContainer = styled.div`
    width:100%;
    height:30px;
    display:flex;
    align-items: center;

`

const RatingsDetails = styled.p`
    color:gray;
    font-size: 13px;

`

const RatingsIcon = styled.img`
    height:20px;
    margin-left:10px;
    margin-right:10px;
`

const CreatedAt = styled.p`
    color:gray;
    font-size: 13px;
`


const Price = styled.p`
    margin:10px 0;
    border-bottom: 1px solid gray;
    font-weight: 700;
    padding-bottom:5px;
`

const StarContainer = styled.div`
    width:125px;
    margin-left: 5px;
    margin-top: 2px;
`

const ImgContainer = styled.img`
    width: 100%;
    height:100%;
    object-fit: cover;
    border-radius: 15px;
`

function CardSearch({dat}) {
    const [currentValue, setCurrentValue] = useState(dat?.average_rating)
    const stars = Array(5).fill(0);
    // Format the price above to PHP using the locale, style, and currency.
    let PHP = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    });

    var date = new window.Date(dat?.createdAt);

    const colors = {
        orange:"#FFD600",
        gray:"#a9a9a9"
    }

    return (
     <>

    <Container>
    <ThumbnailContainer>
        {/* {dat?.title === '10th PSME LRC Conference 2024'
        ?
        <ImgContainer src={sampleEvent} />
        :
        <ImgContainer src={sampleEvent} />
        } */}
        <CloudinaryImg imageUrl={dat?.image_url} width='240' height='120' widthMain='100%' heightMain='100%' objectFit='cover' borderRadius='15px' />
        
    </ThumbnailContainer>
    {/* TITLE SHOULD 30 CHARACTERS ABOVE */}
    <Title>{dat?.title}</Title>
    {/* <Author>Author: {dat?.author_name}</Author> */}

    <RatingsContainer>
        <RatingsDetails>{Math.round(dat?.average_rating * 10) / 10}</RatingsDetails>

        <StarContainer>
        {stars.map((_,index) => {
            return(
                <FaStar 
                key={index}
                size='15'
                style={{
                    marginRight:'10',
                    cursor:"pointer",
                }}
                color={(currentValue) > index ? colors.orange : colors.gray}
                />
            )
        })}
        </StarContainer>

        <RatingsDetails>({dat?.feedback_count})</RatingsDetails>
    </RatingsContainer>

    <CreatedAt>Created At: {date.toLocaleDateString('en-US')}</CreatedAt>
    <CreatedAt>Type:&nbsp; {dat?.type.toUpperCase()}</CreatedAt>

    {/* <Price>{PHP.format(dat?.price)}</Price> */}

    </Container>

    </>   
    
  )
}

export default CardSearch