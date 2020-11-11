import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});
const initialState = {};
const middlewares = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;