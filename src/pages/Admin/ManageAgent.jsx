import { Table, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";

const ManageAgent = () => {
  const { data: userData, isLoading } = useGetUserQuery({
    role: "Agent",
    status: "Verified",
  });
  // agent data
  const users = userData?.data?.map((user) => ({
    key: user?._id,
    userName: user?.name,
    userEmail: user?.email,
    userPhone: `0${String(user?.number)}`,
    NidNumber: user?.nid,
    status: user?.accountStatus,
    balance: `৳ ${user?.balance}`,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => (
        <div
          className={`${item === "Verified" && "text-green-600"} font-semibold`}
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
      <h1 className="text-2xl font-semibold text-center mb-5">
        Verified Agent
      </h1>
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

export default ManageAgent;
