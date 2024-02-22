import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { apiConnector } from '../../../services/apiConnector';
import { EventAPI, HandleImagesAPI } from '../../../services/apis';
import { useRef } from 'react';
// import { BASE_URL } from './../../../services/apis';
// import { io } from 'socket.io-client';

// const socket = io(BASE_URL);

const CreateEvent = () => {
  const [formData, setFormData] = useState({ title: '', url: '' })
  const [loading, setLoading] = useState(false)
  const admin = useSelector((state) => state.admin);
  const fileInputRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);



  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

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
    e.preventDefault();
    try {
      let images;
      const formImageData = new FormData();
      selectedImages.forEach((image) => {
        formImageData.append('images', image);
      });
      let response = await apiConnector({
        method: "POST",
        url: HandleImagesAPI.UploadImage_API,
        bodyData: formImageData,
      });
      if (response.data.success) {
        images = response?.data?.data?._id;
      }
      if (response) {
        response = await apiConnector({
          method: "POST",
          url: EventAPI.CreateEvent_API,
          bodyData: {
            imgUrlModelDBId: images,
            title: formData.title,
            url: formData.url
          },
          headers: { token: admin.token }
        });
      }
      if (response?.data?.success) {
        toast.success(response?.data?.message)
        // socket.emit("eventCreated",response?.data);
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

        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center w-full max-md:px-4'>
            <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
              <form onSubmit={handleSubmit} className=''>
                <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>Event</h2>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="thumbnail" className='text-sm font-[Poppins] font-[500]'>Thumbnail</label>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                    type="file"
                    id="formFileMultiple"
                    accept='image/*'
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="title" className='text-sm font-[Poppins] font-[500]'>Title</label>
                  <input onChange={changeHandler} autoComplete="title" value={formData.title} name="title" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>


                <div className='mb-4 flex flex-col'>
                  <label htmlFor="url" className='text-sm font-[Poppins] font-[500]'>Event URL</label>
                  <input onChange={changeHandler} autoComplete="url" value={formData.url} name="url" type="url" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
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

export default CreateEvent;
