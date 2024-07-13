import React, { useEffect, useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import secondSofa from "../Images/90f793bae14320cf2a08b7051cace191.jpg";
import oneChair from "../Images/one_modern_chair_in_a_room.jpeg";
import twoChair from "../Images/one_modern_chair_in_a_room (1).jpeg";
import threeChair from "../Images/one_modern_chair_in_a_room (2).jpeg";
import fourChair from "../Images/one_modern_chair_in_a_room (3).jpeg";
import oneTable from "../Images/one_modern_chair_and_one_table_in_a_room.jpeg";
import twoTable from "../Images/one_modern_chair_and_one_table_in_a_room (1).jpeg";
import threeTable from "../Images/one_modern_chair_and_one_table_in_a_room (2).jpeg";
import fourTable from "../Images/one_modern_chair_and_one_table_in_a_room (3).jpeg";
import oneBed from "../Images/new_beds_furnish.jpeg";
import twoBed from "../Images/new_beds_furnish (1).jpeg";
import threeBed from "../Images/new_beds_furnish (2).jpeg";
import fourBed from "../Images/new_beds_furnish (3).jpeg";
import oneLiving from "../Images/simple_living_room_luxurious.jpeg";
import twoLiving from "../Images/simple_living_room_luxurious (1).jpeg";
import threeLiving from "../Images/simple_living_room_luxurious (2).jpeg";
import fourLiving from "../Images/simple_living_room_luxurious (3).jpeg";
import fiveLiving from "../Images/simple_living_room_luxurious (4).jpeg";
import sixLiving from "../Images/simple_living_room_luxurious (5).jpeg";
import sevenLiving from "../Images/simple_living_room_luxurious (6).jpeg";
import eightLiving from "../Images/simple_living_room_luxurious (7).jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Home({
  products,
  pickDataHandler = () => {},
  pickDataCustomHandler = () => {},
}) {
  const navigate = useNavigate();
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = (product) => {
    if (!addedProducts.has(product?.name)) {
      pickDataHandler(product);
      messageApi.success("Item added");
      setAddedProducts(new Set(addedProducts).add(product?.name));
    } else if (addedProducts.has(product?.name)) {
      messageApi.warning("Item already added");
    }
  };

  const productDataHandler = (singleProduct) => {
    pickDataHandler(singleProduct);
  };

  const handleCustomProductClick = (product) => {
    pickDataCustomHandler(product);
    navigate(
      AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
        ":productName",
        product.name.replace(/\s+/g, "")
      )
    );
  };

  const newCollectionProducts = [
    {
      image: oneChair,
      name: "Aurora Luxury Armchair",
      discription:
        "A stunning armchair with a sleek metal frame, plush velvet upholstery, and a golden finish.",
      price: 1899,
      discountedPrice: "-$2251",
    },
    {
      image: oneTable,
      name: "Florence Luxury Coffee Table",
      discription:
        "A stylish and comfortable coffee table with a sturdy metal base, a wooden top, and a sleek design.",
      price: 1499,
      discountedPrice: "-$1535",
    },
    {
      image: twoChair,
      name: "Calantha Luxury Wingback Chair",
      discription:
        "A classic and elegant wingback chair with a sturdy wooden frame, premium leather upholstery, and intricate details.",
      price: 1999,
      discountedPrice: "-$2324",
    },
    {
      image: twoTable,
      name: "Calantha Luxury Console Table",
      discription:
        "A classic and elegant console table with a sturdy wooden base, a marble top, and intricate details.",
      price: 2299,
      discountedPrice: "-$2490",
    },
    {
      image: threeChair,
      name: "Empress Luxury Armchair",
      discription:
        "A luxurious armchair with a sturdy metal frame, plush velvet upholstery, and ornate gold-plated accents.",
      price: 2099,
      discountedPrice: "-$2292",
    },
    {
      image: threeTable,
      name: "Blissful Luxury Dining Table",
      discription:
        "A luxurious dining table with a sturdy wooden base, a glass top, and a sleek design.",
      price: 1799,
      discountedPrice: "-$2120",
    },
    {
      image: fourChair,
      name: "Genesis Luxury Recliner",
      discription:
        "A luxurious recliner with a sturdy metal frame, premium leather upholstery, and adjustable features for ultimate comfort.",
      price: 2699,
      discountedPrice: "-$2891",
    },
    {
      image: fourTable,
      name: "Aurora Luxury Coffee Table",
      discription:
        "A stunning coffee table with a sturdy metal base, a glass top, and a golden finish.",
      price: 899,
      discountedPrice: "-$1324",
    },
  ];

  const dreameCollectionProducts = [
    {
      image: oneLiving,
      name: "Regency Velvet Sofa",
      discription:
        "A luxurious velvet sofa with a sturdy metal frame, soft velvet upholstery, and a sleek design.",
      price: 1299,
      discountedPrice: "-$1371",
    },
    {
      image: twoLiving,
      name: "Luxe Velvet Sofa",
      discription:
        "A stylish and comfortable single-seater sofa with a sturdy metal frame, soft velvet upholstery, and a sleek design.",
      price: 899,
      discountedPrice: "-$1190",
    },
    {
      image: threeLiving,
      name: "Rustic Oak Drying Room",
      discription:
        "A stylish and comfortable set featuring a 3-seater sofa, 2 armchairs, and a coffee table.",
      price: 1299,
      discountedPrice: "-$1474",
    },
    {
      image: fourLiving,
      name: "Contemporary Fabric Sofa Set",
      discription:
        "A cozy and modern set featuring a 4-seater sofa, 2 armchairs, and a coffee table.",
      price: 1599,
      discountedPrice: "-$1700",
    },
    {
      image: fiveLiving,
      name: "Modular Fabric Sectional Sofa",
      discription:
        "A versatile and comfortable set featuring a modular sectional sofa, 2 armchairs, and a coffee table.",
      price: 1999,
      discountedPrice: "-$2290",
    },
    {
      image: sixLiving,
      name: "Corner Leather Sectional Sofa",
      discription:
        "A stylish and spacious set featuring a corner sectional sofa, 2 armchairs, and a coffee table.",
      price: 2299,
      discountedPrice: "-$2599",
    },
    {
      image: sevenLiving,
      name: "Majestic Luxury Sofa Set",
      discription:
        "A opulent and extravagant set featuring a 4-seater sofa, 2 armchairs, and a coffee table, crafted with the finest materials and expert craftsmanship.",
      price: 3499,
      discountedPrice: "-$3942",
    },
    {
      image: eightLiving,
      name: "Luxe Reclining Sofa Set",
      discription:
        "A premium and comfortable set featuring a 3-seater reclining sofa, 2 reclining armchairs, and a coffee table.",
      price: 1499,
      discountedPrice: "-$1991",
    },
    {
      image: oneBed,
      name: "DreamWeaver",
      discription: "Sleep in style, every night.",
      price: 899,
      discountedPrice: "-$1111",
    },
    {
      image: twoBed,
      name: "SnoozeSanctuary",
      discription: "Find your dream bed, today.",
      price: 1299,
      discountedPrice: "-$1331",
    },
    {
      image: threeBed,
      name: "ComfortCove",
      discription: "Wake up to comfort, every morning.",
      price: 599,
      discountedPrice: "-$719",
    },
    {
      image: fourBed,
      name: "SleepCove",
      discription:
        "Sleep like royalty on our comfort cove.featuring a sturdy wooden frame, ultra-comfortable mattress, and a soothing design for a restful night's sleep.",
      price: 599,
      discountedPrice: "-$650",
    },
  ];

  return (
    <>
      {contextHolder}

      <section className="second-sec">
        <div className="container second-sec-content">
          <div
            className="img-animate"
            onClick={() => {
              navigate(
                AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
                  ":productName",
                  "SilkySofa"
                )
              );
            }}
          >
            <img
              src={secondSofa}
              onClick={() => {
                pickDataCustomHandler({
                  image: secondSofa,
                  name: "Silky Lather Sofa",
                  discription:
                    "SUPER SAVINGS / Sale Up to 40% off + 12 months Financing /  Create a room that's welcoming with a sofa or a sectional couch. To help you go the extra mile for comfort and style",
                  price: 720,
                  discountedPrice: "-$1,200",
                });
                navigate(
                  AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
                    ":productName",
                    "SilkySofa"
                  )
                );
                window.scrollTo(0, 690);
              }}
            />
          </div>
          <div className="second-sec-text">
            <h1 className="second-sec-text-h1">
              <span className="second-sec-text-h1-span">SUPER</span>
              &nbsp;SAVINGS
            </h1>
            <h2>Sale Up to 40% off + 12 months Financing</h2>
            <p>
              Create a room that's welcoming with a sofa or a sectional couch.
              <br />
              To help you go the extra mile for comfort and style
            </p>
            <button
              className="second-sec-text-button"
              onClick={() => {
                pickDataCustomHandler({
                  image: secondSofa,
                  name: "Silky Lather Sofa",
                  discription:
                    "SUPER SAVINGS / Sale Up to 40% off + 12 months Financing /  Create a room that's welcoming with a sofa or a sectional couch. To help you go the extra mile for comfort and style",
                  price: 720,
                  discountedPrice: "-$1,200",
                });
                navigate(
                  AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
                    ":productName",
                    "SilkySofa"
                  )
                );
                window.scrollTo(0, 690);
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="third-sec container">
        <h1 className="second-sec-text-h1">
          <span className="second-sec-text-h1-span">NEW</span>&nbsp;COLLECTION
        </h1>
        &nbsp;
        <hr />
        <div className="third-sec-container">
          {newCollectionProducts.map((product, index) => (
            <div className="third-sec-customize" key={index}>
              <div
                onClick={() => {
                  handleCustomProductClick(product);
                  window.scrollTo(0, 690);
                }}
              >
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.discription}</p>
                <h6>Rs. -${product.price}</h6>
                <h6 className="custom-cut-price" style={{ color: "red" }}>
                  Rs. {product.discountedPrice}
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

      <section className="fourth-sec">
        <div className="container">
          <h1 className="second-sec-text-h1">
            <span className="second-sec-text-h1-span">SELECT</span>
            &nbsp;PRODUCTS
          </h1>
          &nbsp;
          <br />
          <br />
          <hr />
          <br />
          <nav>
            <ul className="nav-sec-2">
              <div>
                <li>
                  Table
                  <br />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
              <div>
                <li>
                  Sofa <br />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
              <div>
                <li>
                  Bed <br />
                  &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
              <div>
                <li>
                  Desk <br />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
              <div>
                <li>
                  Cofee Table <br />
                  &nbsp; &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
              <div>
                <li>
                  Chair <br />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faAngleDown} />
                </li>
              </div>
            </ul>
          </nav>
          &nbsp;
          <div className="third-sec-container">
            {products.map((singleProduct, index) => {
              return (
                <div
                  className="fourth-sec-text third-sec-customize"
                  key={index}
                >
                  <div
                    onClick={() => {
                      productDataHandler(singleProduct);
                      navigate(
                        AUTHENTICATED_ROUTES.PRODUCT_DETAIL.replace(
                          ":productName",
                          singleProduct?.name
                        )
                      );
                      window.scrollTo(0, 690);
                    }}
                  >
                    <img src={singleProduct?.image} alt={singleProduct?.name} />
                    <h3>
                      <span>{singleProduct?.name} /</span>
                      &nbsp;{singleProduct?.discription}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Rs. -${singleProduct?.price}</h5>
                      <h5
                        style={{ textDecoration: "line-through", color: "red" }}
                      >
                        Rs. {singleProduct?.discountedPrice}
                      </h5>
                    </div>
                  </div>
                  <button
                    className="second-sec-text-button"
                    style={{ marginLeft: "14px", marginTop: "12px" }}
                    onClick={() => handleAddToCart(singleProduct)}
                  >
                    {addedProducts.has(singleProduct?.name)
                      ? "Already added"
                      : "Add to cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fifth-sec container">
        <h1 className="second-sec-text-h1">
          <span className="second-sec-text-h1-span">FIND YOUR DREAM</span>
          <br />
          &nbsp;LIVING ROOM
        </h1>
        &nbsp;
        <hr />
        <div className="third-sec-container">
          {dreameCollectionProducts.map((product, index) => (
            <div key={index} className="third-sec-customize">
              <div
                onClick={() => {
                  handleCustomProductClick(product);
                  window.scrollTo(0, 690);
                }}
              >
                <img src={product.image} />
                <h2>{product.name}</h2>
                <p>{product.discription}</p>
                <h6>{`Rs. -$${product.price}`}</h6>
                <h6 className="custom-cut-price" style={{ color: "red" }}>
                  {`Rs. ${product.discountedPrice}`}
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
    </>
  );
}

export default Home;
