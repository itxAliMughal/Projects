import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Select,
  message,
  Spin,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { Children, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../../utils/constant";
import { useMutation, useQuery } from "react-query";
import { postService } from "../../services/posts.service";
import { categoryService } from "../../services/categories.service";
import CustomDragger from "../../components/CustomDragger/CustomDragger";
import { helperService } from "../../utils/helper";

function AdminAddPost() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState();
  const [fileObject, setFileObject] = useState(null);
  const { postId } = useParams();

  const { mutateAsync: addPostRequest, isLoading: addPostLoader } = useMutation(
    "addPost",
    (values) => postService.addPost(values)
  );

  const { data: categoryResponse, isLoading: categoryDataLoader } = useQuery(
    "categoryData",
    () => categoryService.getcategories()
  );

  const categoryData = categoryResponse?.data?.results;

  const { data: editPostResponse, isLoading: editPostLoader } = useQuery(
    ["editPost", postId],
    () => postService.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );

  const editPostData = editPostResponse?.data?.results;

  useEffect(() => {
    if (editPostData) {
      //   const dateOurFormat = helperService.convertDateToOurFormat(
      //     editPostData?.post_date
      //   );
      form.setFieldsValue({
        post_title: editPostData?.post_title,
        post_author: editPostData?.post_author,
        // post_date: helperService.convertDateToOurFormat(
        //   editPostData?.post_date
        // ),
        // post_date: editPostData?.post_date,
        post_content: editPostData?.post_content,
        post_status: editPostData?.post_status,
        post_tags: editPostData?.post_tags,
        post_category_id: editPostData?.post_category_id,
      });
      const fileName = {
        name: editPostData?.post_title,
        url: editPostData?.image ?? "Image Not Found",
      };
      setFileName(fileName);
    }
  }, [editPostResponse]);

  const { mutateAsync: updatePostRequest, isLoading: updatePostLoader } =
    useMutation(["updatePost", postId], (values) =>
      postService.updatePostById(postId, values)
    );

  const onFinish = (values) => {
    // ye edit wale kam k liye he
    const payload = values;

    if (fileObject) {
      payload.post_image = fileObject;
    }

    // ye add wale kam k liye he
    const formData = new FormData();

    Object.keys(payload).map((singleKey) => {
      formData.append(singleKey, payload[singleKey]);
    });

    if (fileObject) {
      formData.append("post_image", fileObject);
    }

    if (postId) {
      updatePostRequest(payload, {
        onSuccess: () => {
          messageApi.open({
            content: "Post is updated successfully!",
            type: "success",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.POSTS);
          }, 1000);
        },
      });
    } else {
      addPostRequest(formData, {
        onSuccess: () => {
          messageApi.open({
            content: "Post added successfully!",
            type: "success",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.POSTS);
          }, 1000);
        },
      });
    }
  };

  const filterOption = (input, option) =>
    (option?.children ?? "").toLowerCase().includes(input.toLowerCase());

  const customRequestCallBack = (binaryFile) => {
    setFileObject(binaryFile);
  };

  return (
    <Spin
      spinning={
        addPostLoader ||
        categoryDataLoader ||
        editPostLoader ||
        updatePostLoader
      }
    >
      {contextHolder}
      <ArrowLeftOutlined
        style={{ fontSize: "220%" }}
        onClick={() => navigate(AUTHENTICATED_ROUTES.POSTS)}
      />
      <Typography.Title>{postId ? "Edit" : "Add"} Post</Typography.Title>

      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item
          name="post_title"
          rules={[{ required: true, message: "Please input post title!" }]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>

        <Form.Item
          name="post_author"
          rules={[{ required: true, message: "Please input post author!" }]}
        >
          <Input placeholder="Post Author" />
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          name="post_date"
          rules={[{ required: true, message: "Please input post date!" }]}
        >
          <DatePicker className="w-100" placeholder="Post Date" />
        </Form.Item>

        <Form.Item
          name="post_content"
          rules={[{ required: true, message: "Please input post content!" }]}
        >
          <Input placeholder="Post Content" />
        </Form.Item>

        <Form.Item
          name="post_tags"
          rules={[{ required: true, message: "Please input post tags!" }]}
        >
          <Input placeholder="Post Tags" />
        </Form.Item>

        <Form.Item
          name="post_status"
          rules={[{ required: true, message: "Please input post status!" }]}
        >
          <Select placeholder="Post Status">
            <Select.Option value="publish">Publish</Select.Option>
            <Select.Option value="draft">Draft</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="post_category_id"
          rules={[
            { required: true, message: "Please input post category id!" },
          ]}
        >
          <Select
            placeholder="Post Category"
            filterOption={filterOption}
            showSearch
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

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <h2>{postId ? "Update" : "Upload"} Post Image</h2>
          <CustomDragger
            customRequestCallBack={customRequestCallBack}
            fileName={fileName}
            setFileName={setFileName}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={
            addPostLoader ||
            categoryDataLoader ||
            editPostLoader ||
            updatePostLoader
          }
        >
          {postId ? "Update Post" : "Add Post"}
        </Button>
      </Form>
    </Spin>
  );
}

export default AdminAddPost;
