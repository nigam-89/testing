import React from 'react'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'
import Footer from './../../components/global/Footer/Footer';
// import Section1 from './HomeComponents/Section1/Section1';
import Section1New from './HomeComponents/Section1New/Section1New';
import Section2 from './HomeComponents/Section2/Section2';
import Section3 from './HomeComponents/Section3/Section3';
import Section4 from './HomeComponents/Section4/Section4';
import Section5 from './HomeComponents/Section5/Section5';
import Section6 from './HomeComponents/Section6/Section6';
import Section7 from './HomeComponents/Section7/Section7';
import Section8 from './HomeComponents/Section8/Section8';

const HomePage = () => {
    return (
        <div className="overflow-x-hidden">
            <UpperNavbar />
            <Navbar />
            <div className="h-[100%]">
                {/* <Section1 /> */}
                <Section1New />
                <div className='3xl:w-[1500px] mx-auto'>
                    <Section2 />
                </div>
                <Section3 />
                <div className='3xl:w-[1500px] mx-auto'>
                    <Section4 />
                    <Section5 />
                    <Section6 />
                </div>
                <Section7 />
                <div className='3xl:w-[1500px] mx-auto'>
                    <Section8 />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
