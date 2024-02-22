import React, { useEffect } from 'react'
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'

const PaymentPolicy = () => {
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
                        <h2 className='text-center text-[#243b77] font-semibold text-xl md:text-[2rem]'>Payment Policy for MyMetalogic</h2>
                        <h2 className='text-[#243b77] font-semibold text-sm'>Effective Date: 1 April 2023</h2>
                        <p className='text-justify max-md:text-sm'>Thank you for choosing MyMetalogic for your subscription and e-commerce needs. This Payment Policy outlines the terms and conditions related to payments for our services. Please read this document carefully.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>1. Subscription Plans:</h2>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>1.1 Payment Methods:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - MyMetalogic accepts payments for subscription plans through various methods, including credit cards, debit cards, and other online payment methods.</p>
                            <p className='text-justify max-md:text-sm pl-4'> - Payments are processed securely through our payment gateway to ensure the confidentiality of your financial information.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>1.2 Billing Cycle:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - Subscription fees are billed on a recurring basis according to the selected plan and billing cycle (quarterly, half yearly or annually)</p>
                            <p className='text-justify max-md:text-sm pl-4'> - The billing cycle begins on the date of your initial subscription activation.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>1.3 Auto-Renewal:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - All subscription plans are set to auto-renew by default to ensure uninterrupted access to MyMetalogic services.</p>
                            <p className='text-justify max-md:text-sm pl-4'> - You may disable the auto-renewal feature by adjusting your account settings before the next billing cycle.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>1.4 Payment Failure:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - In the event of a payment failure, we will attempt to notify you to update your payment information.</p>
                            <p className='text-justify max-md:text-sm pl-4'> - Failure to update payment information within a specified timeframe may result in the suspension or termination of your subscription.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>1.5 Refunds:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - MyMetalogic offers a 14 days money-back guarantee for new subscribers. If you are unsatisfied with our services, you may request a refund within this period.</p>
                        </div>

                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>2. E-commerce:</h2>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>2.1 Payment Methods:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - For e-commerce transactions, MyMetalogic accepts payments through various methods, including credit cards, debit cards, and other online payment methods.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>2.1 Order Processing:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - Orders will be processed once payment is successfully received and confirmed.</p>
                            <p className='text-justify max-md:text-sm pl-4'> - You will receive an order confirmation email with details of your purchase.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>2.3 Shipping and Handling:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - For physical products, shipping and handling charges may apply and will be clearly communicated during the checkout process.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>2.4 Refunds and Returns:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - Refunds and returns are subject to our Refund and Return Policy, available on our website.</p>
                            <p className='text-justify max-md:text-sm pl-4'> -  Please review this policy before making a purchase.</p>
                        </div>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>3. General Terms:</h2>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>3.1 Currency:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - All transactions are processed in [Insert Currency].</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>3.2 Taxes:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - Applicable taxes will be added to your invoice or order total during the checkout process.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>3.3 Changes to Payment Policy:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - MyMetalogic reserves the right to modify this Payment Policy at any time. Changes will be effective immediately upon posting on our website.</p>
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h2 className='text-[#243b77] font-semibold text-xl mb-2'>3.4 Refunds and Returns:</h2>
                            <p className='text-justify max-md:text-sm pl-4'> - Refunds and returns are subject to our Refund and Return Policy, available on our website.</p>
                            <p className='text-justify max-md:text-sm pl-4'> -  Please review this policy before making a purchase.</p>
                        </div>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem] my-2'>Contact Information:</h2>
                        <p className='text-justify max-md:text-sm text-lg pl-4 my-4'>If you have any questions or concerns regarding our Payment Policy, please contact our customer support at <span className='underline text-[#243b77]'>support@metalogicpms.com</span> </p>
                        <p className='text-justify max-md:text-sm text-lg pl-4 my-2'>Thank you for choosing MyMetalogic.</p>
                        <p className='text-justify max-md:text-sm text-lg pl-4 my-2'>Sincerely,</p>
                        <p className='text-justify max-md:text-sm text-lg pl-4 my-2'>METALOGIC PROJECTS MANAGEMENT SERVICES PVT LTD</p>
                        <p className='text-justify max-md:text-sm text-lg pl-4 my-2 underline text-[#243b77] font-semibold'>support@metalogicpms.com</p>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentPolicy
