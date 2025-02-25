import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/Features/Auth/authApi";
import BalanceInquiry from "../../components/shared/BalanceInquiry";
import RechargeRequest from "../../components/Agent/RechargeRequest";

const AgentHome = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const { data: userData, isLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleBalanceVisibility = () => setBalanceVisible((prev) => !prev);

  const cardData = [
    {
      title: "Balance Inquiry",
      icon: "🔍",
      balance: userData?.data?.balance,
      action: toggleBalanceVisibility,
    },
    {
      title: "Recharge Request",
      icon: "💸",
      balance: userData?.data?.balance,
    },
  ];

  const showModal = (item) => {
    setModalContent(item);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    setBalanceVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setBalanceVisible(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  const handleRechargeRequest = async (fieldsValue) => {
    console.log(fieldsValue);
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => showModal(item)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Content */}
      {modalContent?.title === "Balance Inquiry" && (
        <BalanceInquiry
          balanceVisible={balanceVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          modalContent={modalContent}
          modalVisible={modalVisible}
        />
      )}
      {/* recharge request */}
      {modalContent?.title === "Recharge Request" && (
        <RechargeRequest
          modalContent={modalContent}
          modalVisible={modalVisible}
          handleRechargeRequest={handleRechargeRequest}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </div>
  );
};

export default AgentHome;
