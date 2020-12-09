import {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../Constant";

const intialState = {
  posts: [],
  post: null,
};

const PostReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return {
        ...state,
        posts: action.payload,
        post: null,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        post: null,
      };
    case DELETE_POST:
      console.log("delete is called");
      console.log(action.payload);
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default PostReducer;
