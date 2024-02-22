import React, { useState } from "react";
import Papa from "papaparse";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { apiConnector } from "../../../services/apiConnector";
import { ManageGraphAPI } from "../../../services/apis";

export default function MakeLineChart() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [keyNames, setKeyNames] = useState({ xAxis: "", lines: [] });
  const [fileData, setFileData] = useState(null);

  const [graphData, setGraphData] = useState(null);
  // Here, the y-axis domain for the line chart is calculated each time the chart is constructed.

  // aditional
  const [filterButtonName, setFilterButtonName] = useState("FG");
  const [uploadedToServer, setUploadedToServer] = useState(false);

  // parse csv file
  const parseCSVFile = (e) => {
    e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const data = Papa.parse(csvData, { header: true });

        if (data.data.length && Object.keys(data.data[0]).length) {
          const keys = Object.keys(data.data[0]);

          if (
            keys[0] === "" ||
            keys[0] === null ||
            keys[1] === "" ||
            keys[1] === null
          ) {
            toast.error("File must have minimum two column headers.");
          }

          let xAxis = keys[0];

          let lines = [];
          for (let i = 1; i < keys.length; i++) {
            // if any empty key is encountered
            if (keys[i] === "" || keys[i] === null) {
              break;
            }
            lines.push(keys[i]);
          }

          setKeyNames({
            xAxis: xAxis,
            lines: lines,
          });
        } else {
          alert("File must have 2 columns of data.");
        }

        console.log("File Data.........");
        setFileData(data.data);
        setGraphData(data.data);

        setUploadedToServer(false);
      };
      reader.readAsText(file);
    }
  };

  // handle file input
  const handleFileChange = async (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    }
  };

  // handle data upload to the server
  async function handleDataUploadToTheServer() {
    if (!title || !keyNames || !fileData) {
      toast.error("First of all Parse the CSV Data.");
      return;
    }
    if (uploadedToServer === true) {
      toast.error(
        "Data has already been uploaded to the server. If you want to upload new data, please parse a new CSV."
      );
      return;
    }
    await handleUploadLineChartsData();
  }
  const handleUploadLineChartsData = async () => {
    try {
      const response = await apiConnector({
        method: "POST",
        url: ManageGraphAPI.uploadGraph_API,
        bodyData: {
          title,
          keyNames,
          chartData: fileData,
        },
      });

      const json = response.data;
      if (json.success === true) {
        toast.success(json.message);
        setUploadedToServer(true);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // function for making line chart
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
  const DisplayLineChart = ({ data, title, keyNames }) => {
    const customDomain = calculateDomain(data);
    console.log({ data, title, keyNames, customDomain });
    const lineColors = generateDistinctColors(keyNames["lines"]?.length);
    return (
      <>
        <div className="flex item-center justify-center">{title}</div>
        <LineChart width={800} height={500} data={data}>
          <XAxis dataKey={keyNames["xAxis"]} interval={calculateXAxisInterval(data)} />
          <YAxis domain={[customDomain["low"], customDomain["high"]]} />
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
      </>
    );
  };

  // complete graph
  const showCompleteGraph = () => {
    setGraphData(fileData);
    setFilterButtonName("FG");
  };

  // colculate domain
  const calculateDomain = (data) => {
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

  // One Year
  const showOneYearData = () => {
    if (fileData?.length <= 365) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 365, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("1Y");
  };

  // 6 Months
  const showSixMonthsData = () => {
    if (fileData?.length <= 180) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 180, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("6M");
  };

  // 3 Months
  const showThreeMonthsData = () => {
    if (fileData?.length <= 90) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 90, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("3M");
  };

  // 1 Month
  const showOneMonthsData = () => {
    if (fileData?.length <= 30) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 30, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("1M");
  };

  // 10 Days
  const showTenDaysData = () => {
    if (fileData?.length <= 10) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 10, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("10D");
  };

  // 5 Days
  const showFiveDaysData = () => {
    if (fileData?.length <= 5) {
      return;
    }
    let data = fileData?.slice(fileData?.length - 5, fileData?.length + 1);
    setGraphData(data);
    setFilterButtonName("5D");
  };

  return (
    <>
      <div className="w-full min-h-screen relative">
        <div className="flex flex-col justify-between gap-8 py-4">
          {/* form to create market news */}
          <div className="flex justify-center items-center bg-white rounded-xl">
            <div className="flex justify-center items-center w-full max-md:px-4">
              <div className="flex flex-col items-center justify-between p-4 ">
                <div className="flex flex-col items-center justify-between  border-2 border-gray-400 rounded mb-5 shadow-md">
                  <form
                    onSubmit={parseCSVFile}
                    className="m-4 flex flex-col  items-center justify-center gap-4"
                  >
                    <div className="flex gap-2">
                      <label htmlFor="title">Title : </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-300 px-1"
                        placeholder="Enter title of the chart"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".csv"
                        name="file"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="border-2 border-green-500 hover:bg-green-400 rounded hover:text-white py-1 px-2 hover-bg-green-500"
                      >
                        Parse
                      </button>
                      <button
                        type="button"
                        onClick={handleDataUploadToTheServer}
                        className="border-2 border-gray-500 hover:bg-gray-400 rounded hover:text-white py-1 px-2 hover-bg-green-500"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center p-2">
                  <div className="flex gap-4 flex-wrap my-4">
                    <button
                      type="button"
                      onClick={showCompleteGraph}
                      className={`${
                        filterButtonName === "FG" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      Full Graph
                    </button>
                    <button
                      type="button"
                      onClick={showOneYearData}
                      className={`${
                        filterButtonName === "1Y" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      One Year
                    </button>
                    <button
                      type="button"
                      onClick={showSixMonthsData}
                      className={`${
                        filterButtonName === "6M" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      6 Month
                    </button>
                    <button
                      type="button"
                      onClick={showThreeMonthsData}
                      className={`${
                        filterButtonName === "3M" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      3 Months
                    </button>
                    <button
                      type="button"
                      onClick={showOneMonthsData}
                      className={`${
                        filterButtonName === "1M" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      1 Months
                    </button>
                    <button
                      type="button"
                      onClick={showTenDaysData}
                      className={`${
                        filterButtonName === "10D" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      10 Days
                    </button>
                    <button
                      type="button"
                      onClick={showFiveDaysData}
                      className={`${
                        filterButtonName === "5D" && "bg-blue-400 text-white"
                      } border-2 border-blue-400 px-2 py-1 rounded-md`}
                    >
                      5 Days
                    </button>
                  </div>
                  <DisplayLineChart
                    data={graphData}
                    title={title}
                    keyNames={keyNames}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
