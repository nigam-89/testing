import React, { useEffect } from 'react'
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'
import './About.css'
import { AiFillPlayCircle } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import { AiFillLinkedin } from "react-icons/ai"
import { Helmet, HelmetProvider } from "react-helmet-async"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const About = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const cityArr = ["Delhi NCR", "Mumbai", "Ludhiana", "Raipur", "Kolkata", "Chennai", "Coimbatore", "Pune", "Bangalore", "Hyderabad", "Chandigarh", "Patna ", "Ahmedabad", "Kochi"]

  const keyPerson = [
    {
      name: "Monica Bachchan",
      image: "https://res.cloudinary.com/djr2f6dlh/image/upload/v1699422240/key_perosn/1_mgpsij.webp",
      role: "Founder & CEO",
      link: "https://www.linkedin.com/in/monicabachchan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Yasmeen Akhtar Khan",
      image: "https://res.cloudinary.com/djr2f6dlh/image/upload/v1699422240/key_perosn/3_t6nkl9.webp",
      role: "GM - Sales & Marketing",
      link: "https://www.linkedin.com/in/yasmeen-akhtar-khan-8b0091183?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Amarjeet Anand",
      image: "https://res.cloudinary.com/djr2f6dlh/image/upload/v1699422240/key_perosn/2_e6juwi.webp",
      role: "GM - Creatives",
      link: "https://www.linkedin.com/in/theamarjeetanand?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Mannu Chaulia",
      image: "https://res.cloudinary.com/djr2f6dlh/image/upload/v1699422240/key_perosn/4_wqsxwt.webp",
      role: "Business Analyst & Senior Manager - Operations",
      link: "https://www.linkedin.com/in/mannu-chaulia-191328200?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
  ]

  const icons = [
    {
      category: "Market Research",
      bw: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816485/MyMetalogic/marketResearch-bw_feurlj.png',
      color: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816486/MyMetalogic/marketResearch-color_uuerqr.png'
    },
    {
      category: "Media",
      bw: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816377/MyMetalogic/media-bw_nmetwp.png',
      color: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816443/MyMetalogic/media-color_c9dh0o.png'
    },
    {
      category: "Events",
      bw: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816522/MyMetalogic/events-bw_lhvbek.png',
      color: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816523/MyMetalogic/events-color_c2xcky.png'
    },
    {
      category: "Film Production",
      bw: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816547/MyMetalogic/filmProduction-bw_dxfjcx.png',
      color: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816548/MyMetalogic/filmProduction-color_b3wiml.png'
    },
    {
      category: "Business Networking",
      bw: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816569/MyMetalogic/businessNetworking-bw_bdci3u.png',
      color: "https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816570/MyMetalogic/businessNetworking-color_sotbff.png"
    },
  ]

  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  // Handling Meta Tags
  const description = "METALOGIC Is specialized In corporate events management in which it will provide 'A to Z' services from conceptualizing the event to Inviting the right targeted audience along with speakers, sponsors, chief guests and other dignitaries.";

  return (
    <>

      <HelmetProvider>
        <Helmet>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </Helmet>
      </HelmetProvider>

      <UpperNavbar />
      <Navbar />
      <div className='w-[100%] overflow-x-hidden'>
        <div className=''>
          <div className='w-[100%] pb-8 relative '>
            <img className='w-[100%] h-[10rem] md:h-[20rem]' src={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816294/MyMetalogic/aboutBanner_x1fse4.webp'} alt='About Banner' />
            <div className='flex flex-col w-[100%] px-4 md:px-28 font-[Rubik] text-2xl md:text-5xl text-white absolute top-[50%] translate-y-[-50%] uppercase md:gap-2 tracking-wide'>
              <p className='font-extralight'>We Represent</p>
              <h2 className='font-extrabold tracking-wider'>India's Mining & steel</h2>
              <h2 className='font-extrabold tracking-wider'>industry</h2>
            </div>
          </div>
          <div className='3xl:w-[1500px] mx-auto'>
            <div className='w-[100%] flex flex-col md:flex-row gap-4 justify-between md:items-center p-4 md:px-28 md:py-16'>
              <div className='flex justify-start'>
                <h2 className='text-2xl uppercase md:text-4xl font-[Roboto] tracking-wide'>Certification &
                  <br className='block' />
                  {" "}
                  <span className='text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>REGISTRATION</span>
                </h2>
              </div>
              <div className='md:w-[60%] flex items-center justify-between md:gap-28'>
                <img className='w-[25%] md:w-[25%] h-[70%] hover:scale-[1.05] duration-200 transition-all' alt='' src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1701062173/About%20Page/ISO_kryqbz.webp' />
                <img className='w-[30%] md:w-[30%] hover:scale-[1.05] duration-200 transition-all' alt='' src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1696498696/MyMetalogic/startupIndia_trkwpj.png' />
                <img className='w-[25%] md:w-[25%] hover:scale-[1.05] duration-200 transition-all' alt='' src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1701062172/About%20Page/Udyog-Aadhaar_ngnhhz.webp' />
              </div>
            </div>

            <div className='w-[100%] mx-auto flex flex-col gap-4 md:flex-row justify-between items-center py-8 md:py-24 md:px-24 '>
              <div className='md:w-[60%] flex flex-col justify-between items-start gap-8 px-4'>
                <div className='flex flex-col justify-between'>
                  <h2 className='text-2xl uppercase md:text-4xl font-[Roboto]'>About</h2>
                  <p className=' text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>METALOGIC PMS</p>
                </div>
                <div className='flex flex-col justify-between items-center text-justify gap-4 font-[Rubik]'>
                  <p>METALOGIC PMS is a startup launched in 2017 with a mission to provide metalogic or decision making logical support to the Indian & International Steel & Mining Industry.</p>
                  <p>With over 8 year's experience in organizing steel industry related events and disseminating information through various media, METALOGIC's experienced team will propel this new standalone venture for the success of Indian iron and steel industry.</p>
                  <p>METALOGIC PMS Is specialized In corporate events management in which it will provide
                    'A to Z' services from conceptualizing the event to Inviting the right targeted audience along with speakers, sponsors, chief guests and other dignitaries.</p>
                  <p>METALOGIC PMS is also proud to be the industry's early morning news provider for over 4 years covering areas like steel, mining, automobile, cement and infrastructure.</p>
                  <p>METALOGIC PMS also brings a collection of basic prices of commodities and an update on congestion at major Indian ports every morning</p>
                  <p>METALOGIC PMS will be introducing a wide range of project management services in the near future which are being designed with the help of experienced mentors from both PSUs and private organizations along with professionals from other sectors like automobile, infra and Information technology.</p>

                </div>
              </div>

              <div className='w-[70%] md:w-[30%] md:max-w-[30%] '>
                <img src={'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816199/MyMetalogic/aboutLogo_n05x63.png'} alt='' data-aos="fade-left" data-aos-duration="2000" className='w-[100%]' />
              </div>
            </div>

            <div className='w-[100%] flex flex-col justify-between items-start gap-12 p-8 md:px-28 md:py-24 border'>
              <div className='flex flex-col justify-between items-start'>
                <h2 className='text-2xl uppercase md:text-4xl font-[Roboto]'>CORE</h2>
                <p className='text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>TEAM</p>
              </div>
              <div className='w-[100%] flex items-center flex-row md:justify-around gap-8 max-md:overflow-x-scroll  ' data-aos="flip-up" data-aos-duration="2000">
                {
                  keyPerson.map((person, index) => {
                    return (
                      <div key={index} className='w-[100%] min-w-[100%] md:w-[20%] md:min-w-[20%] md:max-w-[20%] flex flex-col justify-between items-center gap-2 rounded-2xl py-12 shadow-2xl hover:shadow-sm hover:border duration-300 transition-all'>
                        <img className='w-[60%] rounded-full md:w-[80%]' src={person?.image} alt='' />
                        <h2 className='font-[Roboto] text-xl font-semibold'>{person?.name}</h2>
                        <p className='font-[Rubik] font-[500] text-gray-700 text-center'>{person?.role}</p>
                        <Link to={person?.link} target="_blank">
                          <AiFillLinkedin className='text-gray-500 hover:text-[#243b77] text-3xl rounded-full duration-200 transition-all hover:scale-[1.1]' />
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className='w-[100%] flex flex-col justify-between items-start gap-8 p-8 md:py-24 md:px-28'>
              <div className='flex flex-col justify-between items-start gap-2'>
                <h2 className='text-2xl uppercase md:text-4xl font-[Roboto]'>OUR</h2>
                <p className='text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>BUSINESSES</p>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-2 overflow-x-hidden'>
                {
                  icons.map((icon, index) => {
                    return (
                      <div key={index} className='md:min-w-[15%] flex flex-col justify-between items-center text-center gap-4 py-4 group' data-aos="zoom-in" data-aos-duration="2000">
                        <img src={icon.bw} alt='' className='w-[40%] md:w-[40%] md:max-w-[40%] block group-hover:hidden duration-150' />
                        <img src={icon.color} alt='' className='w-[40%] md:w-[40%] md:max-w-[40%] hidden group-hover:block duration-150' />
                        <p className='font-[Roboto] font-extrabold text-lg md:text-xl tracking-widest'>{icon.category}</p>
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>

          <div className='relative about2_bg'>
            <div className='w-[100%]  3xl:w-[1500px] mx-auto'>
              <div className='w-[100%] mx-auto flex flex-col md:flex-row justify-between items-center gap-16 py-8 md:py-24 md:px-28 '>

                <div className='flex md:flex-[40%] flex-col justify-between items-start text-white md:gap-0  w-[90%] ml-[1rem] md:ml-0'>
                  <h2 className='text-2xl uppercase md:text-4xl font-[Roboto] '>OUR</h2>
                  <p className='text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>STORY</p>
                  <p className='font-[Rubik] font-normal text-lg md:text-2xl mt-8'>
                    Take a Glimpse Into Metalogic's World Through Their Engaging Corporate Video
                  </p>
                </div>

                <div className='w-[90%] md:flex-[60%]'>
                  <div className='relative' data-aos="fade-left" data-aos-duration="2000">
                    <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
                      <AiFillPlayCircle className='text-6xl text-violet-500 bg-white rounded-full cursor-pointer' onClick={onOpen} />
                    </div>
                    <img className="object-cover h-[25rem] max-h-[25rem] w-full rounded-lg" src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1699424678/key_perosn/YT-Thumbnail_er58zf.webp' alt="" />
                  </div>

                  <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
                    <ModalOverlay />
                    <ModalContent bg='rgb(255 145 3 / 1%)' p='6' rounded='xl'>
                      <ModalCloseButton color='white' bg='orange.600' fontWeight="semibold" />
                      <ModalBody mx='auto' display="flex" alignItems="center" justifyContent="center" overflow="hidden">
                        <div className='hidden md:block'>
                          <iframe width="820" height="450" src={`https://www.youtube.com/embed/f3Tmn4RCvTE?si=WH8AIJNISduHXX4z?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                        </div>
                        <div className='md:hidden'>
                          <iframe width="300" height="400" src={`https://www.youtube.com/embed/f3Tmn4RCvTE?si=WH8AIJNISduHXX4z?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                        </div>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                </div>
              </div>
            </div>
          </div>

          <div className='3xl:w-[1500px] mx-auto'>
            <div className='w-[100%] flex flex-col justify-between items-start p-8 md:p-28 gap-14'>
              <div className='flex flex-col justify-between items-start '>
                <h2 className='text-2xl uppercase md:text-4xl font-[Roboto]'>OUR</h2>
                <p className='text-3xl uppercase md:text-5xl font-[Rubik] font-bold'>FOOTPRINTS</p>
              </div>
              <div className='w-[100%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 4xl:grid-cols-5 gap-x-8 gap-y-4' data-aos="zoom-in" data-aos-duration="2000">
                {
                  cityArr.map((city, index) => {
                    return (
                      <>
                        <div className='mb-4 text-md md:text-2xl font-[Rubik] border-r-2 border-l-2 border-black group border text-center py-2 hover:shadow-lg bg-[#243b77] text-white hover:bg-[#fff] hover:text-black duration-200 transition-all
                    rounded-xl px-1.5' key={index}>
                          <p className='group-hover:scale-[1.05] duration-200 transition-all cursor-pointer font-[Poppins] tracking-wider'>
                            {city}
                          </p>
                        </div>
                      </>
                    )
                  })
                }
                <div className='mb-4 text-md md:text-2xl font-[Rubik] group border text-center py-2 hover:shadow-lg bg-red-700 text-white hover:bg-[#fff] hover:text-black duration-200 transition-all
                    rounded-xl px-1.5'>
                  <p className='group-hover:scale-[1.05] duration-200 transition-all cursor-pointer font-[Poppins] tracking-wider'>
                    And Many More..
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>

  )
}

export default About