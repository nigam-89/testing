import React, { useEffect, useState } from 'react'

const StickyHeading = ({ title, img, textColor }) => {
    const [header, setHeader] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 200) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    });


    return (
        <div className={`w-full h-[150px] z-10 duration-300 relative ${header && "sticky top-0 left-0 z-10 bg-white w-full h-[100px]"}`} style={{ backgroundImage: `url('${img}')` }}>
            {/* <img src={img} alt='metalogic' className={`w-[100%] h-[100%]`} /> */}
            <h1 className={`3xl:w-[1400px] mx-auto max-md:px-4 md:max-w-[92.5%] w-[100%] z-20 font-[Nunito] tracking-wider duration-300 text-white py-[70px] ${header ? "text-3xl md:text-4xl" : "text-2xl md:text-5xl"} font-[800]`}>{title}</h1>
            <div className='w-[100%] h-[100%] absolute top-0 bg-gradient-to-r from-black via-[#000000ad] to-transparent opacity-[1] -z-10'></div>
        </div>
        // <div className={`w-full h-[150px] duration-300 relative ${header && "sticky top-0 left-0 z-10 bg-white w-full h-[100px]"}`} >
        //     <img src={img} alt='metalogic' className={`w-[100%] h-[100%]`} />
        //     <h1 className={`font-[Nunito] tracking-wider duration-300 absolute bottom-10 px-4 md:px-14 z-20 text-white ${header ? "text-3xl md:text-4xl" : "text-2xl md:text-5xl"} font-[800]`}>{title}</h1>
        //     <div className='w-[100%] h-[100%] absolute top-0 bg-gradient-to-r from-black via-[#000000ad] to-transparent opacity-[1] z-10'></div>
        // </div>
    )
}

export default StickyHeading
