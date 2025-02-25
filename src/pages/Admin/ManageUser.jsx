import { useState } from "react";
import { Table, Dropdown, Menu, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";

const { Option } = Select;

const ManageUser = () => {

    const {data:userData,isLoading}=useGetUserQuery({role:"User"})
  // Mock data
  const users=userData?.data?.map((user)=>(
      
      {
        key: user?._id,
        userName: user?.name,
        userEmail: user?.email,
        userPhone: user?.number,
        NidNumber: user?.nid,
        status: "Active",
        balance:`৳ ${user?.balance}`,
      }
  ))

   
  ;

  // Handle status change
  const handleStatusChange = (key, value) => {
    const updatedUsers = users.map((user) => {
      if (user.key === key) {
        return { ...user, status: value };
      }
      return user;
    });
    // setUsers(updatedUsers);
  };

  // Table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "NID Number",
      dataIndex: "NidNumber",
      key: "NidNumber",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => (
        <div
          className={`${
            item === "Active" ? "text-green-600" : "text-red-600"
          } font-semibold`}
        >
          {item}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button>
          Actions <DownOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div >
      <h1 className="text-2xl font-semibold text-center mb-5">Manage Users</h1>
      <Table
      loading={isLoading}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ManageUser;
