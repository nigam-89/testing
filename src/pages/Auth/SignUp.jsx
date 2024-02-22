import React from 'react'
import UpperNavbar from './../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../components/global/Navbar/Navbar';
import Footer from './../../components/global/Footer/Footer';
import './Auth.css'
import { useState, useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai'
import Loader from '../../components/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { UserAuthAPI } from '../../services/apis';
import { toast } from 'react-hot-toast';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', firstname: '', lastname: '', displayname: '' })
    const [loading, setLoading] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(formData);
        try {
            let response = await apiConnector({
                method: "POST",
                url: UserAuthAPI.registerNewUser_API,
                bodyData: {
                    name: {
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                    },
                    displayname: formData.displayname,
                    email: formData.email,
                    password: formData.password,
                }
            });
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                setOtpSend(true);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false)
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await apiConnector({
                method: "POST",
                url: UserAuthAPI.userAccountOTPVerification_API,
                bodyData: {
                    email: formData.email,
                    otp: otp,
                }
            });
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate('/sign-in')
                // setOtpSend(true);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false)
    }

    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className='px-3 md:px-32 py-4 md:py-12 min-h-[80vh] relative auth_bg flex justify-center items-center'>
                <div className='flex justify-center items-center w-full max-md:px-4'>
                    <div className='bg-white p-4 rounded-xl w-[32rem] py-12'>
                        {
                            otpSend ?
                                <form onSubmit={handleOtpVerify} className=''>
                                    <h2 className='text-lg font-[Poppins] text-center font-[500] pb-4 tracking-wide'>Enter OTP send to {" "}
                                        <span className='text-violet-500 italic underline'>{formData?.email}</span>
                                    </h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="otp" className='text-sm font-[Poppins] font-[500]'>OTP</label>
                                        <input onChange={(e) => setOtp(e.target.value)} autoComplete="otp" value={otp} name="otp" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>



                                    <div className='mb-4 mt-8 flex flex-col relative'>
                                        <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                            {
                                                loading ? <Loader /> : "VERIFY"
                                            }
                                        </button>
                                    </div>

                                </form>
                                :
                                <form onSubmit={handleSubmit} className=''>
                                    <h2 className='text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide'>REGISTER TO CONTINUE</h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="firstname" className='text-sm font-[Poppins] font-[500]'>First Name</label>
                                        <input onChange={changeHandler} autoComplete="firstname" value={formData.firstname} name="firstname" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="lastname" className='text-sm font-[Poppins] font-[500]'>Last Name</label>
                                        <input onChange={changeHandler} autoComplete="lastname" value={formData.lastname} name="lastname" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="displayname" className='text-sm font-[Poppins] font-[500]'>Display Name</label>
                                        <input onChange={changeHandler} autoComplete="displayname" value={formData.displayname} name="displayname" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="email" className='text-sm font-[Poppins] font-[500]'>Email</label>
                                        <input onChange={changeHandler} autoComplete="email" value={formData.email} name="email" type="email" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col relative'>
                                        <label htmlFor="email" className='text-sm font-[Poppins] font-[500]'>Password</label>
                                        <input onChange={changeHandler} value={formData.password} name="password" type={showPassword ? "text" : "password"} className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' autoComplete='current-password' />
                                        <div className={`absolute bottom-3 right-2 cursor-pointer ${showPassword ? "text-violet-500" : "text-gray-800"} `} onClick={() => setShowPassword((prev) => !prev)} ><AiFillEye /></div>
                                    </div>


                                    <div className='mb-4 mt-8 flex flex-col relative'>
                                        <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                            {
                                                loading ? <Loader /> : "REGISTER"
                                            }
                                        </button>
                                    </div>

                                </form>
                        }

                        <div className='w-full flex justify-center items-center mt-4 relative before:absolute before:w-full before:h-[1.5px] before:top-2 before:left-0 before:bg-violet-500'>
                            <span className='text-sm font-[Poppins] inline z-10 bg-white rounded-full px-1 text-center font-[500] pb-4 tracking-wide'>
                                OR
                            </span>
                        </div>

                        <div>
                            <p className='text-sm font-[Poppins] text-center font-[500] pb-4 tracking-wide'>Have an account?</p>

                            <Link to='/sign-in'>
                                <button className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                    {
                                        "LOG IN"
                                    }
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp
