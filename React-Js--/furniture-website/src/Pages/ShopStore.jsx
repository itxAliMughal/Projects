import React, { useState } from "react";
import "../frontned-assets/css/app.css";
// import aboutImage from "../Images/SofaSet.jpg";
import oneLiving from "../Images/simple_living_room_luxurious.jpeg";
import twoLiving from "../Images/simple_living_room_luxurious (1).jpeg";
import threeLiving from "../Images/simple_living_room_luxurious (2).jpeg";
import fourLiving from "../Images/simple_living_room_luxurious (3).jpeg";
import fiveLiving from "../Images/simple_living_room_luxurious (4).jpeg";
import sixLiving from "../Images/simple_living_room_luxurious (5).jpeg";
import sevenLiving from "../Images/simple_living_room_luxurious (6).jpeg";
import eightLiving from "../Images/simple_living_room_luxurious (7).jpeg";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { message } from "antd";

function ShopStore({
  products,
  pickDataHandler = () => {},
  pickDataCustomHandler = () => {},
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [addedProducts, setAddedProducts] = useState(new Set());

  const productDataHandler = (singleProduct) => {
    pickDataHandler(singleProduct);
  };

  const handleAddToCart = (product) => {
    if (!addedProducts.has(product?.name)) {
      pickDataHandler(product);
      messageApi.success("Item added");
      setAddedProducts(new Set(addedProducts).add(product?.name));
    } else if (addedProducts.has(product?.name)) {
      messageApi.warning("Item already added");
    }
  };

  const customShopStoreProducts = [
    {
      image: oneLiving,
      name: "Regency Velvet Sofa",
      discription:
        "A luxurious velvet sofa with a sturdy metal frame, soft velvet upholstery, and a sleek design.",
      price: "- $1,299",
      discountedPrice: "- $1,371",
    },
    {
      image: twoLiving,
      name: "Luxe Velvet Sofa",
      discription:
        "A stylish and comfortable single-seater sofa with a sturdy metal frame, soft velvet upholstery, and a sleek design.",
      price: "- $899",
      discountedPrice: "- $1,190",
    },
    {
      image: threeLiving,
      name: "Rustic Oak Drying Room",
      discription:
        "A stylish and comfortable set featuring a 3-seater sofa, 2 armchairs, and a coffee table.",
      price: "- $1,299",
      discountedPrice: "- $1,474",
    },
    {
      image: fourLiving,
      name: "Contemporary Fabric Sofa Set",
      discription:
        "A cozy and modern set featuring a 4-seater sofa, 2 armchairs, and a coffee table.",
      price: "- $1,599",
      discountedPrice: "- $1,700",
    },
    {
      image: fiveLiving,
      name: "Modular Fabric Sectional Sofa",
      discription:
        "A versatile and comfortable set featuring a modular sectional sofa, 2 armchairs, and a coffee table.",
      price: "- $1,999",
      discountedPrice: "- $2,290",
    },
    {
      image: sixLiving,
      name: "Corner Leather Sectional Sofa",
      discription:
        "A stylish and spacious set featuring a corner sectional sofa, 2 armchairs, and a coffee table.",
      price: "- $2,299",
      discountedPrice: "- $2,599",
    },
    {
      image: sevenLiving,
      name: "Majestic Luxury Sofa Set",
      discription:
        "An opulent and extravagant set featuring a 4-seater sofa, 2 armchairs, and a coffee table, crafted with the finest materials and expert craftsmanship.",
      price: "- $3,499",
      discountedPrice: "- $3,942",
    },
    {
      image: eightLiving,
      name: "Luxe Reclining Sofa Set",
      discription:
        "A premium and comfortable set featuring a 3-seater reclining sofa, 2 reclining armchairs, and a coffee table.",
      price: "- $1,499",
      discountedPrice: "- $1,999",
    },
  ];

  const handleCustomProductClick = (product) => {
    pickDataCustomHandler(product);
    navigate(
      AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
        ":productName",
        product.name.replace(/\s+/g, "")
      )
    );
  };

  return (
    <div className="about-us-container">
      {contextHolder}

      <section className="about-header">
        <h1 style={{ fontSize: "70px" }}>SHOP STORE</h1>
      </section>

      <section className="container">
        <h1 className="second-sec-text-h1">
          <span className="second-sec-text-h1-span">FIND YOUR DREAM</span>
          <br />
          &nbsp;FURNITURE
        </h1>
        &nbsp;
        <hr />
        <div className="third-sec-container">
          {products.map((singleProduct, index) => (
            <div className="third-sec-customize" key={index}>
              <div
                onClick={() => {
                  productDataHandler(singleProduct);
                  navigate(
                    AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
                      ":productName",
                      singleProduct?.name
                    )
                  );
                  window.scrollTo(0, 680);
                }}
              >
                <img src={singleProduct?.image} alt={singleProduct?.name} />
                <h2>{singleProduct?.name}</h2>
                <p>{singleProduct?.discription}</p>
                <h6>-${singleProduct?.price}</h6>
                <h6 className="custom-cut-price" style={{ color: "red" }}>
                  {singleProduct?.discountedPrice}
                </h6>
              </div>
              <button
                className="second-sec-text-button"
                style={{ marginLeft: "-4px" }}
                onClick={() => handleAddToCart(singleProduct)}
              >
                {addedProducts.has(singleProduct?.name)
                  ? "Already added"
                  : "Add to cart"}
              </button>
            </div>
          ))}
          {customShopStoreProducts.map((product, index) => (
            <div className="third-sec-customize" key={index}>
              <div onClick={() => handleCustomProductClick(product)}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.discription}</p>
                <h6>{product.price}</h6>
                <h6 className="custom-cut-price" style={{ color: "red" }}>
                  {product.discountedPrice}
                </h6>
              </div>
              <button
                className="second-sec-text-button"
                style={{ marginLeft: "14px", marginTop: "12px" }}
                onClick={() => handleAddToCart(product)}
              >
                {addedProducts.has(product?.name)
                  ? "Already added"
                  : "Add to cart"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShopStore;
