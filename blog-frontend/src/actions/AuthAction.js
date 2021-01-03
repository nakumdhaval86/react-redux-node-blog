import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_EROR,
  CLEAR_ERROR,
  LOGOUT,
} from "./Constant";

import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const createUser = (user) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  return axios.post(`${BASE_URL}/signup`, user).then(
    (res) => {
      dispatch({ type: REGISTER_SUCCESS });

      dispatch({
        type: CLEAR_ERROR,
      });
      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: GET_EROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: USER_LOADING });

  return axios.post(`${BASE_URL}/login`, user).then(
    (res) => {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });

      console.log(res.data.data);

      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: GET_EROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  console.log("log out action called");

  dispatch({
    type: CLEAR_ERROR,
  });

  dispatch({
    type: LOGOUT,
  });
};
