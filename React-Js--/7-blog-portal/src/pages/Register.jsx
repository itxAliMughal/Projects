import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useMutation } from "react-query";
import { UserServices } from "../services/users.service";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
  UNAUTHENTICATED_ROUTES,
} from "../utils/constant";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
export let isUserRegister = false;

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { mutateAsync: registerRequest, isLoading: registerLoader } =
    useMutation("register", (payload) => UserServices.register(payload));

  const [form] = Form.useForm();

  const onFinish = (values) => {
    registerRequest(values, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "User is registered successfully.",
        });
        form.resetFields();
        isUserRegister = true;
        setTimeout(() => {
          navigate(UNAUTHENTICATED_ROUTES.HOME);
        }, 1000);
      },
    });
  };

  return (
    <div>
      {contextHolder}
      <Title level={2}>Register</Title>

      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Type your username " />
        </Form.Item>
        <Form.Item
          name="user_firstname"
          rules={[
            {
              required: true,
              message: "Please input your user_firstname!",
            },
          ]}
        >
          <Input placeholder="Type your user firstname" />
        </Form.Item>

        <Form.Item
          name="user_lastname"
          rules={[
            {
              required: true,
              message: "Please input your user_lastname!",
            },
          ]}
        >
          <Input placeholder="Type your user lastname" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter valid email address",
            },
          ]}
        >
          <Input placeholder="Type your Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern: PASSWORD_REGEX,
              message: PASSWORD_REGEX_MESSAGE,
            },
          ]}
        >
          <Input.Password placeholder="Type your Password" />
        </Form.Item>

        <Form.Item
          name="c_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
            {
              pattern: PASSWORD_REGEX,
              message: PASSWORD_REGEX_MESSAGE,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={registerLoader}
          style={{ marginBottom: "20px" }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
