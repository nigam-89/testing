
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/global/Footer/Footer';
import Navbar from '../../components/global/Navbar/Navbar';
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar';
import Loader from '../../components/Loader/Loader';
import { apiConnector } from '../../services/apiConnector';
import { InMediaAPI } from '../../services/apis';

const InMediaSinglePage = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const [formData, setFormData] = useState({ comment: "", dbId: id })

    const admin = useSelector((state) => state.admin)
    const user = useSelector((state) => state.user)


    const getSingleData = async () => {

        setLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: InMediaAPI.ViewSingleInMedia_API + `?dbId=${id}` })
            setData(response.data.data)
        } catch (error) {
            console.log("error", error)
        }
        setLoading(false);
    }

    const ChangeHandler = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const postComment = async (req, res) => {

        setLoading(true)
        try {
            await apiConnector({ method: "POST", url: InMediaAPI.PostingACommentInMedia_API, bodyData: formData, headers: { token: user.token ? user.token : admin.token } })
            setFormData({ comment: "", dbId: id })
            getSingleData();
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }


    const deleteComment = async (dbId, commentDBId) => {
        try {
            await apiConnector({ method: "DELETE", url: InMediaAPI.DeleteACommentInMedia_API + `?dbId=${dbId}&commentDBId=${commentDBId}`, headers: { token: admin.token } })
            getSingleData();
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        const getSingleData = async () => {

            setLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: InMediaAPI.ViewSingleInMedia_API + `?dbId=${id}` })
                setData(response.data.data)
            } catch (error) {
                console.log("error", error)
            }
            setLoading(false);
        }
        getSingleData();
    }, [id, user, admin]);


    return (
        <div>
            <UpperNavbar />
            <Navbar />

            <div className='h-[100%] w-[100%] overflow-x-hidden 3xl:w-[1500px] mx-auto'>
                <div className='w-[95%] mx-auto py-4'>
                    <img alt='' src={data?.imgUrlModelDBId?.urls[0]} className='w-[100%] h-[300px] ' />
                </div>
                <div className='w-[95%] mx-auto flex flex-col justify-between items-start gap-4 mt-8 py-8'>
                    <h2 className='text-[#243b77] font-semibold text-xl md:text-[2rem] leading-[2.5rem]'>{data?.heading}</h2>
                    <p className='font-semibold'>{moment(data?.date).format('Do MMM YYYY, dddd')} / InMedia</p>
                </div>

                <div className='w-[95%] mx-auto flex flex-col justify-between items-start gap-4 py-4'>
                    <p className='text-sm'>{data?.description}</p>
                    <div className='flex justify-between items-center gap-4 font-[Rubik] mt-4 ml-auto'>
                        <img alt='' src={data?.writtenBy?.profilePhotoLink} className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] rounded-full" />
                        <p className='text-sm'>{data?.writtenBy?.name}</p>
                    </div>
                    <Link to={data?.inMediaUrl} target="_blank">
                        <p className='border px-8 py-2 bg-[#243b77] text-white font-[Rubik] rounded-md'>Read More</p>
                    </Link>

                </div>

                {
                    (user.hasSubscription || admin.token) ? (
                        <div className='w-[95%] mx-auto flex flex-col items-start justify-center py-4 gap-2 my-4'>
                            <h2 className='text-[#243a77] font-semibold text-xl font-[Roboto]'>Leave a Comment</h2>
                            <div className='flex flex-col w-[100%] md:w-[70%] gap-4'>
                                <textarea name='comment' className="border-black border rounded-lg p-2 " rows={"10"} value={formData.comment} placeholder="Type Your Comment" onChange={(e) => ChangeHandler(e)}></textarea>
                                <button className='bg-[#243a77] text-white font-[Roboto] tracking-wider rounded-lg py-2 w-[75%] md:w-[25%]' onClick={postComment}>Post Comment</button>
                            </div>
                        </div>
                    ) : (
                        <div className='w-[95%] mx-auto flex flex-col items-start justify-center py-4 gap-2 my-4'>
                            <h2 className='text-[#243a77] font-semibold text-xl font-[Roboto]'>All Comments</h2>
                        </div>
                    )
                }


                {/* Comment Seciton */}

                <div className='w-[95%] mx-auto flex flex-col justify-between items-start gap-4 my-16'>

                    {
                        data?.comments?.length === 0 ? (<h2 className='text-2xl font-[Rubik] font-semibold'>No Comments Found !!</h2>) : (
                            loading ? (<div className='w-[100%] flex justify-center'><Loader color={"#243977"} width="40" height={"40"} /></div>) : (
                                data?.comments?.slice().reverse().map((comment, index) => {
                                    return (
                                        <div key={index} className='flex flex-col items-start justify-between gap-4 w-[100%] md:w-[70%] px-4 pb-8 pt-2 border-b-2 border-b-black mb-4'>
                                            <div className='flex justify-between items-center gap-4 text-sm '>
                                                <img alt='' src={`https://api.dicebear.com/5.x/initials/svg?seed=${comment.commentRef.name?.firstname}`} className="rounded-full w-[25px] h-[25px] max-h-[25px] max-w-[25px]" />
                                                {
                                                    comment.commentType === "admins" ?
                                                        <div className='flex flex-col justify-between items-start font-[Rubik]'>
                                                            <p className='font-semibold' >
                                                                {comment.commentRef.name}
                                                            </p>
                                                            <p className='font-light text-xs'>{moment(comment.commentedAt).format('Do MMM YYYY, dddd')}</p>
                                                        </div>
                                                        :
                                                        <div className='flex flex-col justify-between items-start font-[Rubik]'>
                                                            <p className='font-semibold' >
                                                                {comment.commentRef.name.firstname}{" "}
                                                                {comment.commentRef.name.lastname}</p>
                                                            <p className='font-light text-xs'>{moment(comment.commentedAt).format('Do MMM YYYY, dddd')}</p>
                                                        </div>
                                                }
                                            </div>

                                            {
                                                admin.token === null ? (
                                                    <div className='w-[100%] mdw-[80%]'>
                                                        <p className='font-[Rubik]'>{comment.comment}</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col md:justify-between md:items-center w-[80%] md:flex-row max-md:gap-4'>
                                                        <p className='font-[Rubik]'>{comment.comment}</p>
                                                        {
                                                            <p className=' max-md:w-[30%] font-[Rubik] px-4 py-2 bg-red-500 text-white text-sm rounded-lg cursor-pointer duration-200 transition-all hover:scale-[1.04]' onClick={() => deleteComment(data?._id, comment._id)}>Delete</p>
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            )
                        )
                    }

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default InMediaSinglePage
