import { Button, Modal, Table, Tag, message } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { commentService } from "../../services/comments.service";
import { helperService } from "../../utils/helper";

function AdminComments() {
  const [messageApi, contextHolder] = message.useMessage();

  // List Comments

  const {
    data: commentsData,
    isLoading: commentLoader,
    refetch: reloadComments,
  } = useQuery("comments", () => commentService.getAllComments());

  console.log(commentsData);

  // Approve Comment

  const { mutateAsync: approveCommentRequest, isLoading: approveLoader } =
    useMutation("approveRequest", (commentId) =>
      commentService.approveComment(commentId)
    );

  // Un Approve Comment

  const { mutateAsync: unapproveCommentRequest, isLoading: unapproveLoader } =
    useMutation("unapproveRequest", (commentId) =>
      commentService.unapproveComment(commentId)
    );

  // Delete Comment

  const { mutateAsync: deleteCommentRequest, isLoading: deleteCommentLoader } =
    useMutation("deleteComment", (commentId) =>
      commentService.deleteComment(commentId)
    );

  // Approve Un Approve Handler

  const approveUnapproveHandler = (indexData, row) => {
    const commentId = row?.comment_id;

    if (indexData === "unapproved") {
      approveCommentRequest(commentId, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Comment Approved Successfully",
          });
          reloadComments();
        },
      });
    } else {
      unapproveCommentRequest(commentId, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Comment Un Approved Successfully",
          });
          reloadComments();
        },
      });
    }
  };

  // Delete Comment Handler

  const deleteCommentHandler = (row) => {
    Modal.confirm({
      title: "Do you want to delete this comment",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteCommentRequest(row?.comment_id, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: `Comment ${row?.comment_id} is deleted Successfuly`,
            });
            reloadComments();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Comment Id",
      dataIndex: "comment_id",
      key: "comment_id",
    },
    {
      title: "User Name",
      dataIndex: ["user", "username"],
      key: "user.username",
    },
    {
      title: "Post Name",
      dataIndex: ["post", "post_title"],
      key: "post.post_title",
    },
    {
      title: "Comment Content",
      dataIndex: "comment_content",
      key: "comment_content",
    },
    {
      title: "Comment Status",
      render: (row) => {
        const statusColor =
          row?.comment_status === "approved" ? "#87d068" : "#f50";
        return (
          <span
            style={{
              color: statusColor,
              fontSize: "18px",
            }}
          >
            {row?.comment_status}
          </span>
        );
      },
      key: "comment_status",
    },
    {
      title: "Created At",
      key: "created_at",
      //   render: (row) => {
      //     return helperService.convertDateToOurFormat(row?.created_at);
      //   },
      dataIndex: "created_at",
      render: (indexData) => {
        return helperService.convertDateToOurFormat(indexData);
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
      title: "Actions",
      key: "Actions",
      dataIndex: "comment_status",
      render: (indexData, rowObject) => {
        return (
          <Tag
            color={indexData === "approved" ? "#f50" : "#87d068"}
            style={{
              padding: "4px",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={() => approveUnapproveHandler(indexData, rowObject)}
          >
            {indexData === "unapproved" ? "Approve" : "Un Approve"}
          </Tag>
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
            style={{
              background: "red",
            }}
            onClick={() => deleteCommentHandler(row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <h2>Comments</h2>
      <Table
        dataSource={commentsData?.data?.results}
        columns={columns}
        loading={
          commentLoader ||
          approveLoader ||
          unapproveLoader ||
          deleteCommentLoader
        }
      />
    </div>
  );
}

export default AdminComments;
