import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="admin_active"
              className="nav_link"
              to="/admin"
            >
              <i className="fa fa-list"></i> Post List
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="admin_active"
              className="nav_link"
              to="/admin/add-post"
            >
              <i className="fa fa-plus"></i> Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="admin_active"
              className="nav_link"
              to=""
            >
              <i className="fa fa-sign-out"></i> Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AdminNavbar;
