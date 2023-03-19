import React, { Fragment, useEffect, useState, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import {
 CardNumberElement,
 CardCvcElement,
 CardExpiryElement,
 useStripe,
 useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { createOrder, clearErrors } from '../../actions/orderAction';



const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems} = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async(e) => {
      console.log("I am clicked");
      e.preventDefault();
      payBtn.current.disabled = true;

      try {
        const config = { 
          headers: { "Content-Type": "application/json" }, withCredentials: true
        };

        const link = "http://localhost:5000/api/v1/process/payment";

        const { data } = await axios.post(link,
          paymentData,
          config);
        
        console.log("I am here");

        console.log("data" + data);
        const client_secret = data.client_secret;

        if(!stripe || !elements) return;

        const result =  await stripe.confirmCardPayment(client_secret,{
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                country: shippingInfo.country,
                postal_code: shippingInfo.pinCode,
              },
            },
          }
        });

        if (result.error) {
          payBtn.current.disabled = false;
          // console.log(error.response.data.message);
        //  alert.error(error.response.data.message);
        } else {
          if(result.paymentIntent.status === "succeeded"){

            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };

            dispatch(createOrder(order));

            navigate("/success")
          }else{
            // alert.error("There is some issue while processing Payment! Please Try Again!");
          }
        }
       
      } catch (error) {
        payBtn.current.disabled = false;
        // console.log(error.response.data.message);
        // alert.error(error.response.data.message);
      }

    }

    useEffect(() => {
      if(error){
        console.log(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error]);

  return (
    <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2}/>
        <div className='paymentContainer'>
             <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
               <Typography>Card Info</Typography>
               <div>
                <CreditCardIcon />
                <CardNumberElement className='paymentInput'/>
               </div>

               <div>
                <EventIcon />
                <CardExpiryElement className='paymentInput'/>
               </div>

               <div>
                <VpnKeyIcon />
                <CardCvcElement className='paymentInput'/>
               </div>

               <input 
               type="submit"
               value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
               ref={payBtn}
               className="paymentFormBtn"
               />
             </form>
        </div>
    </Fragment>
  )
}

export default Payment