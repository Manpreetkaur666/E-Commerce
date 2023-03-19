import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";

import axios from "axios";

/************************** Create New Order ************************************/
export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json"}, withCredentials: true
        };

        const link = "http://localhost:5000/api/v1/order/new";

        const {data} = await axios.post(link, order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        });

    }catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }

}

/************************** Get All Orders ************************************/
export const myOders = () => async(dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json"}, withCredentials: true
        };

        const link = "http://localhost:5000/api/v1/orders";

        const {data} = await axios.get(link, config);

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        });

    }catch(error){
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

/************************** Get Order Details ************************************/
export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json"}, withCredentials: true
        };

        const link = `http://localhost:5000/api/v1/order/${id}`;

        const {data} = await axios.get(link, config);

        console.log("datanis" + data);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        });

    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}


/************************** Clear Errors ************************************/
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}