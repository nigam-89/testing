import React, { useState } from "react";
import Papa from "papaparse";
import { AddExistingSubscribersAPI } from '../../../services/apis';
import { toast } from 'react-hot-toast';
import { useEffect } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";

// server : fileData

export default function ParseExcelAndMakeReqForSubAdd() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  // parse csv file
  const parseCSVFile = (e) => {
    e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const data = Papa.parse(csvData, { header: true });
        // console.log(data.data);
        setFileData(data.data);
        // console.log(data.data);
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
  const handleDataUploadToServer = async () => {
    try {
      if (fileData?.length === 0) {
        toast.error("Parse the excel sheet.");
      }
      const response = await apiConnector({
        method: "POST",
        url: AddExistingSubscribersAPI.AddExistingSubscribers_API,
        bodyData: {
          formData: fileData
        }, 
        headers:
        {
          token: admin.token
        }
      })
      // console.log(response);
      if (response?.status === 200) {
        toast.success(`New Users Added Count: ${response?.data?.success?.length}`);
        toast.success(`Existing Users Count: ${response?.data?.existing?.length}`);
        setFileData();
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full p-4">
        <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide'>
          Upload CSV File
        </h2>
        <div className="flex flex-col items-center justify-between  border-2 border-gray-400 mb-5 shadow-md bg-white rounded-xl">
          <form
            onSubmit={parseCSVFile}
            className="m-4 flex flex-col  items-center justify-center gap-4 "
          >
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
                onClick={handleDataUploadToServer}
                className="border-2 border-gray-500 hover:bg-gray-400 rounded hover:text-white py-1 px-2 hover-bg-green-500"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
