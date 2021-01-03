import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function NewPassword() {
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [successfull, setSuccessfull] = useState(" ");
  const [error, setError] = useState();

  const { id, token } = useParams();
  const history = useHistory();

  <p style={{ display: "none" }}>{cpassword}</p>;
  const dataObj = {
    id,
    password,
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(password);

    axios
      .put("http://localhost:3000/users/forgot/" + token, dataObj)
      .then((result) => {
        setSuccessfull(result.data.message);
        history.push("/admin/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="page_container">
      <div className="login_container">
        <h5 className="text-center">Forgot Password</h5>
        <form className="login_form" onSubmit={(e) => submitHandle(e)}>
          <div className="form-group">
            <label htmlFor="">Enter New Password :</label>
            <input
              type="password"
              name="password1"
              className="form-control"
              placeholder="Enter your new password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Enter Confirm Password :</label>
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Enter your confirm password..."
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary form-control btn_submit"
              type="submit"
            >
              Update Password
            </button>
          </div>
          {successfull === " " ? (
            " "
          ) : successfull ? (
            <div className="alert alert-success" role="alert">
              {successfull}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              Something went wrong ! {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
