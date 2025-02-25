import { useState } from "react";
import { Table, Dropdown, Menu, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const ManageUser = () => {
  // Mock data
  const [users, setUsers] = useState([
    {
      key: "1",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      userPhone: "123-456-7890",
      NidNumber: "123456789",
      status: "Active",
    },
    {
      key: "2",
      userName: "Jane Smith",
      userEmail: "jane.smith@example.com",
      userPhone: "987-654-3210",
      NidNumber: "987654321",
      status: "Block",
    },
    {
      key: "3",
      userName: "Alice Johnson",
      userEmail: "alice.johnson@example.com",
      userPhone: "555-555-5555",
      NidNumber: "555555555",
      status: "Active",
    },
  ]);

  // Handle status change
  const handleStatusChange = (key, value) => {
    const updatedUsers = users.map((user) => {
      if (user.key === key) {
        return { ...user, status: value };
      }
      return user;
    });
    setUsers(updatedUsers);
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
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Manage Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ManageUser;
