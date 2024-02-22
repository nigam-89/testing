import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillInstagram, AiFillFacebook, AiFillYoutube, AiFillLinkedin } from "react-icons/ai"
import { FaSquareXTwitter } from "react-icons/fa6"
import "./Footer.css"
import { toast } from 'react-hot-toast'
import { Button } from '@chakra-ui/react';
import { apiConnector } from '../../../services/apiConnector'
import { SubscribedEmailsAPI } from '../../../services/apis'
import { useSelector } from 'react-redux'

const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (email.length < 6) {
            toast.error("Enter a valid email.");
            setLoading(false);
            return;
        }
        try {
            let response = await apiConnector({
                method: "POST",
                url: SubscribedEmailsAPI.CreateSubsEmail_API,
                bodyData: {
                    email: email
                },
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message)
                setEmail('');
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
        // console.log(email)
    }

    return (
        <>
            <div className='w-[100%] pt-10  bg-gray-200 text-black   relative overflow-hidden md:pt-4'>
                <div className='w-[90%] mx-auto flex flex-col justify-around items-center gap-2 py-4 md:flex-row'>
                    <div className='w-[100%] md:max-w-[40%]'>
                        <Link to={'/'}>
                            {
                                user?.hasSubscription ?
                                    <div>
                                        <img src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1699525490/key_perosn/Metalogic_Logo_plus_lw60ej.png' className='w-[20%]   mb-4' alt='LOGO' />
                                    </div>
                                    :
                                    <div>
                                        <img src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png' className='w-[20%]   mb-4' alt='LOGO' />
                                    </div>
                            }
                        </Link>
                        <p className='transition-all duration-300 max-md:text-justify'>Market Leader in Creating Dialogue by Holding Webinars & Events for Mining & Steel Industry in India for the last 5 years. Our products are designed to provide an intel, practical solution to various issues related to policies, market, trade, technology or product design.</p>
                        <div className='flex gap-6 text-xl w-full  py-5 justify-start items-center'>
                            <a href='https://instagram.com/metalogicpms?igshid=NzZlODBkYWE4Ng==' rel='noreferrer' target={"_blank"} className='cursor-pointer '><AiFillInstagram /></a>
                            <a href='https://www.facebook.com/metalogicpmspvtltd?mibextid=ZbWKwL' rel='noreferrer' target={"_blank"} className='cursor-pointer '><AiFillFacebook /></a>
                            <a href='https://youtube.com/metalogicpms' rel='noreferrer' target={"_blank"} className='cursor-pointer '><AiFillYoutube /></a>
                            <a href='https://www.linkedin.com/company/metalogic-projects-management-services-pvt-ltd-' rel='noreferrer' target={"_blank"} className='cursor-pointer'><AiFillLinkedin /></a>
                            <a href='https://x.com/metalogicpms?t=gpsiItEW1EcvwyPrDC6olQ&s=09' rel='noreferrer' target={"_blank"} className='cursor-pointer'><FaSquareXTwitter /></a>
                        </div>
                    </div>

                    <div className='w-[100%] flex flex-col justify-between gap-6 md:w-auto'>
                        <div className='flex flex-col justify-between items-baseline gap-16 p-4 md:flex-row'>
                            <div className='flex flex-col font-[Roboto] max-md:w-[100%]'>
                                <p className='font-[Roboto] font-bold uppercase  border-b-black border text-center'>Quick Links</p>
                                <div className='flex flex-row justify-between items-start gap-8'>
                                    <div>
                                        <Link to={'/all-graphs'}>
                                            <p className='mt-4 hover:scale-[0.95] transition-all duration-500'>Graph</p>
                                        </Link>
                                        <Link to={'/opinion-box'}>
                                            <p className='mt-4 hover:scale-[0.95] transition-all duration-500'>Opinion Box</p>
                                        </Link>
                                        <Link to={'/reports-download'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Reports</p>
                                        </Link>
                                        <Link to={'/ishop'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>iShop</p>
                                        </Link>
                                        <Link to={'/market-research'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Research</p>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={'https://metalogicpms.com/'} target="_blank">
                                            <p className='mt-4 hover:scale-[0.95] transition-all duration-500'>Events</p>
                                        </Link>
                                        <Link to={'/latest-videos'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Latest Videos</p>
                                        </Link>
                                        <Link to={'/market-news/steel-&-scrap'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Market News</p>
                                        </Link>
                                        <Link to={'/about'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>About Us</p>
                                        </Link>
                                        <Link to={'/contact'}>
                                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Contact</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col font-[Roboto] gap-4 max-md:w-[100%]'>
                                <h2 className='uppercase font-bold border-b-black border'>Subscribe For Newsletter</h2>
                                <form onSubmit={handleSubmit} className='flex flex-col justify-between items-start w-[100%] gap-2'>
                                    <input onChange={(e) => setEmail(e.target.value)} autoComplete="email" value={email} name="email" type="email" className='text-sm border-2 border-[#243b77] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1 w-full' placeholder='Enter Your Email' />

                                    <Button isLoading={loading} isDisabled={loading} type='submit' colorScheme="facebook" className='border  w-[100%] py-2 rounded-lg transition-all duration-300 hover:scale-[0.98] '>
                                        <p className='text-white font-[Poppins] font-[500] tracking-wide'>
                                            Subscribe
                                        </p>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-around max-md:items-start gap-4  mx-auto bg-[#242e47] text-white py-4 px-10 md:flex-row md:items-baseline'>
                    <p className='text-xs'>Copyrights Reserved © 2023 <a href="https://www.mymetalogic.com" target={"_blank"} rel='noreferrer' className='text-[0.95rem] font-[500] md:font-[600] font-[Rubik]'>My Metalogic</a> | All rights reserved | Designed, developed and maintained by <a href="https://www.webdesys.com" target={"_blank"} rel='noreferrer' className='text-md font-[500] md:font-[600] font-[Rubik] text-[0.95rem]'>WebDesys</a>.</p>
                    <div className='flex flex-wrap font-[Rubik] justify-between gap-4 max-md:text-sm text-[0.95rem] md:flex-row md:items-center'>
                        <Link to={'/payment-policy'}>
                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500 '>Payment Policy</p>
                        </Link>
                        <Link to={'/privacy-policy'}>
                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500 '>Privacy Policy</p>
                        </Link>
                        <Link to={'/terms-and-condition'}>
                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Terms And Condition</p>
                        </Link>
                        <Link to='/career'>
                            <p className='mt-2 hover:scale-[0.95] transition-all duration-500'>Career</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
