import React from "react";
import { NavLink } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

function PostCard(props) {
  const { post } = props;

  return (
    <div className="row">
      <div className="col-12">
        <div className="post_card mx-auto">
          <div className="card">
            <img src={post.thumb} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text card_text"></p>
              <div className="card-text card_text">
                {ReactHtmlParser(post.body)}
              </div>
              <NavLink to={`/read/${post._id}`} className="btn btn-primary">
                Read More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
