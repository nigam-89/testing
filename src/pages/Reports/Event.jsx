import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../../components/global/Footer/Footer";
import Navbar from "../../components/global/Navbar/Navbar";
import UpperNavbar from "../../components/global/UpperNavbar/UpperNavbar";
import { apiConnector } from "../../services/apiConnector";
import { EventWebinarAPI } from "../../services/apis";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Event = () => {
  const [open, setOpen] = React.useState(0);
  const [data, setData] = useState([]);

  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const [allYearsData, setAllYearsData] = useState([]);

  function removeDuplicate(allYearsData) {
    return allYearsData.filter(
      (item, index) => allYearsData.indexOf(item) === index
    );
  }

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 12) => {
      window.scroll(0, 0);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            EventWebinarAPI.ViewEventWebinar_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        });
        setData(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    const fetchAllYears = async (pageNo = 1, pageSize = 10000) => {
      try {
        const res = await apiConnector({
          method: "GET",
          url:
            EventWebinarAPI.ViewEventWebinar_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        });
        let arr = [];

        // Store all years
        res?.data?.data.map((item) => arr.push(item.date.split("-")[0]));
        arr = removeDuplicate(arr);
        setAllYearsData(arr);
      } catch (error) {}
    };

    fetchAllYears();
    getData();
  }, []);

  function handleOpen(value) {
    setOpen(open === value ? 0 : value);
  }

  let allMonths = [
    { month: "January", count: "1" },
    { month: "February", count: "2" },
    { month: "March", count: "3" },
    { month: "April", count: "4" },
    { month: "May", count: "5" },
    { month: "June", count: "6" },
    { month: "July", count: "7" },
    { month: "August", count: "8" },
    { month: "September", count: "9" },
    { month: "October", count: "10" },
    { month: "November", count: "11" },
    { month: "December", count: "12" },
  ];

  const handleFilteredData = async (month, year, pageNo = 1) => {
    try {
      const res = await apiConnector({
        method: "GET",
        url:
          EventWebinarAPI.ViewEventWebinar_API +
          `?pageNo=${pageNo}&dateDescSort=true&date=${year}-${month}-01`,
      });

      if (res?.data?.data.length === 0) {
        setData([]);
        console.log(res?.data?.data);
        return;
      }

      // console.log(res.data);
      let map = new Map();

      // Loop over each object in the array
      for (let obj of res.data.data) {
        // Get the date of the current object
        const date = obj.date;

        // If the map already has an array for this date, push the object to that array
        if (map.has(date)) {
          map.get(date).push(obj);
        }
        // Otherwise, add a new array to the map for this date
        else {
          map.set(date, [obj]);
        }
      }

      // Convert the map values (arrays of objects) to a single array of arrays
      let array = Array.from(map.values());

      setData(...array);
    } catch (error) {
      // console.log(error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <UpperNavbar />
      <Navbar />
      <div className="3xl:w-[1500px] mx-auto">
        <div className="px-3 md:px-32 py-4 md:py-12 ">
          <h2 className="font-[Poppins] text-left pl-4 tracking-wider text-3xl font-[600] pb-5">
            EVENT PROCEEDINGS
          </h2>
          <div className="flex flex-col-reverse justify-between md:flex-row">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-8">
  {data.map((item, index) => (
    <Link to={`/reports/event-webinar/${item._id}`} key={index} className="flex">
      <div className="shadow-2xl rounded-2xl mb-16 pb-2 relative group before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-[#1a3777] to-[#1a3777] before:left-0 before:w-full before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl flex flex-col justify-between">
        <img
          className="object-cover h-[15rem] max-h-[15rem] w-full rounded-lg"
          src={item.imgUrlModelDBId?.urls[0]}
          alt=""
        />
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h5 className="text-black group-hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3 ">
              {item.title}
            </h5>
            <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-800 mb-3 ">
              {moment(item.date).format("Do MMM YYYY")} / REPORTS
            </p>
            {user.hasSubscription || admin.token ? (
              <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-700 mb-4 ">
                {item.shortDescription?.slice(0, 150)}...
              </p>
            ) : (
              <p className="font-[Poppins] group-hover:text-white duration-150 font-semibold text-sm tracking-wide text-gray-700 mb-4 ">
                You are Not Member !!
              </p>
            )}
          </div>
          <button className="bg-gradient-to-r from-[#1a3777] to-[#1a3777] text-white py-2 px-3 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-gray-100 group-hover:text-black duration-150 rounded-lg text-sm font-[Poppins] font-[500] w-auto self-start">
                        Read More...
                      </button>
        </div>
      </div>
    </Link>
  ))}
</div>
            
            <div className="min-w-[15%] flex flex-col py-4 md:py-2 px-8 md:mt-20 h-fit ">
              <h2 className="text-[#243b77] font-semibold font-[Rubik] text-lg">
                Archive
              </h2>
              <div className="flex md:flex-col">
                {allYearsData.length === 0 ? (
                  <h2 className="font-[Rubik] text-sm ">No Data Found</h2>
                ) : (
                  allYearsData.map((yearData, index) => {
                    return (
                      <Accordion open={open === index + 1} key={index}>
                        <AccordionHeader
                          className="mt-2 p-0"
                          onClick={() => handleOpen(index + 1)}
                        >
                          {yearData}
                        </AccordionHeader>
                        <AccordionBody className="m-0 p-0 pl-4">
                          <ul className="mt-0">
                            {allMonths.length > 0 &&
                              allMonths.map((item, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="font-[Rubik] hover:underline cursor-pointer"
                                    onClick={() =>
                                      handleFilteredData(item.count, yearData)
                                    }
                                  >
                                    {item.month}
                                  </li>
                                );
                              })}
                          </ul>
                        </AccordionBody>
                      </Accordion>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;