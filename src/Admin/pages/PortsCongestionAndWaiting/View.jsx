import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { PortsCongestionAndWaitingAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';

const View = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();
  const admin = useSelector((state) => state.admin);


  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
      // console.log(response.data);
      setData(response.data.data)
      setTotalPages(Math.ceil(response.data.count / pageSize))
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 10) => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({ method: "GET", url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
        // console.log(response.data);
        setData(response.data.data)
        setTotalPages(Math.ceil(response.data.count / pageSize))
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
      setLoading(false);
    }
    getData();
  }, [admin])

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo(pageNo = pageNo + 1)
      getData(pageNo)
    }
  }

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo(pageNo = pageNo - 1)
      getData(pageNo)
    }
  }

  const HandleDelete = async (id) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: PortsCongestionAndWaitingAPI.deletePortsCongWaitingMarketNews_API + `/${id}`, headers: { token: admin.token } })
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
    getData(pageNo);
  }

  return (
    <div className='w-full min-h-screen relative' >
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>PORTS CONGESTION & WAITING</h2>

      {
        loading ?
          <>
            (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>)
          </>
          :
          <div className='flex flex-col justify-center items-center w-full gap-6'>
            {
              data?.length > 0 &&
              data?.map((item, index) => (
                <div key={index} className="w-[97%] bg-white rounded-xl p-4">

                  <h2 className='font-[Poppins] text-base tracking-wide font-[500] pb-2 text-blue-600 mb-3'>
                    {moment(item.date).format('Do MMM YYYY, dddd')}
                  </h2>

                  <div className='mb-4 flex flex-col'>
                    <p className='text-sm font-[Poppins] font-[500] text-blue-700'>Description</p>
                    <p className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Poppins] font-[500] tracking-wide mt-1'>
                      {item.description}
                    </p>
                  </div>

                  <div className='mb-4 flex flex-col'>
                    <p className='text-sm font-[Poppins] font-[500] text-blue-700'>
                      Note</p>
                    <p className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 [Poppins] font-[500] tracking-wide mt-1'>
                      {item.note}
                    </p>
                  </div>

                  <div className='mb-4 flex flex-col'>
                    <p className='text-sm font-[Poppins] font-[500] text-blue-700'>
                      Ports
                    </p>
                    <div className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 [Poppins] font-[500] tracking-wide mt-1'>
                      {
                        item?.ports?.map((port, index) => (
                          <div className='my-2 flex flex-col border-2 border-violet-400 p-4 rounded-xl' key={index}>
                            <p className='text-sm font-[Poppins] font-[500] text-blue-700 underline'>
                              Index : {index + 1}
                            </p>
                            <p className='text-sm font-[Poppins] font-[500] text-blue-700'>
                              Port Name
                            </p>
                            <p className='text-sm  outline-none focus:outline-none rounded-md py-2 px-3 [Poppins] font-[500] tracking-wide mt-1'>
                              {port.portName}
                            </p>
                            <p className='text-sm font-[Poppins] font-[500] text-blue-700'>
                              Port Time Value
                            </p>
                            <p className='text-sm  outline-none focus:outline-none rounded-md py-2 px-3 [Poppins] font-[500] tracking-wide mt-1'>
                              {port.portTimeValue}
                            </p>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className='mb-4 flex items-center justify-end'>
                    <Button colorScheme="red" size="sm" isDisabled={loading}
                      onClick={() => {
                        HandleDelete(item._id);
                      }}>
                      <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                    </Button>
                  </div>

                </div>
              ))
            }
          </div>
      }

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
  )
}

export default View
