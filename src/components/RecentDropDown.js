import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:calc(100% - 20px);
    position:absolute;
    top:75px;
    z-index: 10;
    box-shadow: 0px 0px 8px gray;
    border-radius:3px;
    background-color: white;
    padding:10px;
    box-sizing: border-box;

`

const List = styled.p`
  margin-bottom: 10px;
  cursor: pointer;
`

function RecentDropDown({as,animate,initial,transition}) {
  return (
    <Container as={as} animate={animate} initial={initial} transition={transition}>
        <List>SAMPLE</List>
        <List>SAMPLE</List>
        <List>SAMPLE</List>
        <List>SAMPLE</List>
        <List>SAMPLE</List>

    </Container>
  )
}

export default RecentDropDown