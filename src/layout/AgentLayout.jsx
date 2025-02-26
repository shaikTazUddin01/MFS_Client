import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import AgentNavbar from "../components/Agent/AgentNavbar";

const AgentLayout = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <AgentNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AgentLayout;
