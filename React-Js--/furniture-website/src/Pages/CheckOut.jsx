import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faCreditCard,
  faMoneyBills,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faCcMastercard,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loader, setLoader] = useState(true);
  const [loaderTwo, setLoaderTwo] = useState(false);
  const key = "updatable";
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, [2000]);
  }, []);

  const onFinish = (values) => {
    console.log(values);

    setLoaderTwo(true);

    setTimeout(() => {
      setLoaderTwo(false);
      form.resetFields();
      messageApi.success("Order Placed");
    }, 3000);

    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  };

  return (
    <>
      <Spin spinning={loader}>
        {contextHolder}
        <div className="about-us-container">
          <div className="contact-sec container">
            <div className="contact-sec-one">
              <h1
                className="contact-heading"
                style={{ textDecoration: "underline" }}
              >
                Check Out
              </h1>
              <div className="check-out-icons">
                <FontAwesomeIcon icon={faMoneyBills} />
                <FontAwesomeIcon icon={faCreditCard} />
                <FontAwesomeIcon icon={faCcVisa} />
                <FontAwesomeIcon icon={faCcMastercard} />
              </div>

              <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <p style={{ marginBottom: "2px" }}>Card Holder Name</p>
                <Form.Item
                  style={{ marginBottom: "-8px" }}
                  name="card_holder"
                  rules={[
                    {
                      required: true,
                      message: "Please input card holder name!",
                    },
                  ]}
                >
                  <Input placeholder="Card Holder Name" />
                </Form.Item>
                <p style={{ marginBottom: "2px" }}>Card Number</p>
                <Form.Item
                  style={{ marginBottom: "-8px" }}
                  name="card_number"
                  rules={[
                    { required: true, message: "Please input card number!" },
                  ]}
                >
                  <Input placeholder="Card Number" />
                </Form.Item>
                <p style={{ marginBottom: "2px" }}>Expiration</p>
                <div
                  style={{
                    display: "flex",
                    gap: "90px",
                    marginBottom: "-40px",
                  }}
                >
                  <Form.Item
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input expiration date",
                      },
                    ]}
                  >
                    <DatePicker className="w-150" placeholder="mm/dd/yyyy" />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    rules={[
                      {
                        required: true,
                        message: "Please input CVV",
                      },
                    ]}
                  >
                    <Input className="w-150" placeholder="Enter CVV" />
                  </Form.Item>
                </div>

                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  loading={loaderTwo}
                >
                  Pay
                </Button>
              </Form>
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
      </Spin>
    </>
  );
}

export default CheckOut;
