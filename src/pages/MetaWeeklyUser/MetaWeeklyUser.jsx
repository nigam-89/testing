import React from "react";
import Navbar from "../../components/global/Navbar/Navbar";
import UpperNavbar from "../../components/global/UpperNavbar/UpperNavbar";
import Footer from "./../../components/global/Footer/Footer";
import moment from "moment";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import Loader from "../../components/Loader/Loader";
import { apiConnector } from "../../services/apiConnector";
import { MetaWeeklyAPI } from "../../services/apis";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const MetaWeeklyUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [count, setCount] = useState(0);
  const [formula, setFormula] = useState(0);
  const [open, setOpen] = React.useState(0);

  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const [allYearsData, setAllYearsData] = useState([]);

  useEffect(() => {
    setFormula(count - (pageNo - 1) * 10);
  }, [count, pageNo]);

  function removeDuplicate(allYearsData) {
    return allYearsData.filter(
      (item, index) => allYearsData.indexOf(item) === index
    );
  }

  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          MetaWeeklyAPI.ViewMeta_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
      });
      // console.log(response.data);
      setData(response.data.data);
      setCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 10) => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            MetaWeeklyAPI.ViewMeta_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        });
        // console.log(response.data);
        setData(response.data.data);
        setCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    };

    const fetchAllYears = async (pageNo = 1, pageSize = 10000) => {
      try {
        const res = await apiConnector({
          method: "GET",
          url:
            MetaWeeklyAPI.ViewMeta_API +
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

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo((pageNo = pageNo + 1));
      getData(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo((pageNo = pageNo - 1));
      getData(pageNo);
    }
  };

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

  return (
    <div>
      <UpperNavbar />
      <Navbar />
      <div className="3xl:w-[1500px] mx-auto">
        <div className="w-full min-h-screen relative py-5">
          <div className="flex justify-left items-center md:pl-[8rem] mb-3 md:mb-5">
            <div className="h-[2.5rem]">
              <img
                src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1699427105/key_perosn/metaweekly-logo_xhwp4m.webp"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between md:flex-row">
            {loading ? (
              <>
                <div className="w-full flex items-center justify-center my-20">
                  {" "}
                  <Loader width={"100"} color="black" height={"80"} />{" "}
                </div>
              </>
            ) : (
              <div className="border-2 border-gray-400 mx-4 md:mx-32 p-4 rounded-xl w-full">
                <div className="bg-white rounded-xl">
                  <TableContainer>
                    <Table variant="striped">
                      <Thead>
                        <Tr>
                          <Th>NO.</Th>
                          <Th>DATE</Th>
                          <Th>NAME</Th>
                          <Th>DOWNLOAD LINK</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data.length > 0 &&
                          data?.map((item, index) => {
                            return (
                              <Tr
                                className={`${
                                  index % 2 === 0
                                    ? "text-black"
                                    : "text-white bg-[#1a3777]"
                                }`}
                                key={index}
                              >
                                <Td>
                                  <p className="font-[Poppins] text-sm text-[700]  tracking-wide">
                                    {formula - index}
                                  </p>
                                </Td>
                                <Td>
                                  <p className="font-[Poppins] text-sm text-[500]  tracking-wide">
                                    {/* {moment(item.date).format('Do MMM YYYY')} */}
                                    {moment(item.date).format("D MMM YYYY")}
                                  </p>
                                </Td>
                                <Td>
                                  <p className="font-[Poppins] text-sm text-[500] tracking-wide">
                                    {item.volumeHeading}
                                  </p>
                                </Td>
                                <Td>
                                  <Button colorScheme="facebook" size="sm">
                                    {user.hasSubscription || admin.token ? (
                                      <a
                                        href={item.pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <p className="font-[Poppins] font-[400] flex justify-center items-center">
                                          Download
                                        </p>
                                      </a>
                                    ) : (
                                      <Link to={"/subscribed"} rel="noreferrer">
                                        <p
                                          onClick={() => {
                                            toast((t) => (
                                              <span className="bg-red-500 text-white rounded-xl h-full w-full px-3 py-2 font-[Poppins] tracking-wider font-[500] text-sm">
                                                Become a Member to get Access
                                              </span>
                                            ));
                                          }}
                                          className="font-[Poppins] font-[400] flex justify-center   items-center"
                                        >
                                          Download
                                        </p>
                                      </Link>
                                    )}
                                  </Button>
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}
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
                                  // <li key={index} className='font-[Rubik] hover:underline cursor-pointer' onClick={() => handleFilteredData(item.count, yearData)}>{item.month}</li>
                                  <Link
                                    to={`/metaweekly-month/${item.count}-${yearData}`}
                                  >
                                    <li
                                      key={index}
                                      className="font-[Rubik] hover:underline cursor-pointer"
                                    >
                                      {item.month}
                                    </li>
                                  </Link>
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

          <div className="w-full my-3 px-4 md:px-32 h-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
            <div className="w-[100%] mx-auto flex justify-between items-center py-4 ">
              <div className="flex justify-between items-center gap-6">
                <Button
                  isDisabled={loading}
                  colorScheme="facebook"
                  size="sm"
                  onClick={() => descreasePageNo(pageNo)}
                >
                  <p className="font-[Poppins] font-[400] flex justify-center items-center">
                    <AiOutlineLeft className="mr-2" />
                    Prev{" "}
                  </p>
                </Button>
                <Button
                  isDisabled={loading}
                  colorScheme="facebook"
                  size="sm"
                  onClick={() => increasePageNo(pageNo)}
                >
                  <p className="font-[Poppins] font-[400] flex justify-center items-center">
                    Next <AiOutlineRight className="ml-2" />
                  </p>
                </Button>
              </div>
              <div>
                <p className="text-black  font-[Poppins]">
                  {pageNo} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MetaWeeklyUser;
