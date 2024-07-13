import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useMutation } from "react-query";
import { UserServices } from "../services/users.service";
import {
  AUTHENTICATED_ROUTES,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
} from "../utils/constant";
import { AuthServices } from "../utils/authService";
const { Title } = Typography;

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: loginRequest, isLoading: loginLoader } = useMutation(
    "login",
    (payload) => UserServices.login(payload)
  );

  const [form] = Form.useForm();

  const onFinish = (values) => {
    loginRequest(values, {
      onSuccess: (data) => {
        console.log(data);
        messageApi.open({
          type: "success",
          content: "User is logged in successfully.",
        });
        form.resetFields();

        const apiResponse = data?.data?.results;

        AuthServices.saveToken(apiResponse?.token);
        AuthServices.saveUserName(apiResponse?.username);

        // hard reload
        setTimeout(() => {
          window.location.href = AUTHENTICATED_ROUTES.DASHBOARD;
        }, 1000);
      },
    });
  };

  return (
    <div>
      {contextHolder}
      <Title level={2}>Login</Title>

      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
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
          initialValue={"oscar41@example.net"}
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
          initialValue="admin123@"
        >
          <Input.Password placeholder="Type your Password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loginLoader}
          style={{ marginBottom: "20px" }}
        >
          login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
