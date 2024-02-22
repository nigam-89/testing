import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../../services/apiConnector';
import { MarketNewsAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import moment from 'moment';
import './ViewNews.css'

import { useSelector } from 'react-redux';

const ViewNews = () => {
  const [category, setCategory] = useState("STEEL %26 SCRAP");
  const [dataLoading, setDataLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setPageSize] = useState(15)
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo(pageNo = pageNo + 1)
      fetchAllNews(pageNo, pageSize, category);
    }
  }

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo(pageNo = pageNo - 1)
      fetchAllNews(pageNo, pageSize, category);
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    setPageNo(1);
    setPageSize(15);

    const fetchAllNews = async (pageNo = 1, pageSize = 10, category) => {
      setDataLoading(true);
      let PAGESIZE = pageSize;
      if (category === "STEEL %26 SCRAP" || category === 'IRON ORE' || category === 'COAL %26 POWER' || category === 'RENEW %26 HYDROGEN') {
        PAGESIZE = PAGESIZE * 2;
      }

      try {
        const res = await apiConnector({ method: "GET", url: MarketNewsAPI.GetMarketNews_API + `?pageNo=${pageNo}&pageSize=${PAGESIZE}&marketNewsCategory=${category}&dateDescSort=true` })
        if (res?.data?.data.length === 0) {
          setData([]);
          // console.log(res?.data?.data);
          setDataLoading(false);
          return;
        }

        if (category === "STEEL %26 SCRAP" || category === 'IRON ORE' || category === 'COAL %26 POWER' || category === 'RENEW %26 HYDROGEN') {
          setTotalPages(Math.ceil((res?.data?.count / 2) / pageSize))
        }
        else {
          setTotalPages(Math.ceil((res?.data?.count) / pageSize))
        }



        if (res?.data?.data[0]?.newsSource === "GLOBAL") {
          setData(res.data.data);
          // console.log(res.data.data)
          setDataLoading(false);
          return;
        }

        // console.log(res.data);
        let map = new Map();

        // Loop over each object in the array
        for (let obj of res.data.data) {
          // Get the date of the current object
          const date = obj.date;

          // If the map already has an array for this date, push the object to that array
          if (map.has(date)) {
            map.get(date).push(obj);
          }
          // Otherwise, add a new array to the map for this date
          else {
            map.set(date, [obj]);
          }
        }

        // Convert the map values (arrays of objects) to a single array of arrays
        let array = Array.from(map.values());

        setData(array);
      } catch (error) {
        // console.log(error);
        if (error?.response?.data?.message) (
          toast.error(error?.response?.data?.message)
        )
      }
      setDataLoading(false);
    }

    fetchAllNews(1, 15, category);
  }, [category])


  const fetchAllNews = async (pageNo = 1, pageSize = 10, category) => {
    setDataLoading(true);
    let PAGESIZE = pageSize;
    if (category === "STEEL %26 SCRAP" || category === 'IRON ORE' || category === 'COAL %26 POWER' || category === 'RENEW %26 HYDROGEN') {
      PAGESIZE = PAGESIZE * 2;
    }

    try {
      const res = await apiConnector({ method: "GET", url: MarketNewsAPI.GetMarketNews_API + `?pageNo=${pageNo}&pageSize=${PAGESIZE}&marketNewsCategory=${category}&dateDescSort=true` })
      if (res?.data?.data.length === 0) {
        setData([]);
        // console.log(res?.data?.data);
        setDataLoading(false);
        return;
      }

      if (category === "STEEL %26 SCRAP" || category === 'IRON ORE' || category === 'COAL %26 POWER' || category === 'RENEW %26 HYDROGEN') {
        setTotalPages(Math.ceil((res?.data?.count / 2) / pageSize))
      }
      else {
        setTotalPages(Math.ceil((res?.data?.count) / pageSize))
      }



      if (res?.data?.data[0]?.newsSource === "GLOBAL") {
        setData(res.data.data);
        // console.log(res.data.data)
        setDataLoading(false);
        return;
      }

      // console.log(res.data);
      let map = new Map();

      // Loop over each object in the array
      for (let obj of res.data.data) {
        // Get the date of the current object
        const date = obj.date;

        // If the map already has an array for this date, push the object to that array
        if (map.has(date)) {
          map.get(date).push(obj);
        }
        // Otherwise, add a new array to the map for this date
        else {
          map.set(date, [obj]);
        }
      }

      // Convert the map values (arrays of objects) to a single array of arrays
      let array = Array.from(map.values());

      setData(array);
    } catch (error) {
      // console.log(error);
      if (error?.response?.data?.message) (
        toast.error(error?.response?.data?.message)
      )
    }
    setDataLoading(false);
  }

  const changePageSize = (e) => {
    setPageSize(e.target.value)
    setPageNo(1);
    fetchAllNews(1, e.target.value, category);
    // console.log(1, e.target.value);
  }


  const handleNewsDelete = async (dbId, articleDbId) => {
    setDataLoading(true);
    // console.log(dbId, articleDbId)
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: MarketNewsAPI.DeletetMarketNews_API + `?dbId=${dbId}&articleDbId=${articleDbId}`, headers: { token: admin.token } })
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
    fetchAllNews(1, 15, category);
    setDataLoading(false);
  }


  return (
    <div className='w-full min-h-screen relative'>

      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>MARKET NEWS</h2>

      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 rounded-xl w-[90%] py-4 text-gray-900'>
          <div className='flex flex-col'>
            <select name="category" id="category" className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md" onChange={(e) => setCategory(e.target.value)} value={category} >
              <option value="STEEL %26 SCRAP">STEEL & SCRAP</option>
              <option value="IRON ORE">IRON ORE</option>
              <option value="COAL %26 POWER">COAL & POWER</option>
              <option value="RENEW %26 HYDROGEN">RENEW & HYDROGEN</option>
              <option value="RAIL %26 LOGISTICS">RAIL & LOGISTICS</option>
              <option value="CEMENT %26 CONSTRUCTION">CEMENT & CONSTRUCTION</option>
              <option value="AUTOMOBILE">AUTOMOBILE</option>
              <option value="AGRICULTURE">AGRICULTURE</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 rounded-2xl my-6 w-[90%]'>
          <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>
            {category.replace('%26', '&').toLocaleUpperCase()}
          </h2>


          {
            data && data?.length > 0 && data[0]?.length > 0 && data[0][0] && (data[0][0]?.newsSource === "INDIA" || data[0][0]?.newsSource === "INTERNATIONAL") &&
            ((data?.length > 0) ?
              data.map((item, index) => {
                return (
                  <div className='my-8' key={index}>
                    <h2 className='font-[Poppins] text-lg tracking-wide pb-2 text-blue-600'>
                      <span className='text-blue-800 font-[600] mr-1'>
                        {moment(item[0].date).format('Do MMM YYYY, dddd').slice(0, 8)}
                      </span>
                      {moment(item[0].date).format('Do MMM YYYY, dddd').slice(9)}
                    </h2>

                    <div className='flex flex-col md:flex-row justify-start items-start pt-2'>

                      <div className='flex-1 w-full bg-[#477f9d] min-h-[400px] max-h-[400px] overflow-y-auto animated-scrollbar rounded-tl-xl rounded-bl-xl'>
                        <h2 className='sticky top-0 z-10 bg-[#477f9d] text-center font-[Roboto] tracking-widest py-1 text-white mb-2 font-semibold text-lg border-b-[1px]'>
                          INDIA
                        </h2>
                        <div className='text-white'>
                          {(
                            item[0]?.newsSource === 'INDIA' &&
                            item[0]?.news?.map((newss, index) => {
                              return (
                                <div key={index} className='flex flex-col gap-4 p-2 border rounded-xl border-white m-2'>
                                  <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                    <p className='px-2 py-2  font-[Poppins] leading-wide font-[400] text-[0.9rem] tracking-wide'># {newss.newsHeading}</p>
                                  </a>
                                  <div className='flex justify-center items-center'>
                                    <Button size="xs" colorScheme="red" onClick={() => handleNewsDelete(item[0]._id, newss._id)}>
                                      <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                                    </Button>
                                  </div>
                                </div>
                              )
                            }))
                            ||
                            (item[1]?.newsSource === 'INDIA' &&
                              item[1]?.news?.map((newss, index) => {
                                return (
                                  <div key={index} className='flex flex-col gap-4 p-2 border rounded-xl border-white m-2'>
                                    <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                      <p className='px-2 py-2  font-[Poppins] leading-wide font-[400] text-[0.9rem] tracking-wide'># {newss.newsHeading}</p>
                                    </a>
                                    <div className='flex justify-center items-center'>
                                      <Button size="xs" colorScheme="red" onClick={() => handleNewsDelete(item[1]._id, newss._id)} >
                                        <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                                      </Button>
                                    </div>
                                  </div>
                                )
                              }))
                          }
                        </div>
                      </div>

                      <div className='flex-1 w-full bg-[#5a5a5a] min-h-[400px] max-h-[400px] overflow-y-auto animated-scrollbar rounded-tr-xl rounded-br-xl'>
                        <h2 className='sticky top-0 z-10 bg-[#5a5a5a] text-center font-[Roboto] tracking-widest py-1 text-white font-semibold text-lg mb-2 border-b-[1px]'>
                          INTERNATIONAL
                        </h2>

                        <div className='text-white'>

                          {(
                            item[0]?.newsSource === 'INTERNATIONAL' &&
                            item[0]?.news?.map((newss, index) => {
                              return (
                                <div key={index} className='flex flex-col gap-4 p-2 border rounded-xl border-white m-2'>
                                  <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                    <p className='px-2 py-2  font-[Poppins] leading-wide font-[400] text-[0.9rem] tracking-wide'># {newss.newsHeading}</p>
                                  </a>
                                  <div className='flex justify-center items-center'>
                                    <Button size="xs" colorScheme="red" onClick={() => handleNewsDelete(item[0]._id, newss._id)} >
                                      <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                                    </Button>
                                  </div>
                                </div>
                              )
                            }))
                            ||
                            (item[1]?.newsSource === 'INTERNATIONAL' &&
                              item[1]?.news?.map((newss, index) => {
                                return (
                                  <div key={index} className='flex flex-col gap-4 p-2 border rounded-xl border-white m-2'>
                                    <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                      <p className='px-2 py-2  font-[Poppins] leading-wide font-[400] text-[0.9rem] tracking-wide'># {newss.newsHeading}</p>
                                    </a>
                                    <div className='flex justify-center items-center'>
                                      <Button size="xs" colorScheme="red" onClick={() => handleNewsDelete(item[1]._id, newss._id)} >
                                        <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                                      </Button>
                                    </div>
                                  </div>
                                )
                              }))
                          }
                        </div>

                      </div>

                    </div>
                  </div>
                )
              })
              :
              <h2 className='text-lg font-[Poppins] text-center text-gray-700 font-[500] pb-4 tracking-wide'>No News Found</h2>)
          }


          {!(data && data[0] && data[0][0]) &&
            ((data?.length > 0 && (data[0]?.newsSource === "GLOBAL")) ?
              data.map((item, index) => {
                return (
                  <div className='my-8' key={index}>
                    <h2 className='font-[Poppins] text-lg tracking-wide pb-2 text-blue-600'>
                      <span className='text-blue-800 font-[600] mr-1'>
                        {moment(item.date).format('Do MMM YYYY, dddd').slice(0, 8)}
                      </span>
                      {moment(item.date).format('Do MMM YYYY, dddd').slice(8)}
                    </h2>

                    <div className='flex flex-col md:flex-row justify-start items-start pt-2'>

                      <div className='flex-1 w-full bg-[#477f9d] min-h-[400px] max-h-[400px] overflow-y-auto animated-scrollbar rounded-tl-xl rounded-bl-xl'>
                        <h2 className='sticky top-0 z-10 bg-[#477f9d] text-center font-[Roboto] tracking-widest py-1 text-white mb-2 font-semibold text-lg border-b-[1px]'>GLOBAL</h2>
                        <div className='text-white'>
                          {(
                            item?.newsSource === 'GLOBAL' &&
                            item?.news?.map((newss, index) => {
                              return (
                                <div key={index} className='flex flex-col gap-4 p-2 border rounded-xl border-white m-2'>
                                  <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                    <p className='px-2 py-2  font-[Poppins] leading-wide font-[400] text-[0.9rem] tracking-wide'># {newss.newsHeading}</p>
                                  </a>
                                  <div className='flex justify-center items-center'>
                                    <Button size="xs" colorScheme="red" onClick={() => handleNewsDelete(item._id, newss._id)} >
                                      <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                                    </Button>
                                  </div>
                                </div>
                              )
                            }))
                          }
                        </div>
                      </div>

                      <div className='flex-1 w-full bg-[#5a5a5a] min-h-[400px] max-h-[400px] overflow-hidden rounded-tr-xl rounded-br-xl'>
                        <img src={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700817585/MyMetalogic/GlobalImg_nogsfc.jpg'} alt="hy" className="object-cover min-h-full min-w-full" />
                      </div>

                    </div>
                  </div>
                )
              })
              :
              <h2 className='text-lg font-[Poppins] text-center text-gray-700 font-[500] pb-4 tracking-wide'>No News Found</h2>)
          }

        </div>
      </div>

      <div className='w-[100%] bg-gray-200 mt-5 rounded-xl'>
        <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
          <div className='flex justify-between items-center gap-6'>
            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
              <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
            </Button>
            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
              <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
            </Button>
          </div>
          <div className='flex justify-center items-center'>
            <p className='font-[Poppins] font-[400] flex justify-center items-center mr-1'>Page Size : </p>
            <select name="pageSize" id="pageSize" className="border-2 border-violet-500 outline-none focus:outline-none px-2 py-1 font-[Roboto] tracking-wide text-sm rounded-md" onChange={changePageSize} value={pageSize} >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="60">60</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="365">365</option>
              <option value="500">500</option>
            </select>
          </div>

          <div>
            <p className='text-gray-900  font-[Poppins]'>Page : {pageNo} of {totalPages}</p>
          </div>
        </div>
      </div>

    </div >
  )
}

export default ViewNews