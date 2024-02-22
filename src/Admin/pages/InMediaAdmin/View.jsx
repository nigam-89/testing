import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { InMediaAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import moment from 'moment'
import EditInMedia from './EditInMedia';

const View = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();

  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: InMediaAPI.ViewMedia_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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
        const response = await apiConnector({ method: "GET", url: InMediaAPI.ViewMedia_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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
      const res = await apiConnector({ method: "DELETE", url: InMediaAPI.DeleteMedia_API + `/${id}`, headers: { token: admin.token } })
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
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>IN MEDIA</h2>

      {
        loading ?
          <>
            <div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>
          </>
          :
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-x-5 md:gap-x-8 '>
            {
              data?.length > 0 &&
              data?.map((item, index) => (
                <div key={index} className="shadow-2xl  rounded-2xl mb-16 pb-2 relative 
                            before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-violet-500 to-purple-500 before:left-0 before:w-full
                            before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl
                            bg-white  
                            ">
                  <Link to={`/in-media/${item.heading}/${item._id}`}>
                    <img className="object-cover h-[15rem] max-h-[15rem] w-full rounded-lg"
                     src={item.thumbnailId ? item.thumbnailId : item?.imgUrlModelDBId?.urls?.[0]} alt="" />
                  </Link>
                  <div className="p-5">

                    <EditInMedia item={item} />
                    <Link to={`/in-media/${item.heading}/${item._id}`}>
                      <h5 className="text-black  duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3 ">
                        {item?.heading?.length > 60 ? item?.heading?.slice(0, 60) + "..." : item?.heading}
                      </h5>
                    </Link>
                    <Link to={`/in-media/${item.heading}/${item._id}`}>
                    <p className="font-normal font-[Poppins]  duration-150 text-sm tracking-wide text-gray-800 mb-3">{moment(item.date).format('Do MMM YYYY')} / IN MEDIA</p>
                    <p className="font-normal font-[Poppins]  duration-150 text-sm tracking-wide text-gray-700 mb-4 ">
                      {item?.description?.length > 60 ? item?.description?.slice(0, 60) + "..." : item?.description}
                    </p>
                    </Link>

                    <div className='flex justify-between items-center my-2'>
                      <Link to={`/in-media/${item.heading}/${item._id}`}>
                        <Button colorScheme="teal" size="xs">
                          <p className='font-[Poppins] font-[400] flex justify-center items-center'>Read More...</p>
                        </Button>
                      </Link>

                      <Button colorScheme="red" size="xs" isDisabled={loading}
                        onClick={() => {
                          HandleDelete(item._id);
                        }}>
                        <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                      </Button>
                    </div>

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