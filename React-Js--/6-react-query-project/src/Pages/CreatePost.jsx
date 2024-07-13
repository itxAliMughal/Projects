import {
  Button,
  Input,
  Form,
  Typography,
  DatePicker,
  Select,
  notification,
  Spin,
} from "antd";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { apiBaseUrl } from "../constant";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomDragger from "../components/CustomDragger/CustomDragger";

function CreatePost() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const { data: categoryResponse, isLoading: categoryLoader } = useQuery(
    "categories",
    () => fetch(`${apiBaseUrl}/categories`).then((res) => res.json())
  );

  const categoryData = categoryResponse?.results;

  // console.log(categoryData);

  const { mutateAsync: createPostRequest, isLoading: createPostLoader } =
    useMutation("createPost", (payload) =>
      fetch(`${apiBaseUrl}/posts`, {
        method: "POST",
        body: payload,
      })
    );

  const onFinish = (values) => {
    const payload = { ...values };
    payload.post_date = moment(payload.post_date);

    const formData = new FormData();

    // formData.append("post_title", payload?.post_title);
    // formData.append("post_category_id", payload?.post_category_id);
    // formData.append("post_author", payload?.post_author);
    // formData.append("post_date", moment(payload?.post_date));
    // formData.append("post_content", payload?.post_content);
    // formData.append("post_status", payload?.post_status);
    // formData.append("post_tags", payload?.post_tags);
    // if (file) {
    //   formData.append("post_image", file);
    // }

    Object.entries(payload).forEach((singleArray) => {
      const [key, value] = singleArray;
      formData.append(key, value);
    });
    if (file) {
      formData.append("post_image", file);
    }

    createPostRequest(formData, {
      onSuccess: () => {
        form.resetFields();
        api.info({
          message: `Added`,
          description: "Post is added successfully",
          duration: 1,
        });
        setTimeout(() => {
          navigate("/");
        }, [1000]);
      },
    });
  };

  const filterOption = (input, option) =>
    (option?.children ?? "").toLowerCase().includes(input.toLowerCase());

  const uploadImageFunction = (fileParam) => {
    setFile(fileParam);
  };

  return (
    <div>
      <Spin spinning={createPostLoader || categoryLoader}>
        {contextHolder}
        <Typography.Title>Create Post</Typography.Title>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="post_title"
            rules={[
              {
                required: true,
                message: "Please input your post_title!",
              },
            ]}
          >
            <Input placeholder="Post Title" />
          </Form.Item>
          <Form.Item
            name="post_author"
            rules={[
              {
                required: true,
                message: "Please input your post_author!",
              },
            ]}
          >
            <Input placeholder="Post Author" />
          </Form.Item>
          <Form.Item
            name="post_date"
            rules={[
              {
                required: true,
                message: "Please input your post_date!",
              },
            ]}
          >
            <DatePicker className="w-100" placeholder="Post Date" />
          </Form.Item>
          <Form.Item
            name="post_content"
            rules={[
              {
                required: true,
                message: "Please input your post_content!",
              },
            ]}
          >
            <Input.TextArea placeholder="Post Content" />
          </Form.Item>
          <Form.Item
            name="post_status"
            rules={[
              {
                required: true,
                message: "Please input your post_status!",
              },
            ]}
          >
            <Select placeholder="Post Status">
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="publish">Publish</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="post_category_id"
            rules={[
              {
                required: true,
                message: "Please input your post_category_id!",
              },
            ]}
          >
            <Select
              placeholder="Post Category"
              showSearch
              filterOption={filterOption}
            >
              {categoryData?.length > 0 &&
                categoryData.map((singleCategory) => {
                  return (
                    <Select.Option value={singleCategory?.cat_id}>
                      {singleCategory?.cat_title}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name="post_tags"
            rules={[
              {
                required: true,
                message: "Please input your post_tags!",
              },
            ]}
          >
            <Input placeholder="Post Tags" />
          </Form.Item>

          <Form.Item>
            <CustomDragger customFunction={uploadImageFunction} />
          </Form.Item>

          <Form.Item style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createPostLoader || categoryLoader}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default CreatePost;
