import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

// COMPONENTS
import OwenedCard from '../../components/Owned/OwenedCard'

import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import axios from 'axios'

const Container = styled.div`
    width:100%;
    display:flex;
`

const Wrapper = styled.div`
    width:1366px;
    height: 100px;
    padding:0 10px;
    box-sizing: border-box;
`

const Sidings = styled.div`
    flex-grow: 1;
`

const Title = styled.p`
    color: 	#484848;
    font-size: 30px;
    font-weight: bold;
    padding:10px 0;
    border-bottom: 1px solid #1A66CC;
`

const CardsBodyContainer = styled.div`
    width:100%;
    margin-top: 10px;
`

const Spinner = styled.div`
  color: gray;
  font-size: 45px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
  position:absolute;
    left:calc(50% - 30px);
    top:50px;


@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes round {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
 
`

const CardsWrapper = styled.div`
    width:100%;
    display: grid;
    grid-template-columns:repeat(auto-fill,350px);
    justify-content: space-around;
    gap:10px;
    position:relative;
    margin-top: 10px;

    @media (max-width: 1366px){
        grid-template-columns:repeat(auto-fill,250px);
    }
`

const Owned = () => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const user = useSelector(state => state.user.currentUser);
    const [refresher, setRefresher] = useState(false);
    
    const {data,isLoading,isError,error} = useQuery({
        queryKey:['',refresher],
        queryFn: async() => {
            const res = await axios({
                method:"get",
                url:`/course/get-all-owned-course?token=${token}`,
                include:{withCredentials:true}
            });
            return res?.data
        }
    })

    if(isLoading){
        return <Spinner />
    }

    if(isError){
        console.log(error)
    }

    // console.log(user?.course_owned.length)

  return (
    <>
    <Container>
        <Sidings />
        <Wrapper>
            <Title>My courses and events</Title>
            
            {user?.course_owned?.length === 0
            ?
            <p>NO COURSE OR EVENT</p>
            :
            <CardsWrapper>
                {data?.course_owned.map((data,i) => {
                    return(
                        <OwenedCard setRefresher={setRefresher} key={i} data={data._id} />
                    )
                })}

            </CardsWrapper>
            }
       


            
            
            
        </Wrapper>
        <Sidings />
    </Container>
    </>
  )
}

export default Owned
