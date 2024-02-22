import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { Button } from "@chakra-ui/react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { apiConnector } from "../../services/apiConnector";
import { GovNotificationAPI } from "../../services/apis";
import { toast } from "react-hot-toast";
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar';

export default function GovNotifications() {
  window.scroll(0, 0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [pageNo, setPageNo] = useState(1);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  //---------------------------------------function for fetching data from the server---------------------------------
  const fetchDataFromServer = async () => {
    setLoading(true);
    try {
      window.scroll(0, 0);
      const response = await apiConnector({
        method: "GET",
        url:
          GovNotificationAPI.ViewNoti_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&category=all`,
      });
      // console.log(response.data);
      setData(response.data.data);
      // console.log(response.data.data);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDataFromServer();
    // eslint-disable-next-line
  }, [pageNo, pageSize]);

  // --------------------------------------------------Display data----------------------------------------------------
  const DisplayData = ({ data }) => {
    return (
      <div className="flex flex-col flex-wrap gap-2 items-center justify-center md:justify-between m-2 mb-4 md:flex-row">
        {
          data && data.map((categoryItem) => {
            const categoryName = Object.keys(categoryItem)[0];
            const { numOfResults, data: categoryData } = categoryItem[categoryName];
            return (
              numOfResults > 0 && <div key={categoryName}
                className="flex flex-col items-center justify-start border-2 border-gray-200 m-2 mb-4 p-4 rounded-md shadow-md hover:shadow-sm"
              >
                <h2 className="font-[Poppins] font-[500] text-2xl text-blue-600">{categoryName}</h2>
                <div className="flex flex-col gap-2 mt-4 h-[25rem] w-[20rem] overflow-y-auto md:h-[25rem] md:w-[30rem]">
                  {
                    categoryData && categoryData.map((item) => (
                      <div key={item._id}
                        className="border-b-2 border-b-gray-200  py-2 px-2 mx-2"
                      >
                        <a href={item.link} className="text-sm text-gray-500"><p>{item.heading}</p></a>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  };

  // --------------------------------------------------Final Return-----------------------------------------------------
  return (
    <>
      <div>
        <UpperNavbar />
        <Navbar />
        <div className='3xl:w-[1500px] mx-auto'>
          <div className="px-3 md:px-32 py-4 md:py-12 ">
            {
              loading ?
                <>
                  <div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>
                </>
                :

                <div>
                  {/* componet for rendering the data */}
                  <DisplayData data={data} />
                </div>
            }
            <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
              <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                <div className='flex justify-between items-center gap-6'>
                  <Button isDisabled={loading} colorScheme='facebook' size='sm' onClick={() => setPageNo(pageNo - 1)}>
                    <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
                  </Button>
                  <Button isDisabled={loading} colorScheme='facebook' size='sm' onClick={() => setPageNo(pageNo + 1)}>
                    <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
                  </Button>
                </div>
                <div >
                  <p className='text-black  font-[Poppins]'>{pageNo} of {totalPages}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
