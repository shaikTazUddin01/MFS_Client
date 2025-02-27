import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/Features/Auth/authApi";
import { Spin } from "antd";
import { useGetTransactionQuery } from "../../redux/Features/Transaction/transactionApi";

const DashBoard = () => {
  const admin = useSelector((state) => state?.auth?.user);
  // get user query
  const { data: adminData, isLoading } = useGetSingleUserQuery(admin?.userId);
  // get all transactions
  const { data: transactions, isLoading: IsTransactionLoading } =
    useGetTransactionQuery();

  console.log(transactions);

  const transactionAmount = transactions?.data?.reduce(
    (acc, curr) => acc + curr?.transactionAmount,
    0
  );

  console.log(transactionAmount);

  if (isLoading || IsTransactionLoading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center text-lg">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 min-h-screen ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-700">
            Account Balance
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-3">
            {adminData?.data?.balance.toFixed(2)}৳
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Your current available balance
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Transactions
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-3">
            {transactionAmount.toFixed(2)}৳
          </p>
          <p className="text-sm text-gray-500 mt-2">Transactions All Time</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Income</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-3">
            {adminData?.data?.income.toFixed(2)}৳
          </p>
          <p className="text-sm text-gray-500 mt-2">Total earnings so far</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
