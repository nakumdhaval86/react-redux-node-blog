import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../actions/PostAction";

function Home() {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.PostReducer.posts);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  if (!result) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="post_container">
          {result.reverse().map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
