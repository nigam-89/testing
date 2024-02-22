import React from 'react'
import './Section7.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Videos from './Videos';

const Section7 = () => {
    const latestVideos = useSelector((state) => state?.latestVideos?.data);

    return (
        <div className='about2_bg relative'>
            <div className='px-4 md:px-16 py-3 md:py-6  w-full 3xl:w-[1500px] mx-auto'>
                <h2 className='font-[Poppins] flex justify-center items-center text-white md:text-start tracking-wider text-3xl font-[600] py-2'>
                    LATEST VIDEOS
                </h2>

                <div className='flex justify-around items-center w-full flex-col md:flex-row gap-5 md:gap-8 my-5'>
                    {
                        latestVideos && latestVideos.length >= 3 &&
                        latestVideos.slice(0, 3).map((item, index) => {
                            return <Videos key={index} item={item} />
                        })
                    }
                </div>

                <div className='flex justify-center items-center pt-3 gap-x-5'>
                    <Link to='/latest-videos' className="text-sm font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-violet-500  hover:text-violet-500 hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide" >
                        View All
                    </Link>

                    <a href='https://www.youtube.com/@MetalogicPMS' rel="noreferrer" target="_blank" className="text-sm font-[500]  mb-2 py-1 rounded-xl px-4 custom_colors border-2 hover:border-violet-500  hover:text-violet-500 hover:bg-white transition-all duration-300 ease-in-out flex justify-center items-center font-[Poppins] tracking-wide" >
                        Visit Our Youtube Channel
                    </a>

                </div>

            </div>
        </div>
    )
}

export default Section7