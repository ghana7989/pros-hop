import axios from "axios";
import { USER_LOGOUT, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actionTypes/userActionTypes"

export const login = (email, password) => async (dispatch) => {

  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers: {
        content: "application/json",
      }
    }
    const { data } = await axios.post("/api/users/login", { email, password }, config);
    if (!data) throw new Error("Error with posting the request")
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {

  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        content: "application/json",
      }
    }
    const { data } = await axios.post("/api/users", { name, email, password }, config);
    if (!data) throw new Error("Error with posting the request")
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}

export const logout = () => (dispatch) => {
  console.log("Dispatched")
  localStorage.removeItem("userInfo")
  dispatch({ type: USER_LOGOUT })
}