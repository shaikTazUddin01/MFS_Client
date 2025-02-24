import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import ProtectedRouter from "./ProtectedRouter";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Auth/User/Home";

export const router = createBrowserRouter([
  {
    path: "/user",
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
