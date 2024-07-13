import React from "react";
import { Link, Outlet } from "react-router-dom";

function CustomLayout() {
  return (
    <div className="container">
      <nav>
        <ul style={{ display: "flex", justifyContent: "space-around" }}>
          <li>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <h2>About</h2>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <h2>Contact</h2>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default CustomLayout;
