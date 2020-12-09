import React, { useEffect, useState } from "react";
import CKEditor from "ckeditor4-react";
import { useParams, useHistory } from "react-router-dom";
import { addPost, getPost, updatePost } from "../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  console.log(id);
  const postResult = useSelector((state) => state.PostReducer.post);

  const getPostData = () => {
    dispatch(getPost(id));
  };
  console.log(postResult);
  //Getting & Set Specific Post Data
  useEffect(() => {
    if (id) {
      getPostData();
      console.log("this is get dall");
      // setTitle(postResult.title);
      // setBody(postResult.body);
    }
  }, [id]);

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(title, body);
    const newData = {
      title,
      body,
    };
    console.log(newData);
    if (!id) {
      dispatch(addPost(newData));
      history.push("/");
    } else {
      const newIdData = {
        id,
        ...newData,
      };
      dispatch(updatePost(newIdData));
      history.push("/");
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
