import styled from "styled-components";

export const BodyWrapper = styled.div`
    width:100%;
    border:1px solid #1A66CC;
    box-sizing: border-box;
    border-radius: 20px;
    padding:10px;
`

export const PageTitle = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color:gray;
    padding:10px;
    box-sizing: border-box;
    padding-top: 0;
`

export const HeaderCardContainer = styled.div`
    width:100%;
    background: #E9F2F9;
    border-radius: 20px;
    padding:10px;
    box-sizing: border-box;
    display: flex;

    @media (max-width:550px) {
        flex-direction: column;
    }
`

export const CourseImgContainer = styled.div`
    width:225px;

    background-color: gray;
    border-radius: 15px;
    min-width: 225px;
    box-sizing: border-box;

    @media (min-width:601px) {
        height:100px;
    }

    @media (max-width:550px) {
        width:100%;
    }
`

export const CourseImg = styled.img`
    width:100%;
    object-fit: cover;
    border-radius: 12px;
    box-sizing: border-box;

    @media (min-width:601px) {
        height:100px;
    }

`

export const DetailsContainer = styled.div`
    margin-left: 10px;

    @media (max-width:550px) {
        margin-left: 0;
        margin-top: 10px;
    }
`

export const CourseTitleContainer = styled.div`
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    color:#6C6A6A;
    font-weight: 500;
`

export const CourseDescContainer = styled.div`
    margin-top: 10px;
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    color:#6C6A6A;
`

export const AddSubjectContainer = styled.div`
    width:100%;
    padding:10px;
    box-sizing: border-box;
    display: flex;
    justify-content: end;
`

export const AddSubButton = styled.button`
    border: 1px solid #9747FF;
    padding:10px 20px;
    border-radius: 20px;
    color:#9747FF;
    cursor: pointer;
`
