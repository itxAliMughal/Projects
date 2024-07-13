import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const menus = [
  {
    name: "Favorite Notes",
    link: "#",
  },
];

function CustomLayout() {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(elems);
  }, []);
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Navbar
          </Link>
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            {menus.map((singleMenu, index) => (
              <li key={index}>
                <Link to={singleMenu.link}>{singleMenu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {menus.map((singleMenu, index) => (
          <li key={index}>
            <Link to={singleMenu.link}>{singleMenu.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default CustomLayout;
