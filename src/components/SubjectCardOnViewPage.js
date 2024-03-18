import React, { useState } from 'react'
import styled from 'styled-components'

// ICONS
import arrowDown from '../icons/arrowDown.svg'
import arrowUp from '../icons/arrowUp.svg'

// COMPONENTS
import VideoCardOnViewPage from './VideoCardOnViewPage'

const Container = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
`

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 13px;
    color: #0D0D0D;
`

const Arrow = styled.img`
    width:25px;
    height:25px;
`

const VideoContainer = styled.div`

`

const SubjectCardOnViewPage = ({data,number}) => {
    const [dropdownOpener, setDropdownOpener] = useState(false)

    const videoOpenerFunction = () => {
        if(dropdownOpener === true){
            setDropdownOpener(false)
        }else{
            setDropdownOpener(true)
        }
    }
  return (
    <>
    <Container onClick={videoOpenerFunction}>
        <Title><p style={{fontWeight:'bold',display:'inline-block'}}>Subject {Number(number) + 1} :</p> {data?._id?.title}</Title>
        {!dropdownOpener ?
        <Arrow src={arrowDown} />
        :
        <Arrow src={arrowUp} />
        } 
    </Container>
    {dropdownOpener && 
    <VideoContainer>
        {data?.videos.map((videos,i) => {
            return(
                <VideoCardOnViewPage key={i} data={videos} number={i} />
            )
        })}

    </VideoContainer>
    }
    
    
    </>
  )
}

export default SubjectCardOnViewPage
