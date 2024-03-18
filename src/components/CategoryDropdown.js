import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    box-shadow: 0px 0px 8px gray;
    position:absolute;
    top:75px;
    right: 325px;
    padding:10px;
    border-radius:3px;
    background-color: white;
    box-sizing: border-box;
    z-index: 2;

    @media (max-width:800px){
      display:none;
    }

    @media (max-width: 1000px) {
      right: 228px;
    }
`

const Buttons = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    padding:10px;
    box-sizing: border-box;
    cursor:pointer;

    &:hover{
      color:blue;
    }


`

function CategoryDropdown({as,animate,initial,transition}) {
  return (
    <Container as={as} animate={animate} initial={initial} transition={transition}>
        <Link to='' style={{textDecoration:'none',color:'black'}}>
          <Buttons>Programming ...</Buttons>
        </Link>
        
        <Link style={{textDecoration:'none',color:'black'}}>
          <Buttons>Engineering ...</Buttons>
        </Link>
        
        <Link style={{textDecoration:'none',color:'black'}}>
          <Buttons>Marketing ...</Buttons>
        </Link>
        
    </Container>
  )
}

export default CategoryDropdown