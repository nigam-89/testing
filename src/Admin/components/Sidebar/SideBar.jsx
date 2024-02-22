import React, { useState } from 'react';
import './Sidebar.css'
import { FaCircleChevronRight, } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../features/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const admin = useSelector((state) => state.admin)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAdmin(null))
        navigate('/en/admin/login-panel')
    }

    const menuItem = [
        {
            path: "/en/admin/welcome",
            name: "Welcome",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/reports-Pdf-manage",
            name: "Report PDF",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/manage-graphs",
            name: "Manage Graphs",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/manage-user",
            name: "Manage Admins",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["superAdmin",],
        },
        {
            path: "/en/admin/all-users",
            name: "Manage Users",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/all-ishops-orders",
            name: "IShops Orders",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/market-news",
            name: "Market News",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279039/Admin/Dashboard/2_bxbdug.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/ports-congestion-&-waiting",
            name: "Ports Congestion & Waiting",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279039/Admin/Dashboard/2_bxbdug.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/contact-page-data",
            name: "Contact Page Data",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279039/Admin/Dashboard/2_bxbdug.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/market-research-data",
            name: "Market Research Data",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279039/Admin/Dashboard/2_bxbdug.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/meta-news",
            name: "Meta News",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/ishops",
            name: "IShops",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/events-and-webinar",
            name: "Events & Webinar",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/manage-events",
            name: "Manage Events",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/meta-weekly",
            name: "MetaWeekly",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/in-media",
            name: "In Media",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/home-page-slider",
            name: "Home Slider & Gallery",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/gov-notification",
            name: "Government Notification",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/subscribed-emails",
            name: "Subscribed Emails",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/manage-career",
            name: "Manage Careers",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/addExistingSubscribersFF",
            name: "Add Subscribers",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
        {
            path: "/en/admin/send-notification-to-all-users",
            name: "Send Notification to users",
            icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
            role: ["admin", "superAdmin", "subAdmin"],
        },
    ]
    return (
        <div className="mainContainer relative manageuser_bg">
            <div style={{ minWidth: isOpen ? "280px" : "50px" }} className="sidebar ">
                <div className={`top_section ${isOpen ? "justify-between" : "justify-center"}`}>
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="font-[Poppins] tracking-wider font-[500] ml-3">Mymetalogic</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaCircleChevronRight className={`text-2xl ${isOpen && "rotate-180"} duration-200`} onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => {
                        return (
                            item?.role?.includes(admin?.role) &&
                            <NavLink to={item.path} key={index} className="link" activeclassname="active">
                                <img className="h-8 w-8" alt="icon-sidebar" src={item.icon} />
                                <div className={`text-sm tracking-wide font-[Nunito] ${isOpen ? "block" : "hidden"}`}>{item.name}</div>
                            </NavLink>
                        )
                    })
                }
                <div className="link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    <img className="h-8 w-8" src={"https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279040/Admin/Dashboard/8_ebaovq.svg"} alt="icon-sidebar" />
                    <div style={{ display: isOpen ? "block" : "none" }} className="text-sm tracking-wide font-[Nunito]">Logout</div>
                </div>
            </div>
            <main>{children}</main>
            <div className="rounded-full fixed p-2 bg-gray-200 border-2 border-gray-400 top-2 right-2 flex justify-center items-center" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                <img className="h-6 w-6" src={"https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279040/Admin/Dashboard/8_ebaovq.svg"} alt="icon-sidebar" />
            </div>
        </div >
    )
}

export default Sidebar