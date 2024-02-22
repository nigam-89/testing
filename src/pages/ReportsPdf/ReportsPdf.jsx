import React, { useEffect, useState } from "react";
import UpperNavbar from "./../../components/global/UpperNavbar/UpperNavbar";
import Navbar from "./../../components/global/Navbar/Navbar";
import Footer from "./../../components/global/Footer/Footer";
import { Link } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { ReportsPdfRoutes } from "../../services/apis";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";

const ReportsPdf = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);

  const fetchData = async (pageNo = 1, pageSize = 12) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          ReportsPdfRoutes.fetchReportPdf_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
      });
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async (pageNo = 1, pageSize = 12) => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            ReportsPdfRoutes.fetchReportPdf_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        });
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo((pageNo = pageNo + 1));
      fetchData(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo((pageNo = pageNo - 1));
      fetchData(pageNo);
    }
  };

  return (
    <div>
      <UpperNavbar />
      <Navbar />
      <div className="px-3 md:px-32 py-4 md:py-12 3xl:w-[1500px] mx-auto">
        <h2 className="font-[Poppins] text-left tracking-wider text-3xl font-[600] pb-4">
          MARKET REPORTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-5 md:gap-x-8">
          {data?.map((item, index) => (
            <div
              key={index}
              className="shadow-2xl w-[248px] rounded-2xl mb-16 pb-2 relative group 
                            before:absolute before:h-[6px] before:bottom-0 before:bg-[#1a3777] before:left-0 before:w-full
                            before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl
                            dark:border-2 dark:border-white dark:hover:bg-white dark:duration-200
                            "
            >
              {/* <Link className=""> */}
              <img
                className="object-cover h-[350px] w-[248px] rounded-lg"
                src={item?.ImgUrl}
                alt="png_report"
              />
              {/* </Link> */}
              <div className="p-5">
                {user?.hasSubscription ? (
                  <a
                    href={item?.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gradient-to-r from-[#1a3777] to-[#1a3777] text-white py-2 px-3 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-gray-100 group-hover:text-black duration-150 rounded-lg text-sm font-[Poppins] font-[500]"
                  >
                    Download
                  </a>
                ) : (
                  <Link to="/sign-in">
                    <button className="bg-gradient-to-r from-[#1a3777] to-[#1a3777] text-white py-2 px-3 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-gray-100 group-hover:text-black duration-150 rounded-lg text-sm font-[Poppins] font-[500]">
                      Download
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
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
      <Footer />
    </div>
  );
};

export default ReportsPdf;
