import React from 'react'
import UpperNavbar from './../../components/global/UpperNavbar/UpperNavbar';
import Navbar from './../../components/global/Navbar/Navbar';
import Footer from './../../components/global/Footer/Footer';
import './Auth.css'
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai'
import Loader from '../../components/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUser } from '../../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import ForgotPassword from './ForgotPassword';

// import { io } from "socket.io-client";
// const API = "http://127.0.0.1:8080";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user);

    // const socket = io(API);

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
    }, []);

    useEffect(() => {
        if (user._id) {
            navigate('/dashboard/profile')
        }
    }, [navigate, user])

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()

        if (formData.email.length === 0) {
            toast.error("Enter a valid Email");
            setLoading(false)
            return;
        }
        if (formData.password.length === 0) {
            toast.error("Enter a valid Password");
            setLoading(false)
            return;
        }

        // console.log(formData)

        dispatch(loginUser(formData)).then(() => {
            setLoading(false);
        });
        setLoading(false)
    }

    // const user1 = useSelector((state)=>state.user);
    // socket.emit("new-user-joined", user1?._id);

    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className='px-3 md:px-32 py-4 md:py-12 min-h-[80vh] relative auth_bg flex justify-center items-center'>
                <div className='flex justify-center items-center w-full max-md:px-4'>
                    <div className='bg-white p-4 rounded-xl w-[32rem] py-12'>
                        <form onSubmit={handleSubmit} className=''>
                            <h2 className='text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide'>Sign In</h2>

                            <div className='mb-4 flex flex-col'>
                                <label htmlFor="email" className='text-sm font-[Poppins] font-[500]'>Email</label>
                                <input onChange={changeHandler} autoComplete="name" value={formData.email} name="email" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                            </div>

                            <div className='mb-1 flex flex-col relative'>
                                <label htmlFor="email" className='text-sm font-[Poppins] font-[500]'>Password</label>
                                <input onChange={changeHandler} value={formData.password} name="password" type={showPassword ? "text" : "password"} className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' autoComplete='current-password' />
                                <div className={`absolute bottom-3 right-2 cursor-pointer ${showPassword ? "text-violet-500" : "text-gray-800"} `} onClick={() => setShowPassword((prev) => !prev)} ><AiFillEye /></div>
                                
                            </div>

                            <div className='flex justify-end'>
                                <ForgotPassword />
                            </div>


                            <div className='mb-4 mt-8 flex flex-col relative'>
                                <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                    {
                                        loading ? <Loader /> : "SIGN IN"
                                    }
                                </button>
                            </div>

                        </form>

                        <div className='w-full flex justify-center items-center mt-4 relative before:absolute before:w-full before:h-[1.5px] before:top-2 before:left-0 before:bg-violet-500'>
                            <span className='text-sm font-[Poppins] inline z-10 bg-white rounded-full px-1 text-center font-[500] pb-4 tracking-wide'>
                                OR
                            </span>
                        </div>

                        <div>
                            <p className='text-sm font-[Poppins] text-center font-[500] pb-4 tracking-wide'>Don't have an account? Sign up</p>

                            <Link to='/sign-up'>
                                <button className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                    {
                                        "REGISTER"
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

export default Auth
