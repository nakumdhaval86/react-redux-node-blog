import { GET_EROR, CLEAR_ERROR } from "./Constant";

export const getErrorAction = (msg) => {
  return {
    type: GET_EROR,
    payload: msg,
  };
};

export const clearErrorAction = () => {
  return {
    type: CLEAR_ERROR,
  };
};
