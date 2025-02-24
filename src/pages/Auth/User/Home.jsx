import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../../redux/Features/Auth/authApi";
import MyModal from "../../../components/shared/modal"; // Import your reusable modal

const Home = () => {
  const currentUser = useSelector((state) => state?.auth?.user);

  const { data: userData, isLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleBalanceVisibility = () => {
    setBalanceVisible((prev) => !prev);
  };

  const cardData = [
    {
      title: "Balance Inquiry",
      icon: "🔍",
      balance: userData?.data?.balance,
      action: toggleBalanceVisibility,
    },
    {
      title: "Send Money",
      icon: "💸",
    },
    {
      title: "Cash Out",
      icon: "💰",
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

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* for balance enquire */}
      {modalContent?.title === "Balance Inquiry" && (
        <MyModal
          title={modalContent?.title}
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {modalContent?.balance !== undefined && (
            <div className="flex items-center justify-between min-h-[100px]">
              <p className="text-lg font-semibold">
                Your Balance:{" "}
                {balanceVisible ? (
                  <span className="text-green-600">{modalContent.balance}</span>
                ) : (
                  <span className="blur-sm">******</span>
                )}
              </p>
              <button
                onClick={modalContent.action}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                {balanceVisible ? "Hide" : "Show"}
              </button>
            </div>
          )}
          {modalContent?.content && (
            <p className="text-gray-700">{modalContent.content}</p>
          )}
        </MyModal>
      )}
      {/* for sent money */}
      {modalContent?.title === "Send Money" && (
        <MyModal
          title={modalContent?.title}
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
         
        </MyModal>
      )}
    </div>
  );
};

export default Home;
