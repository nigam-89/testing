import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IShopsAPI } from '../../../services/apis';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { apiConnector } from '../../../services/apiConnector';
import Sidebar from '../../components/Sidebar/SideBar';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-hot-toast';
import ExportToExcel from '../../components/ExportToExcel/ExportToExcel';
import { Button } from '@chakra-ui/react'
import moment from 'moment'
import OrderDetails from './OrderDetails';

const AllOrders = () => {
    const admin = useSelector((state) => state.admin);
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [dataLoading, setDataLoading] = useState(false);

    const [totalOrders, setTotalOrders] = useState('');
    const [paymentDone, setPaymentDone] = useState('');

    const getData = async (pageNo = 1, pageSize = 15) => {
        // setDataLoading(true);
        // window.scroll(0, 0)
        try {
            const response = await apiConnector({ method: "GET", url: IShopsAPI.viewAllOrders_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&paymentDone=${paymentDone}`, headers: { token: admin.token } })
            // console.log(response.data);
            if (response.data.success) {
                setData(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
                setTotalOrders(response?.data?.count)
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        // setDataLoading(false);
    }

    useEffect(() => {
        const getData = async (pageNo = 1, pageSize = 15) => {
            window.scroll(0, 0)
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: IShopsAPI.viewAllOrders_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&paymentDone=${paymentDone}`, headers: { token: admin.token } })
                // console.log(response.data);
                if (response.data.success) {
                    setData(response.data.data)
                    setTotalPages(Math.ceil(response.data.count / pageSize));
                    setTotalOrders(response?.data?.count)
                }
            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            }
            setDataLoading(false);
        }

        getData();
    }, [admin, paymentDone]);


    const deleteOrder = async (id) => {
        try {
            if (admin.role !== 'superAdmin') {
                toast.error("You don't have permission to delete.");
                return;
              }
            const res = await apiConnector({ method: "DELETE", url: IShopsAPI.deleteOrder_API + `/${id}`, headers: { token: admin.token } })
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
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>
                    {/* table to show admin */}
                    <div className='w-full px-4'>
                        <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide'>
                            All IShop Orders
                        </h2>

                        {
                            dataLoading ? (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>) : (
                                data?.length === 0 ? (
                                    <p className='text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl'>No Orders Found</p>)
                                    :
                                    (

                                        <div className='bg-white rounded-xl p-4'>
                                            <div className='flex flex-col md:flex-row p-4 justify-between w-full items-center'>
                                                <ExportToExcel data={data} fileName="IshopsOrders" />
                                                <div>
                                                    <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                        Total Orders :{" "} <span className='text-blue-600 tracking-wider'>{totalOrders}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='mb-4 flex flex-col md:flex-row items-center justify-start gap-x-4 gap-y-2'>
                                                <label className='text-sm font-[Poppins] font-[500]'>Filter</label>
                                                <select className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md w-full md:w-[60%]" onChange={(e) =>
                                                    setPaymentDone(e.target.value)} value={paymentDone} >
                                                    <option value="">Show All</option>
                                                    <option value="true">Payment Done</option>
                                                    <option value="false">Payment Not Done</option>
                                                </select>
                                            </div>
                                            {
                                                data && data.length > 0 && data?.map((item, index) => {
                                                    return (
                                                        <div key={index} className='flex my-6 justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full border-2 border-gray-400 rounded-xl
                                        shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] '>


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
                                                                    <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Order Current Status</p>
                                                                    <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                        <Button
                                                                            colorScheme={item?.orderStatus === "processing" ? "messenger" : (item?.orderStatus === "shipped" ? "pink" : 'teal')}
                                                                            size="sm">
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

                                                                <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                                    <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Amount Paid</p>

                                                                    <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                        <Button colorScheme={item?.payment?.amount ? "green" : "red"} size="sm">
                                                                            <p className='font-[Poppins] font-[400] tracking-wider'
                                                                            >
                                                                                {item?.payment?.amount ? `₹${item?.payment?.amount}` : "Not Paid"}
                                                                            </p>
                                                                        </Button>
                                                                    </div>
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

                                                                {
                                                                    !item?.payment?.amount &&
                                                                    <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3'>


                                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Delete Order</p>

                                                                        <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0 items-center '>
                                                                            <Button colorScheme="red" size="sm"
                                                                                onClick={() => deleteOrder(item._id)}>
                                                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                >
                                                                                    Delete Order
                                                                                </p>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {
                                                                    item?.payment?.amount &&
                                                                    <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3 items-start  md:items-center'>


                                                                        <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Update Order Status</p>

                                                                        <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  flex gap-x-3 '>

                                                                            <ChangeOrderStatus status="processing" id={item._id} admin={admin} getData={getData} pageNo={pageNo} />

                                                                            <ChangeOrderStatus status="shipped" id={item._id}
                                                                                admin={admin} getData={getData} pageNo={pageNo} />

                                                                            <ChangeOrderStatus status="delivered" id={item._id}
                                                                                admin={admin} getData={getData} pageNo={pageNo} />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3 items-start  md:items-center'>


                                                                    <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                        Other Details
                                                                    </p>

                                                                    <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                        <OrderDetails item={item} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
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
        </Sidebar>
    )
}

export default AllOrders

const ChangeOrderStatus = ({ status, id, admin, getData, pageNo }) => {
    const [loading, setLoading] = useState(false);
    const UpdateOrderStatus = async (id, status) => {
        setLoading(true);
        try {
            const res = await apiConnector({
                method: "PUT", url: IShopsAPI.updateOrderStatus_API,
                bodyData: {
                    dbId: id,
                    orderStatus: status,
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
        <Button colorScheme={status === "processing" ? "purple" : (status === "shipped" ? "pink" : 'linkedin')} size="sm"
            isLoading={loading} isDisabled={loading} onClick={() => UpdateOrderStatus(id, status)}
        >
            <p className='font-[Poppins] font-[400] tracking-wider'
            >
                {status.toUpperCase()}
            </p>
        </Button>
    )
}
