import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { searchPost, getAllPost } from "../../actions/PostAction";
import { useDispatch } from "react-redux";

function Navbar() {
  const [search, setSearch] = useState(" ");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchPost(search));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(searchPost(search));
  };

  const handleClear = (e) => {
    dispatch(getAllPost());
  };

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
          </ul>
          <div className="text-right">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                // onChange={(e) => setSearch(e.target.value)}
                onChange={(e) => handleChange(e)}
              />
              {/* <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="reset"
                onClick={(e) => handleClear(e)}
              >
                Clear
              </button>
              &nbsp;
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
