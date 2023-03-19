import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from "../constants/cartConstants";


/************************** Add To Cart ************************************/
export const addToCart = (id, quantity) => async (dispatch, getState) => {

      let link = `http://localhost:5000/api/v1/product/${id}`;
        const {data} = await axios.get(link);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                productId: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity: quantity,
            },
        });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


/************************** Delete From Cart ************************************/
export const deleteFromCart = ( id ) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

/************************** Save Shipping Info ************************************/
export const saveShippingInfo = ( data ) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}