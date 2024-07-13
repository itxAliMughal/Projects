import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const key = "updatable";
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!name || !email || !userMessage) {
      messageApi.warning({
        type: "error",
        content: "Please enter your message",
      });
      return;
    }

    setName("");
    setEmail("");
    setUserMessage("");

    messageApi.open({
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Message sen't successfully",
        duration: 2,
      });
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <div className="about-us-container">
        <div className="contact-sec container">
          <div className="contact-sec-one">
            <h1 className="contact-heading">CONTACT US</h1>
            <p>Reach out to us for inquiry</p>
            <Input
              placeholder="Enter your name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.TextArea
              placeholder="Enter your message / complaint here"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </div>
          <div className="contact-sec-two responsive-map">
            <div className="map-icons">
              <div className="map-icons-items">
                <div
                  className="icon-size"
                  onClick={() => {
                    window.location.href =
                      "https://maps.app.goo.gl/Wz2YH2qfmnVkVqtF8";
                  }}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <h2>Location</h2>
                  <p>North Karachi Road</p>
                </div>
              </div>
              <div className="map-icons-items">
                <div
                  className="icon-size"
                  onClick={() => {
                    window.location.href =
                      "https://mail.google.com/mail/u/0/#sent";
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h2>Email </h2>
                  <p>luxury@Furniture.com</p>
                </div>
              </div>
              <div className="map-icons-items">
                <div
                  className="icon-size"
                  onClick={() => {
                    window.location.href = "https://wa.me/923043595013";
                  }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                </div>
                <div>
                  <h2>Phone</h2>
                  <p>+1 322-123-4567</p>
                </div>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.9537554306028!2d67.06018454883743!3d25.00325852606553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb341feec05d03d%3A0x6bf112bd05ddca2b!2sSquad%20Coders%20Dev!5e0!3m2!1sen!2s!4v1716312488079!5m2!1sen!2s"
              width="600"
              height="450"
              // style="border:0;"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
