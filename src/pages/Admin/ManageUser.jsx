import { Input, Table } from "antd";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";
import UpdateUser from "../../components/Admin/UpdateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const { data: userData, isLoading } = useGetUserQuery({ role: "User" });
  const [searchNumber, setSearchNumber] = useState("");
 
  const navigate = useNavigate();
  // user data
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
  .filter((user) => user.userPhone.includes(searchNumber))

  // Table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text,record) =>{
        const number=Number(record.userPhone)
        return(
        <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate(`/admin/transactions/${number}`)}
      >
        {text}
      </span>
      )}
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
      render: (item) => {
        return <UpdateUser item={item} />;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-5">Manage Users</h1>
      <div className="mb-4 flex justify-end items-center gap-2">
       
        <Input
          placeholder="Filter by Phone Number"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="w-48 border rounded-lg shadow p-2"
          allowClear
        />
      </div>
      <Table
        loading={isLoading }
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
         className="border rounded-[20px] overflow-hidden shadow"
      />
    </div>
  );
};

export default ManageUser;
