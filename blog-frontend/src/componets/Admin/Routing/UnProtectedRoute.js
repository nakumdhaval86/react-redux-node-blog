import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.UserReducer.isLoggedIn);

  return !isLogin ? (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  ) : (
    <Redirect to="/admin/" />
  );
};

export default UnProtectedRoute;
