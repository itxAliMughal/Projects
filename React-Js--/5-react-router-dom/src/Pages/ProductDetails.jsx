import React from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

function ProductDetails() {
  //you can get dynamic values through useParams
  const { productId } = useParams();

  return (
    <div>
      <Product />
      <h2>Product Detail</h2>
      <p>Product Id is {productId}</p>
    </div>
  );
}

export default ProductDetails;
