import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'
import NavLinks from "./NavLinks";
import { FaUsersLine } from 'react-icons/fa6'
import { MdOutlineLogin } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/UserSlice";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser(null))
        navigate('/sign-in')
    }

    const [navbar, setNavbar] = useState(false)
    const changeBackground = () => {
        // console.log(window.scrollY)
        if (window.scrollY >= 100) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    })

    return (
        <nav className={`${navbar ? "" : ""} duration-500 bg-gray-200  w-full z-10 transition-all ease-in-out `}>
            <div className="flex items-center font-medium justify-between  px-3 lg:px-24">
                <div className="lg:w-auto w-full flex justify-between h-full items-center">
                   { 
                    user?.hasSubscription ? 
                            <Link to='/' className=" m-1" ><img src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1699525490/key_perosn/Metalogic_Logo_plus_lw60ej.png" alt="logo" className="md:cursor-pointer w-20 md:w-24" /></Link>
                    : 
                    <Link to='/' className=" m-1" ><img src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png" alt="logo" className="md:cursor-pointer w-20 md:w-24" /></Link>
                   }
                    <div className="text-3xl lg:hidden " onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                    </div>
                </div>
                <ul className="lg:flex hidden items-center gap-6 ">
                    <li>
                        <Link to="/all-graphs" className={`${navbar ? "" : ``} inline-block  font-[Poppins] font-normal  `}>
                            Graphs
                        </Link>
                    </li>
                    <li>
                        <Link to="/market-research" className={`${navbar ? "" : ``} inline-block  font-[Poppins] font-normal  `}>
                            Research
                        </Link>
                    </li>
                    <NavLinks />
                    <li>
                        <a href="https://metalogicpms.com/" target="_blank" rel="noreferrer" className={`${navbar ? "" : ``} inline-block  font-[Poppins] font-normal  `}>
                            Events
                        </a>
                    </li>
                    <li>
                        <Link to="/about" className={`${navbar ? "" : ``} inline-block  font-[Poppins] font-normal  `}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`${navbar ? "" : ``} inline-block  font-[Poppins] font-normal  `}>
                            Contact
                        </Link>
                    </li>
                </ul>
                {/* Mobile nav */}
                <ul
                    className={`
        lg:hidden z-[999]  fixed w-4/5 bg-gray-100 top-0 overflow-y-auto bottom-0 py-4
        duration-500 ${open ? "left-0" : "left-[-100%]"} bg-gray-200`}
                >
                    <li className="flex justify-center items-center pb-1 dark:border-b-2 ">
                        <Link to='/' className="dark:rounded-full  m-1" >
                            <img src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png" alt="logo" className="md:cursor-pointer w-20 md:w-24" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-graphs" className="px-4 py-3 inline-block font-[Poppins] font-normal">
                            Graphs
                        </Link>
                    </li>
                    <li>
                        <Link to="/market-research" className="px-4 py-3 inline-block font-[Poppins] font-normal">
                            Research
                        </Link>
                    </li>
                    <NavLinks />
                    <li>
                        <a href="https://metalogicpms.com/" target="_blank" rel="noreferrer" className="px-4 py-3 inline-block font-[Poppins] font-normal">
                            Events
                        </a>
                    </li>
                    <li>
                        <Link to="/about" className="px-4 py-3 inline-block font-[Poppins] font-normal">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="px-4 py-3 inline-block font-[Poppins] font-normal">
                            Contact
                        </Link>
                    </li>

                    <li className="px-4 py-3">
                        <div className='gap-y-3 items-center justify-between transition-colors duration-300 font-[500] font-[Roboto] tracking-[0.15rem] flex flex-col '>


                            <Link to='/subscribed' className="text-sm font-[500] text-white mb-2 py-2 rounded-xl px-4 bg-[#1a3777] border-2 hover:border-[#1a3777]  hover:text-[#1a3777] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide " >
                                MEMBERSHIP <FaUsersLine className="ml-2 text-xl animate-pulse" />
                            </Link>

                            {
                                user._id
                                    ?
                                    <div onClick={handleLogout} className="cursor-pointer text-sm font-[500] mb-2 border-[#1a3777] py-1 rounded-xl px-2 border-2 hover:bg-[#1a3777] text-[#1a3777]   hover:text-white transition-all duration-300 ease-in-out  justify-center items-center font-[Poppins] tracking-wide flex" >
                                        LOGOUT <MdOutlineLogin className="ml-2 text-lg" />
                                    </div>
                                    :
                                    <Link to='/sign-in' className="text-sm font-[500] bg-white mb-2 py-2 rounded-xl px-4 text-[#1a3777] border-2 border-[#1a3777]  hover:bg-[#1a3777] hover:text-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide flex " >
                                        SIGN IN  <MdOutlineLogin className="ml-2 text-xl animate-bounce" />
                                    </Link>
                            }

                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
