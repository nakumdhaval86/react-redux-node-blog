import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../actions/PostAction";

function Home() {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.PostReducer.posts);
  const isLoading = useSelector((state) => state.PostReducer.isLoading);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <div className="mt-5">
      <div className="row m-0">
        
        <div className="col-sm-12 col-md-8">
          <div className="post_container">
            {isLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              result
                .reverse()
                .map((post, index) => (
                  <PostCard key={index} post={post} index={index} />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
