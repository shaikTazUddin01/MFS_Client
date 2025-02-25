import { useState } from "react";
import MSForm from "../Form/MSForm";
import MyModal from "../shared/modal";
import MSInput from "../Form/MSInput";

const CashOut = ({
  modalContent,
  modalVisible,
  handleOk,
  handleCancel,
  handleCashOut,
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
      <MSForm onSubmit={handleCashOut} className="mt-4">
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
                Cash Out Amount: {selectedBalance}{" "}
                {selectedBalance && (
                  <span className="text-green-600 ml-1">
                    (+ {((selectedBalance * 1.5) / 100).toFixed(2)} tk charged)
                  </span>
                )}
              </p>
            )}
          </div>
          <MSInput
            label="Agent Account Number"
            name="agentNumber"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter Agent Account Number"
            className="rounded-lg"
          />
          <MSInput
            label="Amount (Taka)"
            name="amount"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter Amount"
            onChange={(e) => setSelectedBalance(parseInt(e.target.value) || 0)}
            className="rounded-lg"
          />
          <MSInput
            label="Enter You PIN"
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

export default CashOut;
