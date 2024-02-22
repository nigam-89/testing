import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { apiConnector } from '../../../services/apiConnector';
import { InMediaAPI, HandleImagesAPI } from '../../../services/apis';

const Create = () => {
  const [formData, setFormData] = useState({ heading: '', date: '', description: '', inMediaUrl: '' })
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef();
  const admin = useSelector((state) => state.admin);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };


  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    console.log("files thumbnail change", files)
    setSelectedThumbnail([...selectedThumbnail, ...files]);
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

    let images;
    let thumbnails;
    try {
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

      const thumbnailImageData = new FormData();
      if (images) {
        selectedThumbnail.forEach((thumbnail) => {
          thumbnailImageData.append('thumbnails', thumbnail);
        });
        let res = await apiConnector({
          method: "POST",
          url: HandleImagesAPI.uploadThumbnail_API,
          bodyData: thumbnailImageData,
        });
        if (res.data.success) {
          console.log("thumbnails data->", res)
          thumbnails = res?.data?.data?.[0];
        }
      }

      if (images && thumbnails) {
        response = await apiConnector({
          method: "POST",
          url: InMediaAPI.CreateMedia_API,
          bodyData: {
            imgUrlModelDBId: images,
            thumbnailId: thumbnails,
            heading: formData.heading,
            date: formData.date,
            description: formData.description,
            inMediaUrl: formData.inMediaUrl,
          },
          headers: { token: admin.token }
        });
      }
      if (response?.data?.success) {
        toast.success(response?.data?.message)
        setFormData({ heading: '', date: '', description: '', inMediaUrl: '' });
        setSelectedImages([]);
        fileInputRef.current.value = '';
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
                <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>IN MEDIA</h2>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="thumbnail" className='text-sm font-[Poppins] font-[500]'>Cover Image</label>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                    type="file"
                    id="formFileMultiple"
                    accept='image/*'
                    multiple
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="thumbnail" className='text-sm font-[Poppins] font-[500]'>Thumbnail (420px * 250px)</label>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                    type="file"
                    id="formFileMultiple"
                    accept='image/*'
                    onChange={handleThumbnailChange}
                    ref={fileInputRef}
                  />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                  <input onChange={changeHandler} max={new Date().toISOString().split('T')[0]} autoComplete="date" value={formData.date} name="date" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="heading" className='text-sm font-[Poppins] font-[500]'>Heading</label>
                  <input onChange={changeHandler} autoComplete="heading" value={formData.heading} name="heading" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="description" className='text-sm font-[Poppins] font-[500]'>Description</label>
                  <input onChange={changeHandler} autoComplete="description" value={formData.description} name="description" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="inMediaUrl" className='text-sm font-[Poppins] font-[500]'>In Media Url</label>
                  <input onChange={changeHandler} autoComplete="inMediaUrl" value={formData.inMediaUrl} name="inMediaUrl" type="url" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
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
