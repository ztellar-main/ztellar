import styled from 'styled-components'

export const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`

export const Wrapper = styled.div`
    width:1366px;
    max-width: 1366px;
    display:flex;
`
export const MainBody = styled.div`
    flex-grow: 1;
    padding:0 10px;
    box-sizing: border-box;
`

export const RouteContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:5px 0;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    /* background-color: red; */
`

export const RouteText = styled.p`
    font-size: 17px;
    color:gray;
`