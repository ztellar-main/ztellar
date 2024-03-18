import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
    height:100vh;
    position:absolute;
    left:0;
    top:0;
    z-index: 1;
`



function BackgroundClose({setOpenDropdownContainer,setOpenCategoryDropdown,setOpenRecentSearch}) {
  return (

    <Container onClick={e => {
      setOpenDropdownContainer(false)
      setOpenCategoryDropdown(false)
      setOpenRecentSearch(false)
    }}>
        
    </Container>
  )
}

export default BackgroundClose