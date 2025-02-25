import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const AgentProtectedRouter = ({ children }) => {
  const userInfo = useSelector((state) => state?.auth);

  if (!userInfo?.user && !userInfo?.token) {
    return <Navigate to="/login" />;
  }
  if ( userInfo?.user?.role == "Agent") {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AgentProtectedRouter;
