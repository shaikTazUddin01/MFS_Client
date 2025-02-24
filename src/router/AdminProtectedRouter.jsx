/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRouter = ({ children }) => {
  const userInfo = useSelector((state) => state?.auth);

//   console.log(userInfo);

  //   const user = undefined;
  if (!userInfo?.user && !userInfo?.token) {
    return <Navigate to="/login" />;
  }
  if ( userInfo?.user?.role == "ADMIN") {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtectedRouter;
