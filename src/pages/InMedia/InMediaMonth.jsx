import React, { useEffect, useState } from 'react'
import UpperNavbar from './../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../components/global/Navbar/Navbar';
import Footer from './../../components/global/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { InMediaAPI } from '../../services/apis';
import moment from 'moment';
import toast from 'react-hot-toast';
import {

    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

const InMediaMonth = () => {


    const { month_year } = useParams();
    // console.log("Month" , month_year.split("-")[0])
    // console.log("Year" , month_year.split("-")[1])

    let month = month_year.split("-")[0]
    let year = month_year.split("-")[1]

    // const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(0);

    const [allYearsData, setAllYearsData] = useState([]);

    function removeDuplicate(allYearsData) {
        return allYearsData.filter((item, index) => allYearsData.indexOf(item) === index)
    }

    useEffect(() => {
        const fetchData = async (pageNo = 1, pageSize = 12) => {
            window.scroll(0, 0);
            // setLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: InMediaAPI.ViewMedia_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&date=${month_year.split("-")[1]}-${month_year.split("-")[0]}-01`, })
                console.log("response", response)
                setData(response?.data?.data)
                // setTotalPages(Math.ceil(response.data.count / pageSize))
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
            // setLoading(false);
        }
        const fetchAllYears = async (pageNo = 1, pageSize = 10000) => {
            try {
                const res = await apiConnector({ method: "GET", url: InMediaAPI.ViewMedia_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true` })
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
        fetchData();
    }, [month_year]);



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


    let updatedTitle = "";

    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className="px-3 md:px-32 py-4 md:py-12 3xl:w-[1500px] mx-auto">
                <h2 className='font-[Poppins] text-left tracking-wider text-3xl font-[600] pb-4'>
                    IN MEDIA
                </h2>
                <h2 className='font-[Questrial] tracking-wider text-xs font-[600] pb-4'>
                    {
                        allMonths.map((obj, index) => {
                            if (obj.count === month) {
                                return (
                                    <p key={index} className='inline'>{obj.month}</p>
                                )
                            }
                            return "";
                        })
                    }
                    - {year}
                </h2>
                <div className='flex flex-col-reverse justify-between md:flex-row'>


                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-5 md:gap-x-8'>
                        {
                            data?.map((item, index) => {

                                updatedTitle = item?.heading.split(" ").join("-")

                                return (
                                    <Link to={`/in-media/${updatedTitle}/${item._id}`}>
                                        <div key={index} className="shadow-2xl  rounded-2xl mb-16 pb-2 relative group 
                            before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-violet-500 to-purple-500 before:left-0 before:w-full
                            before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl
                            dark:border-2 dark:border-white dark:hover:bg-white dark:duration-200
                            ">
                                            <img className="object-cover max-h-[15rem] h-[15rem] w-full rounded-lg" src={item.thumbnailId ? item.thumbnailId : item?.imgUrlModelDBId?.urls?.[0]} alt="" />
                                            <div className="p-5">
                                                <h5 className="text-black group-hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3 dark:text-white dark:group-hover:text-black">{item.heading}</h5>
                                                <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-800 mb-3 dark:text-white dark:group-hover:text-black">{moment(item.date).format('Do MMM YYYY, dddd')} / InMedia</p>
                                                <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-700 mb-4  dark:text-white dark:group-hover:text-black">{item.description.slice(0, 100)}...</p>
                                                <button className='bg-gradient-to-r from-violet-500 to-purple-500 text-white py-2 px-3 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-gray-100 group-hover:text-black duration-150 rounded-lg text-sm font-[Poppins] font-[500]'>
                                                    Read More...
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
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
                                                                    // <li key={index} className='font-[Rubik] hover:underline cursor-pointer' onClick={() => handleFilteredData(item.count, yearData)}>{item.month}</li>
                                                                    <Link to={`/in-media-month/${item.count}-${yearData}`}>
                                                                        <li key={index} className='font-[Rubik] hover:underline cursor-pointer'>{item.month}</li>
                                                                    </Link>
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




                {/* <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
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
                            <p className='text-black  font-[Poppins]'>{pageNo} of {totalPages}</p>
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </div>
    )
}


export default InMediaMonth