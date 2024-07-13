import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { UserServices } from "../../services/users.service";
import {
  AUTHENTICATED_ROUTES,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
} from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import CustomDragger from "../../components/CustomDragger/CustomDragger";
const { Title } = Typography;

function AdminAddUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [fileObject, setFileObject] = useState(null);
  const [form] = Form.useForm();
  const { userId } = useParams();
  const [fileName, setFileName] = useState(null);

  const { data: editUserData, isLoading: editUserLoader } = useQuery(
    ["editUser", userId],
    () => UserServices.getUserById(userId),
    {
      enabled: Boolean(userId),
    }
  );

  const editData = editUserData?.data?.results;

  useEffect(() => {
    if (editUserData) {
      form.setFieldsValue({
        username: editData?.username,
        user_firstname: editData?.user_firstname,
        user_lastname: editData?.user_lastname,
        email: editData?.email,
        password: editData?.password,
        c_password: editData?.c_password,
      });
      const fileName = {
        name: editData?.username,
        url: editData?.user_image ?? "Image Not Found",
      };
      setFileName(fileName);
    }
  }, [editUserData]);

  // console.log(editUserData, "editUserData");

  const { mutateAsync: addUserRequest, isLoading: addUserLoader } = useMutation(
    "addUser",
    (payload) => UserServices.addUserFormData(payload)
  );

  const { mutateAsync: updateUserRequest, isLoading: updateUserLoader } =
    useMutation(["updateUser", userId], (payload) =>
      UserServices.updateUserFormData(userId, payload)
    );

  const onFinish = (values) => {
    const payload = values;

    if (fileObject) {
      payload.user_image = fileObject;
    }

    const formData = new FormData();

    Object.keys(payload).map((singleKey) => {
      formData.append(singleKey, payload[singleKey]);
    });

    if (fileObject) {
      formData.append("user_image", fileObject);
    }
    if (userId) {
      updateUserRequest(payload, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "User is updated successfully",
          });
          form.resetFields();
          setFileName(null);
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.USERS);
          }, 1000);
        },
      });
    } else {
      addUserRequest(formData, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "User is created successfully.",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.USERS);
          }, 1000);
        },
      });
    }
  };

  const customRequestCallBack = (binaryFileObject) => {
    setFileObject(binaryFileObject);
  };

  return (
    <div>
      <Spin spinning={addUserLoader}>
        {contextHolder}
        <div>
          <ArrowLeftOutlined
            style={{ fontSize: "220%" }}
            onClick={() => navigate(AUTHENTICATED_ROUTES.USERS)}
          />
          <Title level={2}>Admin {userId ? "Edit" : "Add"} User</Title>
        </div>

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
          {/* {!userId && ( */}
          {/* <> */}
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

          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <h2>{userId ? "Update" : "Upload"} User Image</h2>
            <CustomDragger
              customRequestCallBack={customRequestCallBack}
              fileName={fileName}
              setFileName={setFileName}
            />
          </div>
          {/* </>
          )} */}

          <Button
            type="primary"
            htmlType="submit"
            loading={addUserLoader || editUserLoader || updateUserLoader}
            style={{ marginBottom: "20px" }}
          >
            {userId ? "Edit" : "Add"} User
          </Button>
        </Form>
      </Spin>
    </div>
  );
}

export default AdminAddUser;
