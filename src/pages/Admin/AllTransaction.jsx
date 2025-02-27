import { Table } from "antd";
import { useGetTransactionQuery } from "../../redux/Features/Transaction/transactionApi";

const AllTransaction = () => {
  const { data, isLoading } = useGetTransactionQuery();

  const transactions = data?.data?.map((transaction) => ({
    key: transaction._id,
    transactionId: transaction.transactionId,
    sender: `0${transaction.senderNumber}`,
    receiver: `0${transaction.receiverNumber}`,
    amount: `${transaction.transactionAmount}৳`,
    type: transaction.transactionType,
    date: new Date(transaction.createdAt).toLocaleString(),
  }));

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Sender Number",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Receiver Number",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const typeColors = {
          cashIn: "text-green-600",
          cashOut: "text-red-600",
        };
        return (
          <span className={`${typeColors[type] || "text-black"} font-semibold`}>
            {type}
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-5">
        All Transactions
      </h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={transactions}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        className="border rounded-[20px] overflow-hidden shadow"
      />
    </div>
  );
};

export default AllTransaction;
