import { useParams, useNavigate } from "react-router-dom";
import { useGetUserTransactionQuery } from "../../redux/Features/Transaction/transactionApi";
import { Table, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UserTransaction = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const { data: transactionData, isLoading } = useGetUserTransactionQuery({
    number,
  });

  const transactions = transactionData?.data?.map((transaction) => ({
    key: transaction?.transactionId,
    mobileNumber: `0${number}`,
    transactionId: transaction?.transactionId,
    amount: `${transaction?.transactionAmount}৳`,
    type: transaction?.transactionType,
    date: new Date(transaction?.createdAt).toLocaleString(),
  }));

  const columns = [
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>

      <h1 className="text-3xl font-semibold text-center mb-5">
        User Transactions
      </h1>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={transactions}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        className="border rounded-[20px] overflow-hidden shadow"
      />
    </div>
  );
};

export default UserTransaction;
