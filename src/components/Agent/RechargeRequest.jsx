import { useState } from "react";
import MSForm from "../Form/MSForm";
import MyModal from "../shared/modal";
import MSInput from "../Form/MSInput";

const RechargeRequest = ({
  modalContent,
  modalVisible,
  handleOk,
  handleCancel,
  handleRechargeRequest,
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
      <MSForm onSubmit={handleRechargeRequest} className="mt-4">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Available balance:{" "}
              <span className="text-green-600">{modalContent?.balance}</span>
            </h1>
            {selectedBalance > 0 && (
              <p className="text-lg">Requested Amount: {selectedBalance} </p>
            )}
          </div>
          <MSInput
            label="Admin Phone Number"
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
            Send Request
          </button>
        </div>
      </MSForm>
    </MyModal>
  );
};

export default RechargeRequest;
