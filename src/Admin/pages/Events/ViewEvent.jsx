import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiConnector";
import { EventAPI } from "../../../services/apis";
import { Button } from "@chakra-ui/react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";

const ViewEvent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          EventAPI.ViewEvent_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        headers: { token: admin.token },
      });
      console.log(response.data);
      setData(response.data.data);
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
            EventAPI.ViewEvent_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
          headers: { token: admin.token },
        });
        // console.log(response.data);
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    };
    getData();
  }, [admin]);

  const HandleDelete = async (id) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({
        method: "DELETE",
        url: EventAPI.DeleteEvent_API + `/${id}`,
        headers: { token: admin.token },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    getData();
  };

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

  return (
    <div className="w-full min-h-screen relative">
      <h2 className="text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide">
        EVENTS
      </h2>

      {loading ? (
        <>
          <div className="w-full flex items-center justify-center mt-10">
            {" "}
            <Loader width={"100"} height={"80"} />{" "}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 gap-x-5 md:gap-x-8 ">
          {data?.length > 0 &&
            data?.map((item, index) => (
              <div
                data-aos="zoom-in"
                data-aos-duration="2000"
                className="h-[25rem] shadow-xl hover:shadow-none duration-200 border-2 p-2 bg-white border-[#233c77] rounded-lg w-[95%] md:w-[80%] flex flex-col justify-center items-center"
              >
                <div className="h-[14rem] w-[90%]">
                  <img
                    src={item?.imgUrlModelDBId?.urls[0]}
                    className="h-full w-full object-cover rounded-lg"
                    alt=""
                  />
                </div>

                <h2 className="font-[Nunito] h-[6rem] overflow-y-hidden tracking-normal group-hover:text-white font-[600] text-sm text-center mt-3">
                  {item?.title}
                </h2>

                <h2 className="font-[Poppins] tracking-normal group-hover:text-white font-[600] text-sm text-center mt-3">
                  {moment(item?.date).format("Do MMM YYYY")}
                </h2>

                <button
                  type="button"
                  onClick={(e) => window.open(item?.url, "_blank")}
                  className="text-sm mt-4 font-[500]  mb-2 py-1 rounded-xl px-4  border-2 hover:border-[#233c77]  group-hover:text-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
                >
                  View
                </button>

                <Button
                  colorScheme="red"
                  size="sm"
                  isDisabled={loading}
                  onClick={() => {
                    HandleDelete(item._id);
                  }}
                >
                  <p className="font-[Poppins] px-2 py-1 font-[400] flex justify-center items-center">
                    Delete
                  </p>
                </Button>
              </div>
            ))}
        </div>
      )}

      <div className="w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
          <div className="flex justify-between items-center gap-6">
            <Button
              isDisabled={loading}
              colorScheme="green"
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
              colorScheme="green"
              size="sm"
              onClick={() => increasePageNo(pageNo)}
            >
              <p className="font-[Poppins] font-[400] flex justify-center items-center">
                Next <AiOutlineRight className="ml-2" />
              </p>
            </Button>
          </div>
          <div>
            <p className="text-white  font-[Poppins]">
              {pageNo} of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
