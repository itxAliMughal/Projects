import React from "react";
import { Link, Outlet } from "react-router-dom";

function CustomLayout({ setIsUserLogin }) {
  return (
    <div>
      <h2>Header</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <h2>Footer</h2>
      <button
        style={{
          backgroundColor: "red",
          color: "#fff",
          borderRadius: "50px",
          padding: "20px 25px",
          border: "none",
          margin: "-20px 750px",
        }}
        onClick={() => {
          if (
            window.location.pathname === "/about" ||
            window.location.pathname === "/contact" ||
            window.location.pathname === "/products"
          ) {
            window.location.href = "/";
          }
          setIsUserLogin(false);
        }}
      >
        LogOut
      </button>
    </div>
  );
}

export default CustomLayout;
