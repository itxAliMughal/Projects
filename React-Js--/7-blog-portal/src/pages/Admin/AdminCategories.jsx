import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Table, Modal, message } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { categoryService } from "../../services/categories.service";
import { helperService } from "../../utils/helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../../utils/constant";
import { render } from "@testing-library/react";

function AdminCategories() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { catId } = useParams();

  const {
    data,
    isLoading,
    isFetching,
    refetch: reloadCategories,
  } = useQuery("AdminCategories", () => categoryService.getcategories());

  const {
    mutateAsync: categoryDeleteRequest,
    isLoading: categoryDeleteLoader,
  } = useMutation("deleteCategory", (catId) =>
    categoryService.deleteCategoriesById(catId)
  );

  const deleteCategoryHandler = (row) => {
    const catId = row?.cat_id;

    Modal.confirm({
      title: "Do you want to delete this category ?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        categoryDeleteRequest(catId, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: `Category ${catId} is deleted successfully.`,
            });
            reloadCategories();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Category Id",
      key: "catId",
      //   dataIndex: "cat_id",
      render: (singleCategory) => {
        return singleCategory?.cat_id;
      },
    },
    {
      title: "Name",
      key: "category title",
      // dataIndex: "cat_title",
      render: (row) => {
        return (
          <Link
            to={AUTHENTICATED_ROUTES.EDIT_CATEGORY.replace(
              ":categoryId",
              row?.cat_id
            )}
          >
            {row?.cat_title}
          </Link>
        );
      },
    },
    {
      title: "Created At",
      key: "created at",
      render: (row) => helperService.convertDateToOurFormat(row?.created_at),
    },
    {
      title: "Updated At",
      key: "updated at",
      render: (row) => helperService.convertDateToOurFormat(row?.updated_at),
    },
    {
      title: "Edit",
      key: "edit",
      render: (row) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(
                AUTHENTICATED_ROUTES.EDIT_CATEGORY.replace(
                  ":categoryId",
                  row?.cat_id
                )
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (row) => {
        return (
          <Button
            type="primary"
            style={{ background: "red" }}
            onClick={() => deleteCategoryHandler(row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      {contextHolder},
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Categories</h2>
        <Button
          type="primary"
          onClick={() => navigate(AUTHENTICATED_ROUTES.ADD_CATEGORY)}
        >
          Add Category
        </Button>
      </div>
      <Table
        dataSource={data?.data?.results}
        columns={columns}
        loading={isLoading || isFetching || categoryDeleteLoader}
      />
    </div>
  );
}

export default AdminCategories;
