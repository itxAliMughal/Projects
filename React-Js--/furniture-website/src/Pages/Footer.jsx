import {
  CopyrightOutlined,
  InstagramOutlined,
  XOutlined,
  FacebookFilled,
  GithubOutlined,
} from "@ant-design/icons";
import React from "react";

function Footer() {
  return (
    <footer className="footer-sec">
      <div className="container">
        <h1 className="footer-heading">ALL DEPARTMENTS</h1>
        <div className="footer-content-h1">
          <h1>/APPARTS</h1>
          <h1>/SECTIONS</h1>
          <h1>/CATEGORIES</h1>
        </div>
        <div className="footer-content">
          <div>
            <h2>/ BATHROOM</h2>
            <h2>/ BEDROOM</h2>
            <h2>/ CHILDREN'S</h2>
            <h2>/ COOKING</h2>
            <h2>/ DECORATION</h2>
            <h2>/ DINING</h2>
            <h2>/ EATING</h2>
          </div>
          <div>
            <h2>/ FOOD</h2>
            <h2>/ HALLWAY</h2>
            <h2>/ KITCHENS</h2>
            <h2>/ LAUNDRY</h2>
            <h2>/ LIGHTING</h2>
            <h2>/ LIVING ROOM</h2>
            <h2>/ OFFICE FURNITURE</h2>
          </div>
          <div>
            <h2>/ OUTDOOR FURNITURE</h2>
            <h2>/ PETS</h2>
            <h2>/ SECONDARY STORAGE</h2>
            <h2>/ SMALL STORAGE</h2>
            <h2>/ TEXTILES & RUGS</h2>
            <h2>/ WIRELESS CHARGING</h2>
            <h2>/ IKEA FAMILY PRODUCTS & OFFERS</h2>
          </div>
        </div>
      </div>
      <div className="footer-foot">
        <p>
          All Rights Reserved To Luxury Furniture &nbsp;
          <CopyrightOutlined />
          &nbsp;
          {new Date().getFullYear()}
        </p>
        <div>
          <InstagramOutlined
            className="footer-foot-icons-style"
            onClick={() => {
              window.location.href = "https://www.instagram.com/brokerboy_369/";
            }}
          />
          <XOutlined
            className="footer-foot-icons-style"
            onClick={() => {
              window.location.href = "https://twitter.com";
            }}
          />
          <FacebookFilled
            className="footer-foot-icons-style"
            onClick={() => {
              window.location.href =
                "https://www.facebook.com/aliqaiser.aliqaiser.50";
            }}
          />
          <GithubOutlined
            className="footer-foot-icons-style"
            onClick={() => {
              window.location.href = "https://github.com/itxAliMughal/SCD";
            }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
