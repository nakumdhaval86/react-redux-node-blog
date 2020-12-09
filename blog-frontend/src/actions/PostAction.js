import {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../Constant";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// const config = {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// };

export const getAllPost = () => async (dispatch) => {
  const result = await axios.get(`${BASE_URL}/posts`);
  console.log("get all post called");
  dispatch({
    type: GET_ALL_POST,
    payload: result.data.data,
  });
};

export const getPost = (id) => async (dispatch) => {
  const result = await axios.get(`${BASE_URL}/posts/${id}`);

  dispatch({
    type: GET_POST,
    payload: result.data.data,
  });
};

export const addPost = (post) => async (dispatch) => {
  const result = await axios.post(`${BASE_URL}/add-posts`, post);

  dispatch({
    type: ADD_POST,
    payload: result.data.data,
  });
};

export const updatePost = (post) => async (dispatch) => {
  const result = await axios.put(`${BASE_URL}/posts/${post.id}`, post);

  dispatch({
    type: UPDATE_POST,
    payload: result.data.data,
  });
};

export const deletePost = (id) => async (dispatch) => {
  await axios.delete(`${BASE_URL}/posts/${id}`);
  console.log(id);
  dispatch({
    type: DELETE_POST,
    payload: id,
  });
};
