import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Button, Modal } from "antd";
import { toast } from "sonner";
import MSForm from "../Form/MSForm";
import MSSelect from "../Form/MSSelect";
import { useUpdateUserMutation } from "../../redux/Features/Auth/authApi";

const AgentRequest = ({ item, options }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus] = useUpdateUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (data) => {
    const toastId = toast.loading("updating..");
    try {
      const updateData = {
        id: item?.key,
        accountStatus: data?.status,
      };
      const res = await updateStatus(updateData);

      if (res?.data) {
        toast.success("Agent Verified", { id: toastId, duration: 3000 });
        setIsModalOpen(false);
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      toast.error(error, { id: toastId, duration: 3000 });
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
            Update Agent Status
          </h1>
          <div className=" w-[90%] mx-auto">
            <MSForm onSubmit={handleUpdate}>
              <MSSelect
                name={"status"}
                label={"agent status"}
                defaultFieldValue={item?.status}
                items={options}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 mt-[6px] rounded-md py-[6px] text-white font-semibold"
              >
                Update
              </button>
            </MSForm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgentRequest;
