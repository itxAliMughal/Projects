import { message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { useNavigate } from "react-router-dom";

function SearchDetail({ products, pickData, pickDataHandler = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [messageApi, contextHolder] = message.useMessage();
  const [storedProduct, setStoredProduct] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term !== "") {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleAddToCart = (product) => {
    if (!addedProducts.has(product?.name)) {
      pickDataHandler(product);
      messageApi.success("Item added");
      setAddedProducts(new Set(addedProducts).add(product?.name));
    } else {
      messageApi.warning("Item already added");
    }
  };

  useEffect(() => {
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
  }, [pickData]);

  return (
    <div>
      {contextHolder}
      <section className="about-header container animate-separate">
        <div
          className="product-detail-style"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              style={{
                marginRight: "10px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate(AUTHENTICATED_ROUTES.HOME)}
            >
              Go Back
            </p>
          </div>
          <h1
            style={{
              textDecoration: "none",
              fontSize: "80px",
              textDecoration: "underline",

              paddingLeft: "150px",
            }}
          >
            Search-Product
          </h1>
          <input
            style={{
              textAlign: "center",
              display: "flex",
              padding: "10px 60px",
              height: "20px",
              justifyContent: "center",
              fontSize: "22px",
            }}
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </section>

      <ul>
        {filteredProducts.map((product) => (
          <>
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
                    {product?.image && (
                      <img
                        src={product?.image}
                        alt={product?.name}
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
                      {product?.name}
                    </h2>
                    <p style={{ fontSize: "19px" }}>{product?.discription}</p>
                    <h6
                      style={{
                        textDecoration: "underline",
                        fontSize: "22px",
                      }}
                    >
                      Rs. -${product?.price}
                    </h6>
                    {product?.discountedPrice && (
                      <h6
                        style={{
                          textDecoration: "line-through",
                          color: "red",
                          fontSize: "22px",
                        }}
                      >
                        Rs. {product.discountedPrice}
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
        ))}
      </ul>
    </div>
  );
}

export default SearchDetail;
