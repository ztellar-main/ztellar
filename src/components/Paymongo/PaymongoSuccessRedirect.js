import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useQuery} from 'react-query'
import axios from 'axios'
import { UNSAFE_DataRouterStateContext, useNavigate } from 'react-router-dom';
import { loginSuccess, paymongoIdClear } from '../../state/userSlice';
import styled from 'styled-components';
import Toastify from '../Toastify';
import Cookies from 'universal-cookie';

const LoadingContainer = styled.div`
  background-color: #E9F2F9;
  padding:20px;
  width:600px;
  height:300px;
  border:1px solid black;
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Processing = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: #232323;
`

const Please = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #232323;
`

const Spinner = styled.div`
   width: 70px;
   height: 70px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,#ffffff);
   background-color: red;
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
   animation: spinner-zp9dbg 1s infinite linear;
    /* position:absolute;
    left:calc(50% - 30px);
    top:100px; */
    margin-top: 20px;

   @keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}`

const PaymongoSuccessRedirect = () => {
  const cookies = new Cookies(null, { path: '/' });
  const token = cookies.get('token');
    const dispatch = useDispatch();
    const checkoutDetails = useSelector(state => state.user.paymongo);
    const [toatifyState, setToatifyState] = useState(false)

    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate()
    const [dataState, setDataState] = useState(null);

    const checkoutId = checkoutDetails;

    useEffect(() => {
      if(!checkoutDetails){
        navigate('/owned')
      }
    },[checkoutDetails])

    useEffect(() => {
        const res = async() => {


          if(!dataState){
            return
          }
          
          // PAYMENT STATUS
          const paymentStatus = dataState.attributes.payment_intent.attributes.status;

          if(paymentStatus !== 'succeeded'){
            navigate('/')
          }

          // const checkoutId = checkoutDetails;
          const transactionFee = dataState?.attributes?.payments[0]?.attributes?.fee;
          const paymentIntentId = dataState?.attributes?.payment_intent.id
          const description = dataState?.attributes?.payment_intent?.attributes?.description
          //   REMOVE LAST 2 CHAR ON AMOUNT

          const amount = `${dataState?.attributes?.payment_intent?.attributes?.amount}`
          const amountLessFee = amount - transactionFee
          const last = `${amountLessFee}`

          var amountLessFinal = last.slice(0, -2) +"."+last.slice(-2);
          const amountFinal = amount.slice(0, -2) +"."+amount.slice(-2);
          const statement_descriptor = dataState.attributes.payment_intent.attributes.statement_descriptor
          const paymentType = dataState.attributes.payment_intent.attributes.payments[0].attributes.source.type


          const productId = description.split('/')[0]
          // const buyerId = "66375d4c1640535ec179a628" 
          const buyerId =  user._id
          const productOwnerId = description.split('/')[1]
          const productType = description.split('/')[2]
          const regType = description.split('/')[3]
          const ownerPayment = Number(amountLessFinal * .928) 
          const fee = Number(amountLessFinal * .072) 
          const paymentId = paymentIntentId;


          console.log({transactionFee
            ,paymentIntentId
            ,description
            ,amount
            ,amountLessFee
            ,last
            ,amountLessFinal
            ,amountFinal
            ,statement_descriptor
            ,paymentType
            ,productId
            ,buyerId
            ,productOwnerId
                      // const productType
            ,regType
            ,ownerPayment
            ,fee
            ,paymentId})


        // SAVE TO DATABASE
        try{
            const savePayMongo = await axios({
                method:"POST",
                url:"/paymongo/create-paymongo",
                data:{
                    checkout_id:checkoutId,
                    payment_intent_id:paymentIntentId,
                    payment_description:description,
                    fullPayment:Number(amountFinal),
                    basePayment:Number(amountLessFinal),
                    statement_descriptor:statement_descriptor,
                    payment_method:paymentType,
                    productId:productId,
                    buyerId:buyerId,
                    productOwnerId:productOwnerId,
                    productType:productType,
                    ownerPayment:ownerPayment,
                    fee: fee,
                    regType:regType,
                    token:token
                },
                include:{withCredentials:true}
            })
            setToatifyState(true)
            console.log()
            setTimeout(() => {
              if(savePayMongo.data.data4 === undefined){
                dispatch(loginSuccess(savePayMongo.data.data3))
              }else{
                dispatch(loginSuccess(savePayMongo.data.data4))
              }
              console.log({data1:savePayMongo.data.data3, data2:savePayMongo.data.data4})

              dispatch(paymongoIdClear())
              navigate('/owned')
            },500)
        }catch(err){
            navigate('/paymongo-refresh')
            console.log(err)
        }
        }
        res()
      },[dataState])

    const {data,isLoading,isError} = useQuery({
        queryKey:[''],
        queryFn: async() => {
          const res = await axios({
            method:'GET',
            url:`/paymongo/retrieve-checkout?checkoutId=${checkoutId}&token=${token}`,
            include:{withCredentials:true}
          })
          setDataState(res.data.data)
          return res.data.data
        }
    })

    if(isLoading){
        return (
          <LoadingContainer>
          <Processing>Processing...</Processing>
          <Please>please wait.</Please>
          <Spinner />
          </LoadingContainer>
        )
      }


    if(isError){
        // return <p>SOMETHING WENTR WRONG</p>
        // navigate('/paymongo-refresh')
        return console.log('object')
    }

  return (
    <div>
      {toatifyState && 
      <Toastify message='Transaction successful.' />
      }
        <LoadingContainer>
        <Processing>Processing...</Processing>
        <Please>please wait.</Please>
        <Spinner />
        </LoadingContainer>
    </div>
  )
}

export default PaymongoSuccessRedirect
