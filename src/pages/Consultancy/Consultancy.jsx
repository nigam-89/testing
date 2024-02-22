import React, { useEffect, useState } from 'react'
import Footer from './../../components/global/Footer/Footer';
import UpperNavbar from './../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../components/global/Navbar/Navbar';
import { apiConnector } from '../../services/apiConnector';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { ConsultancyPage } from '../../services/apis';

// Integrating the CSC Logic

import { Country, State, City } from 'country-state-city'
import { Link } from 'react-router-dom';
import './Consultancy.css'


const Consultancy = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', organisation: '', assignmentRequest: '', designation: '', industry: '', occupation: '', address: '', country: '', state: '', city: '' })
    const [loading, setLoading] = useState(false)


    const [allCountries, setAllCountries] = useState([])
    const [allStates, setAllStates] = useState([])
    const [allCities, setAllCities] = useState([])


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
            await apiConnector({ method: "POST", url: ConsultancyPage.CreateConsultancy_API, bodyData: formData })
            toast.success("Request Sent Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        if (formData.name.length > 0 && formData.email.length > 0 && formData.mobile.length > 0 && formData.organisation.length > 0 && formData.designation.length > 0 && formData.industry.length > 0 && formData.occupation.length > 0 && formData.address.length > 0) {
            setLoading(true)
            sendContactDetails()
            setFormData({ name: "", email: "", mobile: "", organisation: "", assignmentRequest: '', designation: '', industry: '', occupation: '', address: '', country: '', state: '', city: '' })
            setLoading(false)
        }
        else {
            toast.error("Please Enter All Fields")
        }
    }

    const getCountries = async () => {
        setLoading(true)
        try {
            setAllCountries(Country.getAllCountries())

        } catch (error) {
            toast.error(error)
        }
        setLoading(false)
    }

    const getStates = async () => {
        setLoading(true)
        try {
            setAllStates(State.getStatesOfCountry(formData.country.split('/')[1]))
        } catch (error) {
            toast.error(error)
        }
        setLoading(false)
    }

    const getCity = async () => {
        setLoading(true)
        try {
            setAllCities(City.getCitiesOfState(formData.country.split('/')[1], formData.state.split('/')[1]))
        } catch (error) {
            toast.error(error)
        }
        setLoading(false)

    }

    useEffect(() => {
        getCountries()
    }, []);
    useEffect(() => {
        window.scroll(0, 0);
      }, []);
    const isPhone = window.innerWidth <= 767;
    return (
        <div>
            <UpperNavbar />
            <Navbar />

            <div className='w-[100%] pb-8 relative'>
                {/* <Link to='/ishop'>
                    <img className='w-[100%] h-[10rem] md:h-[20rem] '
                        src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700214846/key_perosn/Market_Research_umwsml.webp"
                        alt='About Banner' />
                </Link> */}
                <Link to='/ishop'>
                    <img className={`object-cover w-full h-auto ${isPhone ? 'scale-up' : ''}`}
                        src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700214846/key_perosn/Market_Research_umwsml.webp"
                        alt='About Banner' />
                </Link>
            </div>
            <div className='3xl:w-[1500px] mx-auto'>
                <div className='px-3 md:px-24 py-12'>

                    <h2 className='text-2xl text-[#1a3777] text-center uppercase md:text-4xl font-[Roboto]'>
                        Post Your Requirements of
                    </h2>
                    <p className=' text-3xl text-[#1a3777] text-center uppercase md:text-5xl font-[Rubik] font-bold'>
                        MINING, IRON & STEEL PRODUCTS
                    </p>

                    <div className='w-[100%] px-2 py-8 pt-2 md:py-8'>
                        <div className='w-[100%] relative flex flex-col md:flex-row justify-between items-center md:px-8 py-12 md:py-24 bg-white md:rounded-[5rem] overflow-x-hidden shadow-2xl border'>
                            <img src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1696573296/MyMetalogic/bottomImg_qn7oxj.jpg' alt='' className='absolute w-[10%] rounded-full -top-10 -left-12 z-[-10] bg-transparent' />

                            <div className='w-[90%] mx-auto'>
                                <form className='flex flex-col justify-between gap-6 px-2 md:px-0' onSubmit={submitHandler}>

                                    <div className='flex flex-col gap-4 justify-between items-center md:flex-row md:gap-0 '>
                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='name' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Name</label>
                                            <input onChange={changeHandler} value={formData.name} type="text" name="name" id="name" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Enter Name' required={true} autoComplete="off" />
                                        </div>
                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='email' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Email</label>
                                            <input onChange={changeHandler} value={formData.email} type="email" name="email" id="email" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Enter Email' required={true} autoComplete="off" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4 justify-between items-center md:flex-row md:gap-0 '>
                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='mobile' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Phone</label>
                                            <input onChange={changeHandler} value={formData.mobile} type="number" name="mobile" id="mobile" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Enter Your Number' required={true} autoComplete="off" />
                                        </div>

                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='organisation' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Organisation</label>
                                            <input onChange={changeHandler} value={formData.organisation} type="text" name="organisation" id="organisation" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Your Organisation Please' required={true} autoComplete="off" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4 justify-between items-center md:flex-row md:gap-0 '>
                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='designation' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Designation</label>
                                            <input onChange={changeHandler} value={formData.designation} type="text" name="designation" id="designation" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Your Designation' required={true} autoComplete="off" />
                                        </div>

                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='industry' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Industry</label>
                                            <input onChange={changeHandler} value={formData.industry} type="text" name="industry" id="industry" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Your Industry ' required={true} autoComplete="off" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4 justify-between items-center md:flex-row md:gap-0 '>
                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='occupation' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Occupation</label>
                                            <input onChange={changeHandler} value={formData.occupation} type="text" name="occupation" id="occupation" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Your Occupation ' required={true} autoComplete="off" />
                                        </div>

                                        <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                                            <label htmlFor='address' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Address</label>
                                            <input onChange={changeHandler} value={formData.address} type="text" name="address" id="address" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 " placeholder='Your Address ' required={true} autoComplete="off" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4 justify-between items-center md:flex-row md:gap-8 my-4 '>
                                        <div className='w-[100%] md:w-[30%] flex flex-col gap-2'>
                                            <label htmlFor='country' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Country</label>
                                            <select onClick={getCountries} onChange={changeHandler} value={formData.country} type="text" name="country" id="country" className='w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 ' required={true}>
                                                <option value={""}>Select Country</option>
                                                {
                                                    allCountries.map((country, index) => {
                                                        return (
                                                            <option key={index} value={country.name + '/' + country.isoCode}>{country.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className='w-[100%] md:w-[30%] flex flex-col gap-2'>
                                            <label htmlFor='state' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>State</label>
                                            <select onClick={getStates} onChange={changeHandler} value={formData.state} type="text" name="state" id="state" className='w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 ' required={true}>
                                                <option value={""}>Select State</option>
                                                {
                                                    allStates.map((state, index) => {
                                                        return (
                                                            <option key={index} value={state.name + '/' + state.isoCode}>{state.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className='w-[100%] md:w-[30%] flex flex-col gap-2'>
                                            <label htmlFor='city' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>City</label>
                                            <select onClick={getCity} onChange={changeHandler} value={formData.city} type="text" name="city" id="city" className='w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 ' required={true}>
                                                <option value={""}>Select City</option>
                                                {
                                                    allCities.map((city, index) => {
                                                        return (
                                                            <option key={index} value={city.name}>{city.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </div>

                                    <div className='w-[100%] md:w-[100%] flex flex-col gap-2'>
                                        <label htmlFor='assignmentRequest' className='font-[Mooli] font-bold text-[1.3rem] ml-2'>Message</label>
                                        <input onChange={changeHandler} value={formData.assignmentRequest} type="text" name="assignmentRequest" id="assignmentRequest" className=" w-full bg-[#f3f6fb] placeholder-black dark:text-white dark:placeholder-white border cursor-pointer border-[#243b77] rounded-md dark:bg-[#243b77] shadow-sm hover:shadow-lg transition-all duration-500 text-black sm:text-sm block p-2.5 py-6 " placeholder='Your Message For Us' required={true} autoComplete="off" />
                                    </div>

                                    <div>
                                        <input type={"submit"} value={loading ? <Loader color={"#fff"} /> : "Send Request"} className='cursor-pointer py-2 px-4 rounded-full bg-black text-white shadow-lg hover:scale-[1.05] hover:shadow-2xl duration-500 transition-all' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Consultancy
