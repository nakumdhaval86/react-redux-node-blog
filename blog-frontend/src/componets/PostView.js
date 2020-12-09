import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getPost } from "../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

function PostView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const result = useSelector((state) => state.PostReducer.post);

  if (!result) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="view_container container">
      <NavLink className="btn btn-primary" to="/">
        <i className="fa fa-arrow-circle-left"></i> Back
      </NavLink>
      <div className="post_view_card mx-auto">
        <h5 className="card-title post_title">{result.title}</h5>
        <h6 className="post_author">by dhaval nakum</h6>
        <div className="card border-none">
          <img
            src="https://cdn.pixabay.com/photo/2016/01/19/17/15/wind-turbine-1149604_1280.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">{ReactHtmlParser(result.body)}</div>
        </div>
      </div>
      <NavLink className="btn btn-primary" to="/">
        <i className="fa fa-arrow-circle-left"></i> Back
      </NavLink>
    </div>
  );
}

export default PostView;
