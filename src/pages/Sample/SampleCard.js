import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    background-color: green;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

const Title = styled.p`

`

const ButtonContainer = styled.div`

`

const Button = styled.button`

`

const SampleCard = ({datas}) => {
  return (
    <Container>
        <Title>{datas.title}</Title>

        <ButtonContainer>
            <Button>Delete</Button>
        </ButtonContainer>
    </Container>
  )
}

export default SampleCard
