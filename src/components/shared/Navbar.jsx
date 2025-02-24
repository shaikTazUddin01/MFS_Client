import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";

const Navbar = () => {
  const currentUser = useUser();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Navigation items
  const navItems = (
    <>
      <li>
        <a href="/">Lessons</a>
      </li>
      <li>
        <a href="/tutorials">Tutorials</a>
      </li>
    </>
  );

  const handleLogOut = () => {
    toast.warning("logout", { duration: 3000 });
    setToggle(false);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className=" bg-gray-800 shadow-sm sticky top-0 z-30 text-white">
      <div className=" navbar max-w-7xl mx-auto ">
        <div className="navbar-start">
          {/*  small screen drower */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <button  onClick={showDrawer} className="text-2xl">
              <HiMenuAlt1 />
              </button>
            </div>
            <div>
              <Drawer open={open} placement={"left"} destroyOnClose={false}>
                <span
                  className="flex justify-end text-xl"
                  onClick={() => onClose()}
                >
                  <IoCloseSharp />
                </span>
                <div className="mb-4 text-center">
                  <a
                    href="/"
                    className="font-bold text-2xl cursor-pointer hover:text-blue-600 "
                  >
                    日本語 Learn
                  </a>
                </div>
                <ul className="space-y-2 text-[16px] font-semibold text-center">
                  <li className="bg-slate-200 hover:bg-blue-600 hover:text-white py-1 px-1 rounded">
                    <a href="/">Lessons</a>
                  </li>
                  <li className="bg-slate-200 hover:bg-blue-600 hover:text-white py-1 px-1 rounded">
                    <a href="/tutorials">Tutorials</a>
                  </li>
                  <li className="bg-blue-600 hover:bg-blue-700 py-1 px-1 rounded text-center text-white cursor-pointer"  onClick={() => handleLogOut()}>
                    Log Out
                  </li>
                </ul>
              </Drawer>
            </div>
          </div>
          {/* Brand Name */}
          <a href="/" className="btn btn-ghost text-xl">
            日本語 Learn
          </a>
        </div>

        {/* Navbar Center lergh screen */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[16px]">{navItems}</ul>
        </div>

        {/* Navbar End lergh screen*/}
        <div className="navbar-end relative">
          {currentUser ? (
            <img
              src={currentUser?.image}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <a href="/login" className="btn">
              Login
            </a>
          )}
          {/* toggle */}
          {toggle && (
            <div className=" shadow-xl rounded-md absolute top-10 p-5 z-20 bg-gray-800 text-white border text-center">
              <h1> {currentUser?.name}</h1>
              <h1>{currentUser?.email}</h1>

              <div className="h-[1px] w-full bg-[#a8a8a8] my-1"></div>
              <div className="space-y-1">
                {currentUser?.role == "ADMIN" && (
                  <a href="/admin">
                    <button className="bg-blue-600 px-2 py-[2px] rounded-md text-white w-full">
                      Dashboard
                    </button>
                  </a>
                )}
                <button
                  className="bg-blue-600 px-2 py-[2px] rounded-md text-white w-full"
                  onClick={() => handleLogOut()}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
