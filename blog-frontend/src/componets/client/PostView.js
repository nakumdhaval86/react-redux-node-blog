import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getPost } from "../../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import Img from "react-cool-img";
import Loader from "../../loader.gif";

function PostView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const result = useSelector((state) => state.PostReducer.post);

  console.log(result);

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
        <p>by {result.author.name}</p>
        <div className="card border-none">
          <Img
            placeholder={Loader}
            src={result.thumb}
            className="card-img-top"
            width="100%"
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
