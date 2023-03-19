import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL
} from "../constants/authConstants"

/************************** Login User ************************************/
export const login = (email, password) => async (dispatch) => {

    console.log("Here my valus is :")
    try {
        
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        
        let link = `http://localhost:5000/api/v1/login`;
    
        const {data} = await axios.post(link,
            { email, password },
            config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** Register User ************************************/
export const register = (userData) => async (dispatch) => {

    console.log("Here my valus is :")
    try {
        
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true  };
        
        let link = `http://localhost:5000/api/v1/register`;
    
        const {data} = await axios.post(link,
           userData,
            {config});

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** Load User ************************************/
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        
        // let link = `/api/v1/me`;
        let link = `http://localhost:5000/api/v1/me`;
        
    
        const {data} = await axios.get(link, config);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** Logout User ************************************/
export const logout = () => async (dispatch) => {
    try {
        let link = `http://localhost:5000/api/v1/user/logout`;
        await axios.get(link);
        dispatch({
            type: LOGOUT_SUCCESS,  
        })
    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

/************************** Update Profile ************************************/
export const updateProfile = (userData) => async (dispatch) => {
    console.log("I am in updateProfile!")
    try {    
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };

        let link = `http://localhost:5000/api/v1/me/update`;
       
        const {data} = await axios.put(link, userData, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}


/************************** Clear Errors ************************************/
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}