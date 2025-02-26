import { useState } from "react";
import { Table, Dropdown, Menu, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";
import UpdateUser from "../../components/Admin/UpdateUser";
import AgentRequest from "../../components/Admin/AgentRequest";

const { Option } = Select;

const ManageAgentRequest = () => {
  const { data: userData, isLoading } = useGetUserQuery({ role: "Agent",status:"Pending" });
  // Mock data
  const users = userData?.data?.map((user) => ({
    key: user?._id,
    userName: user?.name,
    userEmail: user?.email,
    userPhone: user?.number,
    NidNumber: user?.nid,
    status: user?.accountStatus,
    balance: `${user?.balance}৳`,
  }));

  // Table columns
  const columns = [
    {
      title: "Agent Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Agent Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Agent Phone",
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
      render: (item) => {
        console.log(item);
        return <AgentRequest item={item} />;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-5">Manage Agent Request</h1>
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

export default ManageAgentRequest;
