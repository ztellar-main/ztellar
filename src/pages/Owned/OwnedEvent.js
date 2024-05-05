import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';

// ICONS
import QRCode from "react-qr-code";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import CloudinaryImg from '../../components/Author/CloudinaryImg';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfCertificate from '../../components/Owned/PdfCertificate';

const Container = styled.div`
    width:100%;
    display: flex;
`

const Wrapper = styled.div`
    max-width: 1366px;
    width:1366px;
    box-sizing: border-box;
    padding-top: 20px;
    @media (max-width:1386px) {
        padding:20px;
    }

`
const Sidings = styled.div`
    flex-grow: 1;
`

const SubContainer = styled.div`
    width:100%;
    background-color: #E9F2F9;
    border-radius: 15px;
    border:1px solid black;
    box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    padding:20px;


    @media (max-width:800px) {
        flex-direction: column;
    }
`

const LeftContainer = styled.div`
    flex-grow: 1;

`



const MainImageContainer = styled.div`
    width:100%;
    border-radius: 15px;
    margin-bottom: 5px;
`

const SampleImg = styled.img`
    width:100%;
    object-fit: cover;
    border-radius: 15px;
`
const Title = styled.div`
    font-weight: bold;
    font-size: 35px;
    color:#232323;
    margin-bottom: 5px;

    @media (max-width:800px) {
        font-size: 25px;
    }

    @media (max-width:450px) {
        font-size: 20px;
    }
`

const Date = styled.p`
    font-size: 18px;
    color:#232323;
    margin-bottom: 5px;

    
    @media (max-width:800px) {
        font-size: 16px;
    }

    @media (max-width:450px) {
        font-size: 14px;
    }
`

const Place = styled.div`
    border:1px solid #1A66CC;
    padding:5px;
    border-radius: 15px;
    width:400px;
    color:#232323;
    box-sizing: border-box;

    @media (max-width:500px) {
        width:100%;
    }

    @media (max-width:800px) {
        font-size: 16px;
    }

    @media (max-width:450px) {
        font-size: 14px;
    }
`

const RightContainer = styled.div`
    width:400px;
    min-width: 400px;
    padding-left: 20px;
    box-sizing: border-box;

    @media (max-width:1000px) {
        width:300px;
        min-width: 300px;  
        
    }

    @media (max-width:800px) {
        width:100%;
        min-width: 0;  
        padding: 0;
        padding-top:10px;
    }
`

const QrCodeContainer = styled.div`
    width:100%;
    background-color: #071C34;
    border-radius: 15px;
    padding:20px;
    box-sizing: border-box;
`

const QrTitle = styled.p`
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color:white;
    margin-bottom: 20px;
`

const QrMessage = styled.p`
    text-align: center;
    font-size: 13px;
    color:white;
    margin-bottom: 20px;
`

const QrContainer = styled.div`
    height: auto;
    margin: 0 auto;
    max-width: 250;
    width: 90%;
    padding:20px;
    border-radius:15px;
    background:white;
    margin-top:20px;
    margin-bottom:20px;
    box-sizing: border-box;

    @media (max-width:800px){
        width:350px;
    }

    @media (max-width:500px){
        width:100%;
    }

`

const BottomMessage = styled.p`
    color:#232323;
    margin-top: 20px;
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

const DownloadCertButton = styled.button`
    width:200px;
    padding:10px;
    background-color: #2B6EC1;
    border:0;
    border-radius: 5px;
    color:white;
    cursor: pointer;
    
    &:hover{
        opacity: .5;
    }
`

const OwnedEvent = () => {
    const user = useSelector(state => state.user.currentUser);
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const eventId = query.get('eventId');

    const qrCode = user?.course_owned?.find(e => {
        return e._id === eventId
    });

    const {data,isLoading} = useQuery({
        queryKey:[''],
        queryFn: async() => {
            const res = await axios({
                method:'GET',
                url:`/event/get-single_owned-event?eventId=${eventId}&token=${token}`,
                include:{withCredentials:true}
            })
            return res?.data
        }
    })

    if(isLoading){
        return <Spinner />
    }

    var dateFrom = new window.Date(data?.date_from);
    var dateTo = new window.Date(data?.date_to);

    console.log(data)


  return (
    <>
    <Container>
        <Sidings />
        <Wrapper>
            <SubContainer>
                {/* LEFT CONTAINER */}
                <LeftContainer>
                    {/* IMAGE */}
                    <MainImageContainer>
                        <CloudinaryImg imageUrl='ztellar/psme LRC 2024/qsniqu3fmmxehktnj3zc' width='1280' height='680' widthMain='100%' heightMain='100%' objectFit='cover' borderRadius='15px' />
                    </MainImageContainer>

                    {/* TITLE */}
                    <Title>{data?.title}</Title>

                    {/* DATE */}
                    <Date>{dateFrom.toDateString('en-US')} - {dateTo.toDateString('en-US')}</Date>

                    {/* PLACE */}
                    <Place>{data?.place}</Place>

                    {/* MESSAGE */}
                    <BottomMessage>After completing the course, a brief assessment will be provided for your learning. E-certificates can be downloaded post-event.</BottomMessage>
                    
                    <BottomMessage>You will receive notifications indicating when it's time to download your certificate.</BottomMessage>
                    {/* <PDFDownloadLink document={<PdfCertificate fname={user?.fname} mname={user?.mname} lname={user?.lname} />} fileName='Lrc Certificate'>
                        <DownloadCertButton>DOWNLOAD</DownloadCertButton>
                    </PDFDownloadLink> */}
                    <DownloadCertButton>DOWNLOAD</DownloadCertButton>
                </LeftContainer>

                {/* RIGHT CONTAINER */}
                <RightContainer>
                    {/* QR CODE CONTAINER */}
                    <QrCodeContainer>
                        {/* QR TITLE */}
                        <QrTitle>{data?.title}</QrTitle>

                        {/* QR MESSAGE */}
                        <QrMessage>This will serve as your Identification card for the coming Regional Conference.</QrMessage>

                        {qrCode?.reg_type === 'f2f'
                        ?
                        <QrContainer>
                            <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrCode.qr_code}
                            viewBox={`0 0 256 256`}
                            />
                        </QrContainer>
                        :
                        <QrMessage>Your registration is virtual.</QrMessage>
                        }

                        {qrCode?.reg_type === 'registration' &&
                            <QrContainer>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qrCode.qr_code}
                                viewBox={`0 0 256 256`}
                                />
                            </QrContainer>
                        }

                        {qrCode?.reg_type === 'newly registered M.E f2f' &&
                            <QrContainer>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qrCode.qr_code}
                                viewBox={`0 0 256 256`}
                                />
                            </QrContainer>
                        }



                    </QrCodeContainer>

                    
                </RightContainer>
            </SubContainer>
        </Wrapper>
        <Sidings />
    </Container>
    </>
  )
}

export default OwnedEvent
