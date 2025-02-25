import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { Button, Modal } from "antd";
import { toast } from "sonner";
import MSForm from "../../Form/MSForm";
import MSSelect from "../../Form/MSSelect";
import { useUpdateUserMutation } from "../../../redux/Features/Auth/authApi";

const UpdateUser = ({ userInFo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateRole] = useUpdateUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (data) => {
    const toastId = toast.loading("Loading..");
    try {
      const updateData = {
        id: userInFo?.key,
        role: data?.role,
      };
      const res = await updateRole(updateData);
      // console.log(res);
      if (res?.data) {
        toast.success("update success", { id: toastId, duration: 3000 });
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
        className="flex items-center gap-1"
      >
        <span className="text-xl">
          <FaUserEdit />
        </span>
        Update
      </Button>
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div>
          <h1 className="text-xl font-semibold text-center mt-2 -mb-2">
            Update User Role
          </h1>
          <div className="shadow-lg w-[90%] mx-auto">
            <MSForm onSubmit={handleUpdate}>
              <MSSelect
                name={"role"}
                label={"Current Role"}
                defaultFieldValue={userInFo?.role}
                items={[{ name: "USER" }, { name: "ADMIN" }]}
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

export default UpdateUser;
