import React from "react";
import { NavLink } from "react-router-dom";

const FloatingMenu = (props) => {
  return (
    <div className="floatingMenu">
      <NavLink to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <p>My Account</p>
      </NavLink>
      <hr />
      <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
        <p>Logout</p>
      </NavLink>
    </div>
  );
};

export default FloatingMenu;
