import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/SideBar';
import Loader from './../../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { SendNotificationAPI } from '../../../services/apis';
import { toast } from 'react-hot-toast';

const SendNotificationToUsers = () => {
    const [formData, setFormData] = useState({ title: '', description: '', image: '', link: '', linkName: '' })
    const [loading, setLoading] = useState(false)
    const admin = useSelector((state) => state.admin);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



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
                url: SendNotificationAPI.SendNotification_API,
                bodyData: {
                    title: formData.title,
                    description: formData.description,
                    image: formData.image,
                    link: formData.link || "https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png",
                    linkName: formData.linkName
                },
                headers: { token: admin.token }
            });
            if (response?.data?.success) {
                toast.success(response?.data?.message + "Total Users:" + response?.data?.Total_Subscriptions);
                toast.success("success:" + response?.data?.Sent + ", Fail:" + response?.data?.Fail);
                setFormData({ title: '', description: '', image: '', link: '', linkName: '' });
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false)
    }


  return (
      <div className='overflow-x-hidden'>
          <Sidebar>
              <div className='w-full min-h-screen relative'>
                  <div className='flex flex-col justify-between gap-8 py-4'>

                      {/* form to create market news */}
                      <div className='flex justify-center items-center'>
                          <div className='flex justify-center items-center w-full max-md:px-4'>
                              <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
                                  <form onSubmit={handleSubmit} className=''>
                                      <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>SEND CUSTOM NOTIFICATION</h2>


                                      <div className='mb-4 flex flex-col'>
                                          <label htmlFor="title" className='text-sm font-[Poppins] font-[500]'>Title</label>
                                          <input required={true} onChange={changeHandler} autoComplete="title" value={formData.title} name="title" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                      </div>
                                      <div className='mb-4 flex flex-col'>
                                          <label htmlFor="description" className='text-sm font-[Poppins] font-[500]'>Description</label>
                                          <input required={true} onChange={changeHandler} autoComplete="description" value={formData.description} name="description" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                      </div>
                                      <div className='mb-4 flex flex-col'>
                                          <label htmlFor="image" className='text-sm font-[Poppins] font-[500]'>Image URL</label>
                                          <input required={true} onChange={changeHandler} autoComplete="image" value={formData.image} name="image" type="url" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                      </div>
                                      <div className='mb-4 flex flex-col'>
                                          <label htmlFor="link" className='text-sm font-[Poppins] font-[500]'>Button Link</label>
                                          <input required={true} onChange={changeHandler} autoComplete="link" value={formData.link} name="link" type="url" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                      </div>
                                      <div className='mb-4 flex flex-col'>
                                          <label htmlFor="linkName" className='text-sm font-[Poppins] font-[500]'>Button Title</label>
                                          <input required={true} onChange={changeHandler} autoComplete="linkName" value={formData.linkName} name="linkName" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                      </div>

                                      <div className='mb-4 mt-8 flex flex-col relative'>
                                          <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                              {
                                                  loading ? <Loader /> : "Create"
                                              }
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>

                  </div >
              </div >
          </Sidebar>
      </div>
  )
}

export default SendNotificationToUsers
