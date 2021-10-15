import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productsReducer } from './reducers/productReducers';

const reducers = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;