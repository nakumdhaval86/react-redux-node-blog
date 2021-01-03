import React from "react";
import "../Admin.css";
import AdminNavbar from "./AdminNavbar";
import PostList from "../PostList";
import PostForm from "../PostForm";
import LoginPage from "../Auth/LoginPage";
import CreateAccount from "../Auth/CreateAccount";
import ForgotPassword from "../Auth/ForgotPassword";
import NewPassword from "../Auth/NewPassword";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";

function Dashboard() {
  const isLogin = useSelector((state) => state.UserReducer.isLoggedIn);
  console.log(isLogin);
  return (
    <div className="main">
      <section className="main_section">
        <AdminNavbar />
      </section>

      <Switch>
        <ProtectedRoute exact path="/admin" component={PostList} />
        <ProtectedRoute exact path="/admin/add-post" component={PostForm} />
        <ProtectedRoute
          exact
          path="/admin/edit-post/:id?"
          component={PostForm}
        />
        <UnProtectedRoute exact path="/admin/login" component={LoginPage} />
        <UnProtectedRoute
          exact
          path="/admin/create"
          component={CreateAccount}
        />
        <UnProtectedRoute
          exact
          path="/admin/forgot"
          component={ForgotPassword}
        />
        <UnProtectedRoute
          exact
          path="/admin/newpassword/:id/:token"
          component={NewPassword}
        />
      </Switch>
    </div>
  );
}

export default Dashboard;
