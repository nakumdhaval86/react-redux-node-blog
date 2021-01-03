import { GET_EROR, CLEAR_ERROR } from "../actions/Constant";

const intialState = {};
const ErrorReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_EROR:
      return {
        msg: action.payload,
      };
    case CLEAR_ERROR:
      return {
        msg: "",
      };
    default:
      return state;
  }
};

export default ErrorReducer;
