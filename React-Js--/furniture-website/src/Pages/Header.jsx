import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Flex, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import newImage from "../Images/defaultSofa.jpg";
import newImageTwo from "../Images/simleBed.jpg";
import newImageThree from "../Images/generate one size im.jpg";
import newImageFour from "../Images/one_modern_chair_in_a_room.jpeg";
import newImageFive from "../Images/modernSofa.jpeg";
import newImageSix from "../Images/modernLiving.jpeg";

const { Search } = Input;

const images = [
  newImage,
  newImageTwo,
  newImageThree,
  newImageFour,
  newImageFive,
  newImageSix,
];

function Header({ count, cart }) {
  const navigate = useNavigate();
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const cartLength = cart.length > 0 ? cart.length - 1 : cart;

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextImageHandler = () => {
    setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImageHandler = () => {
    setBgImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="banner-img"
      style={{
        backgroundImage: `url(${images[bgImageIndex]})`,
        backgroundPosition: "center",
      }}
    >
      <nav>
        <ul className="nav-sec">
          <li>
            <Link to={AUTHENTICATED_ROUTES.HOME}>/ Home</Link>
          </li>
          <li
            onClick={() => {
              window.scrollTo(0, 680);
            }}
          >
            <Link to={AUTHENTICATED_ROUTES.ABOUT}>/ About Us</Link>
          </li>
          <li
            onClick={() => {
              window.scrollTo(0, 630);
            }}
          >
            <Link to={AUTHENTICATED_ROUTES.SHOP_STORE}>/ Shop Store</Link>
          </li>
          <li
            onClick={() => {
              window.scrollTo(0, 650);
            }}
          >
            <Link to={AUTHENTICATED_ROUTES.CONTACT}>/ Contact Us</Link>
          </li>
          <li
            onClick={() => {
              window.scrollTo(0, 650);
            }}
          >
            <Link to={AUTHENTICATED_ROUTES.ADD_PRODUCT}>/ Add Product</Link>
          </li>
        </ul>
        <Search
          onSearch={() => {
            if (AUTHENTICATED_ROUTES.SEARCH) {
              navigate(
                AUTHENTICATED_ROUTES.SEARCH.replace(
                  ":productName",
                  searchInput.replace(/\s+/g, "")
                )
              );
            }
            window.scrollTo(0, 660);
          }}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="search-sec"
          placeholder="Search Furniture"
          size="large"
        />
        <div className="icon-container">
          <FontAwesomeIcon
            className="icon-sec"
            icon={faCartShopping}
            onClick={() => {
              navigate(AUTHENTICATED_ROUTES.CART);
              window.scrollTo(0, 680);
            }}
          />
          <sup className="icon-sup">{count || cartLength}</sup>
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          className="banner-arrow"
          icon={faArrowLeft}
          onClick={nextImageHandler}
        />
        <div
          className="heading-sec"
          style={{ width: "60%" }}
          onClick={() => navigate("/")}
        >
          <h2>LUXURY</h2>
          <h1>FURNITURE</h1>
        </div>
        <FontAwesomeIcon
          className="banner-arrow"
          icon={faArrowRight}
          onClick={prevImageHandler}
        />
      </div>
    </section>
  );
}

export default Header;
