import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [successfull, setSuccessfull] = useState();

  const changeHanle = (e) => {
    setEmail(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(email);

    const obj = {
      email: "nakum@mail.com",
    };

    axios
      .post("http://localhost:3000/users/forgot-request", obj)
      .then((result) => {
        console.log("email was send");
        setSuccessfull("Password Reset Link to sent...");
      })
      .catch((err) => {});
  };

  return (
    <div className="page_container">
      <div className="login_container">
        <h5 className="text-center">Forgot Password</h5>
        <form className="login_form" onSubmit={(e) => submitHandle(e)}>
          <div className="form-group">
            <label htmlFor="">Email address :</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email address..."
              onChange={(e) => changeHanle(e)}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary form-control btn_submit"
              type="submit"
            >
              Forgot Password
            </button>
            <NavLink
              exact
              to="/admin/login"
              className="btn btn-primary mt-3 form-control"
            >
              Back to Login
            </NavLink>
          </div>
          {successfull ? (
            <div className="alert alert-success" role="alert">
              {successfull}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
