import React from "react";
import "../../Admin.css";
import AdminNavbar from "./AdminNavbar";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { Switch, Route, Router } from "react-router-dom";

function Dashboard() {
  return (
    <div className="main">
      <aside className="sidebar">
        <h5 className="brand_name">Redux Blog Admin</h5>
        <AdminNavbar />
      </aside>
      <section className="main_section">
        <Switch>
          <Route exact path="/admin" component={PostList} />
          <Route exact path="/admin/add-post" component={PostForm} />
          <Route exact path="/admin/edit-post/:id?" component={PostForm} />
        </Switch>
      </section>
    </div>
  );
}

export default Dashboard;
