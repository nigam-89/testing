import React, { useEffect, useState } from 'react'
import Footer from '../../components/global/Footer/Footer'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar';
import Navbar from '../../components/global/Navbar/Navbar';
import StickyHeading from './StickyHeading';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";



import { apiConnector } from '../../services/apiConnector';
import { MarketNewsAPI } from '../../services/apis';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CementConstruction = () => {

    const [open, setOpen] = React.useState(0);
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);

    const user = useSelector((state) => state.user)
    
    const admin = useSelector((state) => state.admin)
    
    let category = "CEMENT %26 CONSTRUCTION"



  const [allYearsData, setAllYearsData] = useState([]);


  function removeDuplicate(allYearsData) {
    return allYearsData.filter((item, index) => allYearsData.indexOf(item) === index)
  }

  useEffect(() => {
    window.scroll(0, 0);

    const fetchAllNews = async (pageNo = 1, pageSize = 31, category) => {
      setDataLoading(true);

      try {
        const res = await apiConnector({ method: "GET", url: MarketNewsAPI.GetMarketNews_API + `?marketNewsCategory=${category}&dateDescSort=true` })
        if (res?.data?.data.length === 0) {
          setData([]);
          console.log(res?.data?.data);
          setDataLoading(false);
          return;
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

    const fetchAllYears = async (pageNo = 1, pageSize = 10000, category = "CEMENT %26 CONSTRUCTION") => {
      try {
        const res = await apiConnector({ method: "GET", url: MarketNewsAPI.GetMarketNews_API + `?pageNo=${pageNo}&pageSize=${pageSize}&marketNewsCategory=${category}&dateDescSort=true` })
        let arr = [];

        // Store all years 
        res?.data?.data.map((item) => (
          arr.push(item.date.split('-')[0])
        ));
        arr = removeDuplicate(arr)
        setAllYearsData(arr)

      } catch (error) {

      }
    }

    const fetchCurrentMonthData = async () => {
        setDataLoading(true);
        try {
            const currentMonth = moment().format("MM");
            const currentYear = moment().format("YYYY");
            const res = await apiConnector({
                method: "GET",
                url: MarketNewsAPI.GetMarketNews_API + `?marketNewsCategory=${category}&dateDescSort=true&date=${currentYear}-${currentMonth}-01`,
            });
            if (res?.data?.data.length === 0) {
                setData([]);
                setDataLoading(false);
                return;
            }
            setData(res.data.data);
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        }
        setDataLoading(false);
    };

    fetchCurrentMonthData();
    fetchAllYears();
}, [category]);

  function handleOpen(value) {
    setOpen(open === value ? 0 : value);
  }


  let allMonths = [
    { month: "January", count: "1" },
    { month: "February", count: "2" },
    { month: "March", count: "3" },
    { month: "April", count: "4" },
    { month: "May", count: "5" },
    { month: "June", count: "6" },
    { month: "July", count: "7" },
    { month: "August", count: "8" },
    { month: "September", count: "9" },
    { month: "October", count: "10" },
    { month: "November", count: "11" },
    { month: "December", count: "12" }
  ]


  const handleFilteredData = async (month, year) => {
    try {
        setDataLoading(true);
        const res = await apiConnector({
            method: "GET",
            url: MarketNewsAPI.GetMarketNews_API + `?marketNewsCategory=${category}&dateDescSort=true&date=${year}-${month}-01`,
        });
        if (res?.data?.data.length === 0) {
            setData([]);
            setDataLoading(false);
            return;
        }
        setData(res.data.data);
    } catch (error) {
        console.error(error);
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        }
    }
    setDataLoading(false);
};


    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <StickyHeading img={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700817392/MyMetalogic/CEMENT_CONSTRUCTION_uzqn3c.jpg'} title="Cement & Construction" textColor="white" />
            <div className='3xl:w-[1500px] mx-auto'>
                <div className=' px-3 md:px-14 pb-4 md:pb-8 flex flex-col-reverse  md:flex-row justify-between md:gap-8'>
                    {
                        (user.hasSubscription || admin.token) ? (
                            <div className='md:max-w-[90%] w-[100%]'>
                                {
                                    !(data && data[0] && data[0][0]) &&
                                    (
                                        (data?.length > 0 && (data[0]?.newsSource === "GLOBAL")) ?
                                            data.map((item, index) => {
                                                return (
                                                    <div className='my-8' key={index}>
                                                        <h2 className='font-[Poppins] text-lg tracking-wide font-[600] pb-2 text-[#243b77]'>
                                                            <span className='text-[#243b77] font-[600] mr-1'>
                                                                {moment(item.date).format('Do MMM YYYY, dddd').slice(0, 8)}
                                                            </span>
                                                            {moment(item.date).format('Do MMM YYYY, dddd').slice(8)}
                                                        </h2>

                                                        <div className='flex flex-col md:flex-row justify-start items-start pt-2'>

                                                            <div className='w-[100%] flex-1 bg-[#243b77] md:min-h-[500px] md:max-h-[500px] overflow-y-auto'>
                                                                <h2 className='text-center font-[Roboto] tracking-widest py-3 text-white font-semibold text-lg mb-2 border-b-[1px]'>GLOBAL</h2>
                                                                <div className='text-white px-6'>
                                                                    {(
                                                                        item?.newsSource === 'GLOBAL' &&
                                                                        item?.news?.map((newss, index) => {
                                                                            return (
                                                                                <div key={index} className='flex flex-col gap-4 '>
                                                                                    <a href={newss.newsLink} target="_blank" rel="noreferrer">
                                                                                        <p className='pb-4 pt-1  font-[Rubik] tracking-normal font-[400] text-lg'># {newss.newsHeading}</p>
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        }))
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className='w-[100%] flex-1 bg-[#243b77] md:min-h-[500px] md:max-h-[500px] overflow-y-hidden'>
                                                                <img src={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700817585/MyMetalogic/GlobalImg_nogsfc.jpg'} alt="hy" className="object-cover min-h-full min-w-full" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <h2 className='text-lg font-[Poppins] text-center text-gray-700 font-[500] pb-4 tracking-wide'>No News Found</h2>
                                    )
                                }
                            </div>
                        ) : (
                            <div className='w-[95%] mx-auto flex flex-col justify-center gap-4 font-[Rubik] mt-4'>
                                <p className='font-extrabold text-md md:text-2xl'>
                                    My apologies, but you haven't joined us as a member yet.
                                </p>
                                <Link to={'/subscribed'}>
                                    <p className='animate-pulse px-4 py-2 bg-[#243b77] w-fit text-white cursor-pointer shadow-2xl duration-300 transition-all hover:scale-[0.97]'>Become a Member</p>
                                </Link>
                            </div>
                        )
                    }



                    <div className='min-w-[15%] flex flex-col py-4 md:py-20 px-8 md:mt-20 h-fit'>
                        <h2 className='text-[#243b77] font-semibold font-[Rubik] text-lg'>Archive</h2>
                        <div className='flex md:flex-col'>
                            {
                                allYearsData.length === 0 ? (<h2 className='font-[Rubik] text-sm '>No Data Found</h2>) : (
                                    allYearsData.map((yearData, index) => {
                                        return (
                                            <Accordion open={open === index + 1} key={index}>
                                                <AccordionHeader className='mt-2 p-0' onClick={() => handleOpen(index + 1)}>{yearData}</AccordionHeader>
                                                <AccordionBody className="m-0 p-0 pl-4">
                                                    <ul className='mt-0'>
                                                        {
                                                            allMonths.length > 0 &&
                                                            allMonths.map((item, index) => {
                                                                return (
                                                                    <li key={index} className='font-[Rubik] hover:underline cursor-pointer' onClick={() => handleFilteredData(item.count, yearData)}>{item.month}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </AccordionBody>
                                            </Accordion>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CementConstruction
