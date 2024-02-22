import React from "react";
import "./UpperNavbar.css";
// import Switcher from '../../../utils/DarkMode/Switcher';
import { FaUsersLine } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/UserSlice";
import Search from "./../../Search/Search";

const UpperNavbar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(null));
    navigate("/sign-in");
  };

  return (
    <div className="w-full flex items-center justify-between text-gray-900  px-3 md:px-24 py-2 md:py-2">
      <div className="gap-x-3 md:gap-x-6 items-center justify-between transition-colors duration-300 font-[500] font-[Roboto] tracking-[0.15rem] flex ">
        {!user?._id && (
          <Link
            to="/subscribed"
            className="text-sm font-[500]  mb-2 py-2 rounded-xl px-4 custom_colors border-2 hover:border-[#1a3777]  hover:text-[#1a3777] hover:bg-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide flex"
          >
            MEMBERSHIP <FaUsersLine className="ml-2 text-xl" />
          </Link>
        )}

        {user._id ? (
          <>
            <Link
              to="/subscribed"
              className="text-sm font-[500]  mb-2 py-2 rounded-xl px-4 custom_colors border-2 hover:border-[#1a3777]  hover:text-[#1a3777] hover:bg-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide hidden md:flex"
            >
              MEMBERSHIP <FaUsersLine className="ml-2 text-xl" />
            </Link>

            <Link
              to="/dashboard/profile"
              className="text-sm font-[500] bg-white mb-2 py-2 rounded-xl px-4 text-[#1a3777] border-2 border-[#1a3777]  hover:bg-[#1a3777] hover:text-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide "
            >
              DASHBOARD
            </Link>

            <div
              onClick={handleLogout}
              className="cursor-pointer text-sm font-[500] mb-2 border-[#1a3777] py-1 rounded-xl px-2 border-2 hover:bg-[#1a3777] text-[#1a3777]   hover:text-white transition-all duration-300 ease-in-out  justify-center items-center font-[Poppins] tracking-wide hidden md:flex"
            >
              LOGOUT <MdOutlineLogin className="ml-2 text-lg" />
            </div>
          </>
        ) : (
          <Link
            to="/sign-in"
            className="text-sm font-[500] bg-white mb-2 py-2 rounded-xl px-4 text-[#1a3777] border-2 border-[#1a3777]  hover:bg-[#1a3777] hover:text-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide hidden md:flex"
          >
            SIGN IN <MdOutlineLogin className="ml-2 text-xl animate-bounce" />
          </Link>
        )}
      </div>
      <div>
        <center className="flex gap-x-4 justify-center items-center transition-all duration-300">
          <Search />
          {/* <SearchComponent /> */}

          <div className="mr-6">
            <Link
              to="/ishop"
              className="text-sm font-[500]  mb-2 py-2 rounded-xl px-4 bg-[#1a3777] text-white border-2 hover:border-[#1a3777]  hover:text-[#1a3777] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide "
            >
              iSHOP <CiShop className="ml-2 text-xl animate-bounce" />
            </Link>
          </div>

          {/* <BsCartFill className='text-[#1a3777] dark:text-white' /> */}
          {/* <Switcher /> */}
        </center>
      </div>
    </div>
  );
};

export default UpperNavbar;
