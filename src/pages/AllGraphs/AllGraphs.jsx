import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/global/Footer/Footer";
import Navbar from "../../components/global/Navbar/Navbar";
import UpperNavbar from "../../components/global/UpperNavbar/UpperNavbar";

import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { apiConnector } from "../../services/apiConnector";
import { ManageGraphAPI } from "./../../services/apis";
import { Button } from "@chakra-ui/react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AllGraphs = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [copyOfData, setCopyOfData] = React.useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [size, setSize] = useState(window.innerWidth < 650);

  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
      if (!user?.token) {
          navigate('/sign-in')
          return;
      }
      if (!user?.hasSubscription) {
          navigate('/subscribed');
          return;
      }
  }, [user, navigate])

  useEffect(() => {
    // Function to update the width and size
    const updateWindowDimensions = () => {
      const newWindowWidth = window.innerWidth;
      setSize(newWindowWidth < 650);
    };

    // Attach event listener to the window resize event
    window.addEventListener("resize", updateWindowDimensions);

    // Initial setup
    updateWindowDimensions();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  // fetch all data from the server
  const fetchData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    try {
      setLoading(true);
      const res = await apiConnector({
        method: "GET",
        url:
          ManageGraphAPI.getallCharts_API +
          `?dateDescSort=true&pageNo=${pageNo}&pageSize=${pageSize}`,
      });

      let arrayOfData = res.data.data;
      setTotalPages(Math.ceil(res.data.count / pageSize));
      for (let i = 0; i < arrayOfData.length; i++) {
        // calculate domain
        // add domain field to all of the data
        const res = calculateDomain(arrayOfData[i]);
        const domain = { low: res["low"], high: res["high"] };
        arrayOfData[i].domain = domain;
        arrayOfData[i].buttonName = "Full";
      }

      setData(arrayOfData);
      setCopyOfData(arrayOfData);

      setLoading(false);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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

  //----------------------------------------------------- function for making line chart-------------------------------------
  function generateDistinctColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }
  // function for calculating x-axis interval
  function calculateXAxisInterval(data) {
    const totalDataPoints = data?.length;
    const maxTicks = size ? 2 : 4;
    return Math.max(1, Math.ceil(totalDataPoints / maxTicks));
  }
  const DisplayLineChart = ({ dataForChart, keyNames, domain }) => {
    // console.log("Now, Display charts",{ dataForChart, title, keyNames, domain });
    const lineColors = generateDistinctColors(keyNames["lines"]?.length);
    return (
      <>
        {/* <Container> */}
        {/* <div className="flex item-center justify-center mb-3 md:mb-5">
                    <p className='font-[Poppins] tracking-wide font-[600] text-center'>
                        {title}
                    </p>
                </div> */}
        <LineChart
          width={size ? 350 : 600}
          height={size ? 250 : 350}
          // width={size ? 350 :800}
          // height={size? 250 :500}
          data={dataForChart}
        >
          <XAxis
            dataKey={keyNames["xAxis"]}
            interval={calculateXAxisInterval(dataForChart)}
            angle={-30} height={70} dy={20}
          />
          {/* <YAxis domain={[domain["low"], domain["high"]]} /> */}
          <YAxis
  dy={-5}
  domain={[domain["low"] - 350, domain["high"] +20]}/>
          <CartesianGrid stroke="#f5f5f5" />
          {(user?.hasSubscription || admin?.token) && (
            <Tooltip label={keyNames["xAxis"]} />
          )}
          <Legend />
          {keyNames["lines"].map((lineName, ind) => (
            <Line
              type="monotone"
              dataKey={lineName}
              dot={false}
              // assign color on the basis of index
              stroke={lineColors[ind % lineColors.length]}
              name={lineName}
            />
          ))}
        </LineChart>
        {/* </Container> */}
      </>
    );
  };

  // display charts
  const displayCharts = () => {
    return copyOfData?.map((d1, ind) => (
      <div key={ind} className="py-6 border-b-2 border-gray-400">
        <div className="flex item-center justify-center mb-3 md:mb-5">
          <p className="font-[Poppins] tracking-wide font-[600] text-center">
            {d1?.title}
          </p>
        </div>
        <div className="flex justify-center  flex-wrap my-4">
          <button
            type="button"
            onClick={(e) => showCompleteGraph(d1.id, ind)}
            className={`${
              d1.buttonName === "Full" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins] border-r  pb-1 border-gray-400`}
          >
            Max
          </button>
          <button
            type="button"
            onClick={(e) => showOneYearData(d1._id, ind)}
            className={`${
              d1.buttonName === "1Y" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins]  border-r  pb-1 border-gray-400`}
          >
            1Y
          </button>
          <button
            type="button"
            onClick={(e) => showSixMonthsData(d1._id, ind)}
            className={`${
              d1.buttonName === "6M" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins] border-r  pb-1 border-gray-400`}
          >
            6M
          </button>
          <button
            type="button"
            onClick={(e) => showThreeMonthsData(d1.id, ind)}
            className={`${
              d1.buttonName === "3M" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins] border-r  pb-1 border-gray-400`}
          >
            3M
          </button>
          <button
            type="button"
            onClick={(e) => showOneMonthsData(d1.id, ind)}
            className={`${
              d1.buttonName === "1M" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins]  border-r  pb-1 border-gray-400`}
          >
            1M
          </button>
          <button
            type="button"
            onClick={(e) => showTenDaysData(d1.id, ind)}
            className={`${
              d1.buttonName === "10D" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins]  border-r  pb-1 border-gray-400`}
          >
            10D
          </button>
          <button
            type="button"
            onClick={(e) => showFiveDaysData(d1.id, ind)}
            className={`${
              d1.buttonName === "5D" &&
              "text-blue-500 underline underline-offset-[6px] font-[500] tracking-wider"
            }  px-5 duration-200 font-[Poppins]`}
          >
            5D
          </button>
        </div>
        <div className="flex item-center justify-center mb-3 md:mb-5">
          <DisplayLineChart
            dataForChart={d1?.chartData}
            title={d1?.title}
            keyNames={d1?.keyNames}
            domain={d1?.domain}
          />
        </div>
      </div>
    ));
  };

  // ---------------------------------------------------------------Imp Functions----------------------------------------------------
  // colculate domain
  const calculateDomain = (lineChartData) => {
    const data = lineChartData["chartData"];
    const keyNames = lineChartData["keyNames"];

    // domain will be calculated on the basis of lines
    let lowValues = Array(keyNames["lines"]?.length).fill(1e9);
    let highValues = Array(keyNames["lines"]?.length).fill(-1e9);

    for (let i = 0; i < data?.length; i++) {
      for (let j = 0; j < keyNames["lines"]?.length; j++) {
        let val = data[i][keyNames["lines"][j]];
        if (!isNaN(val) && isFinite(val)) {
          lowValues[j] = Math.min(lowValues[j], val);
          highValues[j] = Math.max(highValues[j], val);
        }
      }
    }

    // determin final low and final high from lowValues array and highValues array
    let finalLow = 1e9,
      finalHigh = -1e9;
    for (let i = 0; i < keyNames["lines"]?.length; i++) {
      if (!isNaN(lowValues[i]) && isFinite(lowValues[i])) {
        finalLow = Math.min(finalLow, lowValues[i]);
      }
      if (!isNaN(highValues[i]) && isFinite(highValues[i])) {
        finalHigh = Math.max(finalHigh, highValues[i]);
      }
    }

    // add custom value to domains in necessary
    if (finalLow > 0 && finalLow < 10) {
      finalLow = 0;
    } else if (finalLow - 10 >= 0) {
      finalLow -= 10;
    }
    finalHigh += 10;

    return { low: finalLow, high: finalHigh };
  };

  // show complete graph
  const showCompleteGraph = (ObjectId, ind) => {
    let update = copyOfData;
    update[ind] = data[ind];
    // calculated domain also update
    setCopyOfData(data);
  };

  // One Year
  const showOneYearData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 365) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 366, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "1Y",
        };
      }
      return item;
    });

    // Update the state with the new data
    // console.log(updatedData);
    setCopyOfData(updatedData);
  };

  // 6 Months
  const showSixMonthsData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 180) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 181, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "6M",
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  // 3 Months
  const showThreeMonthsData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 90) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 91, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "3M",
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  // 1 Months
  const showOneMonthsData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 30) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 31, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "1M",
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  // 10 Days
  const showTenDaysData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 10) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 11, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "10D",
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  // 5 Days
  const showFiveDaysData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 5) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 6, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "5D",
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  return (
    <>
      <UpperNavbar />
      <Navbar />
      <div className="3xl:w-[1500px] mx-auto">
        <div className="w-[100%]  overflow-x-hidden  tracking-widerddenpx-5  font-[Poppins] font-[500] tracking-wider md:px-5 duration-200 py-4 md:py-12">
          <h2 className="text-2xl text-[#1a3777] font-[600] mb-4 text-center uppercase md:text-4xl font-[Roboto]">
            PRICE MOVEMENT
          </h2>

          {/* <div className="flex flex-col gap-4 items-center justify-center p-2">
                    {displayCharts()}
                </div> */}
          <div className="p-3 gap-4 md:gap-8 grid grid-cols-1 lg:grid-cols-2">
            {displayCharts()}
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
                <p className="text-gray-900  font-[Poppins]">
                  {pageNo} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllGraphs;
