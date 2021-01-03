import {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  LOAD_POST,
  SEARCH_POST,
} from "../actions/Constant";

const intialState = {
  posts: [],
  post: null,
  search: null,
  isLoading: false,
};

const PostReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_POST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ALL_POST:
      return {
        ...state,
        posts: action.payload,
        post: null,
        isLoading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isLoading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        post: null,
        isLoading: false,
      };
    case DELETE_POST:
      console.log(action.payload);
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
        isLoading: false,
      };
    case SEARCH_POST:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default PostReducer;
