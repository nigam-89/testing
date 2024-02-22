// import React from 'react'
// import Navbar from '../../components/global/Navbar/Navbar'
// import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'
// import Footer from './../../components/global/Footer/Footer';

// import img from "../../assets/images/homePage-Slider.jpeg"
// import { BsDot } from "react-icons/bs"
// import { Link } from 'react-router-dom';

// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalBody,
//     ModalCloseButton,
//     useDisclosure,
// } from '@chakra-ui/react'
// import { AiFillPlayCircle } from 'react-icons/ai';
// import { useSelector } from 'react-redux';
// import moment from 'moment';

// const Old = () => {

//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const topStories = useSelector((state) => state.topStories)

//     console.log("TOPSTORES", topStories)

//     return (
//         <div className="">
//             <UpperNavbar />
//             <Navbar />
//             <div className="h-[100%] w-[100%] overflow-x-hidden">

//                 {/* Slider Section */}
//                 <div className='w-[100%]'>
//                     <img alt="metalogic" src={img} className="w-[100%] min-h-[8rem] max-h-[8rem] md:max-h-[20rem] md:min-h-[20rem]" />
//                 </div>
//                 {/* top stories and metaweekly */}
//                 <div className='w-[100%] flex flex-col md:flex-row items-center px-4 md:px-32 gap-8 md:gap-16 my-8 md:mt-24 md:mb-8'>
//                     <div className='flex flex-col justify-between items-start gap-4 md:border-r-2 md:pr-16 md:border-black md:min-w-[65%] md:w-[65%]'>
//                         <h2 className='text-black font-[Rubik] text-2xl font-bold tracking-wider'>Top Stories</h2>
//                         <div className='flex flex-col gap-8 md:gap-4 justify-between items-start h-[350px] max-h-[350px] overflow-y-scroll max-md:py-4'>
//                             {
//                                 topStories.data.map((story, index) => {
//                                     return (
//                                         <div key={index} className='flex flex-row justify-between items-center md:items-start gap-4 ' >
//                                             {/* <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[150px] max-h-[150px] w-[150px] max-w-[150px] object-cover' /> */}
//                                             <img alt="metalogic" src={story.imgUrlModelDBId.urls[0]} className='h-[150px] max-h-[150px] w-[150px] max-w-[150px] object-cover' />
//                                             <div className='flex flex-col gap-4 py-4'>
//                                                 <h2 className='font-bold font-[Rubik]'>{story.heading}</h2>
//                                                 <div className='font-normal font-[Rubik] text-sm'>
//                                                     <p className=''>{story.shortDescription}</p>
//                                                     <Link to={'/top-stories'}><p className='text-[#243b77] font-semibold '>Read More</p></Link>
//                                                 </div>
//                                                 <p className='font-[Roboto] text-sm font-bold'>{moment(story.date).format('Do MMM YYYY, dddd')}</p>
//                                             </div>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div>
//                     <div className='w-[70%] flex flex-col justify-between items-center gap-8 '>
//                         <h2 className='uppercase font-[Rubik] text-3xl font-semibold'>Meta Weekly</h2>
//                         <div className='w-[100%] max-md:border max-md:pb-4 max-md:shadow-2xl max-md:rounded-2xl flex flex-col md:flex-row items-center justify-between md:h-[350px] md:max-h-[250px] md:min-h-[250px] gap-8'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[250px] w-[100%] md:h-[100%] md:w-[250px] md:max-w-[250px] object-cover rounded-lg md:rounded-full' />
//                             <div className='flex flex-col justify-between items-center gap-6'>
//                                 <p className='font-[Rubik] font-semibold tracking-wider text-lg'>Issue 41 Vol.2</p>
//                                 <p className='border bg-[#243b77] w-[100%] py-2 text-center text-white font-[Roboto] font-semibold rounded-lg animate-bounce'>View</p>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//                 {/* Events and Webinar */}
//                 <div className='w-[100%] flex flex-col md:flex-row items-start justify-between my-16 px-4 md:px-32 gap-16 md:mt-32 md:mb-16'>

//                     <div className='flex flex-col justify-between items-center gap-8 w-[100%] py-8 pb-12 bg-[#243b77] text-white rounded-2xl'>
//                         <h2 className='uppercase font-[Rubik] text-3xl font-semibold'>Events</h2>
//                         <div className='w-[100%] flex flex-col md:flex-row justify-around items-center max-md:gap-8 '>

//                             <div className='w-[80%] flex flex-col items-center justify-between gap-8 md:w-[250px] border rounded-lg overflow-hidden shadow-lg cursor-pointer duration-200 transition-all hover:shadow-md'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[250px] max-h-[250px] min-h-[250px] w-[100%] object-cover' />
//                                 <div className='flex flex-col justify-between items-center gap-6 px-12 md:pb-4 pb-4'>
//                                     <p className='font-[Rubik] font-semibold tracking-wider text-lg'>Issue 41 Vol.2</p>
//                                     <p className='border w-[100%] py-2 text-center font-[Roboto] font-semibold rounded-lg animate-bounce bg-white text-black'>View</p>
//                                 </div>
//                             </div>
//                             <div className='w-[80%] flex flex-col items-center justify-between gap-8 md:w-[250px] border rounded-lg overflow-hidden shadow-lg cursor-pointer duration-200 transition-all hover:shadow-md'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[250px] max-h-[250px] min-h-[250px] w-[100%] object-cover' />
//                                 <div className='flex flex-col justify-between items-center gap-6 px-12 md:pb-4 pb-4'>
//                                     <p className='font-[Rubik] font-semibold tracking-wider text-lg'>Issue 41 Vol.2</p>
//                                     <p className='border w-[100%] py-2 text-center font-[Roboto] font-semibold rounded-lg animate-bounce bg-white text-black'>View</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>

//                     <div className='flex flex-col md:justify-center items-center gap-4 md:border-l-2 md:pl-16 md:border-black md:min-w-[45%] md:w-[45%] md:h-[550px]'>
//                         <h2 className='text-black font-[Rubik] text-2xl font-bold tracking-wider'>Opinion Box</h2>
//                         <div className='flex flex-col gap-4 justify-between items-start h-[350px] max-h-[350px] overflow-y-scroll'>

//                             <div className='flex flex-row justify-between items-center gap-4 ' >
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[150px] max-h-[150px] w-[150px] max-w-[150px] object-cover' />
//                                 <div className='flex flex-col gap-4 py-4'>
//                                     <h2 className='font-bold font-[Rubik]'>इस्पात मंत्रालय ने कुशल लॉजिस्टिक्स योजना का कॉन्ट्रैक्ट तैयार किया है</h2>
//                                     <div className='font-normal font-[Rubik] text-sm'>
//                                         <p className=''>भारतीय इस्पात मंत्रालय ने लॉजिस्टिक्स से संबंधित सभी चुनौतियों को दूर करने के लिए एक क्षेत्रीय योजना का मसौदा तैयार किया है।</p>
//                                         <Link to={'/top-stories'}><p className='text-[#243b77] font-semibold '>Read More</p></Link>
//                                     </div>
//                                     <p className='font-[Roboto] text-sm font-bold'>10 Oct 2023</p>
//                                 </div>
//                             </div>
//                             <div className='flex flex-row justify-between items-center gap-4 ' >
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='h-[150px] max-h-[150px] w-[150px] max-w-[150px] object-cover' />
//                                 <div className='flex flex-col gap-4 py-4'>
//                                     <h2 className='font-bold font-[Rubik]'>इस्पात मंत्रालय ने कुशल लॉजिस्टिक्स योजना का कॉन्ट्रैक्ट तैयार किया है</h2>
//                                     <div className='font-normal font-[Rubik] text-sm'>
//                                         <p className=''>भारतीय इस्पात मंत्रालय ने लॉजिस्टिक्स से संबंधित सभी चुनौतियों को दूर करने के लिए एक क्षेत्रीय योजना का मसौदा तैयार किया है।</p>
//                                         <Link to={'/top-stories'}><p className='text-[#243b77] font-semibold '>Read More</p></Link>
//                                     </div>
//                                     <p className='font-[Roboto] text-sm font-bold'>10 Oct 2023</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>


//                 {/* Goverment Notification , Report , iShops */}

//                 <div className='w-[100%] my-16 md:px-32 md:mt-24 md:mb-8 flex flex-col md:flex-row justify-between items-start max-md:gap-16'>
//                     <div className='md:w-[40%] flex flex-col items-center justify-between gap-4 max-md:px-4'>
//                         <div className='text-center'>
//                             <h2 className='font-[Rubik] uppercase text-3xl font-semibold tracking-wider'>Goverment</h2>
//                             <p className='font-[Mooli] text-lg uppercase '>Notifications</p>
//                         </div>
//                         <div className='w-[100%] border border-black shadow-2xl rounded-2xl p-8 flex flex-col gap-4 h-[500px] max-h-[400px] overflow-y-scroll'>
//                             <div className='w-[100%] flex flex-row justify-between items-center gap-2'>
//                                 {/* <p className='w-[5px] h-[5px] bg-black rounded-[100%]'></p> */}
//                                 <BsDot className='text-[3rem]' />
//                                 <p>भारतीय इस्पात मंत्रालय ने लॉजिस्टिक्स से संबंधित सभी चुनौतियों को दूर करने के लिए एक क्षेत्रीय योजना का मसौदा तैयार किया है।</p>
//                             </div>
//                             <div className='w-[100%] flex flex-row justify-between items-center gap-2'>
//                                 {/* <p className='w-[5px] h-[5px] bg-black rounded-[100%]'></p> */}
//                                 <BsDot className='text-[3rem]' />
//                                 <p>भारतीय इस्पात मंत्रालय ने लॉजिस्टिक्स से संबंधित सभी चुनौतियों को दूर करने के लिए एक क्षेत्रीय योजना का मसौदा तैयार किया है।</p>
//                             </div>
//                             <div className='w-[100%] flex flex-row justify-between items-center gap-2'>
//                                 {/* <p className='w-[5px] h-[5px] bg-black rounded-[100%]'></p> */}
//                                 <BsDot className='text-[3rem]' />
//                                 <p>भारतीय इस्पात मंत्रालय ने लॉजिस्टिक्स से संबंधित सभी चुनौतियों को दूर करने के लिए एक क्षेत्रीय योजना का मसौदा तैयार किया है।</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='m-0 p-0 w-[2px] h-[500px] bg-black max-md:hidden'></div>

//                     {/* Reports */}

//                     <div className='w-[100%] md:w-[20%]  flex flex-col justify-between items-center h-[500px]  rounded-2xl max-md:px-4'>
//                         <h2 className='font-[Rubik] font-semibold text-3xl uppercase'>Report</h2>
//                         <Link to={'/reports/events-webminar'}>
//                             <div className='w-[100%] p-4 border rounded-2xl shadow-2xl border-b-black hover:border-black duration-200 transition-all'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[400px] min-h-[400px] max-h-[400px] rounded-2xl' />
//                             </div>
//                         </Link>
//                     </div>

//                     {/* iShop */}
//                     <div className='w-[100%] md:w-[20%] flex flex-col gap-8 items-center justify-center h-[500px] max-h-[500px] rounded-2xl max-md:px-4'>
//                         <h2 className='font-[Rubik] font-semibold text-3xl'>iSHOP</h2>
//                         <div className='w-[60%] md:w-[100%] p-4 border rounded-2xl shadow-2xl border-b-black hover:border-black duration-200 transition-all'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[350px] min-h-[350px] max-h-[350px] rounded-2xl' />
//                             <Link to={"/"}><p className='px-4 py-2 border bg-[#243b77] text-white font-[Poppins] w-fit mx-auto mt-2 rounded-lg'>Buy Now</p></Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Our Partners */}
//                 <div className='w-[100%] my-16 md:px-32 md:mt-32 md:mb-14 flex flex-col items-center justify-between gap-6 py-8'>
//                     <h2 className='font-[Rubik] text-3xl font-semibold'>Our Partners</h2>
//                     <div className='w-[90%] flex justify-evenly gap-16 mx-auto overflow-x-scroll py-4'>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>
//                         <div className='min-w-[50%] w-[50%] max-w-[50%] md:min-w-[15%] md:max-w-[15%] border shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.1] hover:border-black hover:rounded-lg'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/ddffeufbq/image/upload/v1685439572/webdesys/webdesys_logo_v4bxps.webp' className='w-[100%] h-[200px] object-contain' />
//                         </div>

//                     </div>
//                 </div>

//                 {/* Latest Videos */}
//                 <div className='w-[100%] my-16 md:px-32 md:mt-8 md:mb-14 flex flex-col items-center justify-between gap-16 py-16 bg-[#243b77]'>
//                     <h2 className='text-white font-[Rubik] font-semibold text-3xl uppercase tracking-widest'>Latest Videos</h2>
//                     <div className='w-[90%] md:w-[100%] flex justify-between md:justify-evenly items-center max-md:overflow-x-scroll max-md:gap-4'>
//                         <div className='relative max-md:w-[90%] max-md:min-w-[90%] md:w-[400px] h-[300px] md:max-w-[400px] max-h-[300px] rounded-3xl overflow-hidden border shadow-2xl'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[100%] object-cover' />
//                             <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
//                                 <AiFillPlayCircle className='text-6xl text-violet-500 bg-white rounded-full cursor-pointer' onClick={onOpen} />
//                             </div>
//                         </div>
//                         <div className='relative max-md:w-[90%] max-md:min-w-[90%] md:w-[400px] h-[300px] md:max-w-[400px] max-h-[300px] rounded-3xl overflow-hidden border shadow-2xl'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[100%] object-cover' />
//                             <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
//                                 <AiFillPlayCircle className='text-6xl text-violet-500 bg-white rounded-full cursor-pointer' onClick={onOpen} />
//                             </div>
//                         </div>
//                         <div className='relative max-md:w-[90%] max-md:min-w-[90%] md:w-[400px] h-[300px] md:max-w-[400px] max-h-[300px] rounded-3xl overflow-hidden border shadow-2xl'>
//                             <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[100%] object-cover' />
//                             <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
//                                 <AiFillPlayCircle className='text-6xl text-violet-500 bg-white rounded-full cursor-pointer' onClick={onOpen} />
//                             </div>
//                         </div>
//                         <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
//                             <ModalOverlay />
//                             <ModalContent bg='rgb(255 145 3 / 1%)' p='6' rounded='xl'>
//                                 <ModalCloseButton color='white' bg='orange.600' fontWeight="semibold" />
//                                 <ModalBody mx='auto' display="flex" alignItems="center" justifyContent="center" overflow="hidden">
//                                     <div className='hidden md:block'>
//                                         <iframe width="820" height="450" src={`https://www.youtube.com/embed/nYQ7gCSJVR4?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
//                                     </div>
//                                     <div className='md:hidden'>
//                                         <iframe width="300" height="400" src={`https://www.youtube.com/embed/nYQ7gCSJVR4?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
//                                     </div>
//                                 </ModalBody>
//                             </ModalContent>
//                         </Modal>
//                     </div>
//                     <Link to={'/interviews'}>
//                         <p className='px-6 py-2 text-white bg-black rounded-lg text-lg'>View All</p>
//                     </Link>
//                 </div>

//                 {/* Photo Gallery */}
//                 <div className='w-[100%] my-16 md:px-32 md:mt-16 md:mb-14 flex flex-col items-center justify-between gap-8 pt-8 pb-4'>
//                     <h2 className='font-[Rubik] font-semibold text-3xl uppercase tracking-widest'>Photo Gallery</h2>
//                     <div className='w-[100%] flex flex-col justify-between items-start gap-8'>
//                         <div className='w-[100%] flex justify-between items-center gap-4 max-md:px-4 max-md:overflow-x-scroll'>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                         </div>
//                         <div className='w-[100%] flex justify-between items-center gap-4 max-md:px-4 max-md:overflow-x-scroll max-md:hidden'>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                             <div className='max-md:min-w-[90%] md:w-[300px] md:min-w-[300px] rounded-2xl overflow-hidden border shadow-3xl duration-300 transition-all hover:scale-[1.02] cursor-pointer'>
//                                 <img alt="metalogic" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1698047318/MyMetalogic/iisr3gcpfwc9rvdjqec1.webp' className='w-[100%] h-[200px] object-cover shadow-2xl' />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     )
// }

// export default Old

