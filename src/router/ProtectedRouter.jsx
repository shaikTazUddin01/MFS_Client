import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const userInfo = useSelector((state) => state?.auth);

  if (!userInfo?.user && !userInfo?.token) {
    return <Navigate to="/login" />;
  }
  if (userInfo?.user?.role == "User") {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
