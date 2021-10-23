import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/productReducers';
import { allUsersReducer, authReducer, forgotPasswordReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducers';

const reducers = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer,
    newProduct : newProductReducer,
    product : productReducer,
    auth : authReducer,
    user : userReducer,
    allUsers : allUsersReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    allOrders : allOrdersReducer,
    order : orderReducer,
    
});

let initialState = {
    cart : {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};
const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;