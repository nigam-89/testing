// import React from 'react'
// import Navbar from '../../components/global/Navbar/Navbar'
// import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'
// import Footer from './../../components/global/Footer/Footer';
// import { useEffect, useState } from 'react'
// import { toast } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { apiConnector } from '../../services/apiConnector';
// import { IShopsAPI } from '../../services/apis';
// import Loader from '../../components/Loader/Loader';
// import { BsFillLightningChargeFill } from 'react-icons/bs'
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import './IShopsProducts.css'

// import 'swiper/css';
// import 'swiper/css/pagination';

// import { Pagination } from 'swiper/modules';

// const IShopsProducts = () => {
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);
//     const admin = useSelector((state) => state.admin);

//     useEffect(() => {
//         const getData = async () => {
//             window.scroll(0, 0);
//             setLoading(true);
//             try {
//                 const response = await apiConnector({ method: "GET", url: IShopsAPI.ViewProducts_API, headers: { token: admin.token } })
//                 setData(response.data.data)
//             } catch (error) {
//                 toast.error(error?.response?.data?.message)
//             }
//             setLoading(false);
//         }

//         getData();
//     }, [admin])

//     return (
//         <div className="" >
//             <UpperNavbar />
//             <Navbar />
//             <div className='w-full relative flex justify-center items-center flex-col py-5' >
//                 <h2 className='text-3xl font-[Poppins] text-center text-black font-[500] py-6 tracking-wide'>iSHOPS</h2>

//                 {
//                     loading ?
//                         <>
//                             <div className='w-full flex items-center justify-center mt-10'> <Loader color="black" width={"100"} height={"80"} /> </div>
//                         </>
//                         :
//                         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 px-4 md:px-20 py-4 justify-items-center'>
//                             {
//                                 data?.length > 0 &&
//                                 data?.map((item, index) => (
//                                     <div key={index} className="border-2 relative h-[32rem]  max-w-[20rem] min-w-[20rem] border-[#243b77] rounded-xl shadow-xl hover:shadow-none duration-200  overflow-x-hidden ">

//                                         <div className='flex flex-col gap-1 h-full'>

//                                             <div className='w-full h-[15rem] flex justify-center items-center rounded-xl'>
//                                                 <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
//                                                     {
//                                                         item?.imgUrlModelDBId?.urls?.map((url, index) => {
//                                                             return (
//                                                                 <SwiperSlide key={index}><img key={index} src={url} alt="ishop" className='object-cover w-full h-full ' /></SwiperSlide>
//                                                             )
//                                                         })
//                                                     }
//                                                 </Swiper>
//                                             </div>



//                                             <div className='px-2 relative'>

//                                                 <p className='text-center text-lg font-[Poppins] font-[500] text-gray-900 my-1'>
//                                                     {
//                                                         item.heading.length > 100 ?
//                                                             item.heading.slice(0, 100) + "..." :
//                                                             item.heading
//                                                     }
//                                                 </p>

//                                                 <p className='text-sm text-center font-[Poppins] font-[500] text-[#243b77] my-1'>
//                                                     {
//                                                         item.description.length > 100 ?
//                                                             item.description.slice(0, 100) + "..." :
//                                                             item.description
//                                                     }
//                                                 </p>

//                                                 <p className='text-lg flex justify-center items-center text-center font-[Poppins] font-[500] text-gray-900 mt-6 mb-5'>
//                                                     <BsFillLightningChargeFill className='mr-1 text-[#243b77] inline text-[0.8rem]' />
//                                                     &#8377;{item.discountedPrice}
//                                                     <span className='text-base ml-1 text-[#243b77] relative before:h-[2px] before:w-full before:absolute before:bg-[#243b77] before:top-[0.6rem] before:left-0'> &#8377;{item.price}</span>
//                                                 </p>
//                                             </div>

//                                             <Link to={`/order-summary/${item._id}`} className="text-base absolute bottom-0  font-[500] w-full  py-3 mt-6  px-2 custom_colors   hover:text-violet-500 hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wider" >
//                                                 BUY NOW
//                                             </Link>

//                                         </div>
//                                     </div>

//                                 ))
//                             }
//                         </div>
//                 }
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default IShopsProducts
