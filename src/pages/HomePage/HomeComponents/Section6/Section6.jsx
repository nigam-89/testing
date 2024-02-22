import React from 'react'

const Section6 = () => {
    const arr = [
        'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700211671/key_perosn/PICC_zzf07d.webp',
        'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700211670/key_perosn/Transasia_fxf7em.webp',
        'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700211671/key_perosn/Misha_jammgr.webp',
        'https://res.cloudinary.com/djr2f6dlh/image/upload/v1700211670/key_perosn/TVQ_rzf7xb.webp',
    ];
    return (
        <div className='px-4 md:px-16 py-3 md:py-6 h-full w-full'>
            <h2 className='font-[Poppins] tracking-wider text-3xl text-center font-[600] uppercase py-2'>
                Our Partners
                {" "}
                <span className='font-[500]'>
                    for Specialized Services
                </span>
            </h2>
            
            <div className='w-full p-3 flex flex-col md:flex-row gap-5 md:gap-12 my-5 md:my-8'>
                {
                    arr.map((item, index) => (
                        <div key={index} data-aos="zoom-in" data-aos-duration="2000" className='flex-[25%] h-[5rem] md:h-[10rem] px-6 py-3 group rounded-xl flex justify-center items-center'>
                            <img src={item} alt={item} className='h-full w-full md:w-full object-contain rounded-xl group-hover:scale-[0.9] duration-300' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Section6
