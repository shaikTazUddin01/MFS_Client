import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/money3.jpg";
import login1 from "../../assets/money.png";
import MSForm from "../../components/Form/MSForm";
import MSInput from "../../components/Form/MSInput";
import MSSelect from "../../components/Form/MSSelect";
import { useSignupApiMutation } from "../../redux/Features/Auth/authApi";

const Registration = () => {
  const navigate = useNavigate();
  // create user mutation
  const [createUser] = useSignupApiMutation();
  // handle signup
  const handleSignUp = async (fieldsValue) => {
    const toastId = toast.loading("Loading..");
    try {
      const data = fieldsValue;
      const res = await createUser(data);
      if (res?.data) {
        toast.success("registration success", { id: toastId, duration: 3000 });
        navigate("/login");
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" min-h-screen w-full lg:p-20 bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-white rounded-2xl h-full  grid  grid-cols-1 lg:grid-cols-2 shadow items-center mx-auto overflow-hidden max-w-[1250px]">
        <div className=" h-full">
          <img
            alt="sign image"
            className="hidden lg:flex object-cover w-full h-full"
            src={login1}
          />
        </div>
        <div className="text-center mx-auto w-full lg:w-[90%] p-5 md:p-10 md:min-w-[550px] lg:min-w-[300px]">
          <div className="space-y-1 ">
            <h1 className="text-sky-600 text-3xl lg:text-5xl font-bold">
              Registration
            </h1>
          </div>
          <MSForm onSubmit={handleSignUp}>
            <div className="text-left space-y-2">
              <MSInput
                label="Name"
                name="name"
                required={true}
                type="text"
                variant="bordered"
              />
              <MSInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
              <MSInput
                label="Number"
                name="number"
                required={true}
                type="number"
                variant="bordered"
              />

              <MSInput
                label="Password"
                name="password"
                required={true}
                type="password"
                variant="bordered"
              />
              <MSSelect
                label="Account Type"
                name="accountType"
                required={true}
                items={[{ name: "Agent" }, { name: "User" }]}
                variant="bordered"
              />
              <MSInput
                label="NID"
                name="nid"
                required={true}
                type="text"
                variant="bordered"
              />
              <button
                className="w-full border bg-sky-600 rounded-xl py-[6px] text-white font-semibold hover:bg-sky-700
                "
                type="submit"
              >
                Registration
              </button>
            </div>
          </MSForm>
          <p className="-mt-4">
            I have an accout{" "}
            <a className="text-blue-800 hover:text-blue-700" href={"/login"}>
              LogIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
