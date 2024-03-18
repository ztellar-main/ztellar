import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    /* background-color: red; */
    margin-bottom: 10px;
    display:flex;
`

const ListContainer = styled.div`
    width:20px;
    /* background-color: green; */
    display: flex;
    padding:2px;
`

const Text = styled.p`

`

const ListStyle = styled.div`
    width:10px;
    height:10px;
    border-radius: 50%;
    background-color: 	#202020;
    margin-right: 5px;
    margin-top:5px;
`

function ObjectiveCard() {
  return (
    <Container>
        <ListContainer>
            <ListStyle />
        </ListContainer>
        <Text>
            t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is 
        </Text>
    </Container>
  )
}

export default ObjectiveCard

