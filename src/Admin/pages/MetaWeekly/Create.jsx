import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { apiConnector } from '../../../services/apiConnector';
import { MetaWeeklyAPI } from '../../../services/apis';

const Create = () => {
  const [formData, setFormData] = useState({ date: '', volumeHeading: '', pdfUrl: '' })
  const [loading, setLoading] = useState(false)
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let response = await apiConnector({
        method: "POST",
        url: MetaWeeklyAPI.CreateMeta_API,
        bodyData: {
          date: formData.date,
          volumeHeading: formData.volumeHeading, 
          pdfUrl: formData.pdfUrl 
        },
        headers: { token: admin.token }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message)
        setFormData({ date: '', volumeHeading: '', pdfUrl: '' });
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen relative'>
      <div className='flex flex-col justify-between gap-8 py-4'>

        {/* form to create market news */}
        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center w-full max-md:px-4'>
            <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
              <form onSubmit={handleSubmit} className=''>
                <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>METAWEEKLY</h2>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="volumeHeading" className='text-sm font-[Poppins] font-[500]'>Volume Heading</label>
                  <input onChange={changeHandler} autoComplete="volumeHeading" value={formData.volumeHeading} name="volumeHeading" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                  <input onChange={changeHandler} max={new Date().toISOString().split('T')[0]} autoComplete="date" value={formData.date} name="date" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="pdfUrl" className='text-sm font-[Poppins] font-[500]'>PDF URL</label>
                  <input onChange={changeHandler} autoComplete="pdfUrl" value={formData.pdfUrl} name="pdfUrl" type="url" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 mt-8 flex flex-col relative'>
                  <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                    {
                      loading ? <Loader /> : "CREATE"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div >
    </div >
  )
}

export default Create
