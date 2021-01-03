import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createUser } from "../../../actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateAccount() {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // Handling Changing Event
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserForm((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const Loading = useSelector((state) => state.UserReducer.isLoading);
  const err = useSelector((state) => state.ErrorReducer.msg);

  console.log(err);

  // Handling Form Submit Event
  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      name: userForm.username,
      email: userForm.email,
      password: userForm.password,
    };

    //Calling Create User Action
    dispatch(createUser(userObj))
      .then(() => {
        setSuccessful(true);
        history.push("/admin/login");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="page_container">
      <div className="login_container">
        <h5 className="text-center">Sign Up</h5>
        <p style={{ display: "none" }}>{successful}</p>
        <form onSubmit={(e) => handleSubmit(e)} className="login_form">
          <div className="form-group">
            <label htmlFor="">Username :</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your name"
              value={userForm.username}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email address :</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={userForm.email}
              placeholder="Enter your email address..."
              onChange={(e) => handleOnChange(e)}
              required
            />
          </div>
          <div className="form-group password_container">
            <label htmlFor="">Password :</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={userForm.password}
              placeholder="Enter your password..."
              onChange={(e) => handleOnChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary form-control btn_submit"
              type="submit"
            >
              {Loading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <p>
                  Let's, Create ! <i className="fa fa-arrow-right"></i>
                </p>
              )}
            </button>
            <p className="mt-2">
              <NavLink to="/admin/login">Have a account? Login Now !</NavLink>
            </p>
            {err ? (
              <div class="alert alert-danger" role="alert">
                {err}
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
