import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`

`

const Input = styled.input`

`

const InputContainer = styled.div`
    background-color: lightgrey;
    padding:20px;
    box-sizing: border-box;
`

const ValidateAndUpdateReceipt = () => {
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [catchError, setCatchError] = useState('start');
    const [descError, setDescError] = useState('');

    const [emailError, setEmailError] = useState('')

    const productId = description.split('/')[0];
    const productOwnerId = description.split('/')[1];
    const productType = description.split('/')[2];
    const [userData, setUserData] = useState('');


    const checkEmailIsExistFunction = async() => {
        try{
            const res = await axios({
                method:'post',
                url:'/agent/check-email-if-exist',
                data:{email:email},
                include:{withCredentials:true}
            })
            setEmailError('')
            setUserData(res.data.data)
            setCatchError('success')
            return
        }catch(err){
            setEmailError(err.response.data || err.message)
        }
    }

    const verifyAndUpdatePAyment = async() => {
        
        const product = userData?.course_owned?.find(e => {
            return e._id === productId
          })

        if(product){
            setDescError('This transaction is already successful.')
            console.log('exist')
            return
        }
        
        try{
            const res = await axios({
                method:'POST',
                url:'/agent/validate-receipt-description',
                data:{productId},
                include:{withCredentials:true}
            })
            setCatchError('proceed')
            console.log(userData)
            
            console.log(res)
        }catch(err){
            setDescError(err.response.data || err.message)
        }
    }

    console.log(email)

   

    const proceedToSaveFunction = async() => {
        try{
            const savePayMongo = await axios({
                method:"POST",
                url:"/paymongo/create-paymongo",
                data:{
                    amount:1000,
                    statement_descriptor:'ztellar',
                    payment_method:'gcash',
                    productId:productId,
                    productOwnerId:productOwnerId,
                    productType:productType,
                    ownerPayment:800,
                    fee: 200
                },
                include:{withCredentials:true}
            })

            setCatchError("done")

            console.log(savePayMongo)
        }catch(err){
            console.log('object')
        }
        
    }

  return (
    <>
    <Container>
        {catchError === 'start' &&
            <InputContainer>
                <Input value={email} placeholder='Enter receipt email here.' onChange={e => setEmail(e.target.value)} />
                <button onClick={checkEmailIsExistFunction}>SAMPLE</button>
                <p>{emailError}</p>
            </InputContainer>
        }

        {catchError === 'success' &&
            <>
                <p>Email: {userData?.email}</p>
                <Input value={description} placeholder='Please enter receipt description.' onChange={e => setDescription(e.target.value)}  />
                <button onClick={verifyAndUpdatePAyment}>Verify</button>
                <p>{descError}</p>
            </>
        }

        {catchError === 'proceed' &&
            <>
            <button onClick={proceedToSaveFunction}>Proceed</button>
            </>
        }

        {catchError === 'done' &&
            <>
            <p>DONE</p>
            </>
        }

    </Container>
    </>
  )
}

export default ValidateAndUpdateReceipt
