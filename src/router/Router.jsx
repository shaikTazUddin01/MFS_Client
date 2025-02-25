import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import ProtectedRouter from "./ProtectedRouter";
import UserLayout from "../layout/UserLayout";
import AgentProtectedRouter from "../layout/AgentLayout";
import AgentLayout from "../layout/AgentLayout";
import AgentHome from "../pages/Agent/AgentHome";
import Home from "../pages/User/Home";
import AdminProtectedRouter from "./AdminProtectedRouter";
import AdminLayout from "../layout/AdminLayout";
import DashBoard from "../pages/Admin/DashBoard";
import ManageAgent from "../pages/Admin/ManageAgent";
import ManageUser from "../pages/Admin/ManageUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <UserLayout />
      </ProtectedRouter>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/agent",
    element: (
      <AgentProtectedRouter>
        <AgentLayout />
      </AgentProtectedRouter>
    ),
    children: [
      {
        path: "",
        element: <AgentHome />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRouter>
        <AdminLayout />
      </AdminProtectedRouter>
    ),
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "manageAgent",
        element: <ManageAgent />,
      },
      {
        path: "manageUser",
        element: <ManageUser />,
      },
    ],
  },
  // auth pages
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);
