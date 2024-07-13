import React from "react";
import { useMutation, useQuery } from "react-query";
import { apiBaseUrl } from "../constant";
import { Button, Col, Popconfirm, Row, Table, notification } from "antd";
import scorpioImage from "../scorpio.jpeg";
import { useNavigate, useParams } from "react-router-dom";

function Post() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const postId = useParams();

  const columns = [
    {
      title: "Post Id",
      dataIndex: "id",
    },
    {
      title: "Post Title",
      dataIndex: "post_title",
    },
    {
      title: "Post Date",
      dataIndex: "post_date",
    },
    {
      title: "Post Image",
      render: (singlePost) => {
        if (!singlePost.post_image) {
          return <img src={scorpioImage} width="100" />;
        }
        return <img src={singlePost?.image} width="100" />;
      },
    },
    {
      title: "Post Status",
      dataIndex: "post_status",
    },
    {
      title: "Actions",
      render: (singlePost) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                navigate(`edit-post/${singlePost.id}`);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this post?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deletePostHandler(singlePost.id);
              }}
            >
              <Button
                type="primary"
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  marginLeft: "10px",
                }}
              >
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const {
    data: posts,
    isLoading: postLoader,
    refetch: getPostAgain,
  } = useQuery("posts", () =>
    fetch(`${apiBaseUrl}/posts`).then((res) => res.json())
  );

  const { isLoading: deletePostLoader, mutateAsync: deletePostRequest } =
    useMutation("deletePost", (postId) =>
      fetch(`${apiBaseUrl}/posts/${postId}`, {
        method: "DELETE",
      }).then((res) => res.json())
    );

  const deletePostHandler = (postId) => {
    // console.log(postId);
    deletePostRequest(postId, {
      onSuccess: () => {
        api.info({
          message: `Deleted`,
          description: `${postId} Post is deleted successfully`,
          duration: 2,
        });
        getPostAgain();
      },
    });
  };
  console.log(posts?.results);
  return (
    <div>
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              navigate("/post/create-post");
            }}
          >
            Create Post
          </Button>
        </Col>
      </Row>
      {contextHolder}
      <Table
        loading={postLoader || deletePostLoader}
        dataSource={posts?.results}
        columns={columns}
        // pagination={false}
        rowKey={(singlePost) => singlePost.id}
      />
    </div>
  );
}

export default Post;
