import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../actions/Constant.js";

const user = JSON.parse(localStorage.getItem("user"));

const intialState = user
  ? { isLoggedIn: true, user, isLoading: false }
  : { isLoggedIn: false, user: null, isLoading: false };

const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
      console.log("login reducer called");
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        users: null,
        isLoggedIn: false,
        isLoading: false,
      };

    case LOGOUT:
      console.log("logout reducer called");
      return {
        // ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};

export default UserReducer;
