import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./MyLinks";

const NavLinks = ({ navbar }) => {
    const [heading, setHeading] = useState("");

    return (
        <>
            {links.map((link) => (
                <div key={link.name} >
                    <div className="text-left lg:cursor-pointer group normal-case">
                        <h1
                            className={` ${navbar ? "" : "" } font-[Poppins] font-normal flex justify-between items-center lg:pr-0 px-4 py-3 group`}
                            onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                            }}
                        >
                            {link.name}
                            <span className="text-sm lg:hidden inline">
                                <ion-icon
                                    name={`${heading === link.name ? "chevron-up" : "chevron-down"
                                        }`}
                                ></ion-icon>
                            </span>
                            <span className="text-sm lg:mt-1 lg:ml-1  lg:block hidden group-hover:rotate-180 group-hover:-mt-1">
                                <ion-icon name="chevron-down"></ion-icon>
                            </span>
                        </h1>
                        {link.submenu && (
                            <div className="relative">
                                <div className="absolute top--4 z-50 hidden group-hover:lg:block hover:lg:block min-w-[240px] max-w-[240px]">
                                    <div className="py-2">
                                    </div>
                                    <div className="py-2 px-4 bg-[#a4b3d5] rounded-xl translate-y-2 hover:translate-y-0 duration-500">
                                        {link.sublinks.map((mysublinks) => (
                                            <div key={mysublinks.Head} className="w-[90%] mx-auto">
                                                {mysublinks.sublink.map((slink) => (
                                                    <Link
                                                        to={slink.link}
                                                        className=""
                                                        key={slink.name}
                                                    >
                                                        <li className="text-sm text-white mb-2 py-1.5 rounded-xl px-4 bg-[#1a3777]  hover:text-[#1a3777] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center 
                                                        font-[Poppins] tracking-wide" >
                                                            <p className="text-center">{slink.name}</p>
                                                        </li>
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Mobile menus */}
                    <div
                        className={`
            ${heading === link.name ? "lg:hidden" : "hidden"}
          `}
                    >

                        {/* sublinks */}
                        {link.sublinks.map((slinks) => (
                            <div key={slinks.Head}>
                                <div>
                                    <div>
                                        {slinks.sublink.map((slink) => (
                                            <li className="py-2 ml-8 border-b-2 border-gray-500 dark:border-white w-4/5" key={slink.name}>
                                                <Link to={slink.link} className="text-gray-900 dark:text-white" >{slink.name}</Link>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default NavLinks;
