import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { Modal, message } from "antd";

function Cart({ cart, setCartHandler = () => {} }) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loader, setLoader] = useState(true);
  const [updateCart, setUpdateCart] = useState(cart);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  }, [loader]);

  useEffect(() => {
    calculateTotal();
  }, [updateCart]);

  const calculateTotal = () => {
    const totalQuantity = updateCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalPrice = updateCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartQuantity(totalQuantity);
    setCartPrice(totalPrice);
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

  const handleRemove = (itemName) => {
    Modal.confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        const updatedCart = updateCart.filter((item) => item.name !== itemName);
        setUpdateCart(updatedCart);
        setCartHandler(updatedCart.length);
        messageApi.info("Item deleted");
        calculateTotal();
      },
    });
  };

  const handleQuantityChange = (itemName, increment) => {
    const updatedCart = updateCart.map((item) => {
      if (item.name === itemName) {
        const newQuantity = item.quantity + increment;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setUpdateCart(updatedCart);
    calculateTotal();
  };

  return (
    <>
      {contextHolder}

      <section className="about-header container animate-separate">
        <div
          className="product-detail-style"
          style={{
            textDecoration: "underline",
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
              paddingLeft: "100px",
              fontWeight: "600",
            }}
          >
            Cart-Items
          </h1>
          <div style={{ width: "40%" }}>
            <div className="third-sec-customize">
              <h2 style={{ marginBottom: "16px" }}>
                Total Price : ${cartPrice}
              </h2>
              <h2>Total Products : {cartQuantity}</h2>
              <button
                className="check-out-btn"
                onClick={() => {
                  navigate(AUTHENTICATED_ROUTES.CHECK_OUT);
                  window.scrollTo(0, 600);
                }}
              >
                Checkout
              </button>
              <br />
              <button
                style={{ background: "black" }}
                className="check-out-btn"
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    setLoader(false);
                    setUpdateCart([]);
                  }, 2000);
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {updateCart.map((singleCartItem) => (
        <div key={singleCartItem.name}>
          <section
            className="about-header container cart-header"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <h1 style={{ fontSize: "45px", fontWeight: "500" }}>
              {singleCartItem?.name}
            </h1>
          </section>

          <section className="detail-page">
            <div
              className="third-sec-contanier container"
              style={{
                marginTop: "30px",
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
                  gap: "50px",
                }}
              >
                <div>
                  {singleCartItem?.image && (
                    <img
                      src={singleCartItem?.image}
                      alt={singleCartItem?.name}
                      style={{
                        width: "110%",
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
                    {singleCartItem?.name} /
                  </h2>
                  <p
                    style={{
                      fontSize: "19px",
                    }}
                  >
                    {singleCartItem?.discription}
                  </p>
                  <h6
                    style={{
                      textDecoration: "underline",
                      fontSize: "22px",
                    }}
                  >
                    -${singleCartItem?.price}
                  </h6>
                  {singleCartItem?.discountedPrice && (
                    <h6
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                        fontSize: "22px",
                      }}
                    >
                      {singleCartItem?.discountedPrice}
                    </h6>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="product-btn-style"
                      style={{
                        marginTop: "50px",
                        marginLeft: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h2 style={{ marginTop: "30px" }}>
                        Quantity : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;
                      </h2>
                      <button
                        className="plus-minus-btn"
                        onClick={() => {
                          handleQuantityChange(singleCartItem.name, -1);
                        }}
                      >
                        -
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      <input
                        type="number"
                        value={singleCartItem?.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (!isNaN(newQuantity) && newQuantity > 0) {
                            setUpdateCart((prevCart) =>
                              prevCart.map((item) =>
                                item.name === singleCartItem.name
                                  ? { ...item, quantity: newQuantity }
                                  : item
                              )
                            );
                            calculateTotal();
                          }
                        }}
                        style={{
                          width: "40px",
                          textAlign: "center",
                          padding: "3px 12px",
                          fontSize: "20px",
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      <button
                        className="plus-minus-btn"
                        onClick={() => {
                          handleQuantityChange(singleCartItem.name, 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="second-sec-text-button"
                      style={{
                        marginRight: "19.5vh",
                        marginTop: "42px",
                        background: "red",
                      }}
                      onClick={() => {
                        handleRemove(singleCartItem?.name);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <h2 className="cart-item-total">
                    Total: ${singleCartItem.price * singleCartItem.quantity}
                  </h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}

export default Cart;
