import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/money3.jpg";
import login1 from "../../assets/money.png";
import MSForm from "../../components/Form/MSForm";
import MSInput from "../../components/Form/MSInput";
import { toast } from "sonner";
import { useLoginApiMutation } from "../../redux/Features/Auth/authApi";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { authInfo } from "../../redux/Features/Auth/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginApiMutation();
  const [defaultUserInfo, setDefaultUserInfo] = useState({});

  const DemoUserInFo = () => {
    setDefaultUserInfo({
      email: "taz@gmail.com",
      password: "123456",
    });
  };
  const DemoAdminInFo = () => {
    setDefaultUserInfo({
      email: "tihan@gmail.com",
      password: "123456",
    });
  };
  // dispatch
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    const toastId = toast.loading("Loading..");
    try {
      const res = await login(data);
      // console.log(res);
      if (res?.data) {
        // set and decode data
        const token = res?.data?.data;
        const userInfo = jwtDecode(token);
        // dispatch user
        dispatch(authInfo({ data: userInfo, token: token }));

        toast.success("login success", { id: toastId, duration: 3000 });
        // console.log("--->",userInfo);
        if (userInfo?.role == "USER") {
          navigate("/");
        } else if (userInfo?.role == "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      toast.error(error, { id: toastId, duration: 3000 });
    }
  };
  
  return (
    <div
      className=" min-h-screen w-full lg:p-20 bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-white rounded-2xl h-full grid grid-cols-1 lg:grid-cols-2 shadow items-center mx-auto overflow-hidden">
        <div className="">
          <img
            alt="login image"
            className="hidden lg:flex object-cover w-full h-full"
            src={login1}
          />
        </div>
        <div className="text-center mx-auto w-full lg:w-[80%] p-10">
          <div className="space-y-1 ">
            <h1 className="text-sky-600 text-3xl lg:text-5xl font-bold ">
              Wellcome
            </h1>

            <div className="flex gap-2 justify-center">
              <button
                className="bg-blue-600 rounded-md px-2 text-white font-semibold"
                onClick={() => DemoUserInFo()}
              >
                Demo User
              </button>
              <button
                className="bg-blue-600 rounded-md px-2 text-white font-semibold"
                onClick={() => DemoAdminInFo()}
              >
                Demo Admin
              </button>
            </div>
          </div>
          <MSForm onSubmit={handleLogin} defaultValues={defaultUserInfo}>
            <div className="space-y-2 text-left">
              <MSInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
              <MSInput
                label="Password"
                name="password"
                required={true}
                type="password"
                variant="bordered"
              />

              <button
                className="w-full border bg-sky-600 rounded-xl py-[7px] text-white font-semibold hover:bg-sky-700
              "
                type="submit"
              >
                Login
              </button>
            </div>
          </MSForm>
          <p>
            I Don&#39;t have an accout.?{" "}
            <a
              className="text-blue-800 hover:text-blue-700"
              href={"/registration"}
            >
              Registration
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
