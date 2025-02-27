import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { useGetUserTransactionQuery, useReadNotificationMutation } from "../../redux/Features/Transaction/transactionApi";

const Navbar = () => {
  const currentUser = useUser();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: transactionData, isLoading } = useGetUserTransactionQuery({
    number: user?.number,
  });
const [readNotificationStatus]=useReadNotificationMutation()
  const notifications = transactionData?.data || [];

  const unreadCount = notifications.filter((notif) => notif.isRead===false).length;

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleLogOut = () => {
    toast.warning("logout", { duration: 3000 });
    setToggle(false);
    dispatch(logout());
    navigate("/login");
  };

  const handleNotificationClick = async() => {
    setIsDropdownOpen(!isDropdownOpen);

  await readNotificationStatus({number:user?.number,isRead:true})

  };

  return (
    <div className="bg-gray-800 shadow-sm sticky top-0 z-30 text-white">
      <div className="navbar max-w-7xl mx-auto flex justify-between items-center p-3">
        <div className="flex items-center">
          {/* Small screen drawer */}
          <button onClick={showDrawer} className="lg:hidden text-2xl">
            <HiMenuAlt1 />
          </button>
          <Drawer
            open={open}
            placement="left"
            destroyOnClose={false}
            onClose={onClose}
          >
            <button className="flex justify-end text-xl" onClick={onClose}>
              <IoCloseSharp />
            </button>
            <div className="text-center mb-4">
              <a href="/" className="font-bold text-2xl hover:text-blue-600">
                FinanceFlow
              </a>
            </div>
            <ul className="space-y-2 text-center font-semibold flex flex-col justify-between h-[80vh]">
              <div className="">
                <li>
                  <a href="/agent">Home</a>
                </li>
                <li>
                  <a href="/agent/allNotification">All Notification</a>
                </li>
              </div>
              <li
                className=" bg-blue-600 hover:bg-blue-700 py-1 px-1 rounded cursor-pointer text-white"
                onClick={handleLogOut}
              >
                Log Out
              </li>
            </ul>
          </Drawer>
          <a href="/" className="ml-3 text-xl font-bold">
            FinanceFlow
          </a>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[16px]">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/allNotification">All Notification</a>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="relative flex items-center gap-5">
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={handleNotificationClick} className="relative" >
              <IoNotifications size={25} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-[6px] py-[1px] rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-md rounded-md z-20">
                <div className="p-3 border-b font-bold">Notifications</div>
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notif,idx) => (
                      <li
                        key={idx}
                        className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                      >
                        {`Transaction ID: ${notif.transactionId} - Amount: ${notif.transactionAmount}৳  Type: ${notif.transactionType}`}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-center text-gray-500">
                      No new notifications
                    </li>
                  )}
                </ul>
                <div className="p-2 text-center">
                  <button
                    onClick={() => navigate("/allNotification")}
                    className="text-blue-600 hover:underline"
                  >
                    See All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          {currentUser ? (
            <span
              className="h-9 w-9 rounded-full flex items-center justify-center bg-white text-blue-600 font-bold text-xl cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              {currentUser?.name?.slice(0, 1)}
            </span>
          ) : (
            <a href="/login" className="btn">
              Login
            </a>
          )}

          {/* User Dropdown */}
          {toggle && (
            <div className="shadow-xl rounded-md absolute top-10 right-0 p-5 z-20 bg-gray-800 text-white border text-center">
              <h1>{currentUser?.name}</h1>
              <h1>{currentUser?.email}</h1>
              <div className="h-[1px] w-full bg-[#a8a8a8] my-1"></div>
              <div className="space-y-1">
                {currentUser?.role === "ADMIN" && (
                  <a href="/admin">
                    <button className="bg-blue-600 px-2 py-[2px] rounded-md text-white w-full">
                      Dashboard
                    </button>
                  </a>
                )}
                <button
                  className="bg-blue-600 px-2 py-[2px] rounded-md text-white w-full"
                  onClick={handleLogOut}
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
