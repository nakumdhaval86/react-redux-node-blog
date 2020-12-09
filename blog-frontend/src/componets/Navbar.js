import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
        <NavLink className="navbar-brand" to="/">
          <span className="brand_name">Redux Blog</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink
                activeClassName="active_link"
                className="nav-link"
                exact
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Link
              </NavLink>
            </li>
          </ul>
          <div className="text-right">
            <NavLink
              activeClassName="active_link"
              exact
              to="/add-post"
              className="btn btn-outline-light"
            >
              Add Post
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
