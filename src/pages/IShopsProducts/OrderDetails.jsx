import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../../components/global/Footer/Footer';
import Navbar from '../../components/global/Navbar/Navbar';
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar';
import { useState, useEffect } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { IShopsAPI, PaymentAPI } from '../../services/apis';
import { toast } from 'react-hot-toast';
import { BsFillLightningChargeFill } from 'react-icons/bs'
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


const OrderDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', city: '', state: '', country: '', pincode: '', phoneNumber: '' })
    const [formLoading, setFormLoading] = useState(false);

    const user = useSelector((state) => state.user)

    let noOfItems = sessionStorage.getItem("noOfItems")

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    useEffect(() => {
        if (!params.id) {
            toast.error('Unauthorized Access');
            return;
        }
        const getData = async () => {
            try {
                const res = await apiConnector({
                    method: 'GET',
                    url: IShopsAPI.ViewSingleProduct_API + `?dbId=${params.id}`,
                })
                if (res?.data?.success) {
                    setData(res?.data?.data);
                    setPrice(res?.data?.data?.discountedPrice)
                    // console.log(res?.data?.data);
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message);
            }

            setLoading(false);
        };
        getData();
    }, [params])

    const changeHandler = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        setFormLoading(true)
        e.preventDefault()
        // console.log(formData);
        try {
            let response = await apiConnector({
                method: "POST",
                url: IShopsAPI.initOrderProduct_API,
                bodyData: {
                    shippingInfo: formData,
                    productId: params.id,
                    orderedBy: user._id,
                },
            });
            // console.log(response.data);
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                await handlePayment(params.id, response?.data?.data?._id);
                setFormData({ name: '', address: '', city: '', state: '', country: '', pincode: '', phoneNumber: '' });
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setFormLoading(false)
    }

    const handlePayment = async (id, orderId) => {
        try {
            const productData = {
                productDbId: id,
                category: "IShop",
                numOfItems: noOfItems
            };

            const orderResponse = await apiConnector({
                method: 'POST',
                url: PaymentAPI.IShopPayment_API,
                bodyData: productData,
            })

            initPayment(orderResponse.data.data, orderId);
        } catch (error) {
            console.error("Error processing payment: ", error);
            toast.error("Error processing payment");
        }
    };

    const initPayment = async (data, orderId) => {
        // console.log(data);

        // Fetch the Razorpay key_id from your backend
        try {
            const keyResponse = await apiConnector({
                method: 'GET',
                url: PaymentAPI.getPaymentKey_API
            })

            if (!keyResponse.data.success) {
                console.error("Failed to retrieve key_id.");
                return;
            }

            const key_id = keyResponse.data.key;
            // console.log("key_id: " + key_id);

            const options = {
                key: key_id,
                amount: data.discountedPrice || data.price,
                currency: data.currency,
                name: data.heading,
                description: data?.heading,
                order_id: data.id,
                handler: async (response) => {
                    try {
                        const verifyResponse = await apiConnector({
                            method: 'POST',
                            url: PaymentAPI.VerifyPayment_API,
                            bodyData: response,
                        })
                        // console.log(verifyResponse.data);
                        savePayment(verifyResponse.data, orderId)
                    } catch (error) {
                        console.error("Error verifying payment: ", error);
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error fetching key_id: ", error);
        }
    };

    const savePayment = async (data, orderId) => {
        // console.log({ data, orderId });
        // console.log(data?.data);
        const { razorpay_order_id, razorpay_payment_id } = data?.data;
        if (razorpay_order_id && razorpay_payment_id) {
            try {
                await apiConnector({
                    method: 'POST',
                    url: PaymentAPI.savePaymentInfoForProductPurchase_API,
                    bodyData: {
                        razorpay_order_id: razorpay_order_id,
                        razorpay_payment_id: razorpay_payment_id,
                        orderDBId: orderId,
                        amount: price * noOfItems,
                        userDBId: user._id,
                    }
                });

                // console.log(res);
                toast.success("Payment Done, Order Placed Successfully")
                navigate('/ishop')
            } catch (error) {
                toast.error(error?.response?.data?.message);
                console.log(error);
            }
        }
        else {
            toast.error("Payment not verified")
        }

    }

    return (
        <div className=''>
            <UpperNavbar />
            <Navbar />
            <div className='auth_bg relative'>
                {
                    loading ?
                        <div className='min-h-[20vh] px-4 md:px-16 py-3 md:py-6 h-full w-full 3xl:w-[1500px] mx-auto'>
                            <h2 className='font-[Poppins] tracking-wider text-white text-3xl text-center font-[500] py-2'>
                                Getting Details...
                            </h2>
                        </div>
                        :
                        <>
                            {
                                data &&
                                <div className='min-h-[20vh] px-4 md:px-16 py-3 md:py-6 h-full w-full  3xl:w-[1500px] mx-auto'>
                                    <h2 className='font-[Poppins] text-white tracking-wider text-3xl text-center font-[500] py-2 mb-4'>
                                        ORDER SUMMARY
                                    </h2>

                                    {/* Order Page */}
                                    <div className='border-2 border-gray-300 p-3 rounded-xl bg-white'>

                                        <div className='flex  justify-start items-center md:items-start lg:flex-row flex-col gap-6 w-full pb-2 border-b-2 border-gray-300'>

                                            <div className='flex-1 flex justify-between items-start flex-col gap-4 h-fit md:w-[50%] w-full'>

                                                <div className='flex justify-between items-start h-full w-full p-2'>

                                                    <div className='border-2 border-gray-300 rounded-xl bg-gray-200 flex-[70%] flex justify-center items-center w-full 
                                                h-[15rem] md:h-[20rem] lg:h-[30rem] relative'>
                                                        {/* <img src={data?.imgUrlModelDBId?.urls[0]} alt="" className='h-full object-cover w-full rounded-xl' /> */}
                                                        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                                                            {
                                                                data?.imgUrlModelDBId?.urls?.map((url, index) => {
                                                                    return (
                                                                        <SwiperSlide key={index}><img key={index} src={url} alt="ishop" className='object-cover w-full h-full ' /></SwiperSlide>
                                                                    )
                                                                })
                                                            }
                                                        </Swiper>
                                                    </div>

                                                    {/* <div className='flex-[30%] rounded-sm flex justify-between items-center
                                                flex-col gap-y-1 md:gap-y-3 w-full mx-2
                                                h-[15rem] md:h-[20rem] lg:h-[30rem]'>

                                                    <div className='border-2 border-gray-200 rounded-xl flex justify-center items-center w-full 
                                                h-[4.8rem] md:h-[6rem] lg:h-[9rem] relative'>
                                                        <img src={data?.imgUrlModelDBId?.urls[1]} alt="" className='h-full object-cover w-full rounded-xl' />
                                                    </div>

                                                    <div className='border-2 border-gray-200 rounded-xl flex justify-center items-center w-full 
                                                h-[4.8rem] md:h-[6rem] lg:h-[9rem] relative'>
                                                        <img src={data?.imgUrlModelDBId?.urls[2]} alt="" className='h-full object-cover w-full rounded-xl' />
                                                    </div>

                                                    <div className='border-2 border-gray-200 rounded-xl flex justify-center items-center w-full 
                                                h-[4.8rem] md:h-[6rem] lg:h-[9rem] relative'>
                                                        <img src={data?.imgUrlModelDBId?.urls[3]} alt="" className='h-full object-cover w-full rounded-xl' />
                                                    </div>

                                                </div> */}

                                                </div>

                                                <div className='flex-1'>
                                                    <p className='text-lg md:text-2xl font-[Poppins] font-[500] text-gray-900 my-1'>
                                                        {
                                                            data?.heading.length > 100 ?
                                                                data?.heading.slice(0, 100) + "..." :
                                                                data?.heading
                                                        }
                                                    </p>
                                                    {/* <p className='text-xs md:text-sm  font-[Poppins] font-[500] text-violet-500 my-1'>
                                                    {
                                                        data?.description.length > 150 ?
                                                            data?.description.slice(0, 150) + "..." :
                                                            data?.description
                                                    }
                                                </p> */}
                                                    <p className='text-2xl font-[Poppins] font-[500] text-gray-900 mt-6 mb-5'>
                                                        <BsFillLightningChargeFill className='mr-1 text-violet-600 inline text-[0.8rem]' />
                                                        &#8377;{data?.discountedPrice * noOfItems}
                                                        <span className='text-sm ml-1 text-violet-600 relative before:h-[2px] before:w-full before:absolute before:bg-violet-400 before:top-[0.6rem] before:left-0'> &#8377;{data?.price * noOfItems}</span>
                                                    </p>
                                                </div>

                                            </div>



                                            <div className='mt-4 flex-1 lg:border-l-2 lg:border-gray-300 md:pl-4 
                                        flex flex-col justify-center items-center md:w-[50%] w-full'>
                                                <h2 className='font-[Poppins] tracking-wider text-2xl text-center font-[500] py-2 mb-4'>
                                                    FILL YOUR DETAILS
                                                </h2>

                                                <form onSubmit={handleSubmit} className='w-full md:w-[90%]'>
                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="name" className='text-sm font-[Poppins] font-[500]'>
                                                            Name
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="name" value={formData.name} name="name" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="address" className='text-sm font-[Poppins] font-[500]'>
                                                            Delivery Address
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="address" value={formData.address} name="address" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="city" className='text-sm font-[Poppins] font-[500]'>
                                                            City
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="city" value={formData.city} name="city" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="state" className='text-sm font-[Poppins] font-[500]'>
                                                            State
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="state" value={formData.state} name="state" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="country" className='text-sm font-[Poppins] font-[500]'>
                                                            Country
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="country" value={formData.country} name="country" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="pincode" className='text-sm font-[Poppins] font-[500]'>
                                                            Pin Code
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="pincode" value={formData.pincode} name="pincode" type="number" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 flex flex-col'>
                                                        <label htmlFor="phoneNumber" className='text-sm font-[Poppins] font-[500]'>
                                                            Mobile Number
                                                        </label>
                                                        <input onChange={changeHandler} autoComplete="phoneNumber" value={formData.phoneNumber} name="phoneNumber" type="number" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                    </div>

                                                    <div className='mb-4 mt-8 flex flex-col relative'>
                                                        <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                                            {
                                                                formLoading ? <Loader /> : "PAY NOW"
                                                            }
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>



                                    </div>
                                </div>
                            }
                        </>
                }
            </div>
            <Footer />
        </div >
    )
}

export default OrderDetails
