import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Section4 = () => {
  const event = useSelector((state) => state?.event?.data);
  const opinionBox = useSelector((state) => state?.opinionBox?.data);
  return (
    <div className="px-4 md:px-16 py-3 md:py-6 h-full w-full">
      <div className="h-full w-full p-3 flex flex-col xl:flex-row">
        {/* Events */}
        <div className="p-2 flex-[45%] h-full md:mr-8">
          <h2 className="font-[Poppins] tracking-wider text-3xl text-center font-[600] py-2">
            EVENTS
          </h2>

          <div className="flex justify-center items-center flex-col md:flex-row gap-8 mt-5">
            {event &&
              event?.length === 2 &&
              event.slice(0, 2).map((item, index) => (
                <div
                  data-aos="zoom-in"
                  key={index}
                  data-aos-duration="2000"
                  className="h-[25rem] shadow-xl hover:shadow-none duration-200 border-2 p-2 border-[#233c77] rounded-lg sm:w-[60%] w-[100%] md:w-[80%] flex flex-col justify-center items-center group relative before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-[#233c77] to-[#1e45a2] before:left-0 before:w-full before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-lg"
                >
                  <div className="h-[14rem] xl:w-[200px] w-[250px]">
                    <img
                      src={item?.imgUrlModelDBId?.urls[0]}
                      className="h-full w-full object-cover rounded-lg"
                      alt=""
                    />
                  </div>

                  <h2 className="font-[Nunito] tracking-normal group-hover:text-white font-[600] text-sm text-center mt-3">
                    {item?.title}
                  </h2>

                  {/* <h2 className='font-[Poppins] tracking-normal group-hover:text-white font-[600] text-sm text-center mt-3'>
                            {moment(item?.date).format('Do MMM YYYY')}
                            </h2> */}

                  <button
                    type="button"
                    onClick={(e) => window.open(item?.url, "_blank")}
                    className="text-sm mt-4 font-[500]  mb-2 py-1 rounded-xl px-4  border-2 hover:border-[#233c77]  group-hover:text-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Opinion Box */}
        <div className="p-2 flex-[55%] xl:border-l-2 xl:border-gray-300 xl:pl-8">
          <h2 className="font-[Poppins] text-center md:text-start tracking-wider text-3xl font-[600] py-2">
            OPINION BOX
          </h2>

          {opinionBox &&
            opinionBox?.length >= 2 &&
            opinionBox.slice(0, 2).map((item, index) => (
              <Link
                data-aos="zoom-in"
                data-aos-duration="2000"
                to="/opinion-box"
                key={index}
                className="flex gap-x-4  md:mb-4 my-3 justify-center items-center shadow-xl md:mt-4 p-1 rounded-xl hover:shadow-none duration-200 flex-col sm:flex-row lg:h-[12rem]"
              >
                <div className="w-[285px] xl:w-[150px] xl:h-[8rem] h-[11rem]">
                  <img
                    src={item.thumbnailId
                      ? item.thumbnailId
                      : item?.imgUrlModelDBId?.urls?.[0]}
                    className="h-full w-full object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className="sm:flex-1">
                  <h2 className="font-[Poppins] tracking-wide text-xl font-[500] py-1 text-gray-900">
                    {item?.heading}
                    {/* {"-"}<br />
                                        {item?.heading?.slice(40, 80)} */}
                  </h2>

                  <p className="font-[Nunito] tracking-normal font-[500] text-[0.9rem] py-1 text-gray-700">
                    {item?.shortDescription}
                    {/* {"-"}<br />
                                        {item?.shortDescription?.slice(40, 80)} */}
                  </p>

                  <p className="font-[Nunito] tracking-normal font-[500] text-[0.9rem] pt-3 text-gray-500">
                    {moment(item.date).format("Do MMM YYYY")}
                  </p>
                  <p className="font-[Nunito] tracking-normal text-blue-600 font-[500] text-[0.9rem] py-1">
                    Read More
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
