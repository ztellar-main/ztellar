import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../state/userSlice';
import Cookies from 'universal-cookie';

const PaypalButton = (props) => {
  const cookies = new Cookies(null, { path: '/' });
  const user = useSelector(state => state.user.currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = cookies.get('token');

  console.log(props.regType)

    const initialOptions = {
        clientId: "AYKivNXng23tmDSnAlojUmuWuSg1UBXuXumOR8fAwjlYq6dXF2exT86ByQGaNwbvZdm-JbkAoBRM0pKA",
        currency: "PHP",
        intent: "capture",
    };
    const createOrder = async(data) => {
        // Order is created on the server and the order id is returned

        try{
          return await fetch("http://localhost:5000/api/paypal/orders", {
            method: "POST",
             headers: {
              "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            // data: 
            // {price: props.price,
            // title: props.data?.title,}
            body:JSON.stringify({
                product: 
                  {
                    price: props.price,
                    title: props.data?.title,
                  },
              }),
          })
          .then((response) => response.json())
          .then((order) => order.id);
        }catch(err){
          console.log(err)
        }
        
      };
      const onApprove = async(data) => {
         // Order is captured on the server and the response is returned to the browser
         console.log(props.price)

         console.log(props.regType)

        
         try{
          const result = await axios({
            method:"POST",
            url:"http://localhost:5000/api/paypal/orders/capture",
            data:{orderID: data.orderID,
              productId:props.data?._id,
              regType:props.regType,
              token:token},
            headers: {
              "Content-Type": "application/json",
            },
            include:{withCredentials:true}
            });
            try{
              const result2 = await axios({
                method:"POST",
                url:"/payment/create-payment",
                data:{
                  product_id: props.data?._id,
                  full_payment: Number(props.price),
                  payment_mode: data?.paymentSource,
                  buyer_id: user?._id,
                  product_owner_id: props.data.author_id._id,
                  product_type: props?.data?.type,
                  owner_payment: Number(props.price) * .93,
                  fee: Number(props.price) * .07,
                  order_id: data?.orderID,
                  payer_id: data?.payerID,
                  payment_id: data?.paymentID,
                  facilitator_access_token: data?.facilitatorAccessToken,
                  token:token
                },
                headers: {
                  "Content-Type": "application/json",
                },
                include:{withCredentials:true}
                });
                console.log(result2)

                dispatch(loginSuccess(result.data.userUpdate))
                navigate('/owned')
                console.log(result.data.courseUpdate)
            }catch(err){
              console.log(err)
            }

         }catch(err){
          console.log(err)
         }
    }

    const onCancel = () => {
      navigate(`/course/${location.search}`)
    }

    const onError = () => {
      navigate('/owned')
    }
  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
        createOrder={(data) => createOrder(data)}
        onApprove={(data) => onApprove(data)}
        onCancel={(data) => onCancel(data)}
        onError={(data) => onError(data)}
        />
    </PayPalScriptProvider>
    </>
  )
}

export default PaypalButton
