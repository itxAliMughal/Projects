import { Button, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";
import CustomDragger from "./CustomUpload/CustomDragger";
import { AUTHENTICATED_ROUTES } from "../uttils/constant";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AddProduct({ storeProducts, setStoreProducts }) {
  const [fileName, setFileName] = useState();
  const navigate = useNavigate();
  const [loaderTwo, setLoaderTwo] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState(null);

  const onFinish = (value) => {
    const newProduct = {
      name: value.name,
      discription: value.discription,
      price: value.price,
      discountedPrice: value.discountedPrice,
      image: image,
    };

    setStoreProducts([...storeProducts, newProduct]);

    setLoaderTwo(true);

    setTimeout(() => {
      setLoaderTwo(false);
      form.resetFields();
      messageApi.success("Product Added");
    }, 3000);

    setTimeout(() => {
      navigate(AUTHENTICATED_ROUTES.MY_STORE);
      window.scrollTo(0, 680);
    }, 4000);
  };

  const customRequestCallBack = (binaryObject) => {
    if (binaryObject && binaryObject.data) {
      setImage(binaryObject.data.toString());
      console.log(image, "image");
    } else {
      console.log("Failed to get image URL");
      messageApi.success("image uploaded");
    }
  };

  return (
    <>
      {contextHolder}
      <section
        className="about-header container"
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
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => navigate(AUTHENTICATED_ROUTES.HOME)}
          >
            Go Back
          </p>
        </div>
        <h1>ADD PRODUCT</h1>
        <Button
          className="store-btn"
          onClick={() => {
            navigate(AUTHENTICATED_ROUTES.MY_STORE);
          }}
        >
          My Store
        </Button>
      </section>
      <Form
        style={{ margin: "50px auto" }}
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        className="container"
        form={form}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          name="discription"
          rules={[
            {
              required: true,
              message: "Please input product discription!",
            },
          ]}
        >
          <Input.TextArea placeholder="Product Discription" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <Input placeholder="Product Price" />
        </Form.Item>
        <Form.Item
          name="discountedPrice"
          rules={[
            {
              required: true,
              message: "Please input discounted Price!",
            },
          ]}
        >
          <Input placeholder="Product Discounted Price" />
        </Form.Item>
        <CustomDragger
          customRequestCallBack={customRequestCallBack}
          fileName={fileName}
          setFileName={setFileName}
        />
        <Button
          style={{ width: "100%", marginTop: "30px" }}
          type="primary"
          htmlType="submit"
          loading={loaderTwo}
        >
          Add Product
        </Button>
      </Form>
    </>
  );
}

export default AddProduct;
