import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import Sidebar from '../../components/Sidebar/SideBar';
import { ConsultancyPage } from './../../../services/apis'
import toast from 'react-hot-toast'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';
import ViewMessage from './ViewMessage';
import ExportToExcel from '../../components/ExportToExcel/ExportToExcel';

const MarketResearchData = () => {
    const admin = useSelector((state) => state.admin);
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [dataLoading, setDataLoading] = useState(false);

    const getData = async (pageNo = 1, pageSize = 15) => {
        setDataLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: ConsultancyPage.AllConsultancy_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
            // console.log(response.data);
            if (response.data.success) {
                setData(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        setDataLoading(false);
    }

    useEffect(() => {
        const getData = async (pageNo = 1, pageSize = 15) => {
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: ConsultancyPage.AllConsultancy_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
                // console.log(response.data);
                if (response.data.success) {
                    setData(response.data.data)
                    setTotalPages(Math.ceil(response.data.count / pageSize))
                }
            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            }
            setDataLoading(false);
        }

        getData();
    }, [admin])

    const deleteContact = async (id) => {
        try {
            if (admin.role !== 'superAdmin') {
                toast.error("You don't have permission to delete.");
                return;
              }
            const res = await apiConnector({ method: "DELETE", url: ConsultancyPage.DeleteConsultancy_API + `/${id}`, headers: { token: admin.token } })
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        getData(pageNo);
    }

    const UpdateContact = async (id, isHandled) => {
        try {
            const res = await apiConnector({ method: "PUT", url: ConsultancyPage.UpdateConsultancy_API + `/${id}`, bodyData: { isHandled: !isHandled }, headers: { token: admin.token } })
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
        getData(pageNo);
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
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>
                    {/* table to show admin */}
                    <div className='w-full px-4'>
                        <h2 className='text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide'>
                            Market Research Form Data
                        </h2>
                        {
                            dataLoading ? (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>) : (
                                data?.length === 0 ? (
                                    <p className='text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl'>No Data Found</p>)
                                    :
                                    (<div className='bg-white rounded-xl'>
                                        <div className='flex p-4 justify-start items-center'>
                                            <ExportToExcel data={data} fileName="MarketResearchDataMyMetalogic" />
                                        </div>
                                        <TableContainer>
                                            <Table variant='striped' colorScheme='telegram'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Received On</Th>
                                                        <Th>Name</Th>
                                                        <Th>Email</Th>
                                                        <Th>Mobile</Th>
                                                        <Th>Message</Th>
                                                        <Th>Status</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        data && data.length > 0 && data?.map((item, index) => {
                                                            return (
                                                                <Tr className='' key={index} >
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{moment(item.date).format('Do MMM YYYY, dddd')}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{item.name}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{item.email}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{item.mobile}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <ViewMessage item={item} />
                                                                    </Td>
                                                                    <Td>
                                                                        <div className='flex justify-center items-center gap-3 mr-4'>
                                                                            <Button colorScheme={item.isHandled ? "green" : "telegram"} size="sm" onClick={() => {
                                                                                UpdateContact(item._id, item.isHandled);
                                                                            }}>
                                                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                >
                                                                                    {
                                                                                        item.isHandled ? "Handled" : "Not Handled"
                                                                                    }
                                                                                </p>
                                                                            </Button>
                                                                        </div>

                                                                    </Td>
                                                                    <Td>
                                                                        <div className='flex justify-center items-center gap-3 mr-4'>
                                                                            <Button colorScheme="red" size="sm" onClick={() => {
                                                                                deleteContact(item._id);
                                                                            }}>
                                                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                >
                                                                                    Delete</p>
                                                                            </Button>
                                                                        </div>

                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        })
                                                    }
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </div>)
                            )
                        }
                    </div>
                </div>

                <div className='sticky bottom-0 w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
                    <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                        <div className='flex justify-between items-center gap-6'>
                            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
                            </Button>
                            <Button isDisabled={dataLoading} colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center'>Next <AiOutlineRight className='ml-2' /></p>
                            </Button>
                        </div>
                        <div >
                            <p className='text-white  font-[Poppins]'>{pageNo} of {totalPages}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}

export default MarketResearchData