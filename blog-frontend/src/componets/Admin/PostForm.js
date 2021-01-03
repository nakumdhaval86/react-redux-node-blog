import React, { useEffect, useState } from "react";
import CKEditor from "ckeditor4-react";
import { useParams, useHistory } from "react-router-dom";
import {
  addPost,
  getAllPost,
  getPost,
  updatePost,
} from "../../actions/PostAction.js";
import { useDispatch, useSelector } from "react-redux";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const postResult = useSelector((state) => state.PostReducer.post);

  const getPostData = () => {
    dispatch(getPost(id));
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };

  function setData() {
    if (postResult) {
      setTitle(postResult.title);
      setBody(postResult.body);
      setImageUrl(postResult.thumb);
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
    console.log("this");
    let formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    formData.append("file", image);

    if (!id) {
      dispatch(addPost(formData));
      history.push("/admin");
    } else {
      dispatch(updatePost(id, formData));
      history.push("/admin");
    }
  };

  return (
    <div className="form_container shadow">
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
        <div className="form-group">
          <label htmlFor="">Upload Image :</label>
          <input type="file" onChange={(e) => handleImage(e)} />
        </div>
        {id ? <img src={imageUrl} alt="post-img" className="w-50" /> : ""}
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
