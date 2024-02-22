import React, { useState,useEffect } from 'react'
import UpperNavbar from './../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../components/global/Navbar/Navbar';
import Footer from './../../components/global/Footer/Footer';
import { ContactPage } from '../../services/apis';
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiConnector';
import Loader from '../../components/Loader/Loader';


const Contact = () => {

  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', organisation: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  function changeHandler(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const sendContactDetails = async () => {
    try {
      await apiConnector({ method: "POST", url: ContactPage.CreateAContact_API, bodyData: formData })
      toast.success("Message Sent Successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (formData.name.length > 0 && formData.email.length > 0 && formData.mobile.length > 0 && formData.organisation.length > 0) {
      setLoading(true)
      sendContactDetails()
      setFormData({ name: "", email: "", mobile: "", organisation: "", message: '' })
      setLoading(false)
    }
    else {
      toast.error("Please Enter All Fields")
    }
  }


  return (
    <div>
      <UpperNavbar />
      <Navbar />
      <div className='3xl:w-[1500px] mx-auto'>
      <div className='w-[100%] dark:bg-[#243b77] px-2 md:px-16 py-8'>
        <div className='w-[100%] relative flex flex-col-reverse md:flex-row justify-between p-4 items-center md:px-8 py-12 md:py-24 overflow-x-hidden border bg-white rounded-[2rem] shadow-2xl'>
          <img src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1696573296/MyMetalogic/bottomImg_qn7oxj.jpg' alt='' className='absolute w-[10%] rounded-full -top-10 -left-12' />

          <div className='w-[100%] md:max-w-[50%] md:min-w-[50%] flex justify-start md:px-16 items-center max-md:pt-8'>
            {/* <img className='w-[100%] rounded-full' src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1696570726/MyMetalogic/contactPage_lgrcc5.jpg' alt='contactPage' /> */}
            <div>
              <h2 className='text-xl font-[Poppins] font-[500] text-[#243b77] mb-2'>
                ADDRESS
              </h2>
              <p className='font-[Rubik] font-[400]'>
                Metalogic Projects Management Services Pvt. Ltd.
                R8, WorkBox, 15th Floor, E-Square, Plot No. C2, Sector 96, Noida, Uttar Pradesh 201303
              </p>

              <h2 className='text-xl mt-6 md:mt-12 font-[Poppins] font-[500] text-[#243b77] mb-2'>
                OPENING HOURS
              </h2>
              <p className='font-[Rubik] font-[400]'>
                MON - FRI : 09:00 am – 05:00 pm
              </p>

              <h2 className='text-xl mt-6 md:mt-12 font-[Poppins] font-[500] text-[#243b77] mb-2'>
                FOR SUPPORT
              </h2>

              <h2 className='font-[Poppins] font-[500] text-[#243b77] mb-2'>
                Subscription:
              </h2>
              <p className='font-[Rubik] font-[400] mb-2'>
                Ruchi Tripathi - <a href="mailto:ruchi@metalogicpms.com" className='text-blue-600 underline'>ruchi@metalogicpms.com</a>
              </p>

              <h2 className='font-[Poppins] font-[500] text-[#243b77] mb-2'>
                Research & Content:
              </h2>
              <p className='font-[Rubik] font-[400]'>
                Mannu Chaulia - <a href="mailto:mannu@metalogicpms.com" className='text-blue-600 underline'>mannu@metalogicpms.com</a>
              </p>
              <p className='font-[Rubik] font-[400] mb-2'>
                Rajat Kaushik - <a href="mailto:rajay@metalogicpms.com" className='text-blue-600 underline'>rajat@metalogicpms.com</a>
              </p>

              <h2 className='font-[Poppins] font-[500] text-[#243b77] mb-2'>
                Upcoming Event Information:
              </h2>
              <p className='font-[Rubik] font-[400]'>
                Yasmeen Akhtar Khan - <a href="mailto:yasmeen@metalogicpms.com" className='text-blue-600 underline'>yasmeen@metalogicpms.com</a>
              </p>
              <p className='font-[Rubik] font-[400] mb-2'>
                Rahul Mishra - <a href="mailto:rahul@metalogicpms.com" className='text-blue-600 underline'>rahul@metalogicpms.com</a>
              </p>

              <h2 className='font-[Poppins] font-[500] text-[#243b77] mb-2'>
                Technical Support:
              </h2>
              <p className='font-[Rubik] font-[400] mb-2'>
                <a href="mailto:support@metalogicpms.com" className='text-blue-600 underline'>support@metalogicpms.com</a>
              </p>

            </div>
          </div>
          <div className='w-[100%] md:w-[40%] max-md:mt-12'>
            <form className='flex flex-col justify-between gap-6 px-2 md:px-0' onSubmit={submitHandler}>
              <div className='flex flex-col items-start'>
                <h2 className='text-3xl md:text-5xl font-[Rubik] font-bold text-[#243b77] mb-3'>CONNECT WITH US</h2>
                <p className='text-sm font-[Rubik] font-semibold'>Our team will get back to you soon !!</p>
              </div>

              <div className='w-[100%] md:w-[70%] flex flex-col gap-2'>
                <label htmlFor='name' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Name</label>
                <input onChange={changeHandler} value={formData.name} type="text" name="name" id="name" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-full dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 group-hover:py-4" placeholder='Enter Name' required={true} autoComplete="off" />
              </div>
              <div className='w-[100%] md:w-[70%] flex flex-col gap-2'>
                <label htmlFor='email' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Email</label>
                <input onChange={changeHandler} value={formData.email} type="email" name="email" id="email" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-full dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 group-hover:py-4" placeholder='Enter Email' required={true} autoComplete="off" />
              </div>

              <div className='w-[100%] md:w-[70%] flex flex-col gap-2'>
                <label htmlFor='mobile' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Phone</label>
                <input onChange={changeHandler} value={formData.mobile} type="number" name="mobile" id="mobile" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-full dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 group-hover:py-4" placeholder='Enter Your Number' required={true} autoComplete="off" />
              </div>

              <div className='w-[100%] md:w-[70%] flex flex-col gap-2'>
                <label htmlFor='organisation' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Organisation</label>
                <input onChange={changeHandler} value={formData.organisation} type="text" name="organisation" id="organisation" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-full dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 group-hover:py-4" placeholder='Your Organisation Please' required={true} autoComplete="off" />
              </div>

              <div className='w-[100%] md:w-[70%] flex flex-col gap-2'>
                <label htmlFor='message' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Message</label>
                <input onChange={changeHandler} value={formData.message} type="text" name="message" id="message" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-full dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 py-4 group-hover:py-4" placeholder='Your Message For Us' required={true} autoComplete="off" />
              </div>

              <div>
                <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] flex justify-center items-center tracking-wider'>
                  {
                    loading ? <Loader /> : "Send Message"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>


        {/* <div className='w-[100%] relative flex flex-col md:flex-row justify-between items-center p-4 overflow-x-hidden border bg-white rounded-[2rem] shadow-2xl my-6 md:my-12 px-4 py-3 md:py-6'>

          <div className='w-[100%] md:flex-1  flex flex-col justify-start md:px-16 items-start'>
            <h2 className='text-3xl md:text-5xl font-[Rubik] font-bold text-[#243b77] mb-3'>CONNECT WITH US</h2>

            <div>
              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Monica Bachchan (Founder)
              </h2>
              <a href={`mailto:monica@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                monica@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Amarjeet Anand (General Manager - Creatives)
              </h2>
              <a href={`mailto:amarjeet@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                amarjeet@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Hasmat Ali (Accounts)
              </h2>
              <a href={`mailto:accounts@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                accounts@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Shiv Shankar Mani Tripathi (Assistant Manager - Creatives)
              </h2>
              <a href={`mailto:shiv@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                shiv@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Kanwalmeet Singh (Executive Operations)
              </h2>
              <a href={`mailto:kanwalmeet@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                kanwalmeet@metalogicpms.com
              </a>

            </div>
          </div>


          <div className='w-[100%] md:flex-1  flex flex-col justify-start md:px-16 items-start'>
           
            <div>
              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Yasmeen Khan ( Dy. General Manager- Sales & Marketing)
              </h2>
              <a href={`mailto:yasmeen@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                yasmeen@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Mannu Chaulia (Market Analyst & Sr. Manager Operations)
              </h2>
              <a href={`mailto:mannu@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                mannu@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Rajat Kaushik(Market Analyst & Assistant Manager Operations)
              </h2>
              <a href={`mailto:rajat@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                rajat@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Rahul Mishra (Sr. Assistant Manager- Sales & Marketing)
              </h2>
              <a href={`mailto:rahul@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                rahul@metalogicpms.com
              </a>

              <h2 className='text-lg mt-3 md:mt-6 font-[Poppins] font-[500] text-[#243b77] mb-1'>
                Ruchi Tripathi (Executive - Sales & Marketing)
              </h2>
              <a href={`mailto:ruchi@metalogicpms.com`} className='font-[Rubik] font-[400]'>
                ruchi@metalogicpms.com
              </a>

            </div>

          </div>

        </div> */}


        <div className='w-[100%] relative flex flex-col md:flex-row justify-between items-center overflow-x-hidden border bg-white rounded-[2rem] shadow-2xl my-6 md:my-12 px-4 py-3 md:py-6 h-[70vh] md:h-[90vh]'>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.95562212023!2d77.34414097518916!3d28.54105357571483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce938801dce31%3A0x678b32e76e6d2d9b!2sMetalogic%20Projects%20Management%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1699513590666!5m2!1sen!2sin" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="location" className='h-full w-full rounded-[2rem]'></iframe>

        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
