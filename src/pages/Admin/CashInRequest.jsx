import { Table, Tag } from "antd";
import { useGetRequestQuery } from "../../redux/Features/rechargeRequest/rechargeRequestApi";
import RechargeRequest from "../../components/Admin/RechargeRequest";

const CashInRequest = () => {
  const { data, isLoading } = useGetRequestQuery();

  const requests = data?.data?.map((request) => ({
    key: request._id,
    agentId:request?.agentId?._id,
    userName: request?.agentId?.name || "Unknown",
    userEmail: request?.agentId?.email || "N/A",
    amount: `100000 ৳`,
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
        render: (item) => <RechargeRequest item={item} />,
      },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-5">Cash-In Requests</h1>
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

export default CashInRequest;
