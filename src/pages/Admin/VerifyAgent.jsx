import { Table } from "antd";
import { useGetUserQuery } from "../../redux/Features/Auth/authApi";
import AgentRequest from "../../components/Admin/AgentRequest";
import { useNavigate } from "react-router-dom";

const VerifyAgent = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetUserQuery({
    role: "Agent",
    status: "Verified",
  });

  // agent data
  const users = userData?.data?.map((user) => ({
    key: user?._id,
    agentName: user?.name,
    agentEmail: user?.email,
    agentPhone: `0${String(user?.number)}`,
    NidNumber: user?.nid,
    status: user?.accountStatus,
    balance: `${user?.balance}৳`,
    income: `${user?.income}৳`,
  }));

  // Table columns
  const columns = [
    {
      title: "Agent Name",
      dataIndex: "agentName",
      key: "agentName",
      render: (text, record) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/admin/transactions/${Number(record.agentPhone)}`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Agent Email",
      dataIndex: "agentEmail",
      key: "agentEmail",
    },
    {
      title: "Agent Phone",
      dataIndex: "agentPhone",
      key: "agentPhone",
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
      title: "Income",
      dataIndex: "income",
      key: "income",
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
      render: (item) => (
       <AgentRequest item={item} options={[{ name: "Verified" },{name:"Block"}]}/>
      ),
    },
  ];

  return (
    <div >
      <h1 className="text-3xl font-semibold text-center mb-5">
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

export default VerifyAgent;
