import React from 'react'
import Sidebar from '../../components/Sidebar/SideBar'
import './Welcome.css'

const Welcome = () => {
  return (
    <Sidebar>
      <div className='w-full h-screen relative'>
        <div className='flex justify-center items-center h-full w-full flex-col relative'>

          <div className='flex justify-center items-center'>
            <img src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png" alt="logo" className="md:cursor-pointer w-20 md:w-32" />
          </div>
          <h2 className='text-3xl text-center font-[Poppins] text-white font-[500] py-3 px-1'>
            Welcome to Admin Panel
          </h2>

        </div>
      </div>
    </Sidebar>
  )
}

export default Welcome
