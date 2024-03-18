import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
    height:calc(100vh + 65px);
    position:fixed;
    z-index: 11;
    top:-65px;
    background-color: gray;
    opacity:.2;
`

function BackgroundCloser({setUploadOpener}) {
  return (
    <Container onClick={e => setUploadOpener(false)}>

    </Container>
  )
}

export default BackgroundCloser