import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { MetaWeeklyAPI } from '../../../services/apis';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import moment from 'moment'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react'

const View = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState();
  const [count, setCount] = useState(0);
  const [formula, setFormula] = useState(0);

  useEffect(()=>{
    setFormula(count - ((pageNo - 1) * 10));
  }, [count, pageNo])

  const getData = async (pageNo = 1, pageSize = 10) => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const response = await apiConnector({ method: "GET", url: MetaWeeklyAPI.ViewMeta_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
      // console.log(response.data);
      setData(response.data.data);
      setCount(response.data.count);
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
        const response = await apiConnector({ method: "GET", url: MetaWeeklyAPI.ViewMeta_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
        // console.log(response.data);
        setData(response.data.data)
        setCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / pageSize))
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
      const res = await apiConnector({ method: "DELETE", url: MetaWeeklyAPI.DeleteMeta_API + `/${id}`, headers: { token: admin.token } })
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
      <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] pb-4 tracking-wide'>METAWEEKLY</h2>

      {
        loading ?
          <>
            <div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>
          </>
          :
          <div className='w-full px-4 md:px-12'>
            <div className='bg-white rounded-xl'>
              <TableContainer>
                <Table variant='striped' colorScheme='telegram'>
                  <Thead>
                    <Tr>
                      <Th>NO.</Th>
                      <Th>DATE</Th>
                      <Th>NAME</Th>
                      <Th>DOWNLOAD LINK</Th>
                      <Th>ACTIONS</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data.length > 0 &&
                      data?.map((item, index) => {
                        return (
                          <Tr className='' key={index} >
                            <Td>
                              <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{(formula - index)}</p>
                            </Td>
                            <Td>
                              <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>
                                {moment(item.date).format('l')}
                              </p>
                            </Td>
                            <Td>
                              <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{item.volumeHeading}</p>
                            </Td>
                            <Td>
                              <Button colorScheme="teal" size='sm' >
                                <a href={item.pdfUrl} target="_blank" rel="noreferrer" >
                                  <p className='font-[Poppins] font-[400] flex justify-center items-center'>
                                    Download
                                  </p>
                                </a>
                              </Button>
                            </Td>
                            <Td>
                              <Button colorScheme="red" size="sm"
                                onClick={() => {
                                  HandleDelete(item._id);
                                }}>
                                <p className='font-[Poppins] font-[400] tracking-wider' >
                                  Delete
                                </p>
                              </Button>
                            </Td>
                          </Tr>
                        )
                      })
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
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
