import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function NavTabs() {
  return (
    <nav>
    <ul className="nav nav-tabs" id="nav">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className={window.location.pathname === "/dashboard"
          ? "nav-link active"
          : "nav-link"}>
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/discover" className={window.location.pathname === "/discover"
            ? "nav-link active"
            : "nav-link"}>
          Discover
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/saved" className={window.location.pathname === "/saved"
            ? "nav-link active"
            : "nav-link"}>
          Saved Contacts
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/covers" className={window.location.pathname === "/covers"
            ? "nav-link active"
            : "nav-link"}>
          Get Inspired
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/songs" className={window.location.pathname === "/songs"
            ? "nav-link active"
            : "nav-link"}>
          My Songs
        </Link>
      </li>
    </ul>
    </nav>
  );
}

export default NavTabs;
