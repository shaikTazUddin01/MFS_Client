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
  return (
    <MyModal
      title={modalContent?.title}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="p-6"
    >
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">
            Available balance:{" "}
            <span className="text-green-600">
              {modalContent?.balance.toFixed(2)}
            </span>
          </h1>

          <p className="text-lg">Requested Amount: ৳1,00,000 </p>
        </div>

        <button
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          onClick={handleRechargeRequest}
        >
          Send Request
        </button>
      </div>
    </MyModal>
  );
};

export default RechargeRequest;
