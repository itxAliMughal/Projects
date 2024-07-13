import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { message } from "antd";

function ProductDetail({ pickData, pickDataHandler = () => {} }) {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [messageApi, contextHolder] = message.useMessage();
  const [storedProduct, setStoredProduct] = useState(null);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }

    if (pickData) {
      const product = {
        image: pickData?.image,
        name: pickData?.name,
        discription: pickData?.discription,
        price: pickData?.price,
        discountedPrice: pickData?.discountedPrice,
      };
      localStorage.setItem("product", JSON.stringify(product));
      setStoredProduct(product);
    } else {
      const product = JSON.parse(localStorage.getItem("product"));
      setStoredProduct(product);
    }
  }, [loader, pickData]);

  const handleAddToCart = (product) => {
    if (!addedProducts.has(product?.name)) {
      pickDataHandler(product);
      messageApi.success("Item added");
      setAddedProducts(new Set(addedProducts).add(product?.name));
    } else {
      messageApi.warning("Item already added");
    }
  };

  if (loader) {
    return (
      <h1
        className="second-sec-text-h1 container"
        style={{
          color: "black",
          textDecoration: "none",
          marginTop: "60px",
          marginBottom: "60px",
          fontWeight: "bold",
          fontSize: "80px",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <>
      {contextHolder}

      <section className="about-header container animate-separate">
        <div
          className="product-detail-style"
          style={{
            textDecoration: "underline",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <div>
            <ArrowLeftOutlined
              className="back-arrow"
              onClick={() => {
                navigate(AUTHENTICATED_ROUTES.HOME);
                window.scrollTo(0, 0);
              }}
            />
            <p
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => navigate(AUTHENTICATED_ROUTES.HOME)}
            >
              Go Back
            </p>
          </div>
          <h1
            style={{
              textDecoration: "none",
              fontSize: "80px",
              paddingLeft: "300px",
            }}
          >
            Product-Detail
          </h1>
        </div>
      </section>

      <section
        className="about-header container cart-header"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <h1
          style={{
            textDecoration: "none",
            fontSize: "50px",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          {`${productName}-Detail`}
        </h1>
      </section>

      <section className="detail-page">
        <div
          className="third-sec-contanier container"
          style={{
            marginTop: "90px",
            marginBottom: "80px",
            paddingBottom: "80px",
            borderBottom: "2px solid black",
          }}
        >
          <div
            className="third-sec-customize animate-separate"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "120px",
            }}
          >
            <div>
              {storedProduct?.image && (
                <img
                  src={storedProduct.image}
                  alt={storedProduct.name}
                  style={{
                    width: "100%",
                  }}
                />
              )}
            </div>
            <div style={{ marginTop: "30px" }}>
              <h2
                style={{
                  fontSize: "42px",
                  textDecoration: "underline",
                }}
              >
                {storedProduct?.name}
              </h2>
              <p style={{ fontSize: "19px" }}>{storedProduct?.discription}</p>
              <h6
                style={{
                  textDecoration: "underline",
                  fontSize: "22px",
                }}
              >
                Rs. -${storedProduct?.price}
              </h6>
              {storedProduct?.discountedPrice && (
                <h6
                  style={{
                    textDecoration: "line-through",
                    color: "red",
                    fontSize: "22px",
                  }}
                >
                  Rs. {storedProduct.discountedPrice}
                </h6>
              )}
              <button
                className="second-sec-text-button"
                style={{
                  marginRight: "19.5vh",
                  marginTop: "36px",
                }}
                onClick={() => handleAddToCart(storedProduct)}
              >
                {addedProducts.has(storedProduct?.name)
                  ? "Already added"
                  : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
