import { Table } from "antd";
import { useGetUserTransactionQuery } from "../../redux/Features/Transaction/transactionApi";
import { useSelector } from "react-redux";

const AllNotification = () => {
    const user = useSelector((state) => state.auth.user);
 
  
  const { data: transactionData, isLoading } = useGetUserTransactionQuery({
    number:user?.number,
  });

  const transactions = transactionData?.data?.map((transaction) => ({
    key: transaction?.transactionId,
    mobileNumber: `0${user?.number}`,
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
    <div className="max-w-6xl mx-auto my-10">
      

      <h1 className="text-3xl font-semibold text-center mb-5 ">
        All Notifications
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



export default AllNotification;