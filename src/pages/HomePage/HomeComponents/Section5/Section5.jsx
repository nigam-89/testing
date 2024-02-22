import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Section5.css";
import { GoDotFill } from "react-icons/go";

const Section5 = () => {
  const govtNotification = useSelector(
    (state) => state?.govtNotification?.data
  );

  // console.log(govtNotification)

  const divRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (divRef.current && !isHovered) {
        if (
          divRef.current.scrollTop + divRef.current.clientHeight >=
          divRef.current.scrollHeight
        ) {
          divRef.current.scrollTop = 0;
        } else {
          divRef.current.scrollTop += 1;
        }
      }
    }, 20); // Adjust scroll speed here

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="px-4 md:px-16 py-3 md:py-6 h-full w-full">
      <div className="h-full w-full p-3 flex flex-col xl:flex-row">
        {/* gov noti */}
        <div className="max-md:mb-16 md:mb-0 p-2 flex-[40%] h-full md:pr-8 max-md:grid max-md:place-items-center">
          <h2 className="font-[Poppins] tracking-wider text-3xl text-center font-[600] py-2">
            GOVERNMENT <br />
            <span className="text-xl font-[400] text-gray-800">
              NOTIFICATIONS
            </span>
          </h2>

          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            ref={divRef}
            className="h-[25rem] md:h-[30rem] max-h-[400px] overflow-auto w-[90%] md:w-[100%] mt-6 border-2 border-gray-400 rounded-2xl p-4 gover_noti shadow-2xl duration-200 relative
                        "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="sticky top-[-1rem] left-0 bg-white h-[1rem] w-full"></div>
            {govtNotification &&
              govtNotification?.length > 0 &&
              govtNotification?.map((item, index) => (
                <div key={index} className="w-full py-2">
                  <GoDotFill className="text-[#233c77] text-lg mr-2 inline" />
                  <a
                    className="text-sm font-[500] font-[Poppins] items-center inline  tracking-wide text-gray-900
                                    hover:text-[#233c77] duration-150 hover:underline"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.heading}
                  </a>
                </div>
              ))}
            <div className="bg-white h-[45vh] w-full">
              <img
                src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1701070608/About%20Page/Govt_Notification_yasfmq.webp"
                className="h-full w-full"
                alt=""
              />
            </div>

            <div className="sticky bottom-[-1rem] left-0 bg-white h-[2rem] mb-2 w-full flex justify-center items-center">
              <Link
                to="/gov-notifications"
                className="text-sm font-[500]  py-1 rounded-xl px-4 custom_colors border-2 hover:border-[#233c77]  hover:text-[#233c77] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* report */}
        <div className="flex items-center flex-col md:flex-row flex-[60%] justify-center">
          <div
            className="max-sm:mt-4 md:mt-0 p-2 flex-1 w-full xl:border-l-2 xl:border-gray-300"
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <h2 className="font-[Poppins] flex justify-center items-center text-center md:text-start tracking-wider text-3xl font-[600] py-2">
              REPORT
            </h2>

            <div className="flex justify-center items-center w-full h-full">
              <div
                className="border-2 p-3 border-[#233c77] rounded-xl h-[25rem] md:h-[30rem] sm:w-[60%] w-[100%] md:w-[80%] max-h-[400px] flex flex-col justify-center items-center overflow-hidden shadow-xl hover:shadow-none duration-200 group relative before:absolute before:h-[6px] before:bottom-0 before:bg-[#233c77] before:left-0 before:w-full before:transition-all before:duration-500 hover:before:h-[100%] before:-z-10 before:rounded-xl
                        "
              >
                <img
                  src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700211081/key_perosn/report_cover_sfwbwc.webp"
                  className="h-[18rem] xl:w-[auto] w-[auto] rounded-md"
                  alt=""
                />

                <Link
                  to="/reports/events-webinar"
                  className="text-sm mt-2 font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-[#233c77]  hover:text-[#233c77] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          <div
            className="p-2 flex-1 w-full xl:border-l-2 xl:border-gray-300 "
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <h2 className="font-[Poppins] flex justify-center items-center text-center md:text-start tracking-wider text-3xl font-[600] py-2">
              iSHOP
            </h2>

            <div className="flex justify-center items-center w-full h-full ">
              <div className="border-2 p-3 border-[#233c77] rounded-xl h-[25rem] md:h-[30rem] sm:w-[60%] w-[100%] md:w-[80%] max-h-[400px] flex flex-col justify-center items-center overflow-hidden shadow-xl hover:shadow-none duration-200 group relative before:absolute before:h-[6px] before:bottom-0 before:bg-[#233c77] before:left-0 before:w-full before:transition-all before:duration-500 hover:before:h-[100%] before:-z-10 before:rounded-xl">
                <img
                  src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700213779/key_perosn/iSHOP_ihkqiq.webp"
                  className="h-[18rem] xl:w-[auto] w-[auto] rounded-md"
                  alt=""
                />

                <Link
                  to="/ishop"
                  className="text-sm mt-2 font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-[#233c77]  hover:text-[#233c77] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
                >
                  Visit Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
