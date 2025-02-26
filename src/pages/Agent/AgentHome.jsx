import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/Features/Auth/authApi";
import BalanceInquiry from "../../components/shared/BalanceInquiry";
import RechargeRequest from "../../components/Agent/RechargeRequest";
import { useSendRequestMutation } from "../../redux/Features/rechargeRequest/rechargeRequestApi";
import { toast } from "sonner";
import WithDrawRequest from "../../components/Agent/WithdrawRequest";
import { Spin } from "antd";

const AgentHome = () => {
  const currentUser = useSelector((state) => state.auth.user);

  // get user
  const { data: userData, isLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );
  // send recharge request mutation
  const [rechargeRequest] = useSendRequestMutation();

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
    {
      title: "Withdraw Request",
      icon: "💰",
      balance: userData?.data?.balance,
      agentId:userData?.data?._id
    },
    {
      title: "Cash In",
      icon: "💰",
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
        <Spin size="large" />
      </div>
    );
  }

  const handleRechargeRequest = async () => {
    const agentId = userData?.data?._id;

    const toastId = toast.loading("sending...");
    try {
      const res = await rechargeRequest({ agentId });

      if (res?.data) {
        toast.success(`SuccessFully you send a recharge request`, {
          id: toastId,
          duration: 4000,
        });
        handleOk();
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

      {/* Balance Inquiry */}
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
      {/* withdraw request */}
      {modalContent?.title === "Withdraw Request" && (
        <WithDrawRequest
          modalContent={modalContent}
          modalVisible={modalVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
      {/* recharge request */}
      {modalContent?.title === "Cash In" && (
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
