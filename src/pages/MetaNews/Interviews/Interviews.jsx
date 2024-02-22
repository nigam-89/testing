import React, { useEffect, useState } from 'react'
import UpperNavbar from './../../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../../components/global/Navbar/Navbar';
import Footer from './../../../components/global/Footer/Footer';
import InterviewCard from './InterviewCard';
import { LatestVideosAPI } from '../../../services/apis';
import { apiConnector } from '../../../services/apiConnector';
import toast from 'react-hot-toast';
import {

    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

const Interviews = () => {
    const [open, setOpen] = React.useState(0);
    const [data, setData] = useState([]);
    const [allYearsData, setAllYearsData] = useState([]);

    function removeDuplicate(allYearsData) {
        return allYearsData.filter((item, index) => allYearsData.indexOf(item) === index)
    }

    useEffect(() => {
        const getData = async (pageNo = 1, pageSize = 12) => {
            window.scroll(0, 0);
            try {
                const response = await apiConnector({ method: "GET", url: LatestVideosAPI.ViewLatestVideos_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, })
                // console.log(response.data);
                setData(response.data.data)
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        const fetchAllYears = async (pageNo = 1, pageSize = 10000) => {
            try {
                const res = await apiConnector({ method: "GET", url: LatestVideosAPI.ViewLatestVideos_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true` })
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

        fetchAllYears();
        getData();
    }, [])



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

    const handleFilteredData = async (month, year, pageNo = 1, pageSize = 12) => {

        try {
            const res = await apiConnector({ method: "GET", url: LatestVideosAPI.ViewLatestVideos_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&date=${year}-${month}-01` })

            if (res?.data?.data.length === 0) {
                setData([]);
                console.log(res?.data?.data);
                return;
            }
            setData(res.data.data);
        } catch (error) {
            // console.log(error);
            if (error?.response?.data?.message) (
                toast.error(error?.response?.data?.message)
            )
        }

    }
    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className='3xl:w-[1500px] mx-auto'>
                <div className="px-3 md:px-32 py-4 md:py-12 dark:bg-black">
                    <h2 className='font-[Poppins] text-left tracking-wider text-3xl font-[600] pb-4'>
                        LATEST VIDEOS
                    </h2>
                    <div className='flex flex-col-reverse justify-between md:flex-row'>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-8'>
                            {
                                data?.length > 0 ? (
                                    data.map((item, index) => (
                                        <InterviewCard key={index} item={item} />
                                    ))
                                ) : (<h2 className='font-[Rubik] text-xl px-4 md:text-3xl flex justify-between items-start max-md:my-8'>No Data Found</h2>)
                            }
                        </div>
                        <div className='min-w-[15%] flex flex-col py-4 md:py-2 px-8 md:mt-20 h-fit '>
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
            </div>
            <Footer />
        </div>
    )
}
export default Interviews
