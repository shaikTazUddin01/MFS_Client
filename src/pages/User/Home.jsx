import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/Features/Auth/authApi";
import SendMoney from "../../components/User/SendMoney";
import CashOut from "../../components/User/CashOut";
import BalanceInquiry from "../../components/shared/BalanceInquiry";
import { useCashOutMutation, useSendMoneyMutation } from "../../redux/Features/Transaction/transactionApi";

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

  // send money mutation
  const [sendMoney] = useSendMoneyMutation();
  const [cashOut] = useCashOutMutation();

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

  // handle send money
  const handleSendMoney = async (fieldsValue) => {
    const { number, amount } = fieldsValue;

    if (amount < 50) {
      toast.error("Minimum send amount is 50 Taka.", { duration: 3000 });
      return;
    }

    if (amount > userData?.data?.balance) {
      toast.error("you don't have enough balance to send this money.", {
        duration: 3000,
      });
      return;
    }
    const fee = Number(amount) > 100 ? 5 : 0;
    const totalAmount = Number(amount) + fee;

    const data = {
      senderNumber: userData?.data?.number,
      receiverNumber: Number(number),
      transactionType: "cashIn",
      transactionAmount: Number(totalAmount),
    };

    const toastId = toast.loading("sending...");
    try {
      const res = await sendMoney(data);

      const transactionId=res?.data?.data?.transactionId
      const transactionAmount=res?.data?.data?.transactionAmount
      const receiverNumber=res?.data?.data?.receiverNumber
      if (res?.data) {
        toast.success(
          ` Transaction Successful! \n\n Amount: ${transactionAmount} \n Sent to: ${receiverNumber} \n Transaction ID: ${transactionId}`,
          {
            id: toastId,
            duration: 4000,
          }
        );
        handleOk();
      
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  // handle cash out
  const handleCashOut = async (fieldsValue) => {
    const { agentNumber, amount, password } = fieldsValue;
    if (amount > userData?.data?.balance) {
      toast.error("you don't have enough balance to cashOut this money.", {
        duration: 3000,
      });
      return;
    }
    const toastId = toast.loading("Loading..");

const charged=Number((amount*1.5)/100)

    const data = {
      senderNumber: userData?.data?.number,
      receiverNumber: Number(agentNumber),
      transactionType: "cashOut",
      transactionAmount: Number(amount)+charged,
      password:password
    };

    try {
      const res = await cashOut(data);
      console.log(res);
      if (res?.data) {
        toast.success("cashOut successfully", { id: toastId, duration: 3000 });
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
      {/* for cash out */}
      {modalContent?.title === "Cash Out" && (
        <CashOut
          modalContent={modalContent}
          modalVisible={modalVisible}
          handleCashOut={handleCashOut}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </div>
  );
};

export default Home;
