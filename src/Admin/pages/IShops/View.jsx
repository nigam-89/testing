import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { IShopsAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react'
import Loader from '../../../components/Loader/Loader';
import EditIShop from './EditIShop';
import { Link } from 'react-router-dom';


const View = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);


  const getData = async () => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: IShopsAPI.ViewProducts_API, headers: { token: admin.token } })
      // console.log(response.data);
      setData(response.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    const getData = async () => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({ method: "GET", url: IShopsAPI.ViewProducts_API, headers: { token: admin.token } })
        // console.log(response.data);
        setData(response.data.data)
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
      setLoading(false);
    }

    getData();
  }, [admin])


  const HandleDelete = async (id) => {
    try {
      if (admin.role !== 'superAdmin') {
        toast.error("You don't have permission to delete.");
        return;
      }
      const res = await apiConnector({ method: "DELETE", url: IShopsAPI.DeleteProducts_API + `/${id}`, headers: { token: admin.token } })
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
  let updatedHeading = "";
  return (
    <div className='w-full min-h-screen relative' >
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>ISHOPS</h2>

      {
        loading ?
          <>
            (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>)
          </>
          :
          <div className='flex flex-col justify-center items-center w-full gap-6'>
            {
              data?.length > 0 &&
              data?.map((item, index) => (
               
                <div key={index} className="w-[97%] bg-white rounded-xl p-4">

                  <div className='flex gap-3'>

                    <div className='flex-[20%] flex justify-center items-center rounded-xl'>
                      <img src={item?.imgUrlModelDBId?.urls[0]} alt="ishop" className='object-cover w-full h-[20rem] rounded-xl' />
                    </div>

                    <div className='flex-[80%] px-4 py-2 relative'>

                      <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Name : <span className='text-gray-900'>{item.heading}</span>
                      </p>

                      {/* <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Description : <span className='text-gray-900'>{item.description}</span>
                      </p> */}

                      {/* <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Stock : <span className='text-gray-900'>{item.stock}</span>
                      </p> */}

                      <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Price : <span className='text-gray-900'>{item.price}</span>
                      </p>

                      <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Discounted Price : <span className='text-gray-900'>{item.discountedPrice}</span>
                      </p>
                      <p className='text-base font-[Poppins] font-[500] text-blue-700 my-1'>
                        Product Max Buy Limit: <span className='text-gray-900'>{item.productMaxBuyLimit}</span>
                      </p>

                      <div className='my-2 absolute bottom-0 left-4'>
                  
                        <Button colorScheme="red" size="sm" isDisabled={loading}
                          onClick={() => {
                            HandleDelete(item._id);
                          }}>
                          <p className='font-[Poppins] font-[400] flex justify-center items-center'>Delete</p>
                        </Button>
                      </div>

                    </div>

                    <div className=''>
                      <EditIShop item={item} />
                    </div>

                  </div>
                </div>
            
              ))
            }
          </div>
      }
    </div>
  )
}

export default View
