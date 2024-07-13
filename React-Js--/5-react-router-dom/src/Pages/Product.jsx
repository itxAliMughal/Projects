import React from "react";
import { Link } from "react-router-dom";

function Product() {
  return (
    <div>
      <h2>Product Listing</h2>
      <ul>
        <li>
          <Link to="/products/1">Shoes</Link>
        </li>
        <br />
        <li>
          <Link to="/products/2">T-Shirts</Link>
        </li>
        <br />
        <li>
          <Link to="/products/3">Watches</Link>
        </li>
        <br />
        <li>
          <Link to="/products/4">Bags</Link>
        </li>
      </ul>
    </div>
  );
}

export default Product;
