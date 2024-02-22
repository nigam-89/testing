import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { GovNotificationAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import moment from 'moment'

const View = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: GovNotificationAPI.ViewNoti_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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
        const response = await apiConnector({ method: "GET", url: GovNotificationAPI.ViewNoti_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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

  const HandleDelete = async (id) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: GovNotificationAPI.DeleleNoti_API + `/${id}`, headers: { token: admin.token } })
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
    getData();
  }

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

  return (
    <div className='w-full min-h-screen relative' >
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>GOVERNMENT NOTIFICATION</h2>

      {
        loading ?
          <>
            <div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>
          </>
          :
          <div className='flex justify-center items-center flex-col'>
            {
              data?.length > 0 &&
              data?.map((item, index) => (
                <div key={index} className="bg-white w-[90%] p-4 rounded-xl shadow-2xl  my-3">
                  <div>
                    <p className='font-[Poppins] font-[500] text-blue-600 flex justify-center items-center mb-2'>{moment(item.date).format('Do MMM YYYY, dddd')}</p>
                    <p className='flex gap-2 mb-2'>
                      <span className='text-green-400'>Category : </span>
                      <span className='text-gray-500'>{item?.category}</span>
                    </p>
                    <a href={item.link} className='font-[Poppins] font-[400] '>{item.heading}</a>
                  </div>

                  <div className='mt-4 flex items-center justify-center'>
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
