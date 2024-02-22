import React, { useEffect } from 'react'
import Footer from '../../../components/global/Footer/Footer'
import Navbar from '../../../components/global/Navbar/Navbar'
import UpperNavbar from '../../../components/global/UpperNavbar/UpperNavbar'
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { IShopsAPI, UserAuthAPI } from '../../../services/apis';
import UpdatePassword from './UpdatePassword';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../../../features/UserSlice';
import moment from 'moment'


const Profile = () => {
    const user = useSelector((state) => state.user);
    const [data, setData] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser(null))
        navigate('/sign-in')
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await apiConnector({
                    method: 'GET',
                    url: UserAuthAPI.userGetMyProfile_API,
                    headers: {
                        token: user.token
                    }
                })
                // console.log(res?.data);
                if (res?.data?.success) {
                    setData((prev) => {
                        return {
                            ...prev,
                            userData: res?.data?.data
                        }
                    });
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message);
            }
        };

        const getOrders = async () => {
            try {
                const res = await apiConnector({
                    method: 'GET',
                    url: IShopsAPI.getAllMyOrders_API + `?dateDescSort=true`,
                    headers: {
                        token: user.token
                    }
                })
                // console.log(res?.data);
                if (res?.data?.success) {
                    setData((prev) => {
                        return {
                            ...prev,
                            orders: res?.data?.data
                        }
                    });
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message);
            }
        };


        getData();
        getOrders();
    }, [user.token])

    function daysUntilFutureDate(dateString) {
        const futureDate = new Date(dateString);
        const currentDate = new Date();

        const differenceInMs = futureDate - currentDate;
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.ceil(differenceInMs / millisecondsInADay);

        return differenceInDays?.toString();
    }


    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className='auth_bg relative'>
                <div className='min-h-[20vh] px-4 md:px-16 py-3 md:py-6 h-full w-full  3xl:w-[1500px] mx-auto '>
                    <h2 className='font-[Poppins] text-white tracking-wider text-3xl text-center font-[500] py-2 mb-4'>
                        DASHBOARD
                    </h2>

                    {/* Profile */}
                    <div className='border-2 border-gray-300 p-3 rounded-xl bg-white'>
                        <h2 className='font-[Poppins] text-gray-900 tracking-wider text-2xl font-[500] py-2'>
                            PROFILE
                        </h2>

                        <div className='shadow-[5px_5px_0px_0px_rgba(109,40,217)] hover:shadow-none duration-200 flex justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full pb-2 border-2 border-blue-900 p-4 rounded-xl'>


                            <div className='p-1 rounded-sm flex justify-center items-center h-[6rem] md:w-[10rem] w-[6rem] md:h-[10rem] relative'>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name.firstname}+${user.name.lastname}&background=random&rounded=true&bold=true&color=#fff`}
                                    alt=""
                                    className='h-full object-contain w-full'
                                />
                            </div>

                            <div className='md:border-l-2 md:border-r-2 border-gray-300 p-4 w-full md:w-[50%] md:ml-12 flex flex-col justify-center items-center md:block'>
                                <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                    <p className='flex-[40%] font-[Poppins] font-[500] tracking-wide'>First Name</p>
                                    <p className='flex-[60%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{user?.name?.firstname}</p>
                                </div>
                                <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm md:gap-3'>
                                    <p className='flex-[40%] font-[Poppins] font-[500]'>Last Name</p>
                                    <p className='flex-[60%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{user?.name?.lastname}</p>
                                </div>
                                <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm md:gap-3'>
                                    <p className='flex-[40%] font-[Poppins] font-[500]'>Email</p>
                                    <p className='flex-[60%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{user?.email}</p>
                                </div>

                                <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm md:gap-3'>
                                    <p className='flex-[40%] font-[Poppins] font-[500]'>Membership Status</p>
                                    <p className='flex-[60%] font-[Poppins] font-[500] underline tracking-wide text-violet-500 ml-5 md:ml-0'>
                                        {user?.hasSubscription ? "Active" : "Inactive"}</p>
                                </div>

                                <div className='text-gray-900 flex justify-center mt-6 md:justify-end w-full my-2'>
                                    <Button colorScheme="teal" size="sm" onClick={handleLogout}>
                                        <p className='font-[Poppins] font-[400] tracking-wider'
                                        >
                                            Logout</p>
                                    </Button>
                                </div>

                                <div className='text-gray-900 flex justify-center mt-3 md:justify-end w-full my-2'>
                                    <UpdatePassword />
                                </div>

                            </div>

                            {
                                !user?.hasSubscription &&
                                <div className=' p-4 w-full md:w-max md:ml-12 flex flex-col justify-center items-center md:block'>
                                    <p className='font-[Poppins] font-[500] tracking-wider text-violet-500 text-sm'>Not a Member? Click Below to get Membership.</p>

                                    <Link to='/subscribed' className='text-gray-900 flex justify-center mt-6 md:justify-start w-full my-2 animate-bounce'>
                                        <Button colorScheme="green" size="sm">
                                            <p className='font-[Poppins] font-[400] tracking-wider'
                                            >
                                                Become a Member
                                            </p>
                                        </Button>
                                    </Link>

                                </div>
                            }

                            {
                                user?.hasSubscription &&
                                <div className=' p-4 w-full md:w-max md:ml-12 flex flex-col justify-center items-center md:block'>
                                    <p className='font-[Poppins] font-[500] tracking-wider text-violet-500 text-sm'>
                                        Your Membership will exprire on : {" "}<br />
                                        <span className='underline text-red-600'>
                                            {moment(data?.userData?.subscriptions?.tillDate).format('Do MMM, YYYY')}
                                        </span>
                                    </p>

                                    <p className='font-[Poppins] font-[500] tracking-wider text-violet-500 text-sm'>
                                        Membership will Expire After : {" "}
                                        <span className='underline text-red-600'>
                                            {daysUntilFutureDate(data?.userData?.subscriptions?.tillDate)}
                                        </span>
                                        {" "} Days.
                                    </p>

                                    <Link to='/subscribed' className='text-gray-900 flex justify-center mt-6 md:justify-start w-full my-2 animate-bounce'>
                                        <Button colorScheme="green" size="sm">
                                            <p className='font-[Poppins] font-[400] tracking-wider'
                                            >
                                                CONGRATULATIONS, YOU ARE A MEMBER
                                            </p>
                                        </Button>
                                    </Link>

                                </div>
                            }
                        </div>

                    </div>

                    {/* Orders */}
                    <div className='border-2 my-4 border-gray-300 p-3 rounded-xl bg-white'>
                        <h2 className='font-[Poppins] text-gray-900 tracking-wider text-2xl font-[500] py-2'>
                            ALL ORDERS
                        </h2>

                        {
                            (data && data?.orders?.length > 0) ?
                                <>
                                    {
                                        data?.orders?.map((item, index) => (
                                            <div key={index} className='flex my-6 justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full border-2 border-gray-400 rounded-xl
                                        shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] hover:shadow-none duration-200'>


                                                <div className=' p-4 w-full  flex flex-col justify-center items-center md:block'>
                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Product</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{item?.productId?.heading}</p>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Order Id</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?._id}</p>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Order Status</p>
                                                        <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                            <Button colorScheme="telegram" size="sm">
                                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                                >
                                                                    {item?.orderStatus.toUpperCase()}
                                                                </p>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Name</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                            {item?.shippingInfo?.name}
                                                        </p>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Mobile Number</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                            {item?.shippingInfo?.phoneNumber}
                                                        </p>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Ordered On</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{moment(item?.createdAt).format('Do MMM, YYYY')}</p>
                                                    </div>

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Amount Paid</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>{item?.payment?.amount ? `₹${item?.payment?.amount}` : "Not Paid"}</p>
                                                    </div>

                                                    {
                                                        item?.payment?.amount &&
                                                        <>
                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Payment Id</p>
                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.payment?.paymentId}</p>
                                                            </div>

                                                            <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                                <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Payment Status</p>
                                                                <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-blue-500 ml-5 md:ml-0'>{item?.payment?.paymentStatus}</p>
                                                            </div>
                                                        </>
                                                    }

                                                    <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Shipping Address</p>
                                                        <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                            {item?.shippingInfo?.address}
                                                            {" , "}
                                                            {item?.shippingInfo?.city}
                                                            {" , "}
                                                            {item?.shippingInfo?.state}
                                                            {" , "}
                                                            {item?.shippingInfo?.country}
                                                            {" , "}
                                                            {item?.shippingInfo?.pincode}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </>

                                :
                                <div className='flex justify-center md:justify-start items-center md:items-start flex-col gap-6 w-full border-2 border-gray-400 p-4 rounded-xl'>
                                    <h2 className='font-[Poppins] text-gray-900 tracking-wider text-xl font-[500] py-2'>
                                        NO ORDERS FOUND
                                    </h2>
                                </div>
                        }
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Profile