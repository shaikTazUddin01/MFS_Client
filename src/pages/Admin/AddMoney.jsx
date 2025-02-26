import { useState } from "react";
import MSForm from "../../components/Form/MSForm";
import MSInput from "../../components/Form/MSInput";
import { useAddMoneyMutation } from "../../redux/Features/Transaction/transactionApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";


const AddMoneyToAgent = () => {
    const admin=useSelector((state)=>state?.auth?.user)


    const [addMoney]=useAddMoneyMutation()

  const handleAddMoney=async(fieldsValue)=>{
  console.log(fieldsValue);
const{amount,number}=fieldsValue
  const toastId = toast.loading("Processing...");

  const data = {
    senderNumber: admin?.number,
    receiverNumber: Number(number),
    transactionType: "AddMoney",
    transactionAmount: Number(amount) ,

  };

  console.log("data-->",data);

  try {
    const res = await addMoney(data);
    const transactionId = res?.data?.data?.transactionId;
    const transactionAmount = res?.data?.data?.transactionAmount;
    const receiverNumber = res?.data?.data?.receiverNumber;

    if (res?.data) {
      toast.success(
        `Add Money Success! \n\n Amount: ${transactionAmount} \n Agent Number: ${receiverNumber} \n Transaction ID: ${transactionId}`,
        {
          id: toastId,
          duration: 4000,
        }
      );
    
    } else {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
    }
  } catch (error) {
    toast.error(error);
  }




  }

  return (
  <div className="max-w-[600px] mx-auto h-[80vh] flex justify-center flex-col">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Add Money To Agent Account</h1>
          </div>
          <div className="mt-4 max-w-[600px] border rounded-[20px] p-5 shadow-lg ">

        
      <MSForm onSubmit={handleAddMoney} >
        <div className="space-y-4">
          <MSInput
            label="Agent Phone Number"
            name="number"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter Agent Phone Number"
            className="rounded-lg"
          />
          <MSInput
            label="Amount (Taka)"
            name="amount"
            required={true}
            type="number"
            variant="bordered"
            placeholder="Enter amount"
            className="rounded-lg"
          />

          <button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            type="submit"
          >
            Add Money
          </button>
        
        </div>
      </MSForm>
      </div>
      </div>
  );
};




export default AddMoneyToAgent;