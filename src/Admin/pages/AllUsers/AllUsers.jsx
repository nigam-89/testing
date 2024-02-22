import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserAuthAPI, subScriptionProductAPI } from '../../../services/apis';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { apiConnector } from '../../../services/apiConnector';
import Sidebar from '../../components/Sidebar/SideBar'
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-hot-toast';
import { Button } from '@chakra-ui/react'

const AllUsers = () => {
    const admin = useSelector((state) => state.admin);
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [dataLoading, setDataLoading] = useState(false);
    const [isSubscriber, setIsSubscriber] = useState('');

    const [totalUsers, setTotalUsers] = useState('');

    const getData = async (pageNo = 1, pageSize = 25) => {
        window.scroll(0, 0)
        try {
            const response = await apiConnector({ method: "GET", url: UserAuthAPI.viewAllUsers_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&isSubscriber=${isSubscriber}`, headers: { token: admin.token } })
            // console.log(response.data);
            if (response.data.success) {
                setData(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
                setTotalUsers(response?.data?.count)
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    useEffect(() => {
        const getData = async (pageNo = 1, pageSize = 25) => {
            window.scroll(0, 0)
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: UserAuthAPI.viewAllUsers_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&isSubscriber=${isSubscriber}`, headers: { token: admin.token } })
                // console.log(response.data);
                if (response.data.success) {
                    setData(response.data.data)
                    // console.log(response.data.data)
                    setTotalPages(Math.ceil(response.data.count / pageSize));
                    setTotalUsers(response?.data?.count)
                }
            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            }
            setDataLoading(false);
        }
        // updateUserSubscription

        getData();
    }, [admin, isSubscriber]);


    const deleteAccount = async (id) => {
        try {
            if (admin.role !== 'superAdmin') {
                toast.error("You don't have permission to delete.");
                return;
              }
            const res = await apiConnector({ method: "DELETE", url: UserAuthAPI.deleteUnVerifiedUser_API + `/${id}`, headers: { token: admin.token } })
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


    const increasePageNo = (pageNo) => {
        if (pageNo < totalPages && pageNo > 0) {
            setSearchData([]);
            setPageNo(pageNo = pageNo + 1)
            getData(pageNo)
        }
    }

    const descreasePageNo = (pageNo) => {
        if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
            setSearchData([]);
            setPageNo(pageNo = pageNo - 1)
            getData(pageNo)
        }
    }

    const checkDate = (itemDate) => {
        let givenDate = new Date(itemDate);
        let date = new Date();
        if (givenDate >= date) {
            return "Subscribed";
        }
        else {
            return "Not Subscribed"
        }
    }

    function daysUntilFutureDate(dateString) {
        const futureDate = new Date(dateString);
        const currentDate = new Date();

        const differenceInMs = futureDate - currentDate;
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.ceil(differenceInMs / millisecondsInADay);

        return differenceInDays?.toString();
    }

    // function daysBetweenDates(oldDate, futureDate) {
    //     let date1 = new Date(oldDate);
    //     let date2 = new Date(futureDate);

    //     // To calculate the time difference of two dates
    //     let Difference_In_Time = date2.getTime() - date1.getTime();

    //     // To calculate the no. of days between two dates
    //     let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    //     return Difference_In_Days;
    // }

    // Searching Functionality starts
    const [searchItem, setSearchItem] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        // Perform the API call only when searchItem has a length greater than 0
        if (searchItem.length > 0) {
            const timer = setTimeout(async () => {
                try {
                    const response = await apiConnector({
                        method: 'GET',
                        url: UserAuthAPI.searchAllUsers_API + `?text=${searchItem}`,
                        headers: { token: admin.token },
                    });
                    if (response.data.success) {
                        setSearchData(response.data.data);
                    }
                } catch (error) {
                    if (error?.response?.data?.message) {
                        toast.error(error?.response?.data?.message);
                    }
                }
            }, 500); // Adjust the delay as needed

            // Cleanup function to clear the timer when the component unmounts or when searchItem changes
            return () => clearTimeout(timer);
        }
        // If searchItem is empty, do nothing
    }, [searchItem, admin]);

    const handleInputChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchItem(searchText);
    };

    useEffect(() => {
        if (searchItem.length === 0) {
            setSearchData([]);
        }
    }, [searchItem])
    // Searching Functionality ends

    // Change Subscription Days Starts Here
    const [subscriptionOption, setSubscriptionOption] = useState("")
    const [subsDays, setSubsDays] = useState(0)

    const handleSubscriptionOption = (e) => {
        const { value } = e.target;
        setSubscriptionOption(value)
    }

    const changeDaysInput = (e) => {
        const { value } = e.target;
        setSubsDays(value)
    }

    const updateUserSubscription = async (id, noOfdays, updateType) => {
        window.scroll(0, 0)
        setDataLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: subScriptionProductAPI.updateUserSubscription + `?id=${id}&noOfdays=${noOfdays}&updateType=${updateType}`, headers: { token: admin.token } })
            // console.log(response.data);
            if (response?.data?.success) {
                setSubscriptionOption("")
                getData();
                toast.success("Subscription Updated")
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        setDataLoading(false);
    }


    return (
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>
                    {/* table to show admin */}
                    <div className='w-full px-4'>
                        <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide'>
                            Manage Users
                        </h2>

                        {
                            dataLoading ? (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>) : (
                                (data?.length === 0) ? (
                                    <p className='text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl'>No users Found</p>)
                                    :
                                    <>
                                        {
                                            (searchData?.length === 0 && searchItem.length === 0 && data?.length > 0) ?
                                                (

                                                    <div className='bg-white rounded-xl p-4 w-full '>
                                                        <div className='flex flex-col md:flex-row p-4 justify-between w-full items-center'>

                                                            <div>
                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                    Total Users :{" "} <span className='text-blue-600 tracking-wider'>{totalUsers}</span>
                                                                </p>

                                                            </div>

                                                            <div className='w-[20rem]'>
                                                                <input
                                                                    type="text"
                                                                    value={searchItem}
                                                                    onChange={handleInputChange}
                                                                    placeholder='Type to search'
                                                                    className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1 w-full'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='mb-4 flex flex-col md:flex-row items-center justify-start gap-x-4 gap-y-2'>
                                                            <label className='text-sm font-[Poppins] font-[500]'>Filter</label>
                                                            <select className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md w-full md:w-[60%]" onChange={(e) =>
                                                                setIsSubscriber(e.target.value)} value={isSubscriber} >
                                                                <option value="">Show All Users</option>
                                                                <option value="true">Subscribed Users</option>
                                                                <option value="false">Not Subscribed Users</option>
                                                            </select>
                                                        </div>

                                                        {
                                                            data && data.length > 0 && data?.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='flex my-6 justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full border-2 border-gray-400 rounded-xl
                                        shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] '>


                                                                        <div className=' p-4 w-full  flex flex-col justify-center items-center md:block'>
                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Name</p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                                                    {item?.name?.firstname}{" "}{item?.name?.lastname}
                                                                                </p>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Email
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.email}</p>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Display Name
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.displayname}</p>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Email Verified
                                                                                </p>

                                                                                <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                                    <Button
                                                                                        colorScheme={item?.isVerified ? "green" : "red"}
                                                                                        size="sm">
                                                                                        <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                        >
                                                                                            {item?.isVerified ? "Verified" : "Not Verified"}
                                                                                        </p>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Account Status
                                                                                </p>

                                                                                <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                                    <Button
                                                                                        colorScheme={item?.status === "active" ? "green" : "red"}
                                                                                        size="sm">
                                                                                        <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                        >
                                                                                            {item?.status?.toUpperCase()}
                                                                                        </p>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Subscriptions
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                    {
                                                                                        checkDate(item?.subscriptions?.tillDate)
                                                                                    }
                                                                                </p>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Subscription Days Left
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                    {
                                                                                        checkDate(item?.subscriptions?.tillDate) === "Subscribed" ?
                                                                                            daysUntilFutureDate(item?.subscriptions?.tillDate)
                                                                                            : "0"
                                                                                    }
                                                                                </p>
                                                                            </div>

                                                                            {/* When Subscription Started */}

                                                                            {/* <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Subscription Start Date
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                    {
                                                                                        checkDate(item?.subscriptions?.tillDate) === "Subscribed" ?
                                                                                            item?.subscriptions?.createdAt.split("T")[0]
                                                                                            : "0"
                                                                                    }
                                                                                </p>
                                                                            </div> */}


                                                                            {/* Total Subs Days */}

                                                                            {/* <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Total Subscription Days
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                    {
                                                                                        // item?.subscriptions?.tillDate.split("T")[0] - item?.subscriptions?.createdAt.split("T")[0]
                                                                                        daysBetweenDates(item?.subscriptions?.createdAt, item?.subscriptions?.tillDate)
                                                                                    }
                                                                                </p>
                                                                            </div> */}


                                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Subscription End Date
                                                                                </p>
                                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                    {
                                                                                        checkDate(item?.subscriptions?.tillDate) === "Subscribed" ?
                                                                                            item?.subscriptions?.tillDate.split("T")[0]
                                                                                            : "0"
                                                                                    }
                                                                                </p>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-4 mb-8 flex-col md:flex-row items-center text-sm  md:gap-3'>
                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                    Change User Subscription
                                                                                </p>
                                                                                <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide ml-5 md:ml-0 '>
                                                                                    <select name='subscriptionOption' id='subscriptionOption' className='border px-4 py-2' onChange={handleSubscriptionOption} value={subscriptionOption}>
                                                                                        <option value={""}>Select an Option</option>
                                                                                        <option value={"Add"}>Add Days</option>
                                                                                        <option value={"Remove"}>Remove Days</option>
                                                                                    </select>
                                                                                    {
                                                                                        item?.subscriptions?._id ? subscriptionOption === "Add" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                            <button className='bg-[#37a169] text-white px-4 py-2 rounded-lg' onClick={() => { updateUserSubscription(item?.subscriptions?._id, subsDays, "Add") }}>Add</button></>) : subscriptionOption === "Remove" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                <button className='bg-red-600 text-white px-4 py-2 rounded-lg ml-4' onClick={() => { updateUserSubscription(item?.subscriptions?._id, subsDays, "Subtract") }}>Remove</button></>) : ("")
                                                                                            :
                                                                                            subscriptionOption === "Add" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                <button className='bg-[#37a169] text-white px-4 py-2 rounded-lg' onClick={() => { updateUserSubscription(item?._id, subsDays, "Add") }}>Add</button></>) : subscriptionOption === "Remove" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                    <button className='bg-red-600 text-white px-4 py-2 rounded-lg ml-4' onClick={() => { updateUserSubscription(item?._id, subsDays, "Subtract") }}>Remove</button></>) : ("")
                                                                                    }
                                                                                </div>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3 items-start  md:items-center'>


                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Change Account Status</p>

                                                                                <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  flex gap-x-3 '>

                                                                                    <ChangeAccountStatus status="active" id={item._id} admin={admin} getData={getData} pageNo={pageNo} />
                                                                                    <ChangeAccountStatus status="blocked" id={item._id} admin={admin} getData={getData} pageNo={pageNo} />


                                                                                </div>
                                                                            </div>

                                                                            <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3'>


                                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Delete Account</p>

                                                                                <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0 items-center '>
                                                                                    <Button colorScheme="red" size="sm"
                                                                                        onClick={() => deleteAccount(item._id)}>
                                                                                        <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                        >
                                                                                            Delete
                                                                                        </p>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                                :
                                                <>
                                                    <div className='bg-white rounded-xl p-4 w-full '>
                                                        <div className='flex flex-col md:flex-row p-4 justify-between w-full items-center'>

                                                            <div>
                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                    Total Users :{" "} <span className='text-blue-600 tracking-wider'>{totalUsers}</span>
                                                                </p>

                                                            </div>

                                                            <div className='w-[20rem]'>
                                                                <input
                                                                    type="text"
                                                                    value={searchItem}
                                                                    onChange={handleInputChange}
                                                                    placeholder='Type to search'
                                                                    className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1 w-full'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='mb-4 flex flex-col md:flex-row items-center justify-start gap-x-4 gap-y-2'>
                                                            <label className='text-sm font-[Poppins] font-[500]'>Filter</label>
                                                            <select className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md w-full md:w-[60%]" onChange={(e) =>
                                                                setIsSubscriber(e.target.value)} value={isSubscriber} >
                                                                <option value="">Show All Users</option>
                                                                <option value="true">Subscribed Users</option>
                                                                <option value="false">Not Subscribed Users</option>
                                                            </select>
                                                        </div>
                                                        {
                                                            (searchData.length === 0 && searchItem.length > 0) ?
                                                                <>
                                                                    <p className='text-center text-gray-900 py-6 font-[Poppins] font-[500] tracking-wide text-3xl'>No users Found</p>
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        searchData && searchData.length > 0 && searchData?.map((item, index) => {
                                                                            return (
                                                                                <div key={index} className='flex my-6 justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full border-2 border-gray-400 rounded-xl
                                        shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] '>


                                                                                    <div className=' p-4 w-full  flex flex-col justify-center items-center md:block'>
                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Name</p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                                                                {item?.name?.firstname}{" "}{item?.name?.lastname}
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Email
                                                                                            </p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.email}</p>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Display Name
                                                                                            </p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.displayname}</p>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Email Verified
                                                                                            </p>

                                                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                                                <Button
                                                                                                    colorScheme={item?.isVerified ? "green" : "red"}
                                                                                                    size="sm">
                                                                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                                    >
                                                                                                        {item?.isVerified ? "Verified" : "Not Verified"}
                                                                                                    </p>
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Account Status
                                                                                            </p>

                                                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                                                <Button
                                                                                                    colorScheme={item?.status === "active" ? "green" : "red"}
                                                                                                    size="sm">
                                                                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                                    >
                                                                                                        {item?.status?.toUpperCase()}
                                                                                                    </p>
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Subscriptions
                                                                                            </p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                                {
                                                                                                    checkDate(item?.subscriptions?.tillDate)
                                                                                                }
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Subscription Days Left
                                                                                            </p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                                {
                                                                                                    checkDate(item?.subscriptions?.tillDate) === "Subscribed" ?
                                                                                                        daysUntilFutureDate(item?.subscriptions?.tillDate)
                                                                                                        : "0"
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Subscription End Date
                                                                                            </p>
                                                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-600 ml-5 md:ml-0'>
                                                                                                {
                                                                                                    checkDate(item?.subscriptions?.tillDate) === "Subscribed" ?
                                                                                                        item?.subscriptions?.tillDate.split("T")[0]
                                                                                                        : "0"
                                                                                                }
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-4 mb-8 flex-col md:flex-row items-center text-sm  md:gap-3'>
                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                                                Change User Subscription
                                                                                            </p>
                                                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide ml-5 md:ml-0 '>
                                                                                                <select name='subscriptionOption' id='subscriptionOption' className='border px-4 py-2' onChange={handleSubscriptionOption} value={subscriptionOption}>
                                                                                                    <option value={""}>Select an Option</option>
                                                                                                    <option value={"Add"}>Add Days</option>
                                                                                                    <option value={"Remove"}>Remove Days</option>
                                                                                                </select>
                                                                                                {
                                                                                                    item?.subscriptions?._id ? subscriptionOption === "Add" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                        <button className='bg-[#37a169] text-white px-4 py-2 rounded-lg' onClick={() => { updateUserSubscription(item?.subscriptions?._id, subsDays, "Add") }}>Add</button></>) : subscriptionOption === "Remove" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                            <button className='bg-red-600 text-white px-4 py-2 rounded-lg ml-4' onClick={() => { updateUserSubscription(item?.subscriptions?._id, subsDays, "Subtract") }}>Remove</button></>) : ("")
                                                                                                        :
                                                                                                        subscriptionOption === "Add" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                            <button className='bg-[#37a169] text-white px-4 py-2 rounded-lg' onClick={() => { updateUserSubscription(item?._id, subsDays, "Add") }}>Add</button></>) : subscriptionOption === "Remove" ? (<><input placeholder='No. Of Days' className='border mx-4 p-2 text-black' onChange={changeDaysInput} />
                                                                                                                <button className='bg-red-600 text-white px-4 py-2 rounded-lg ml-4' onClick={() => { updateUserSubscription(item?._id, subsDays, "Subtract") }}>Remove</button></>) : ("")
                                                                                                }
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3 items-start  md:items-center'>


                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Change Account Status</p>

                                                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  flex gap-x-3 '>

                                                                                                <ChangeAccountStatus status="active" id={item._id} admin={admin} getData={getData} pageNo={pageNo} />
                                                                                                <ChangeAccountStatus status="blocked" id={item._id} admin={admin} getData={getData} pageNo={pageNo} />


                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3'>


                                                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Delete Account</p>

                                                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0 items-center '>
                                                                                                <Button colorScheme="red" size="sm"
                                                                                                    onClick={() => deleteAccount(item._id)}>
                                                                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                                    >
                                                                                                        Delete
                                                                                                    </p>
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                        }
                                                    </div>

                                                </>
                                        }
                                    </>

                            )
                        }
                    </div>
                </div>

                <div className='sticky bottom-0 w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
                    <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                        <div className='flex justify-between items-center gap-6'>
                            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
                            </Button>
                            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
                            </Button>
                        </div>
                        <div >
                            <p className='text-gray-900  font-[Poppins]'>{pageNo} of {totalPages}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar >
    )
}

export default AllUsers

const ChangeAccountStatus = ({ status, id, admin, getData, pageNo }) => {
    const [loading, setLoading] = useState(false);
    const UpdateOrderStatus = async (id, status) => {
        setLoading(true);
        try {
            const res = await apiConnector({
                method: "PUT", url: UserAuthAPI.changeUserAccountStatus_API + `/${id}`,
                bodyData: {
                    status: status,
                },
                headers: { token: admin.token }
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        getData(pageNo);
        setLoading(false);
    }
    return (
        <Button colorScheme={status === "active" ? "green" : "red"} size="sm"
            isLoading={loading} isDisabled={loading} onClick={() => UpdateOrderStatus(id, status)}
        >
            <p className='font-[Poppins] font-[400] tracking-wider'
            >
                {status.toUpperCase()}
            </p>
        </Button>
    )
}
