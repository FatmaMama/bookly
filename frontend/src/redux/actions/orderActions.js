import axios from 'axios';
import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
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
            payload : data
        })

     } catch (error) {
         dispatch({
             type : NEW_ORDER_FAIL,
             payload : error.response.data.message
         })
     }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}