import axios from "axios";
import { CART_ADD_ITEM } from "../actionTypes/cartActionTypes";


export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)
    const { name, price, image, countInStock } = data

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name,
            price,
            image,
            countInStock,
            qty
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}