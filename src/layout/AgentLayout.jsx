import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const AgentLayout = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AgentLayout;