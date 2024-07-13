import { Button, Modal, Table, message } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { postService } from "../../services/posts.service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import prado from "../../Prado.jpeg";
import { helperService } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../../utils/constant";

function AdminPosts() {
  const [messageApi, contexHolder] = message.useMessage();
  const navigate = useNavigate();

  const {
    data: getPosts,
    isLoading: getPostsLoader,
    isFetching: getPostFetching,
    refetch: reloadPosts,
  } = useQuery("posts", () => postService.getPosts());

  const { mutateAsync: deletePostRequest, isLoading: deletePostLoader } =
    useMutation("deletePost", (postId) => postService.deletePostById(postId));

  const deletePostHandler = (postId) => {
    Modal.confirm({
      title: "Do you want to delete this post ?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deletePostRequest(postId, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: `Post ${postId} is deleted successfully.`,
            });
            reloadPosts();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "post_title",
      key: "post_title",
    },
    {
      title: "Author",
      dataIndex: "post_author",
      key: "post_author",
    },
    {
      title: "Category Id",
      dataIndex: "post_category_id",
      key: "post_category_id",
    },
    {
      title: "Content",
      dataIndex: "post_content",
      key: "post_content",
    },
    {
      title: "Tags",
      dataIndex: "post_tags",
      key: "post_tags",
    },
    {
      title: "Image",
      key: "post_image",
      render: (row) => {
        if (!row?.image) {
          return <img src={prado} alt="post image" width={100} />;
        }
        return <img src={row?.image} alt="post image" width={100} />;
      },
    },
    {
      title: "Status",
      dataIndex: "post_status",
      key: "post_status",
    },
    {
      title: "Date",
      key: "post_date",
      render: (row) => {
        return helperService.convertDateToOurFormat(row?.post_date);
      },
    },
    {
      title: "Updated At",
      key: "updated_at",
      render: (row) => {
        return helperService.convertDateToOurFormat(row?.updated_at);
      },
    },
    {
      title: "Edit",
      render: (row) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              navigate(
                AUTHENTICATED_ROUTES.EDIT_POST.replace(":postId", row?.id)
              )
            }
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      render: (row) => {
        return (
          <Button
            type="primary"
            style={{ background: "red" }}
            onClick={() => deletePostHandler(row?.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {contexHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Posts</h2>
        <Button
          type="primary"
          onClick={() => navigate(AUTHENTICATED_ROUTES.ADD_POST)}
        >
          Add Post
        </Button>
      </div>
      <Table
        dataSource={getPosts?.data?.results}
        columns={columns}
        loading={getPostsLoader || deletePostLoader || getPostFetching}
      />
    </>
  );
}

export default AdminPosts;
