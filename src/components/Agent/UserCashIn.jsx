import { useState } from "react";
import { toast } from "sonner";
import MSForm from "../Form/MSForm";
import MyModal from "../shared/modal";
import MSInput from "../Form/MSInput";
import { useCashInMutation } from "../../redux/Features/Transaction/transactionApi";

const UserCashIn = ({ modalContent, modalVisible, handleOk, handleCancel }) => {
  const [selectedBalance, setSelectedBalance] = useState(0);

  const [cashIn]=useCashInMutation()

  const handleCashIn = async (fieldsValue) => {
    const { number, amount, password } = fieldsValue;

    if (amount > modalContent?.balance) {
      toast.error("you don't have enough balance to cashOut this money.", {
        duration: 3000,
      });
      return;
    }
    const toastId = toast.loading("Processing...");

    const data = {
      senderNumber: modalContent?.phoneNumber,
      receiverNumber: number,
      transactionType: "cashIn",
      transactionAmount: Number(amount) ,
      password: password,
    };

    
    try {
      const res = await cashIn(data);
      const transactionId = res?.data?.data?.transactionId;
      const transactionAmount = res?.data?.data?.transactionAmount;
      const receiverNumber = res?.data?.data?.receiverNumber;

      if (res?.data) {
        toast.success(
          ` Cash in Successful! \n\n Amount: ${transactionAmount} \n User Number: ${receiverNumber} \n Transaction ID: ${transactionId}`,
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

  return (
    <MyModal
      title={modalContent?.title}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="p-6"
    >
      <MSForm onSubmit={handleCashIn} className="mt-4">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Available balance:{" "}
              <span
                className={`${
                  modalContent?.balance > selectedBalance
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {modalContent?.balance.toFixed(2)}
              </span>
            </h1>
            {selectedBalance > 0 && (
              <p className="text-lg">Send amount: {selectedBalance} </p>
            )}
          </div>
          <MSInput
            label="User Phone Number"
            name="number"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter User's phone number"
            className="rounded-lg"
          />
          <MSInput
            label="Amount (Taka)"
            name="amount"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter amount"
            onChange={(e) => setSelectedBalance(parseInt(e.target.value) || 0)}
            className="rounded-lg"
          />
          <MSInput
            label="Enter Your PIN"
            name="password"
            required={true}
            type="text"
            variant="bordered"
            placeholder="Enter Your PIN"
            className="rounded-lg"
          />
          <button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            type="submit"
          >
            Send Money
          </button>
        </div>
      </MSForm>
    </MyModal>
  );
};

export default UserCashIn;
