import React, { useEffect, useState } from "react";
import "./Section3.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { apiConnector } from "../../../../services/apiConnector";
import { ManageGraphAPI } from "../../../../services/apis";

const Section3 = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [loading, setLoading] = React.useState(false);
  // const [data, setData] = React.useState();
  const [copyOfData, setCopyOfData] = React.useState();

  const [size, setSize] = useState(window.innerWidth < 650);

  // only subscriber can view Tooltip of the graph
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);

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
  const fetchData = async () => {
    window.scroll(0, 0);
    try {
      setLoading(true);
      const res = await apiConnector({
        method: "GET",
        url: ManageGraphAPI.getallCharts_API + `?featured=true`,
      });

      // console.log(res.data)

      let arrayOfData = res.data.data;

      for (let i = 0; i < arrayOfData.length; i++) {
        // calculate domain
        // add domain field to all of the data
        const res = calculateDomain(arrayOfData[i]);
        const domain = { low: res["low"], high: res["high"] };
        arrayOfData[i].domain = domain;
        arrayOfData[i].buttonName = "Full";
      }

      // setData(arrayOfData);
      setCopyOfData(arrayOfData);
      //   console.log("arryofData", arrayOfData);

      setLoading(false);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // ---------------------------------------------------------Handle view all button-----------------------------------------
  const handleViewAllButtonClick = (e) => {
    if (user?.hasSubscription || admin?.token) {
      navigate("/all-graphs");
    } else {
      navigate("/subscribed");
    }
  };

  //----------------------------------------------------- function for making line chart-------------------------------------
  // function for generating distinct colors
  function generateDistinctColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }

  const calculateSize = (size) => {
    if (size) {
      return 2;
    } else {
      return 5;
    }
  };

  // function for calculating x-axis interval
  function calculateXAxisInterval(data) {
    const totalDataPoints = data?.length;
    const maxTicks = calculateSize(size);
    return Math.max(1, Math.ceil(totalDataPoints / maxTicks));
  }

  const DisplayLineChart = ({ dataForChart, title, keyNames, domain }) => {
    // console.log("Now, Display charts", {
    //   dataForChart,
    //   title,
    //   keyNames,
    //   domain,
    // });
    const lineColors = generateDistinctColors(keyNames["lines"]?.length);
    return (
      <div className="bg-white p-4 rounded-xl ">
        {/* <Container> */}
        {/* <Typography variant="h6">{title}</Typography> */}
        <div className="flex item-center justify-center mb-3 md:mb-5">
          <p className="font-[Poppins] tracking-wide font-[600] text-center">
            {title}
          </p>
        </div>

        <LineChart
          width={size ? 300 : 600}
          height={size ? 250 : 400}
          data={dataForChart}
        >
          <XAxis
            dataKey={keyNames["xAxis"]}
            interval={calculateXAxisInterval(dataForChart)}
            height={70}
            dy={15}
            angle={-30}
          />
          <YAxis
  dy={-5}
  domain={[domain["low"] - 350, domain["high"] +20]}
/>
          {/* <YAxis dy={-5} domain={[domain["low"], domain["high"]]} /> */}
          <CartesianGrid stroke="#f5f5f5" />
          {/* only subscriber and admin can see the Tooltip */}
          {(user?.hasSubscription || admin?.token) && (
            <Tooltip label={keyNames["xAxis"]} />
          )}
          <Legend />
          {keyNames["lines"].map((lineName, ind) => (
            <Line
              key={ind}
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
      </div>
    );
  };

  // display charts
  const displayCharts = () => {
    return copyOfData?.map((d1, ind) => (
      <div key={ind}>
        {/* <div className="flex gap-4 flex-wrap my-4">
                    <button
                        type="button"
                        onClick={(e) => showCompleteGraph(d1.id, ind)}
                        className={`${d1.buttonName === "Full" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                        Full Graph
                    </button>
                    <button type="button" onClick={(e) => showOneYearData(d1._id, ind)} className={`${d1.buttonName === "1Y" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}>
                        One Year
                    </button>
                    <button
                        type="button"
                        onClick={(e) => showSixMonthsData(d1._id, ind)}
                        className={`${d1.buttonName === "6M" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                        6 Month
                    </button>
                    <button
                        type="button"
                        onClick={(e) => showThreeMonthsData(d1.id, ind)}
                        className={`${d1.buttonName === "3M" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                        3 Months
                    </button>
                    <button
                        type="button"
                        onClick={(e) => showOneMonthsData(d1.id, ind)}
                        className={`${d1.buttonName === "1M" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                        1 Months
                    </button>
                    <button type="button" onClick={(e) => showTenDaysData(d1.id, ind)} className={`${d1.buttonName === "10D" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}>
                        10 Days
                    </button>
                    <button type="button" onClick={(e) => showFiveDaysData(d1.id, ind)} className={`${d1.buttonName === "5D" && 'bg-blue-400 text-white'} border-2 border-blue-400 px-2 py-1 rounded-md`}>
                        5 Days
                    </button>

                    {
                        d1?.isFeatured && <button
                            type="button"
                            className={`${d1?.isFeatured === true && 'bg-green-400 hover:bg-green-500 text-white'} border-2 border-green-400 px-2 py-1 rounded-md hover:bg-green-400 hover:text-white`}
                        >
                            Featured Chart
                        </button>
                    }
                </div> */}
        <DisplayLineChart
          dataForChart={d1?.chartData}
          title={d1?.title}
          keyNames={d1?.keyNames}
          domain={d1?.domain}
        />
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
  // const showCompleteGraph = (ObjectId, ind) => {
  //     let update = copyOfData;
  //     update[ind] = data[ind];
  //     // calculated domain also update
  //     setCopyOfData(data);
  // };

  // One Year
  // const showOneYearData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 365) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 365, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "1Y"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     // console.log(updatedData);
  //     setCopyOfData(updatedData);
  // };

  // 6 Months
  // const showSixMonthsData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 180) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 180, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "6M"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     setCopyOfData(updatedData);
  // };

  // 3 Months
  // const showThreeMonthsData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 90) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 90, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "3M"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     setCopyOfData(updatedData);
  // };

  // 1 Months
  // const showOneMonthsData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 30) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 30, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "1M"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     setCopyOfData(updatedData);
  // };

  // 10 Days
  // const showTenDaysData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 10) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 10, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "10D"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     setCopyOfData(updatedData);
  // };

  // 5 Days
  // const showFiveDaysData = (ObjectId, ind) => {
  //     // Find that data from original data and extract the required part
  //     let fileData = data[ind]["chartData"];
  //     if (fileData?.length <= 5) {
  //         return;
  //     }
  //     let d = fileData?.slice(fileData?.length - 5, fileData?.length + 1);

  //     // Create a new copy of the state and update the necessary fields
  //     const updatedData = data.map((item, index) => {
  //         if (index === ind) {
  //             return {
  //                 ...item,
  //                 chartData: d,
  //                 domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
  //                 buttonName: "5D"
  //             };
  //         }
  //         return item;
  //     });

  //     // Update the state with the new data
  //     setCopyOfData(updatedData);
  // };

  return (
    <div className="section3_bg relative">
      <div className="px-4 md:px-16 py-3 md:py-6  w-full 3xl:w-[1500px] mx-auto">
        <h2 className="font-[Poppins] flex justify-center items-center text-white md:text-start tracking-wider text-3xl font-[600] py-2">
          PRICE MOVEMENT
        </h2>

        <div className="flex justify-around items-center w-full flex-col md:flex-row gap-5 md:gap-8 my-5 ">
          {/* <img src="https://cdn.pixabay.com/photo/2017/12/22/08/01/graph-3033203_1280.jpg" className="rounded-xl h-[13rem] w-[90%] md:h-[17rem] md:w-[35%] shadow-2xl hover:shadow-none duration-300 hover:scale-[0.95]" data-aos="fade-right" data-aos-duration="2000" alt="" />

                <img src="https://cdn.pixabay.com/photo/2017/12/22/08/01/graph-3033203_1280.jpg" className="rounded-xl h-[13rem] w-[90%] md:h-[17rem] md:w-[35%] shadow-2xl hover:shadow-none duration-300 hover:scale-[0.95]" data-aos="fade-left"  data-aos-duration="2000"alt="" /> */}

          {displayCharts()}
        </div>

        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={handleViewAllButtonClick}
            className="text-sm font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-violet-500  hover:text-violet-500 hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section3;
