import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/AuthAction";

function AdminNavbar() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout());

    localStorage.removeItem("user");
  };

  return (
    <>
      <aside className="sidebar">
        <h5 className="brand_name">Redux Blog Admin</h5>
        <NavLink className="btn btn-outline-danger" to="/">
          Visit Site
        </NavLink>
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
                to="/admin/login"
                onClick={(e) => handleLogout(e)}
              >
                <i className="fa fa-sign-out"></i> Log Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default AdminNavbar;
