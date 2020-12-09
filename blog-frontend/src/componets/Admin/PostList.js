import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../actions/PostAction";
import { NavLink, useHistory } from "react-router-dom";
import { deletePost } from "../../actions/PostAction";
import { addPost, getPost, updatePost } from "../../actions/PostAction";

function PostList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const result = useSelector((state) => state.PostReducer.posts);
  console.log(result);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  if (!result) {
    return <h1>Loading...</h1>;
  }

  const deleteHandle = (id) => {
    dispatch(deletePost(id));
    history.push("/admin");
  };

  const handleGetData = (id) => {
    console.log(id);
    console.log("ohh yaa");
    dispatch(getPost(id));
  };

  return (
    <>
      <table className="table shadow dark">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Post Title</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {result.map((post, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{post.title}</td>
              <td>{post.createdAt}</td>
              <td>
                <NavLink
                  className="btn btn-primary mx-3"
                  to={`/admin/edit-post/${post._id}`}
                  onCLick={(e) => handleGetData(post._id)}
                >
                  <i className="fa fa-pencil"></i>
                </NavLink>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandle(post._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PostList;
