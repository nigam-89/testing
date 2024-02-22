import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/global/Navbar/Navbar'
import Footer from '../../components/global/Footer/Footer'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'

const TermsCondition = () => {

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <div className='3xl:w-[1500px] mx-auto'>
                <div className='h-[100%] w-[100%] overflow-x-hidden py-8'>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-4 font-[Rubik] '>
                        <h2 className='text-center text-[#243b77] font-semibold text-xl md:text-[2rem]'>Terms & Condition</h2>
                        <p className='text-justify max-md:text-sm'><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS</span></Link>, endeavours to ensure that every transaction at our website is seamless. We take great care in delivering our products and adhere to the highest quality standards.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>TERMS OF USE AGREEMENT</h2>
                        <p className='text-justify max-md:text-sm'>("METALOGIC PMS", "we" or "us"). This page explains the terms by which you may use our online and/or mobile services and website/ websites provided on or in connection with METALOGIC PMS (collectively the "Service"). By accessing or using the Service, you agree that you have read, understood, and agree to be bound by these Terms of Use (the "Agreement"), whether or not you are a registered user of our Service.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>USE OF OUR SERVICE</h2>
                        <p className='text-justify max-md:text-sm'>You may use the Service only if you can form a binding contract with <Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline font-semibold'>METALOGIC PMS</span></Link>, and only in compliance with this Agreement and all applicable local, state, national, and international laws, rules and regulations. METALOGIC PMS reserves all rights not expressly granted under this Agreement. Any attempt by you to transfer any of the rights, duties or obligations hereunder, except as expressly provided for in this Agreement, is void.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>COPYRIGHT AND INTELLECTUAL PROPERTY</h2>
                        <p className='text-justify max-md:text-sm'><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>WWW.MYMETALOGIC.COM</span></Link></p>
                        <p className='font-semibold'>OUR PROPRIETARY RIGHTS</p>
                        <p className=''>You may choose to or we may invite you to submit comments or ideas about the Service, including without limitation about how to improve the Service or our products ("Ideas"). By submitting any Idea, you agree that your disclosure is gratuitous, unsolicited and without restriction and will not place METALOGIC PMS under any fiduciary or other obligation, and that we are free to use the Idea without any additional compensation to you, and/or to disclose the Idea on a non-confidential basis or otherwise to anyone. You further acknowledge that, by acceptance of your submission, <Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS</span></Link>  does not waive any rights to use similar or related ideas previously known to METALOGIC PMS , or developed by its employees, or obtained from sources other than you.</p>
                        <p><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>WWW.MYMETALOGIC.COM</span></Link> may provide <Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>www..MYMETALOGIC.COM</span></Link>members referral credits when members invite their friends to join www.MYMETALOGIC.com (“Referral Credits”). Referral Credits may be awarded to the referrer when her friends join, as well as when her friends make their first purchases.</p>
                    </div>
                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>REFUND AND CANCELLATION POLICY</h2>
                        <p className='text-justify max-md:text-sm'>Services once ordered cannot be cancelled.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TermsCondition
