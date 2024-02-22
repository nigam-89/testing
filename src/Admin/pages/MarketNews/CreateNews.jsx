import React from 'react'
import { useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { Button } from '@chakra-ui/react'
import { MarketNewsAPI } from './../../../services/apis';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { toast } from 'react-hot-toast';


const CreateNews = () => {
    const [form, setForm] = useState({ marketNewsCategory: '', date: '', newsSource: '' })
    const [news, setNews] = useState([{ newsHeading: '', newsLink: '' }]);
    const [loading, setLoading] = useState(false);
    const admin = useSelector((state) => state.admin)

    const changeHandler = (e) => {
        setForm((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleInputChange = (index, event) => {
        const values = [...news];
        if (event.target.name === "newsHeading") {
            values[index].newsHeading = event.target.value;
        } else {
            values[index].newsLink = event.target.value;
        }
        setNews(values);
    };

    const handleAddFields = () => {
        setNews([...news, { newsHeading: '', newsLink: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...news];
        values.splice(index, 1);
        setNews(values);
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const formData = { news, ...form }
        // console.log(formData)

        try {
            const res = await apiConnector({ method: "POST", url: MarketNewsAPI.CreateMarketNews_API, bodyData: formData, headers: { token: admin.token } })
            // console.log(res);
            toast.success(res?.data?.message)
            setForm({ marketNewsCategory: '', date: '', newsSource: '' });
            setNews([{ newsHeading: '', newsLink: '' }]);
            // fetchAllAdmins();
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }

        setLoading(false)
    }
    return (
        <>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>

                    {/* form to create market news */}
                    <div className='flex justify-center items-center'>
                        <div className='flex justify-center items-center w-full max-md:px-4'>
                            <div className='bg-white p-4 rounded-xl w-[48rem] pt-6 pb-12 text-gray-900'>
                                <form onSubmit={handleSubmit} className=''>
                                    <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>CREATE MARKET NEWS</h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="marketNewsCategory" className='text-sm font-[Poppins] font-[500]'>Market News Category</label>
                                        <select name="marketNewsCategory" id="marketNewsCategory" className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md" onChange={changeHandler} value={form.marketNewsCategory} >
                                            <option value="">Select News Category</option>
                                            <option value="STEEL & SCRAP">STEEL & SCRAP</option>
                                            <option value="IRON ORE">IRON ORE</option>
                                            <option value="COAL & POWER">COAL & POWER</option>
                                            <option value="RENEW & HYDROGEN">RENEW & HYDROGEN</option>
                                            <option value="RAIL & LOGISTICS">RAIL & LOGISTICS</option>
                                            <option value="CEMENT & CONSTRUCTION">CEMENT & CONSTRUCTION</option>
                                            <option value="AUTOMOBILE">AUTOMOBILE</option>
                                            <option value="AGRICULTURE">AGRICULTURE</option>
                                            <option value="OTHERS">OTHERS</option>
                                        </select>
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                                        <input onChange={changeHandler} autoComplete="date" value={form.date} name="date" type="date" max={new Date().toISOString().split('T')[0]} className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col relative'>
                                        <label htmlFor="newsSource" className='text-sm font-[Poppins] font-[500]'>News Source</label>

                                        <select name="newsSource" id="newsSource" className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md" onChange={changeHandler} value={form.newsSource} >
                                            <option value="">Select News Source</option>
                                            {
                                                (form.marketNewsCategory === "STEEL & SCRAP" ||
                                                    form.marketNewsCategory === "IRON ORE" ||
                                                    form.marketNewsCategory === "COAL & POWER" ||
                                                    form.marketNewsCategory === "RENEW & HYDROGEN") &&
                                                <option value="INDIA">INDIA</option>
                                            }
                                            {
                                                (form.marketNewsCategory === "STEEL & SCRAP" ||
                                                    form.marketNewsCategory === "IRON ORE" ||
                                                    form.marketNewsCategory === "COAL & POWER" ||
                                                    form.marketNewsCategory === "RENEW & HYDROGEN") &&
                                                <option value="INTERNATIONAL">INTERNATIONAL</option>
                                            }
                                            {
                                                (form.marketNewsCategory === "RAIL & LOGISTICS" ||
                                                    form.marketNewsCategory === "CEMENT & CONSTRUCTION" ||
                                                    form.marketNewsCategory === "AUTOMOBILE" ||
                                                    form.marketNewsCategory === "OTHERS" ||
                                                    form.marketNewsCategory === "AGRICULTURE") &&
                                                <option value="GLOBAL">GLOBAL</option>
                                            }

                                        </select>
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="news" className='text-sm font-[Poppins] font-[500]'>News</label>
                                        {news.map((formField, index) => (
                                            <div key={`${formField}-${index}`} className="flex flex-col gap-2 my-2">
                                                <input
                                                    type="text"
                                                    name="newsHeading"
                                                    value={formField.newsHeading}
                                                    placeholder="News Heading"
                                                    onChange={event => handleInputChange(index, event)}
                                                    className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1'
                                                />
                                                <input
                                                    type="text"
                                                    name="newsLink"
                                                    value={formField.newsLink}
                                                    placeholder="News Link"
                                                    onChange={event => handleInputChange(index, event)}
                                                    className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1'
                                                />
                                                <div className='flex items-center justify-end px-4'>
                                                    <Button colorScheme="red" size="sm" type="button" onClick={() => handleRemoveFields(index)}
                                                        isDisabled={news.length <= 1}
                                                    >
                                                        <p className='font-[Poppins] font-[400] tracking-wider'>
                                                            Remove News
                                                        </p>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='flex items-center justify-start px-4'>
                                            <Button colorScheme="green" size="sm" type="button" onClick={() => handleAddFields()}>
                                                <p className='font-[Poppins] font-[400] tracking-wider'>
                                                    Add News
                                                </p>
                                            </Button>
                                        </div>
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
        </ >
    )
}

export default CreateNews