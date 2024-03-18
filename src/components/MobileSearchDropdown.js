import React from 'react'
import styled from 'styled-components'

// ICONS
import searchIcon from '../icons/search.png'
import closeIcon from '../icons/close.png'
import { useNavigate } from 'react-router-dom'

const Cotnainer = styled.div`
    width:100%;
    height:100vh;
    position:absolute;
    top:0;
    left: 0;
    background-color: white;
`

const TopContainer = styled.div`
    width:100%;
    height:70px;
    display:flex;
    align-items: center;
`

const InputSearchContainer = styled.div`
    width:calc(100% - 55px);
    height:70px;
    padding-left:10px;
    box-sizing: border-box;
    display:flex;
    align-items: center;
`

const InputSearch = styled.input`
    font-size: 17px;
    width:100%;
    padding:10px;
    box-sizing: border-box;
    border-radius: 20px;
    border:1px solid #1A66CC;
    outline:none;
    padding-left:50px;
    position:relative;
`

const SearchIconContainer = styled.div`
    width:35px;
    height:35px;
    position:absolute;
    z-index:2;
    left:15px;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;


    &:active{
        background-color: red;
    }
`

const SearchIcon = styled.img`
    width:25px;
    height: 25px;
`

const CloseContainer = styled.div`
    width:35px;
    height:35px;
    border-radius: 50%;
    margin:0 10px;
    display:flex;
    align-items: center;
    justify-content: center;

    &:active{
        background-color: red;
    }
`
const CloseIcon = styled.img`
    width:25px;
    height: 25px;
`

function MobileSearchDropdown({setOpenMobileSearchDropdown,as,animate,initial,transition,searchValue,setSearchValue}) {
    const navigate = useNavigate();
    // SEARCH FUNCTION
    const searchEnterFunction = (e) => {
        // e.preventDefault()
        if (e.key === 'Enter') {
            navigate(`/search?query=${searchValue}`)
            setOpenMobileSearchDropdown(false)
        }
    }
  return (
    <Cotnainer as={as} animate={animate} initial={initial} transition={transition}>
        <TopContainer>
            <InputSearchContainer>
                <SearchIconContainer>
                    <SearchIcon src={searchIcon} />
                </SearchIconContainer>
                <InputSearch enterkeyhint="Search" placeholder='Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={searchEnterFunction} autoFocus  />
            </InputSearchContainer>
            <CloseContainer label='search' onClick={e => setOpenMobileSearchDropdown(false)}>
                <CloseIcon src={closeIcon} />
            </CloseContainer>
        </TopContainer>
    </Cotnainer>
  )
}

export default MobileSearchDropdown