import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import PostView from "./PostView";
import Navbar from "./Navbar";
import LoginPage from "./Admin/LoginPage";

function UserRouter() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/read/:id?" component={PostView} />
        <Route exact path="/admin/login" component={LoginPage} />
      </Switch>
    </>
  );
}

export default UserRouter;
