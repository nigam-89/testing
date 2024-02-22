import React, { useEffect, useState } from 'react'
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar';
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar';
import StickyHeading from './StickyHeading';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import { apiConnector } from '../../services/apiConnector';
import { PortsCongestionAndWaitingAPI } from '../../services/apis';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PortsCongestionWaiting = () => {
   

    const [open, setOpen] = React.useState(0);

    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);


    const [allYearsData, setAllYearsData] = useState([]);




    function removeDuplicate(allYearsData) {
        return allYearsData.filter((item, index) => allYearsData.indexOf(item) === index)
    }

    useEffect(() => {
        window.scroll(0, 0);

        const fetchAllYears = async (pageNo = 1, pageSize = 10) => {
            try {
                const res = await apiConnector({ method: "GET", url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?dateDescSort=true` })
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

        const fetchAllNews = async (pageNo = 1, pageSize = 10,) => {
            setDataLoading(true);
            let PAGESIZE = pageSize;

            try {
                const response = await apiConnector({ method: "GET", url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?pageNo=${pageNo}&pageSize=${PAGESIZE}&dateDescSort=true` })
                setData(response.data.data)
                console.log("DATA RESPONSE", response.data.data)
            } catch (error) {
                // console.log(error);
                if (error?.response?.data?.message) (
                    toast.error(error?.response?.data?.message)
                )
            }
            setDataLoading(false);
        }
        const fetchCurrentMonthData = async () => {
            setDataLoading(true);
            try {
                const currentMonth = moment().format("MM");
                const currentYear = moment().format("YYYY");
                const res = await apiConnector({
                    method: "GET",
                    url:  PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?dateDescSort=true&date=${currentYear}-${currentMonth}-01`,
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
      }, []);

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


    // const handleFilteredData = async (month, year, pageNo = 1, pageSize = 10000) => {

    //     try {
    //         const response = await apiConnector({ method: "GET", url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&date=${year}-${month}-01` })
    //         setData(response.data.data)
    //         console.log("DATA RESPONSE", response.data.data)
    //     } catch (error) {
    //         // console.log(error);
    //         if (error?.response?.data?.message) (
    //             toast.error(error?.response?.data?.message)
    //         )
    //     }

    // }
    const handleFilteredData = async (month, year) => {
        try {
            setDataLoading(true);
            const res = await apiConnector({
                method: "GET",
                url: PortsCongestionAndWaitingAPI.viewAllPortsCongWaitingMarketNews_API + `?dateDescSort=true&date=${year}-${month}-01`,
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

    const user = useSelector((state) => state.user)
    const admin = useSelector((state) => state.admin)


    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <StickyHeading img={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700817396/MyMetalogic/PORTs_CONGESTION_WAITING_cs08pr.jpg'} title="Ports Congestion & Waiting" textColor="white" />
            <div className='3xl:w-[1500px] mx-auto'>
                <div className=' px-3 md:px-14 pb-4 md:pb-8 flex flex-col-reverse  md:flex-row justify-between md:gap-8'>
                    <div className='md:min-w-[80%] md:max-w-[80%] flex flex-col md:flex-wrap md:flex-row md:gap-24'>
                        {
                            (user.hasSubscription || admin.token) ? (
                                data.length === 0 ? (<h2 className='text-3xl font-[Rubik] text-center text-gray-700 font-[500] pb-4 tracking-wide mt-20'>No Data Found</h2>) :
                                    (
                                        dataLoading ? (<h1>Loading</h1>) : data && data?.length > 0 &&
                                            ((data?.length > 0) ?
                                                data.map((item, index) => {
                                                    return (
                                                        <div className='my-8 w-[100%] md:w-[40%] md:max-w-[40%] md:min-w-[fit]' key={index}>
                                                            {/* date */}
                                                            <h2 className='font-[Poppins] text-lg tracking-wide pb-2 text-[#243b77]'>
                                                                <span className='text-[#243b77] font-[600]'>{moment(item.date).format('Do MMM YYYY, dddd')}</span>
                                                            </h2>

                                                            <div className='flex flex-col gap-8 bg-[#243b77] md:min-h-[500px] md:max-h-[500px] overflow-y-auto px-2'>
                                                                <h2 className='text-center font-[Roboto] tracking-widest py-3 text-white mb-2 font-semibold text-lg border-b-[1px]'>{item.description}</h2>
                                                                <div className='text-white px-6 font-bold text-lg font-[Roboto] py-4 space-y-2'>
                                                                    {
                                                                        item.ports.length > 0 ? (
                                                                            item.ports.map((port, key) => {
                                                                                return (
                                                                                    <div key={index} className='flex justify-between items-center fon'>
                                                                                        <p>{port.portName}</p>
                                                                                        <p className='tracking-widest'>{port.portTimeValue}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        ) : (<h2>No Data Found</h2>)
                                                                    }
                                                                </div>
                                                                <h2 className='text-start font-[Roboto] tracking-widest py-3 text-white mb-2 font-semibold text-lg border-t-[1px]'>{item.note}</h2>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <h2 className='text-lg font-[Poppins] text-center text-gray-700 font-[500] pb-4 tracking-wide'>No News Found</h2>)
                                    )
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

                    </div>
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

export default PortsCongestionWaiting
