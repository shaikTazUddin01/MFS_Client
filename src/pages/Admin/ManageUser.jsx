import { Input, Table } from "antd";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";
import UpdateUser from "../../components/Admin/UpdateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const { data: userData, isLoading } = useGetUserQuery({ role: "User" });
  const [searchNumber, setSearchNumber] = useState("");
  const navigate = useNavigate();

  const users = userData?.data
    ?.map((user) => ({
      key: user?._id,
      userName: user?.name,
      userEmail: user?.email,
      userPhone: `0${String(user?.number)}`,
      NidNumber: user?.nid,
      status: user?.accountStatus,
      balance: `${user?.balance}৳`,
    }))
    .filter((user) => user.userPhone.includes(searchNumber));

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() =>
            navigate(`/admin/transactions/${Number(record.userPhone)}`)
          }
        >
          {text}
        </span>
      ),
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
      render: (status) => (
        <span
          className={`${
            status === "Active" ? "text-green-600" : "text-red-600"
          } font-semibold`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => <UpdateUser item={item} />,
    },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center mb-3">Manage Users</h1>

      <div className="mb-4 flex justify-end">
        <Input
          placeholder="Filter by Phone Number"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="w-48 border border-[#2423233f] rounded-lg shadow p-2"
          allowClear
        />
      </div>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        className="border rounded-lg overflow-hidden shadow"
      />
    </div>
  );
};

export default ManageUser;
