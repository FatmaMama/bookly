import axios from 'axios';
import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch) => {
     try {
         dispatch({ type : NEW_ORDER_REQUEST });

         const config = {
             headers : {
                 'content-type' : 'application/json'
             }
         };

        const {data} = await axios.post('/api/v1/order/new', order, config);

        dispatch({
            type : NEW_ORDER_SUCCESS,
            payload : data.order
        })

     } catch (error) {
         dispatch({
             type : NEW_ORDER_FAIL,
             payload : error.response.data.message
         })
     }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type : MY_ORDERS_REQUEST });

       const {data} = await axios.get('/api/v1/orders/me');

       dispatch({
           type : MY_ORDERS_SUCCESS,
           payload : data.orders
       })

    } catch (error) {
        dispatch({
            type : MY_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : ORDER_DETAILS_REQUEST });

       const {data} = await axios.get(`/api/v1/order/${id}`);

       dispatch({
           type : ORDER_DETAILS_SUCCESS,
           payload : data.order
       })

    } catch (error) {
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
};

export const allOrders = () => async (dispatch) => {
    try {
        dispatch({ type : ALL_ORDERS_REQUEST });

       const {data} = await axios.get(`/api/v1/admin/orders`);

       dispatch({
           type : ALL_ORDERS_SUCCESS,
           payload : data
       })

    } catch (error) {
        dispatch({
            type : ALL_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}