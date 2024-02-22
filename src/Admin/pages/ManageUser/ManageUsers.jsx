import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader/Loader'
import { apiConnector } from '../../../services/apiConnector'
import { Admins } from '../../../services/apis'
import Sidebar from '../../components/Sidebar/SideBar'
import './ManageUser.css'
import { AiOutlineRight, AiOutlineLeft, AiFillEye } from 'react-icons/ai'
import UpdatePassword from './UpdatePassword'
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [adminData, setAdminData] = useState({ name: '', email: '', password: '', role: '', mobile: '', whatsappNo: '', address: '' })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const admin = useSelector((state) => state.admin)
    const [allAdmins, setAllAdmins] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [dataLoading, setDataLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!(admin.role === "superAdmin")){
            navigate('/en/admin/welcome');
        }
    }, [admin, navigate])

    const changeHandler = (e) => {
        setAdminData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        // console.log(adminData)

        if (adminData.mobile.length !== 10) {
            toast.error("Invalid Mobile Number");
            setLoading(false);
            return;
        }
        if (adminData.whatsappNo.length !== 10) {
            toast.error("Invalid Wharsapp Number");
            setLoading(false);
            return;
        }

        try {
            const res = await apiConnector({ method: "POST", url: Admins.CreateAdmin_API, bodyData: adminData, headers: { token: admin.token } })
            // console.log(res);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setAdminData({ name: '', email: '', password: '', role: '', mobile: '', whatsappNo: '', address: '' });
                fetchAllAdmins(pageNo);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
        setLoading(false)
    }

    const fetchAllAdmins = async (pageNo = 1, pageSize = 5) => {
        setDataLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: Admins.AllAdmins_API + `?pageNo=${pageNo}&pageSize=${pageSize}&role=assistant`, headers: { token: admin.token } })
            setAllAdmins(response.data.data)
            setTotalPages(Math.ceil(response.data.count / pageSize))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setDataLoading(false);
    }

    useEffect(() => {
        const fetchAllAdmins = async (pageNo = 1, pageSize = 5) => {
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: Admins.AllAdmins_API + `?pageNo=${pageNo}&pageSize=${pageSize}&role=assistant`, headers: { token: admin.token } })
                setAllAdmins(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
            setDataLoading(false);
        }
        fetchAllAdmins();
    }, [admin])

    const UpdateStatus = async (id, s) => {
        try {
            let status = (s === "blocked" ? "active" : "blocked");
            const res = await apiConnector({ method: "PUT", url: Admins.UpdateStatus_API + `/${id}`, bodyData: { status: status }, headers: { token: admin.token } })
            // console.log(res);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        fetchAllAdmins(pageNo);

    }

    const deleteAdmin = async (id) => {
        try {
            const res = await apiConnector({ method: "DELETE", url: Admins.DeleteAdmin_API + `/${id}`, headers: { token: admin.token } })
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        fetchAllAdmins(pageNo);
    }

    const increasePageNo = (pageNo) => {
        if (pageNo < totalPages && pageNo > 0) {
            setPageNo(pageNo = pageNo + 1)
            fetchAllAdmins(pageNo)
        }
    }

    const descreasePageNo = (pageNo) => {
        if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
            setPageNo(pageNo = pageNo - 1)
            fetchAllAdmins(pageNo)
        }
    }



    return (
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>
                    {/* from to create admin */}
                    <div className='flex justify-center items-center relative'>
                        <div className='flex justify-center items-center w-full max-md:px-4'>
                            <div className='bg-white p-4 rounded-xl w-[44rem] pt-6 pb-12'>
                                <form onSubmit={handleSubmit} className=''>
                                    <h2 className='text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide'>CREATE ADMIN</h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="name" className='text-sm font-[Poppins] font-[500]'>Name</label>
                                        <input onChange={changeHandler} autoComplete="name" value={adminData.name} name="name" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="email" className='text-sm font-[Poppins] font-[500]'>Email</label>
                                        <input onChange={changeHandler} autoComplete="email" value={adminData.email} name="email" type="email" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col relative'>
                                        <label htmlFor="password" className='text-sm font-[Poppins] font-[500]'>Password</label>
                                        <input onChange={changeHandler} value={adminData.password} name="password" type={showPassword ? "text" : "password"} className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' autoComplete='current-password' />
                                        <div className={`absolute bottom-3 right-2 cursor-pointer ${showPassword ? "text-violet-500" : "text-gray-800"} `} onClick={() => setShowPassword((prev) => !prev)} ><AiFillEye /></div>
                                    </div>

                                    <div className='mb-4 flex flex-col relative'>
                                        <label htmlFor="role" className='text-sm font-[Poppins] font-[500]'>Role</label>

                                        <select name="role" id="role" className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md" onChange={changeHandler} value={adminData.role} required={true}>
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="subAdmin">Sub Admin</option>
                                        </select>
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="mobile" className='text-sm font-[Poppins] font-[500]'>Mobile</label>
                                        <input onChange={changeHandler} autoComplete="mobile" value={adminData.mobile} name="mobile" type="number" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="whatsappNo" className='text-sm font-[Poppins] font-[500]'>whatsapp No</label>
                                        <input onChange={changeHandler} autoComplete="whatsappNo" value={adminData.whatsappNo} name="whatsappNo" type="number" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="address" className='text-sm font-[Poppins] font-[500]'>Address</label>
                                        <input onChange={changeHandler} autoComplete="address" value={adminData.address} name="address" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
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

                    {/* table to show admin */}
                    <div className='w-full px-4'>
                        {
                            dataLoading ? (<div className='w-full flex items-center justify-center mt-10'> <Loader width={"100"} height={"80"} /> </div>) : (
                                allAdmins.length === 0 ? (
                                    <p className='text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl'>No Data Found</p>)
                                    :
                                    (<div className='bg-white rounded-xl'>
                                        <h2 className='text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-2xl'>All Admins</h2>

                                        <TableContainer>
                                            <Table variant='striped' colorScheme='telegram'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Name</Th>
                                                        <Th>Email</Th>
                                                        <Th>Role</Th>
                                                        <Th>Mobile</Th>
                                                        {/* <Th>whatsappNo</Th> */}
                                                        {/* <Th>Address</Th> */}
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        allAdmins.map((admin, index) => {
                                                            return (
                                                                <Tr className='' key={index} >
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.name}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.email}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.role}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.mobile}</p>
                                                                    </Td>
                                                                    {/* <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.whatsappNo}</p>
                                                                    </Td>
                                                                    <Td>
                                                                        <p className='font-[Poppins] text-sm text-[500] text-black tracking-wide'>{admin.address}</p>
                                                                    </Td> */}
                                                                    <Td>
                                                                        <div className='flex justify-center items-center gap-3 mr-4'>
                                                                            <Button colorScheme={admin.status === "active" ? "facebook" : "red"} size="sm"
                                                                                onClick={() => {
                                                                                    UpdateStatus(admin._id, admin.status);
                                                                                }}>
                                                                                <p className='font-[Poppins] font-[400] tracking-wider'>{admin.status === "active" ? "Block Account" : "Activate Account"}</p>
                                                                            </Button>
                                                                            <UpdatePassword email={admin.email} />
                                                                            <Button colorScheme="red" size="sm">
                                                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                                                    onClick={() => {
                                                                                        deleteAdmin(admin._id);
                                                                                    }}>
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


                <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
                    <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                        <div className='flex justify-between items-center gap-6'>
                            <Button colorScheme='green' size='sm' onClick={() => descreasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center'><AiOutlineLeft className='mr-2' />Prev </p>
                            </Button>
                            <Button colorScheme='green' size='sm' onClick={() => increasePageNo(pageNo)}>
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

export default ManageUsers
