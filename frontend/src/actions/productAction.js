import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    CLEAR_ERRORS
} from "../constants/productConstants";

/************************** Get All Products ************************************/
export const getProduct = (keyword="",currentPage=1, category, ratings="4") => async (dispatch) => {

    console.log("Here my valus is :" + category)
    try {
        
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        
        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;
        
        if(category){
            console.log("I am here!");
            link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
        }

        console.log(link);
        const {data} = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** Get Product Detail ************************************/
export const getProductDetail = (id) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
        const {data} = await axios.get(`http://localhost:5000/api/v1/product/${id}`)
    dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data.product,
    })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** New Review ************************************/
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };

      const link = "http://localhost:5000/api/v1/review";
  
      const { data } = await axios.put(link, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

/************************** Clear Errors ************************************/
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}