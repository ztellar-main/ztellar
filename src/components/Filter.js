import React, { useState } from 'react'

// ICONS
import closeIcon from '../icons/close.png'

import {
    Container,
    TopContainer,
    FilterTitle,
    CloseFilterContainer,
    Wrapper,
    HrTop,
    Hr,
    Title,
    PriceRangeContainer,
    InputMinMax,
    RatingsContainer,
    RatingsWrapper,
    RadioButton,
    StarIcon,
    RatingsDetails,
    SortByWrapper,
    SortByTitle,
    CategoriesWrapper,
    CategoriesTitle,
    CloseImg
} from '../styles/Filter.style'



function Filter({setOpenFilter,minimumPrice,style,maximumPrice,category}) {
    
    

  return (
    <Container style={style}>
        <TopContainer>
            <FilterTitle>Filter</FilterTitle>
            <CloseFilterContainer onClick={e => setOpenFilter(false)}>
                <CloseImg src={closeIcon} />
            </CloseFilterContainer>
        </TopContainer>

        <Wrapper>

        <HrTop />

        {/* PRICE RANGE */}
        <Title>Price Range</Title>
        {}
        <PriceRangeContainer>
            <InputMinMax type='number' placeholder='Minimum' onChange={(e) => {
                const value = e.target.value
                minimumPrice(value)
            }} />
            <InputMinMax type='number' placeholder='Maximum' onChange={(e) => {
                const value = e.target.value
                maximumPrice(value)
            }}/>
            
        </PriceRangeContainer>

        <Hr />

        {/* Rating */}


        {/* RATING END */}

        <Hr />

        {/* SORT */}
        {/* <Title>Sort by</Title>
        <SortByWrapper>
            <RadioButton type='radio' />
            <SortByTitle>Title</SortByTitle>
        </SortByWrapper>

        <SortByWrapper>
            <RadioButton type='radio' />
            <SortByTitle>Latest to Oldest</SortByTitle>
        </SortByWrapper>

        <SortByWrapper>
            <RadioButton type='radio' />
            <SortByTitle>Oldest to Latest</SortByTitle>
        </SortByWrapper> */}

        {/* SORT END */}

        {/* <Hr /> */}

         {/*CATEGORIES  */}
         <Title>Categories</Title>
         <CategoriesWrapper>
            <RadioButton value='Engineering' name='category' type='radio' onClick={(e) => {
                const value = e.target.value
                category(value)
            }} />
            <CategoriesTitle>Engineering</CategoriesTitle>
         </CategoriesWrapper>

         <CategoriesWrapper>
            <RadioButton value='Programming' name='category' type='radio' onChange={(e) => {
                const value = e.target.value
                category(value)
            }} />
            <CategoriesTitle>Programming</CategoriesTitle>
         </CategoriesWrapper>

         <CategoriesWrapper>
            <RadioButton value='Marketing' name='category' type='radio' onChange={(e) => {
                const value = e.target.value
                category(value)
            }} />
            <CategoriesTitle>Marketing</CategoriesTitle>
         </CategoriesWrapper>


         </Wrapper>



    </Container>
  )
}

export default Filter