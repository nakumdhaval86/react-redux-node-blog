import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { loginUser } from "../../../actions/AuthAction";
import { useSelector, useDispatch } from "react-redux";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [successful, setSuccessful] = useState(false);

  const Loading = useSelector((state) => state.UserReducer.isLoading);
  const err = useSelector((state) => state.ErrorReducer.msg);

  const dispatch = useDispatch();
  const history = useHistory();

  // Handling Changing Event
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  //handling Submit Event
  const handleSubmit = (e) => {
    const userObj = {
      email: loginForm.email,
      password: loginForm.password,
    };
    e.preventDefault();
    dispatch(loginUser(userObj)) //Dispatch LoginUser Action
      .then(() => {
        setSuccessful(true);
        history.push("/admin");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="page_container">
      <div className="login_container">
        <h5 className="text-center">Login</h5>
        <p style={{ display: "none" }}>{successful}</p>
        <form onSubmit={(e) => handleSubmit(e)} className="login_form">
          <div className="form-group">
            <label htmlFor="">Email address :</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={loginForm.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password :</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={loginForm.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password..."
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary form-control btn_submit"
              type="submit"
            >
              {Loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <p>
                  Login <i className="fa fa-arrow-right"></i>
                </p>
              )}
            </button>
            <p className="mt-2">
              <NavLink exact to="/admin/create">
                Don't have account? Create Now !
              </NavLink>
              <br />
              <NavLink exact to="/admin/forgot">
                Forgotten Password ?
              </NavLink>
            </p>
            {err ? (
              <div className="alert alert-danger" role="alert">
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

export default LoginPage;
