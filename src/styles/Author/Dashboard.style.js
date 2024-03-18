import styled from 'styled-components'


export const BodyWrapper = styled.div`
    width:100%;
    border-radius: 20px;
    border: 1px solid #1A66CC;
    padding:10px;
    box-sizing: border-box;
`

export const Title = styled.p`
    text-align: center;
    padding:10px;
    font-weight: 700;
    font-size: 20px;
    color:gray;
`

export const StatsContainer = styled.div`
    width:100%;
    display: grid;
    grid-template-columns:repeat(auto-fill,300px);
    justify-content: space-around;
    gap:10px;
`
export const StatsCard = styled.div`
    padding:20px;
    box-sizing: border-box;
    display: flex;
    border-radius: 20px;
    box-shadow: 1px 1px 8px #6C6A6A;
    margin-bottom: 20px;
`

export const StatCardIconContainer = styled.div`
    width:90px;
    min-width: 90px;
`

export const StatsCardImg = styled.img`
    width:100%;
`

export const CardDetailsContainer = styled.div`
    flex-grow: 1;
    margin-left: 10px;
    max-height: 90px;
`

export const CardTitle = styled.p`
    text-align: center;
    font-weight: 500;
    font-size: 17px;
`

export const CardNumber = styled.p`
    text-align: center;
    margin-top: 12px;
    font-weight: 700;
    font-size: 22px;
`

export const RevenueContainer = styled.div`
    width:100%;
    margin-top: 10px;
    border-radius: 20px;
    border: 1px solid #1A66CC;
    padding:20px;
    box-sizing: border-box;
`

export const RevenueTitle = styled.p`
    box-sizing: border-box;
    font-weight: 700;
    font-size: 22px;
    text-align: center;
    color:gray;
    margin-bottom: 10px;
`

export const RevenueTotalMainContainer = styled.div`
    width:100%;
    display: flex;

    @media (max-width:500px) {
        flex-direction: column;
    }

    /* @media (max-width:450px) {
        flex-direction: column;
    } */
`

export const RevenueTotalContainer = styled.div`
    padding:20px;
    box-sizing: border-box;
    font-weight: 500;
    width:200px;
    box-shadow: 1px 1px 8px #6C6A6A;
    border-radius: 20px;
    margin-right: 20px;

    @media (max-width:800px) {
        margin-bottom: 10px;
    }

    @media (max-width:500px) {
        margin-bottom: 10px;
        width:100%;
    }
`

export const RevenueText = styled.p`
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 5px;
`

export const RevenueTotal = styled.p`
    font-weight: 500;
    font-size: 25px;
    color:red;
`

export const ChartContainer = styled.div`
    width:100%;
    height:400px;
    border-radius: 20px;
    box-shadow: 1px 1px 8px #6C6A6A;
    margin-top: 20px;
    display: flex;
    align-items:center;
    justify-content: center;
`



