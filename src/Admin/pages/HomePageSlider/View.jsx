import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { HandleImagesAPI } from '../../../services/apis';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import { Button } from '@chakra-ui/react'

const View = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("slider");
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();



  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: HandleImagesAPI.ViewGallery_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&category=${category}`, headers: { token: admin.token } })
      // console.log(response.data);
      setData(response.data.data)
  
      setTotalPages(Math.ceil(response.data.count / pageSize))
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 10) => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({ method: "GET", url: HandleImagesAPI.ViewGallery_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&category=${category}`, headers: { token: admin.token } })
        // console.log(response.data);
        setData(response.data.data)
        setTotalPages(Math.ceil(response.data.count / pageSize))
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
      setLoading(false);
    }
    getData();
  }, [admin, category])

  const HandleDelete = async (id) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: HandleImagesAPI.DeleteGallery_API + `/${id}`, headers: { token: admin.token } })
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
    }
    getData();
  }

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo(pageNo = pageNo + 1)
      getData(pageNo)
    }
  }

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo(pageNo = pageNo - 1)
      getData(pageNo)
    }
  }

  return (
    <div className='w-full min-h-screen relative' >
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>HOME SLIDER & GALLERY</h2>

      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 rounded-xl w-[90%] py-4 text-gray-900'>
          <div className='flex flex-col'>
            <select name="category" id="category" className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md" onChange={(e) => setCategory(e.target.value)} value={category} >
              <option value="">Select Category</option>
              <option value="gallery">Gallery</option>
              <option value="slider">Slider</option>
            </select>
          </div>
        </div>
      </div>

      {
        loading ?
          <>
            <div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>
          </>
          :

          <div className='flex justify-center items-center flex-col'>
            <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide my-5'>{category.toUpperCase()}</h2>
            {
              data?.length > 0
              &&
              data?.map((item, index) => (
                <div key={index} className="bg-white w-[90%] p-4 rounded-xl flex justify-center flex-col items-center my-3">
                  <img src={item?.imgUrlModelDBId.urls[0]} alt="thumbnailLink" className='object-contain rounded-lg' />

                  <div className='mt-4'>
                    <Button colorScheme="red" size="sm" isDisabled={loading}
                      onClick={() => {
                        HandleDelete(item._id);
                      }}>
                      <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
      }


      <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
        <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
          <div className='flex justify-between items-center gap-6'>
            <Button isDisabled={loading} colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
              <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
            </Button>
            <Button isDisabled={loading} colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
              <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
            </Button>
          </div>
          <div >
            <p className='text-white  font-[Poppins]'>{pageNo} of {totalPages}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
