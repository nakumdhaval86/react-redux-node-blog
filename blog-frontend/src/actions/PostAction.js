import {
  LOAD_POST,
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SEARCH_POST,
} from "./Constant";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const token = JSON.parse(localStorage.getItem("token"));

const config = { headers: { Authorization: `Bearer ${token}` } };

const imgConfig = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

//For Getting All Posts
export const getAllPost = () => async (dispatch) => {
  dispatch({
    type: LOAD_POST,
  });

  return axios.get(`${BASE_URL}/posts`, config).then(
    (result) => {
      dispatch({
        type: GET_ALL_POST,
        payload: result.data.data,
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err);
      return Promise.reject();
    }
  );
};

//For Getting User Specific Post
export const getPost = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_POST,
  });

  // return "Home";
  return axios.get(`${BASE_URL}/posts/${id}`, config).then(
    (result) => {
      dispatch({
        type: GET_POST,
        payload: result.data.data,
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err);
      return Promise.reject();
    }
  );
};

//For Adding Post
export const addPost = (post) => async (dispatch) => {
  dispatch({
    type: LOAD_POST,
  });

  return axios.post(`${BASE_URL}/add-posts`, post, imgConfig).then(
    (result) => {
      dispatch({
        type: ADD_POST,
        payload: result.data.data,
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err);
      return Promise.reject();
    }
  );
};

//For Updating Post
export const updatePost = (id, post) => async (dispatch) => {
  // dispatch({
  //   type: LOAD_POST,
  // });

  console.log("update action is called");

  axios.put(`${BASE_URL}/posts/${id}`, post, imgConfig, function (err, result) {
    dispatch({
      type: UPDATE_POST,
      payload: result.data.data,
    });
  });
};

//For Deleting Post
export const deletePost = (id) => async (dispatch) => {
  return axios.delete(`${BASE_URL}/posts/${id}`, config).then(
    (result) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err);
      return Promise.reject();
    }
  );
};

export const searchPost = (name) => (dispatch) => {
  return axios
    .get(`${BASE_URL}/search/?title=${name}`)
    .then((result) => {
      dispatch({
        type: SEARCH_POST,
        payload: result.data.data,
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
