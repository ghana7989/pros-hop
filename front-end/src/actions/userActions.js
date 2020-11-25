import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../actionTypes/orderActionTypes";
import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAIL_RESET,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,

} from "../actionTypes/userActionTypes"


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
  dispatch({ type: USER_DETAIL_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
}

export const getUserDetails = (id = "profile") => async (dispatch, getState) => {

  try {

    const { userLogin: { userInfo } } = getState()
    console.log('userInfo: ', userInfo);

    dispatch({
      type: USER_DETAIL_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config);
    if (!data) throw new Error("Error with posting the request")
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {

  try {

    const { userLogin: { userInfo } } = getState()

    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config);

    if (!data) throw new Error("Error with posting the request")

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}


export const listUsers = () => async (dispatch, getState) => {

  try {

    const { userLogin: { userInfo } } = getState()

    dispatch({
      type: USER_LIST_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users`, config);

    if (!data) throw new Error("Error with getting the request")

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}



export const deleteUser = (id) => async (dispatch, getState) => {

  try {

    const { userLogin: { userInfo } } = getState()

    dispatch({
      type: USER_DELETE_REQUEST
    })
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/users/${id}`, config);

    if (!data) throw new Error("Error with deleting the request")

    dispatch({
      type: USER_DELETE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}



export const updateUser = (user) => async (dispatch, getState) => {

  try {

    const { userLogin: { userInfo } } = getState()

    dispatch({
      type: USER_UPDATE_REQUEST
    })
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    if (!data) throw new Error("Error with deleting the request")

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ?
        error.response.data.message
        :
        error.message
    })
  }
}

