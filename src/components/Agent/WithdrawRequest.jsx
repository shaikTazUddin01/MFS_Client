import { useState } from "react";
import MSForm from "../Form/MSForm";
import MyModal from "../shared/modal";
import MSInput from "../Form/MSInput";
import { toast } from "sonner";
import { useSendWithdrawRequestMutation } from "../../redux/Features/withdrawRequest/withdrawRequest";

const WithDrawRequest = ({
  modalContent,
  modalVisible,
  handleOk,
  handleCancel,
}) => {
  const [selectedBalance, setSelectedBalance] = useState(0);
  const [sendWithDrawRequest] = useSendWithdrawRequestMutation();

  const handleWithDrawRequest = async (fieldValues) => {
    const { amount } = fieldValues;
    if (amount > modalContent?.balance) {
      toast.error("you don't have enough balance to Withdraw this money.", {
        duration: 3000,
      });
      return;
    }
    const data = {
      agentId: modalContent?.agentId,
      amount: amount,
    };
    const toastId = toast.loading("sending...");
    try {
      const res = await sendWithDrawRequest(data);
      if (res?.data) {
        toast.success(`SuccessFully you send a withdraw request`, {
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
    <MyModal
      title={modalContent?.title}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="p-6"
    >
      <MSForm onSubmit={handleWithDrawRequest} className="mt-4">
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
                {(modalContent?.balance - selectedBalance).toFixed(2)}
              </span>
            </h1>
            {selectedBalance > 0 && (
              <p className="text-lg">Cash Out Amount: {selectedBalance} </p>
            )}
          </div>

          <MSInput
            label="Request Amount (Taka)"
            name="amount"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter Amount"
            onChange={(e) => setSelectedBalance(parseInt(e.target.value) || 0)}
            className="rounded-lg"
          />

          <button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            type="submit"
          >
            Send WithDraw Request
          </button>
        </div>
      </MSForm>
    </MyModal>
  );
};

export default WithDrawRequest;
