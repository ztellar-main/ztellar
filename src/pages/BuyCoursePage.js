import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// SELECT CSS
import '../styles/select.css'

// COMPONENTS
import PaypalButton from '../components/Paypal/PaypalButton';
import { useQuery } from 'react-query';
import PaymongoButton from '../components/Paymongo/PaymongoButton';
import CloudinaryImg from '../components/Author/CloudinaryImg';

const Container = styled.div`
    width:500px;
    z-index: 1;
    border-radius: 15px;
    margin-left: 50%;
    margin-top: 20px;
    transform: translateX(-50%);

    @media (max-width:1366px) {
        width:400px;
    }

    @media (max-width:450px) {
        width:90%;
    }
`

const ImageContainer = styled.div`
    width:100%;
    height:300px;
    background-color: gray;
    border-radius: 15px;
    border:1px solid black;
    position:relative;

    @media (max-width:1366px) {
        height:250px;
    }

    @media (max-width:450px) {
        height:200px;
    }
`

const DetailsContainer = styled.div`
    width:90%;
    background-color: #E9F2F9;
    margin-left: 5%;
    z-index: 2;
    position:absolute;
    top:220px;
    border: 1px solid black;
    border-radius: 15px;
    padding:15px;
    box-sizing: border-box;

    @media (max-width:1366px) {
        top:190px;
    }

    @media (max-width:450px) {
        top:160px;
    }
`

const Title = styled.div`
    color: #232323;
    font-size: 20px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;

    @media (max-width:1366px) {
        font-size: 18px;
    }
`

const Author = styled.div`
    color: #232323;
    margin-bottom: 10px;

    @media (max-width:1366px) {
        font-size: 14px;
    }
`

const SubTitleContainer = styled.div`
    width:100%;
    display:flex;
    align-items: center;
`

const Hr = styled.hr`
    flex-grow: 1;
    height:1px;
    border:none;
    border-top: 1px solid #071C34;
`

const Subtitle = styled.p`
    margin:0 15px;
    font-size: 16px;
    color: #071C34;
    margin-bottom: 5px;

    @media (max-width:1366px) {
        font-size: 14px;
    }
`

const Select = styled.select`
    width:100%;
    height:40px;
    padding:10px;
`

const Option = styled.option`
    height:40px;
    padding:10px;
    width:100%;
`

const Button = styled.button`
    background-color: #f1c40f;
    border:none;
    font-size: 25px;
    font-weight: bold;
    padding:10px;
    width:100%;
    border-radius: 5px;
`

const ErrorHandler = styled.div`
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
`   

const BuyCoursePage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const courseId = query.get('id');
    const user = useSelector(state => state.user.currentUser);



    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [price,setPrice] = useState('0');

    const {data, isLoading} = useQuery({
      queryKey:['data',courseId],
      queryFn: async() => {
          const res = await axios({
              method:'GET',
              url:`/course/get-single-active-course?id=${courseId}`,
              include:{withCredentials:true}
          })
          return res?.data
      }
    })

    if(isLoading){
        return(
            <p>Loading</p>
        )
    }

    let PHP = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    });

    // console.log(price)

    const f2f = `${data?.f2f_price}/f2f`;
    const virtual = `${data?.virtual_price}/virtual`
    const jpsme = `${data?.jpsme_price}/JPSME`
    const normal = `${data?.price}/registration`
    const newRegF2f = `${data?.new_reg_f2f}/newly registered M.E f2f`
    const newRegVirtual = `${data?.new_reg_virtual}/newly registered M.E virtual`

    const finalPrice = price.split('/')[0];
    const registrationType = price.split('/')[1];


  return (
        <>
        <Container>
            <ImageContainer>
                <CloudinaryImg imageUrl='ztellar/psme LRC 2024/qsniqu3fmmxehktnj3zc' width='1366' height='800' widthMain='100%' heightMain='100%' objectFit='cover' borderRadius='15px' />
            </ImageContainer>

            {/* DETAILS CONTAINER */}
            <DetailsContainer>
                {/* TITLE */}
                <Title>{data?.title}</Title>

                {/* AUTHOR */}
                <Author>{data?.author_id?.username}</Author>

                {/* SUB TITLE */}
                <SubTitleContainer>
                    <Hr />
                    <Subtitle>REGISTRATION OPTION</Subtitle>
                    <Hr />
                </SubTitleContainer>

                {/* SELECT REGISTRATION */}
                {courseId !== '65fd60b6881c189c54553606' ?
                <Select value={price} onChange={e => setPrice(e.target.value)}>
                    <Option value={0}>Choose Registration</Option>
                    <Option value={normal}>Registration Fee - {PHP.format(data?.price)}</Option>
                </Select>
                :
                <Select value={price} onChange={e => setPrice(e.target.value)}>
                    <Option value={0}>Choose Registration</Option>
                    <Option value={f2f}>Face to Face Registration Fee - {PHP.format(data?.f2f_price)}</Option>
                    <Option value={virtual}>Virtual Registration Fee - {PHP.format(data?.virtual_price)}</Option>
                    <Option value={newRegF2f}>Newly registered M.E f2f Registration Fee - {PHP.format(data?.new_reg_f2f)}</Option>
                    <Option value={newRegVirtual}>Newly registered M.E virtual Registration Fee - {PHP.format(data?.new_reg_virtual)}</Option>
                    // <Option value={jpsme}>JPSME Registration Fee - {PHP.format(data?.jpsme_price)}</Option>
                </Select>
                }


                {/* SUB TITLE */}
                <SubTitleContainer>
                    <Hr />
                    <Subtitle>CHECKOUT</Subtitle>
                    <Hr />
                </SubTitleContainer>
                
                {/* CHECKOUT */}
                {price === '0'
                ?
                <>
                <Button>
                    <p style={{color:'#1a66cc',display:'inline-block'}}><i>Pay</i></p>
                    <p style={{color:'#34aadc',display:'inline-block'}}><i>Pal</i></p>
                </Button>
                <ErrorHandler>Choose your registration option first.</ErrorHandler>
                </>
                :
                <>
                {/* <PaypalButton data={data} price={finalPrice} regType={registrationType} /> */}
                <PaymongoButton regType={registrationType} price={finalPrice} courseId={courseId} ownerId={data?.author_id?._id} type={data?.type} />
                </>
                }
            </DetailsContainer>
        </Container>
        {/* <PaypalButton data={data} /> */}
        </>
  )
}

export default BuyCoursePage
