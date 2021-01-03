import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../actions/PostAction";
import { NavLink, useHistory } from "react-router-dom";
import { deletePost } from "../../actions/PostAction";
import { getPost } from "../../actions/PostAction";
import Img from "react-cool-img";
import Loader from "../../loader.gif";
import Spinner from "../client/Spinner";

function PostList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const result = useSelector((state) => state.PostReducer.posts);
  const loading = useSelector((state) => state.PostReducer.isLoading);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const deleteHandle = (id) => {
    dispatch(deletePost(id));
    history.push("/admin");
  };

  const handleGetData = (id) => {
    console.log(id);
    dispatch(getPost(id));
  };

  return (
    <>
      <div className="list_container">
        <table className="table shadow dark">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Post Thumnail</th>
              <th>Post Title </th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>
                  <Spinner />
                </td>
                <td>
                  <Spinner />
                </td>
                <td>
                  <Spinner />
                </td>
                <td>
                  <Spinner />
                </td>
                <td>
                  <Spinner />
                </td>
              </tr>
            ) : (
              result.map((post, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Img
                      placeholder={Loader}
                      src={post.thumb}
                      className="list_img"
                      width="100%"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.createdAt}</td>
                  <td>
                    <NavLink
                      className="btn btn-primary mx-2"
                      to={`/admin/edit-post/${post._id}`}
                      onClick={(e) => handleGetData(post._id)}
                    >
                      <i className="fa fa-pencil"></i>
                    </NavLink>
                    <NavLink
                      to={`./read/${post._id}`}
                      className="btn btn-info mx-2"
                    >
                      <i className="fa fa-eye"></i>
                    </NavLink>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteHandle(post._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostList;
