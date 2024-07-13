import { Button, Modal, Table, message } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { UserServices } from "../../services/users.service";
import { render } from "@testing-library/react";
import { helperService } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../../utils/constant";

function AdminUsers() {
  const [messageApi, messageHtml] = message.useMessage();
  const navigate = useNavigate();

  const {
    data: usersData,
    isLoading: userLoader,
    isFetching: userLoaderFetching,
    refetch: reloadUsers,
  } = useQuery("usersData", () => UserServices.getUsers());

  const { mutateAsync: deleteUserRequest, isLoading: deleteUserLoader } =
    useMutation("deleteUser", (userId) => UserServices.deleteUserById(userId));

  const deleteUserHandler = (row) => {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteUserRequest(row?.user_id, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: `User ${row?.user_id} is deleted successfully.`,
            });
            reloadUsers();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Firstname",
      dataIndex: "user_firstname",
      key: "user_firstname",
    },
    {
      title: "Lastname",
      dataIndex: "user_lastname",
      key: "user_lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      // dataIndex: "user_firstname",
      key: "user_firstname",
      render: (row) => {
        if (!row?.user_image) {
          return "Image not found";
        }
        return <img src={row?.user_image} width="80" />;
      },
    },
    {
      title: "Role",
      dataIndex: "user_role",
      key: "user_role",
    },
    {
      title: "Created at",
      render: (row) => {
        return helperService.convertDateToOurFormat(row?.created_at);
      },
    },
    {
      title: "Updated at",
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
                AUTHENTICATED_ROUTES.EDIT_USER.replace(":userId", row?.user_id)
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
            style={{ backgroundColor: "red" }}
            onClick={() => deleteUserHandler(row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      {messageHtml}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Users</h2>
        <Button
          type="primary"
          onClick={() => navigate(AUTHENTICATED_ROUTES.ADD_USER)}
        >
          Add User
        </Button>
      </div>
      <Table
        dataSource={usersData?.data?.results}
        columns={columns}
        loading={userLoader || userLoaderFetching || deleteUserLoader}
      />
      ;
    </div>
  );
}

export default AdminUsers;
