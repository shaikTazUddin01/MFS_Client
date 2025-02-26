import { useState } from "react";
import { Button, Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import MSForm from "../Form/MSForm";
import MSSelect from "../Form/MSSelect";
import { useWithDrawResponseMutation } from "../../redux/Features/withdrawRequest/withdrawRequest";

const AgentWithdrawRequest = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateRequest] = useWithDrawResponseMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      const updateData = {
        id: item?.key,
        agentId: item?.agentId,
        requestStatus: data?.status,
        amount: item?.amount,
      };

      const res = await updateRequest(updateData);
      console.log(res);

      if (res?.data) {
        toast.success(res?.data?.data, { id: toastId, duration: 3000 });
        setIsModalOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "someThing went wrong", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={showModal}
        className="flex items-center gap-1 rounded-full "
      >
        <span className="text-xl">
          <FaEdit />
        </span>
        Edit
      </Button>
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div>
          <h1 className="text-xl font-semibold text-center mt-2 -mb-2">
            Agent WithDraw Request
          </h1>
          <div className="w-[90%] mx-auto">
            <MSForm onSubmit={handleUpdate}>
              <MSSelect
                name="status"
                label="Agent Status"
                defaultFieldValue={item?.status}
                items={[{ name: "Accept" }, { name: "Reject" }]}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 mt-[6px] rounded-md py-[6px] text-white font-semibold"
              >
                Submit
              </button>
            </MSForm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgentWithdrawRequest;
