import { useState } from "react";
import MSForm from "../Form/MSForm";
import MyModal from "../shared/modal";
import MSInput from "../Form/MSInput";

const SendMoney = ({
  modalContent,
  modalVisible,
  handleOk,
  handleCancel,
  handleSendMoney,
}) => {
  const [selectedBalance, setSelectedBalance] = useState(0);

  return (
    <MyModal
      title={modalContent?.title}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="p-6"
    >
      <MSForm onSubmit={handleSendMoney} className="mt-4">
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
                {modalContent?.balance - selectedBalance}
              </span>
            </h1>
            {selectedBalance > 0 && (
              <p className="text-lg">
                Send amount: {selectedBalance}{" "}
                {selectedBalance > 100 && (
                  <span className="text-green-600 ml-1">(+ 5 tk charged)</span>
                )}
              </p>
            )}
          </div>
          <MSInput
            label="Recipient Phone Number"
            name="number"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter recipient's phone number"
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

export default SendMoney;
