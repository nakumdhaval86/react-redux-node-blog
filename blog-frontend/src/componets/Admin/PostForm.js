import React, { useEffect, useState } from "react";
import CKEditor from "ckeditor4-react";
import { useParams, useHistory } from "react-router-dom";
import {
  addPost,
  getAllPost,
  getPost,
  updatePost,
} from "../../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const postResult = useSelector((state) => state.PostReducer.post);

  const getPostData = async () => {
    await dispatch(getPost(id));
  };

  function setData() {
    if (postResult) {
      setTitle(postResult.title);
      setBody(postResult.body);
    }
  }

  useEffect(() => {
    if (postResult) {
      setData();
    }
  }, [postResult]);

  // Getting & Set Specific Post Data
  useEffect(() => {
    if (id) {
      getPostData();
    }
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    const newData = {
      title,
      body,
    };
    if (!id) {
      dispatch(addPost(newData));
      history.push("/admin");
    } else {
      const newIdData = {
        id,
        ...newData,
      };

      dispatch(updatePost(newIdData));
      dispatch(getAllPost());
      history.push("/admin");
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={(e) => submitHandle(e)}>
        <div className="form-group">
          <label>Enter title of the post : </label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Enter your post description :</label>
          <CKEditor data={body} onChange={(e) => setBody(e.editor.getData())} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {id ? "Update Post" : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
