import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
