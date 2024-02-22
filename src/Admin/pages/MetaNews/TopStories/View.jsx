import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../services/apiConnector';
import { TopStoiresAPI } from '../../../../services/apis';
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import moment from 'moment'
import EditTopStories from './EditTopStories';

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
      const response = await apiConnector({ method: "GET", url: TopStoiresAPI.ViewTopStories_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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
        const response = await apiConnector({ method: "GET", url: TopStoiresAPI.ViewTopStories_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
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

  const HandleDelete = async (id,role) => {
    try {
      if (role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: TopStoiresAPI.DeleteTopStoires_API + `/${id}`, headers: { token: admin.token } })
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
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>TOP STORIES</h2>

      {
        loading ?
          <>
            (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>)
          </>
          :
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-5 md:gap-x-8'>
              {
                data?.length > 0 &&
                data?.map((item, index) => (
                  <div key={index} className="shadow-2xl  rounded-2xl mb-16 pb-2 relative bg-white 
                            before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-violet-500 to-purple-500 before:left-0 before:w-full
                            before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl
                            ">
                    <Link to={`/top-stories/${item._id}`}>
                      <img className="object-cover h-[15rem] max-h-[15rem] w-full rounded-lg"  src={item.thumbnailId ? item.thumbnailId : item?.imgUrlModelDBId?.urls?.[0]} alt="profile" />
                    </Link>

                    <div className="p-5">

                      <EditTopStories item={item}/>
                      <Link to={`/top-stories/${item._id}`}>
                        <h5 className="text-black group-hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3 ">{item.heading}</h5>
                      </Link>
                      {/* <div className='flex justify-start items-center mb-3'>
                        <img src={item?.writtenBy?.profilePhotoLink} alt="profilePhotoLink" className='w-8 h-8 object-cover rounded-full border border-violet-400 mr-3' />
                        <p className="font-normal font-[Poppins]  duration-150 text-sm tracking-wide text-violet-500">{item?.writtenBy?.name}</p>
                      </div> */}
                      <Link to={`/top-stories/${item._id}`}>

                      <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-800 mb-3">{moment(item.date).format('Do MMM YYYY, dddd')} / Top Stories</p>
                      <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-700 mb-4">
                        {item.shortDescription}
                      </p>
                      </Link>


                      <div className='flex justify-between items-center my-2'>
                      <Link to={`/top-stories/${item._id}`}>
                          <Button colorScheme="teal" size="xs">
                            <p className='font-[Poppins] font-[400] flex justify-center items-center'>Read More...</p>
                          </Button>
                        </Link>

                        <Button colorScheme="red" size="xs" isDisabled={loading}
                          onClick={() => {
                            HandleDelete(item._id,admin.role);
                          }}>
                          <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              }


            </div>
          </>
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
    </div >
  )
}

export default View
