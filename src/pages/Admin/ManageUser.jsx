import { Table } from "antd";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";
import UpdateUser from "../../components/Admin/UpdateUser";

const ManageUser = () => {
  const { data: userData, isLoading } = useGetUserQuery({ role: "User" });
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
      render: (item) => {
        console.log(item);
        return <UpdateUser item={item} />;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-5">Manage Users</h1>
      <Table
        loading={isLoading}
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
