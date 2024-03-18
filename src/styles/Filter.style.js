import styled from 'styled-components'

export const Container = styled.div`
    width:300px;
    height:calc(100vh - 65px);
    position: sticky;
    
    top:65px;
    margin-left:-300px;
    z-index: 8;
    padding:10px;
    box-sizing: border-box;
    box-shadow: 1px 1px 8px gray;
    background-color: white;
    transition: all .2s ease 0s;
    

    @media (max-width:800px) {
        position:fixed;
        left:-100%;
    }

    @media (max-width:450px) {
        top:55px;
        width:100%;
        left:-100%;
        height:calc(100vh - 55px);
    }
`

export const TopContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
`
export const FilterTitle = styled.p`
    font-size: 20px;
    font-weight: 700;
`

export const CloseFilterContainer = styled.div`
    width:40px;
    height:40px;

    display: flex;
    align-items: center;
    justify-content: center;
`
export const Wrapper = styled.div`
    margin-top: 10px;
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
    height:calc(100vh - 125px);
`

export const Hr = styled.hr`
    width:97%;
    border-top: 1px solid #1A66CC;
    margin:10px 0;
`

export const HrTop = styled.hr`
    width:97%;
    border-top: 1px solid #1A66CC;
    margin:0;
`



export const Title = styled.p`
    margin-bottom: 10px;
`

export const PriceRangeContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: space-around;
`

export const InputMinMax = styled.input`
    width:120px;
    padding:10px 20px;
    font-size: 15px;
    border-radius: 20px;
    border:1px solid #1A66CC;
    outline:none;
    box-sizing: border-box;
`

export const RatingsContainer = styled.div`
    width:100%;
    
`

export const RatingsWrapper = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    margin-bottom: 10px;
`

export const RadioButton = styled.input`
    margin-top: 0px;
    width:17px;
    height:17px;
`

export const StarIcon = styled.img`
    height:22px;
    margin-left: 30px;
`

export const RatingsDetails = styled.p`
    font-size: 13px;
    color:gray;
    margin-left:20px;
`

export const SortByWrapper = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    margin-bottom: 10px;
`

export const SortByTitle = styled.p`
    font-size: 15px;
    margin-left:30px;
`

export const CategoriesWrapper = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    margin-bottom: 10px;
`

export const CategoriesTitle = styled.p`
    font-size: 15px;
    margin-left:30px;
`

export const CloseImg = styled.img`
    width:25px;

`

