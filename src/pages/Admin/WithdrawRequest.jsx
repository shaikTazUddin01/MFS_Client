import { Table } from "antd";
import RechargeRequest from "../../components/Admin/RechargeRequest";
import { useGetWithdrawRequestQuery } from "../../redux/Features/withdrawRequest/withdrawRequest";
import AgentWithdrawRequest from "../../components/Admin/AgentWithdrawRequest";

const WithdrawRequest = () => {
  const { data, isLoading } = useGetWithdrawRequestQuery();

  console.log(data);

  const requests = data?.data?.map((request) => ({
    key: request._id,
    agentId:request?.agentId?._id,
    userName: request?.agentId?.name || "Unknown",
    userEmail: request?.agentId?.email || "N/A",
    amount: request?.amount,
    status: request.status,
  }));

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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
        title: "Action",
        key: "action",
        render: (item) => <AgentWithdrawRequest item={item} />,
      },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-5">WithDraw Requests</h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={requests}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default WithdrawRequest;
