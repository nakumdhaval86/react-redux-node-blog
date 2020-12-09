import React, { useEffect } from "react";

function LoginPage() {
  return (
    <div className="page_container">
      <div className="login_container">
        <h5>Login</h5>
        <form action="" className="login_form">
          <div className="form-group">
            <label htmlFor="">Email address :</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password :</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password..."
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary form-control" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
