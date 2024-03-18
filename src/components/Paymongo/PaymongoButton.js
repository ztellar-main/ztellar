import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { paymongoId } from '../../state/userSlice'
import Cookies from 'universal-cookie';


const Button = styled.button`
  background-color: green;
  color:white;
  border:none;
  padding:15px;
  font-size: 20px;
  border-radius: 5px;
  width:100%;

  cursor: pointer;

  &:hover{
    opacity:.5;
  }
`

const PaymongoButton = ({price,courseId,ownerId,type,regType}) => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token');
    const [state, setState] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

  // CREATE CHECKOUT SESSION
  const createCheckoutSession = async(data) => {
    try{
      setState('loading')
      const res =  await axios({
        method:"POST",
        url:"/paymongo/create-checkout-session",
        data:{price,courseId,ownerId,type,regType,token},
        include:{withCredentials:true}
      })
      setState('success')
      // RETRIEVE CHECKOUT
      const checkoutId = res.data.id;
      const checkoutUrl = res.data.attributes.checkout_url;

      dispatch(paymongoId(checkoutId))

      window.location.href = checkoutUrl;

    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <Button onClick={createCheckoutSession}>PayMongo</Button>
    </>
  )
}

export default PaymongoButton
