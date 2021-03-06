import axios from 'axios';
import { ADD_TO_CART, REMOVE_CART_ITEM, RESET_CART_ITEM, SHIPPING_INFO } from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`);
    
    dispatch({
        type : ADD_TO_CART,
        payload : {
            product : data.product._id,
            name : data.product.name,
            price : data.product.price,
            stock : data.product.stock,
            image : data.product.images[0].url,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const resetCart = () => (dispatch, getState) => {

    dispatch({
        type: RESET_CART_ITEM,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingInfo = (data) => (dispatch, getState) => {

    dispatch({
        type: SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo))
}