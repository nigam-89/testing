import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'

const PrivacyPolicy = () => {

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
                        <h2 className='text-center text-[#243b77] font-semibold text-xl md:text-[2rem]'>Metalogic PMS Commitment to Data Privacy Protection</h2>
                        <p className='text-justify max-md:text-sm'>Protecting the security and privacy of your Personal Information is important to METALOGIC PMS and to the way we conduct our business in compliance with laws on privacy, data protection and data security in the countries in which we maintain Web sites. We hope the policy outlined below will help you understand what information METALOGIC PMS may collect, how METALOGIC PMS uses and safeguards that information and with whom we may share it.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Personal Information</h2>
                        <p className='text-justify max-md:text-sm'>Through our Web sites, METALOGIC PMS will not collect any personally-identifiable information about you (e.g., your name, address, telephone number or e-mail address ("Personal Information"), unless you voluntarily choose to provide it to us (e.g., by registration, survey). If you do not want your Personal Information collected, please do not submit it to us. Subject to the requirements of applicable law, we shall not at any time without your permission, disclose any specific Personal Information which is gathered by us as per this Policy, to any third parties.When you do provide us with Personal Information, we usually use it to respond to your inquiry, process your order or provide you access to specific account information.</p>

                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Non-Personal Information Collected Automatically</h2>
                        <p className='text-justify max-md:text-sm'>When you access our Web sites, we may automatically (i.e., not by registration) collect information that is not personally-identifiable (e.g., type of Internet browser and computer operating system used, domain name of the Web site from which you came, number of visits, average time spent, pages viewed). We may use this information and share it with our worldwide affiliates to measure the use of our Web sites and improve their content.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Security</h2>
                        <p className='text-justify max-md:text-sm'><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS</span></Link> takes precautions to ensure the security of your Personal Information and strives to keep it accurate. We carefully protect your Personal Information from loss, destruction, falsification, manipulation, and unauthorized access or unauthorized disclosure.</p>
                        <p className='font-semibold'>Links to Other Web Sites</p>
                        <p className=''><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS</span></Link> Web sites contain links to other Web sites. METALOGIC PMS is not responsible for the privacy practices or the content of other Web sites.</p>
                    </div>
                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Use of Cookies</h2>
                        <p className='text-justify max-md:text-sm'>The Website may send a "cookie" to your computer. A cookie is a small piece of data that is sent to your browser from a web server and stored on your computer's hard drive. A cookie cannot read data off Your hard disk or read cookie files created by other websites. Cookies do not damage Your system. Cookies allow us to recognize you as a user when you return to the METALOGIC PMS Website using the same computer and web browser. We use cookies to identify which areas of Our Website you have visited and how you use the Website the data collected is used to analyse your use of the Website and to enhance the user experience. We also may use this information to better personalize the content that You see on the Website. Most browser software can be set to reject Cookies. However, if You reject Our Cookies, certain functionality on the Website may not work correctly or at all. We do not link Non-Personal Information from Cookies to Your Personally Identifiable Information.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Security Policy & User ID/Password</h2>
                        <p className='text-justify max-md:text-sm'>Our Website and Service utilizes various information security measures such as internet firewalls, an intrusion detection system, encrypted data transmission, and operating procedures to protect your personal data, accounts, passwords, etc. This information is kept separate and confidential, unless you have given someone-else your user ID and password. As such, you should protect Your user ID and password and NOT share it with anyone. If You believe Your user ID and password have been compromised and you have trouble changing your user ID/password on the Website or within the application, please contact Our technical support department support@metalogicpms.com with the subject line ‘REISSUE LOGIN’</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>LOG Files, IP Address and Information About Your Computer And Mobile Device</h2>
                        <p className='text-justify max-md:text-sm'>Due to the communications standards on the internet, when you visit the website we automatically receive the URL of the website from which you came and the website to which you are going when you leave METALOGIC PMS's website. METALOGIC PMS also receives the internet protocol (“IP”) address of your computer (or the proxy server you use to access the World Wide Web), your computer operating system and type of web browser you are using, your usage patterns, your mobile device (including your UDID) and mobile operating system (if You are accessing the Website using a mobile device), as well as the name of your ISP or your mobile carrier. METALOGIC PMS may also receive location data passed to it from third-party services or GPS-enabled devices that you have enabled. The link between your IP address and your personally identifiable information is not shared with third parties without your permission.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Market Research</h2>
                        <p className='text-justify max-md:text-sm'><Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS</span></Link> may conduct online research surveys in order to gather feedback about the website and opinions on important issues, through email invitations. When participating in a survey, we may ask you to submit Personally Identifiable Information. This Personally Identifiable Information is used for research purposes and is not used for sales solicitations. Personally Identifiable Information collected through market research will be used only by METALOGIC PMS and will not be given or sold to a third party without Your consent or as otherwise permitted by this Privacy Policy.</p>
                    </div>

                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Provide Customer Support</h2>
                        <p className='text-justify max-md:text-sm'>- Communicate and provide additional information that may be of interest to Users through email or other means, such as special offers, announcements, and marketing materials.</p>
                        <p className='text-justify max-md:text-sm'>- Send You reminders, technical notices, updates, security alerts and support and administrative messages, service bulletins, or marketing.</p>
                        <p className='text-justify max-md:text-sm'>- Provide advertisements to you through email messages.</p>
                        <p className='text-justify max-md:text-sm'>- Manage Our everyday business needs such as website administration, forum management, fulfilment, analytics, fraud prevention, enforcement of our corporate reporting obligations, Terms of Use or to comply with the law.</p>
                    </div>
                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Questions and Comments</h2>
                        <p className='text-justify max-md:text-sm'>If you have any questions or comments about <Link to={'https://metalogicpms.com/'} target="_blank"><span className='underline'>METALOGIC PMS's</span></Link> Data Privacy Protection Policy (e.g., to review and update your Personal Information), please address an email to us at <span className='text-semibold'>support@metalogicpms.com</span> with the subject "PRIVACY POLICY." As the Internet matures, so will our Data Privacy Protection Policy. We will post changes to our Data Privacy Protection Policy on this page as soon as the commitment has been made to alter any existing policy.</p>
                    </div>
                    <div className='w-[100%] px-4 md:px-16 py-8 flex flex-col gap-8 font-[Rubik] '>
                        <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem]'>Changes To This Privacy Policy</h2>
                        <p className='text-justify max-md:text-sm'>The Privacy Policy may be changed at any time upon our sole discretion and without prior notice to you. The revised Privacy Policy will be effective immediately when posted on the Website. It is your responsibility to review the Website and the Privacy Policy periodically to learn of any revisions to this Privacy Policy. Your continued use of the Website after the effectiveness of such revisions will constitute your acknowledgment and acceptance of the terms of the revised Privacy Policy.</p>
                        <p className='text-justify max-md:text-sm'>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided to us, or by placing a prominent notice on our website.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
