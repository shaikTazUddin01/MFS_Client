import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const UserLayout = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <Outlet />
      
    </div>
  );
};

export default UserLayout;
