import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { AddExistingSubscribersAPI } from '../../../services/apis';
import { toast } from 'react-hot-toast';
import { apiConnector } from "../../../services/apiConnector";

const AddSubscriberManually = () => {
    const [formData, setFormData] = useState({ CompanyName: '', DisplayName: '', Email: '', FirstName: '', LastName: '', Mobile: '', Password:"", StartDate:'', ExpiresDate: '' })
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

    const formatDate = (inputDatE) => {
        const inputDate = new Date(inputDatE);
        const day = inputDate.getDate();
        const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(inputDate);
        const year = inputDate.getFullYear().toString().slice(-2);

        const formattedDate = `${day}-${monthAbbreviation}-${year}`;

        return (formattedDate);
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        // console.log(formData);
        const startDate = formatDate(formData.StartDate)
        const endDate = formatDate(formData.ExpiresDate)
        try {
            let response = await apiConnector({
                method: "POST",
                url: AddExistingSubscribersAPI.AddExistingSubscribers_API,
                bodyData: {
                    formData: [
                        {
                            "Company Name": formData.CompanyName,
                            "Display Name": formData.DisplayName,
                            "First Name": formData.FirstName,
                            "Last Name": formData.LastName,
                            "Email id": formData.Email,
                            "Mobile No.": formData.Mobile,
                            "Password": formData.Password,
                            "Start Date": startDate,
                            "Expires Date": endDate,
                        },
                        {}
                    ]
                },
                headers: { token: admin.token }
            });
            console.log(response);
            if (response?.status === 200) {
                toast.success("User Created Successfully")
                setFormData({ CompanyName: '', DisplayName: '', Email: '', FirstName: '', LastName: '', Mobile: '', Password: "", StartDate: '', ExpiresDate: '' });
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
                                <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>ADD SUBSCRIBER</h2>

                                
                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="CompanyName" className='text-sm font-[Poppins] font-[500]'>Company Name</label>
                                    <input required={true} onChange={changeHandler} autoComplete="CompanyName" value={formData.CompanyName} name="CompanyName" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="DisplayName" className='text-sm font-[Poppins] font-[500]'>Display Name</label>
                                    <input required={true} onChange={changeHandler} autoComplete="DisplayName" value={formData.DisplayName} name="DisplayName" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="FirstName" className='text-sm font-[Poppins] font-[500]'>First Name</label>
                                    <input required={true} onChange={changeHandler} autoComplete="FirstName" value={formData.FirstName} name="FirstName" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="LastName" className='text-sm font-[Poppins] font-[500]'>Last Name</label>
                                    <input required={true} onChange={changeHandler} autoComplete="LastName" value={formData.LastName} name="LastName" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="Mobile" className='text-sm font-[Poppins] font-[500]'>Mobile</label>
                                    <input required={true} onChange={changeHandler} autoComplete="Mobile" value={formData.Mobile} name="Mobile" type="number" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="Email" className='text-sm font-[Poppins] font-[500]'>Email</label>
                                    <input required={true} onChange={changeHandler} autoComplete="Email" value={formData.Email} name="Email" type="email" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="Password" className='text-sm font-[Poppins] font-[500]'>Password</label>
                                    <input required={true} onChange={changeHandler} autoComplete="Password" value={formData.Password} name="Password" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="StartDate" className='text-sm font-[Poppins] font-[500]'>Start Date</label>
                                    <input required={true} onChange={changeHandler} autoComplete="StartDate" value={formData.StartDate} name="StartDate" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                </div>

                                <div className='mb-4 flex flex-col'>
                                    <label htmlFor="ExpiresDate" className='text-sm font-[Poppins] font-[500]'>Expires Date</label>
                                    <input required={true} onChange={changeHandler} autoComplete="ExpiresDate" value={formData.ExpiresDate} name="ExpiresDate" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
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
    )
}

export default AddSubscriberManually
