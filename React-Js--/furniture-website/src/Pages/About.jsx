import React from "react";
import "../frontned-assets/css/app.css";
import aboutImage from "../Images/2bffa6cdb179818359c67acd2981f831.jpg"; // ensure you have this image in the correct path

function About() {
  return (
    <div className="about-us-container">
      <section className="about-header">
        <h1>ABOUT US</h1>
      </section>
      <section className="about-content container">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Welcome to our furniture store, where comfort meets style.
            Established in 2020, we have been committed to providing
            high-quality, stylish furniture that brings joy and comfort to your
            home. Our passion for design and dedication to our customers sets us
            apart in the industry.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to create a space that reflects your personal style
            while ensuring the utmost comfort. We believe in offering a diverse
            range of furniture that caters to all tastes and preferences,
            ensuring everyone can find something they love.
          </p>
          <h2>Why Choose Us</h2>
          <p>
            At our store, we prioritize quality, affordability, and exceptional
            customer service. Our team is always ready to assist you in finding
            the perfect pieces for your home. We take pride in our extensive
            collection and our ability to cater to a variety of interior styles.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </section>
    </div>
  );
}

export default About;
