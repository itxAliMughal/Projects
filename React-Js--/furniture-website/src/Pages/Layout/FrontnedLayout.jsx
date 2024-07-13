import React from "react";
import "../../frontned-assets/css/app.css";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function FrontnedLayout({ count, cart }) {
  return (
    <>
      <Header count={count} cart={cart} />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontnedLayout;
