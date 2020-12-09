import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { deletePost, getAllPost } from "../actions/PostAction";

function PostCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteHandle = (id) => {
    dispatch(deletePost(id));
    history.push("/");
  };

  const { post } = props;

  return (
    <div className="col-12">
      <div className="post_card mx-auto">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2016/01/19/17/15/wind-turbine-1149604_1280.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text card_text"></p>
            <div className="card-text card_text">
              {ReactHtmlParser(post.body)}
            </div>
            <NavLink to={`/read/${post._id}`} className="btn btn-primary">
              Read More
            </NavLink>

            <button
              className="btn btn-danger mx-3"
              onClick={() => deleteHandle(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
