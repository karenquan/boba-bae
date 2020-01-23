import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.scss";
import logo from "../images/boba.svg";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="boba cup" className="logo" />{" "}
            <span>Boba Bae</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
