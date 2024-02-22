import React, { useState } from "react";
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
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { apiConnector } from "../../../services/apiConnector";
import { ManageGraphAPI } from "../../../services/apis";
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

export default function AdminViewAllLineCharts() {
  const token = useSelector((state) => state.admin.token)
  const admin = useSelector((state) => state.admin)
  // eslint-disable-next-line
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [copyOfData, setCopyOfData] = React.useState();
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();

  const [size, setSize] = useState(window.innerWidth < 650);

  useEffect(() => {
    // Function to update the width and size
    const updateWindowDimensions = () => {
      const newWindowWidth = window.innerWidth;
      setSize(newWindowWidth < 650);
    };

    // Attach event listener to the window resize event
    window.addEventListener('resize', updateWindowDimensions);

    // Initial setup
    updateWindowDimensions();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);


  // fetch all data from the server
  const fetchData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    try {
      setLoading(true);
      const res = await apiConnector({
        method: 'GET',
        url: ManageGraphAPI.getallCharts_API + `?dateDescSort=true&pageNo=${pageNo}&pageSize=${pageSize}`,
        headers: { token: token }
      })
      //   add domain field, custom-button-name and then save
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
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo(pageNo = pageNo + 1)
      fetchData(pageNo)
    }
  }

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo(pageNo = pageNo - 1)
      fetchData(pageNo)
    }
  }

  // -----------------------------------------------------Delete Chart-----------------------------------
  const deleteChart = async (id, index) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      console.log(id, index);
      const res = await apiConnector({
        method: "DELETE",
        url: ManageGraphAPI.delete_API + `/${id}`,
        headers: { token: token }
      })
      const json = res.data;
      if (json.success === true) {
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        setCopyOfData(updatedData);
        toast.success(json.message);
      }
      else {
        toast.error(json.error);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
  }

  // ---------------------------------------------------Change  Status--------------------------
  const changeChartFeaturedStatus = async (id, featured) => {
    try {
      console.log(id, featured);
      const res = await apiConnector({
        method: "PUT",
        url: ManageGraphAPI.updateStatus_API + `/${id}`,
        bodyData: {
          featured: !featured
        },
        headers: { token: token }
      })

      const json = res.data;
      if (json.success === true) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              isFeatured: !item.isFeatured,
            };
          }
          return item;
        });

        setData(updatedData);
        setCopyOfData(updatedData);
        toast.success(json.message);
      }
      else {
        toast.error(json.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
  }



  //---------------------------------------------------- function for making line chart------------------------
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
    const maxTicks = 5;
    return Math.max(1, Math.ceil(totalDataPoints / maxTicks));
  }
  const DisplayLineChart = ({ dataForChart, title, keyNames, domain }) => {
    // console.log("Now, Display charts",{ dataForChart, title, keyNames, domain });
    const lineColors = generateDistinctColors(keyNames["lines"]?.length);
    return (
      <>
        {/* // <Container> */}
        {/* // <Typography variant="h6">{title}</Typography> */}
        <div className="flex item-center justify-center">{title}</div>
        <LineChart width={size ? 350 : 800} height={size ? 250 : 500} data={dataForChart}>
          <XAxis dataKey={keyNames["xAxis"]} interval={calculateXAxisInterval(dataForChart)} angle={-30} height={70} dy={15}/>
          {/* <YAxis domain={[domain["low"], domain["high"]]} /> */}
          <YAxis
  dy={-5}
  domain={[domain["low"] - 350, domain["high"] +20]} // Adjusted domain to start from 10 units below the minimum value and end 10 units above the maximum value
/>
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip label={keyNames["xAxis"]} />
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
        {/* // </Container> */}
      </>
    );
  };

  // display charts
  const displayCharts = () => {
    return copyOfData?.map((d1, ind) => (
      <div key={ind}>
        <div className="flex gap-4 flex-wrap my-4">
          <div className="flex gap-4 flex-wrap my-4">
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
          </div>

          <div className="flex gap-4 flex-wrap my-4">
            <button
              type="button"
              className={`${d1?.isFeatured === true && 'bg-green-400 hover:bg-green-500 text-white'} border-2 border-green-400 px-2 py-1 rounded-md hover:bg-green-400 hover:text-white`}
              onClick={(e) => changeChartFeaturedStatus(d1._id, d1?.isFeatured)}
            >
              {d1.isFeatured === true ? "Make Un-featured" : "Mark as Featured"}
            </button>
            <button
              type="button"
              className="border-2 border-red-400 px-2 py-1 rounded-md hover:bg-red-400 hover:text-white"
              onClick={(e) => { deleteChart(d1._id, ind) }}
            >
              Delete
            </button>
          </div>
        </div>
        <DisplayLineChart
          dataForChart={d1?.chartData}
          title={d1?.title}
          keyNames={d1?.keyNames}
          domain={d1?.domain}
        />
      </div>
    ));
  };

  // ----------------------------------------------Imp Functions----------------------------------------------------
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
    }
    else if (finalLow - 10 >= 0) {
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
    let d = fileData?.slice(fileData?.length - 365, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "1Y"
        };
      }
      return item;
    });

    // Update the state with the new data
    //   console.log(updatedData);
    setCopyOfData(updatedData);
  };

  // 6 Months
  const showSixMonthsData = (ObjectId, ind) => {
    // Find that data from original data and extract the required part
    let fileData = data[ind]["chartData"];
    if (fileData?.length <= 180) {
      return;
    }
    let d = fileData?.slice(fileData?.length - 180, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "6M"
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
    let d = fileData?.slice(fileData?.length - 90, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "3M"
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
    let d = fileData?.slice(fileData?.length - 30, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "1M"
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
    let d = fileData?.slice(fileData?.length - 10, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "10D"
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
    let d = fileData?.slice(fileData?.length - 5, fileData?.length + 1);

    // Create a new copy of the state and update the necessary fields
    const updatedData = data.map((item, index) => {
      if (index === ind) {
        return {
          ...item,
          chartData: d,
          domain: calculateDomain({ chartData: d, keyNames: item.keyNames }),
          buttonName: "5D"
        };
      }
      return item;
    });

    // Update the state with the new data
    setCopyOfData(updatedData);
  };

  /*------------------------------------------Final Return----------------------------------------------- */
  return (
    <>
      <div className='w-full min-h-screen relative'>
        <div className='flex flex-col justify-between gap-8 py-4'>

          {/* form to create market news */}
          <div className='flex justify-center items-center bg-white rounded-xl'>
            <div className='flex justify-center items-center w-full max-md:px-4'>

              <div className="flex flex-col gap-4 items-center justify-center p-2">
                {displayCharts()}
              </div>

            </div>
          </div>

          <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
            <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
              <div className='flex justify-between items-center gap-6'>
                <Button isDisabled={loading} colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
                  <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
                </Button>
                <Button isDisabled={loading} colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
                  <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
                </Button>
              </div>
              <div >
                <p className='text-white  font-[Poppins]'>{pageNo} of {totalPages}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
