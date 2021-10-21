import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    CLEAR_ERRORS,
} from '../constants/orderConstants';

export const newOrderReducer = (state = { }, action) => {
    switch(action.type){
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                loading : true
            }
        case NEW_ORDER_SUCCESS:
            return {
                loading : false,
                order : action.payload
            }
        case NEW_ORDER_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error : null
            }

        default:
            return state
    }
};

export const myOrdersReducer = (state = { orders : []}, action) => {
    switch(action.type){
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading : false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
            return {
                ...state,
                loading : false,
                error: action.payload
            }
        case CLEAR_ERRORS:
             return {
                ...state,
                error : null
            }

        default :
            return state
    }
}