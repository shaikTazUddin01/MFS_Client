import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";
import SendMoney from "../../../components/User/SendMoney";
import BalanceInquiry from "../../../components/User/BalanceInquiry";

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
      balance: userData?.data?.balance,
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

  const handleSendMoney = async (fieldsValue) => {
    console.log(fieldsValue);
    const { number, amount } = fieldsValue;

    if (amount < 50) {
      toast.error("Minimum send amount is 50 Taka.", { duration: 3000 });
      return;
    }
    const fee = amount > 100 ? 5 : 0;
    const totalAmount = amount + fee;

    console.log(
      "Sending:",
      amount,
      "Taka to",
      number,
      "Fee:",
      fee,
      "Total:",
      totalAmount
    );

    // const toastId = toast.loading("Loading..");
    // try {
    //   const data = fieldsValue;
    //   const res = await sendMoney(data);
    //   if (res?.data) {
    //     toast.success("Money sent successfully", { id: toastId, duration: 3000 });
    //     handleOk();
    //   } else {
    //     toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
        <BalanceInquiry
          balanceVisible={balanceVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          modalContent={modalContent}
          modalVisible={modalVisible}
        />
      )}
      {/* for sent money */}
      {modalContent?.title === "Send Money" && (
        <SendMoney
          modalContent={modalContent}
          modalVisible={modalVisible}
          handleSendMoney={handleSendMoney}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </div>
  );
};

export default Home;
