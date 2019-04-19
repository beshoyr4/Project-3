import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
  return (
    <ul className="nav nav-tabs">
      
      <li className="nav-item">
        <Link
          to="/"
          className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard"
          className={window.location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/discover"
          className={window.location.pathname === "/discover" ? "nav-link active" : "nav-link"}
        >
          Discover
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/saved"
          className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
        >
          Saved
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/"
          className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
