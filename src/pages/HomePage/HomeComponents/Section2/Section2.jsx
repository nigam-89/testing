import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import "./Section2.css";
import { useEffect } from "react";

const Section2 = () => {
  const topStories = useSelector((state) => state?.topStories?.data);
  const metaWeekly = useSelector((state) => state?.metaWeekly?.data);

  const [issue, setIssue] = useState("");
  const [vol, setVol] = useState("");

  useEffect(() => {
    const fullString = metaWeekly[0]?.volumeHeading;
    const volRegex = /\[Vol\. (\d+)\s*–\s*Issue (\d+)\]/;
    const volMatch = fullString?.match(volRegex);
    if (volMatch) {
      const volString = `Vol. ${volMatch[1]}`;
      const issueString = `Issue ${volMatch[2]}`;

      setVol(volString);
      setIssue(issueString);
    }
  }, [metaWeekly]);

  return (
    <div className=" md:px-16 py-3 md:py-6 h-full w-full">
      <div className="h-full w-full p-3 flex flex-col lg:flex-row">
        {/* Top Stories */}
        <div
          className="p-2 flex-1 lg:flex-[70%] lg:border-r-2 lg:border-gray-300"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          <h2 className="font-[Poppins] text-center md:text-start tracking-wider text-3xl font-[600] py-2">
            TOP STORIES
          </h2>

          {topStories &&
            topStories?.length >= 2 &&
            topStories.slice(0, 2).map((item, index) => (
              <Link
                to="/top-stories"
                key={index}
                className="w-full flex gap-x-4 md:mt-8 md:mb-4 my-3 justify-center items-center shadow-xl p-3 rounded-xl hover:shadow-none duration-200 flex-col sm:flex-row"
              >
                <div className="w-[285px] h-[11rem]">
                  <img
                    src={ item.thumbnailId
                      ? item.thumbnailId
                      : item?.imgUrlModelDBId?.urls?.[0]}
                    className="md:h-[130px] md:w-[150px] md:mt-[10px] h-full w-full object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className="sm:flex-1">
                  <h2 className="font-[Poppins] tracking-wide text-xl font-[500] py-1 text-gray-900 md:ml-[-115px]">
                    {item?.heading}
                    {/* style={{'margin-left':"-100px"}} */}
                    {/* <br />
                                        {item?.heading?.slice(60, 100)} */}
                  </h2>

                  <p className="font-[Nunito] tracking-normal font-[500] text-[0.9rem] py-1 text-gray-700 md:ml-[-115px]">
                    {item?.shortDescription}
                    {/* <br />
                                        {item?.shortDescription?.slice(60, 100)} */}
                  </p>

                  <p className="font-[Nunito] tracking-normal font-[500] text-[0.9rem] pt-3 text-gray-500 md:ml-[-115px]">
                    {moment(item.date).format("Do MMM YYYY")}
                  </p>
                  <p className="font-[Nunito] tracking-normal text-blue-600 font-[500] text-[0.9rem] py-1 md:ml-[-115px]">
                    Read More
                  </p>
                </div>
              </Link>
            ))}
        </div>

        {/* Metaweekly */}
        <div
          className="p-2 flex-1 lg:flex-[30%] h-full"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <div className="flex justify-center items-centercmb-3 md:mb-5">
            <div className="h-[2.5rem]">
              <img
                src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1699427105/key_perosn/metaweekly-logo_xhwp4m.webp"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
          </div>

          <Tilt
            className="parallax-effect-glare-scale hidden md:block"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            gyroscope={true}
          >
            <div className="flex justify-center items-center mt-10">
              <div className="shadow-2xl hover:shadow-none duration-200 border-2 p-2 border-[#233c77] rounded-lg w-[15rem] flex flex-col justify-center items-center bg-slate-100">
                <div className="h-[13rem] w-[90%]">
                  <img
                    src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1699427239/key_perosn/Metaweekly_Thumbnail_inugnj.webp"
                    className="h-full w-full object-cover rounded-lg"
                    alt=""
                  />
                </div>

                <h2 className="font-[Poppins] tracking-wider text-xl text-center font-[500] pt-2">
                  {issue}
                </h2>
                <h2 className="font-[Nunito] tracking-normal text-sm text-center font-[500]">
                  {vol}
                </h2>

                <Link
                  to="/reports/metaweekly"
                  className="text-sm mt-4 font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-[#233c77]  hover:text-[#233c77] hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
                >
                  View
                </Link>
              </div>
            </div>
          </Tilt>

          <div className="flex justify-center items-center mt-5 md:hidden">
            <div className="shadow-[0_20px_40px_rgba(8,_112,_184,_0.5)] hover:shadow-none duration-200 border-2 p-2 border-violet-500 rounded-lg w-[15rem] flex flex-col justify-center items-center bg-slate-100">
              <div className="h-[13rem] w-[90%]">
                <img
                  src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1699427239/key_perosn/Metaweekly_Thumbnail_inugnj.webp"
                  className="h-full w-full object-cover rounded-lg"
                  alt=""
                />
              </div>

              <h2 className="font-[Poppins] tracking-wider text-xl text-center font-[500] pt-2">
                {issue}
              </h2>
              <h2 className="font-[Nunito] tracking-normal text-sm text-center font-[500]">
                {vol}
              </h2>

              <Link
                to="/reports/metaweekly"
                className="text-sm mt-4 font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-violet-500  hover:text-violet-500 hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
