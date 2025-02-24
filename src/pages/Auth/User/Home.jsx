import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../../redux/Features/Auth/authApi";
import MyModal from "../../../components/shared/modal"; 
import MSForm from "../../../components/Form/MSForm";
import MSInput from "../../../components/Form/MSInput";
import { toast } from "sonner";

const Home = () => {
  const currentUser = useSelector((state) => state?.auth?.user);

  const { data: userData, isLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedBalance, setSelectedBalance] = useState(0);

  console.log(selectedBalance);

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
            <p className="text-gray-700">
              {modalContent.content - selectedBalance}
            </p>
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
          <MSForm onSubmit={handleSendMoney}>
            <div className="space-y-2 text-left">
              <h1 className="text-center text-lg font-medium">
                Avaliable balance :{" "}
                <span
                  className={`${
                    modalContent?.balance > selectedBalance
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {modalContent?.balance - selectedBalance}
                </span>
              </h1>
              <MSInput
                label="User Phone Number"
                name="number"
                required={true}
                type="number"
                variant="bordered"
                placeholder="Enter recipient's phone number"
              />
              <MSInput
                label="Amount (Taka)"
                name="amount"
                required={true}
                type="number"
                variant="bordered"
                placeholder="Enter amount"
                onChange={(e) => setSelectedBalance(e.target.value)}
              />

              <button
                className="w-full border bg-sky-600 rounded-xl py-[8px] text-white font-semibold hover:bg-sky-700
              "
                type="submit"
              >
                Send
              </button>
            </div>
          </MSForm>
        </MyModal>
      )}
    </div>
  );
};

export default Home;
