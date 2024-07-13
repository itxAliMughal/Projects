import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { categoryService } from "../../services/categories.service";
import { useNavigate, useParams } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../../utils/constant";

const AdminAddCategory = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryDataTitle, setCategoryDataTitle] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { mutateAsync: addCategoryRequest, isLoading: addCategoryLoader } =
    useMutation("addCategory", categoryService.addCategory);

  const {
    mutateAsync: updateCategoryRequest,
    isLoading: updateCategoryLoader,
  } = useMutation(["updateCategory", categoryId], (payload) => {
    categoryService.updateCategoryById(categoryId, payload);
  });

  const { data: editCategoryData, isLoading: editCategoryLoader } = useQuery(
    ["editCategory", categoryId],
    () => categoryService.getCategoriesById(categoryId),
    {
      enabled: Boolean(categoryId),
    }
  );

  useEffect(() => {
    if (editCategoryData?.data?.results) {
      form.setFieldsValue({
        cat_title: editCategoryData?.data?.results?.cat_title,
      });
      setCategoryDataTitle(editCategoryData?.data?.results?.cat_title);
    }
  }, [editCategoryData?.data?.results]);

  const onFinish = (values) => {
    if (categoryId) {
      updateCategoryRequest(values, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: `Category ${categoryId} is updated successfully.`,
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.CATEGORIES);
          }, 2000);
        },
      });
    } else {
      addCategoryRequest(values, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Category is added successfully.",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTES.CATEGORIES);
          }, 2000);
        },
      });
    }
  };
  return (
    <>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        {contextHolder}
        <ArrowLeftOutlined
          style={{ fontSize: "220%" }}
          onClick={() => navigate(AUTHENTICATED_ROUTES.CATEGORIES)}
        />
        <h2>{categoryId ? "Edit" : "Add"} Category</h2>
        <Form.Item
          name="cat_title"
          rules={[
            {
              required: true,
              message: `Please ${
                categoryId ? "edit" : "input"
              } your category title!`,
            },
          ]}
        >
          <Input
            placeholder="Category Title"
            onChange={(event) => {
              setCategoryDataTitle(event.target.value);
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={
            addCategoryLoader || editCategoryLoader || updateCategoryLoader
          }
          disabled={
            categoryId &&
            editCategoryData?.data?.results?.cat_title === categoryDataTitle
          }
        >
          {categoryId ? "Update" : "Create"} Category
        </Button>
      </Form>
    </>
  );
};
export default AdminAddCategory;
