import React, { useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

import { FiEdit } from 'react-icons/fi';
import JoditEditor from 'jodit-react';
import { apiConnector } from '../../../../services/apiConnector';
import { HandleImagesAPI, TopStoiresAPI } from '../../../../services/apis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';


const EditTopStories = ({ item }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const editor = useRef(null);
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef();

    const admin = useSelector((state) => state.admin)


    const [formData, setFormData] = useState({ heading: '', shortDescription: '', briefDesc: '' })

    const changeHandler = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleEdit = async () => {
        setLoading(true)
        try {
            const response = await apiConnector({ method: "GET", url: TopStoiresAPI.SingleTopStories_API + `?dbId=${item._id}`, headers: { token: admin.token } })

            setFormData({ heading: response.data.data.heading, shortDescription: response.data.data.shortDescription, briefDesc: response.data.data.briefDescription })
        } catch (error) {
            toast.error(error?.message)
        }
        setLoading(false)

    }

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };

    const updateData = async (e) => {
        setLoading(true)
        e.preventDefault()

        let images;
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
            if (images) {
                response = await apiConnector({
                    method: "PUT",
                    url: TopStoiresAPI.UpdateTopStoires_API + `/${item._id}`,
                    bodyData: {
                        imgUrlModelDBId: images,
                        heading: formData.heading,
                        shortDescription: formData.shortDescription,
                        briefDescription: formData.briefDesc,
                    },
                    headers: { token: admin.token }
                });
                if (response?.data?.success) {
                    toast.success(response?.data?.message)
                    console.log("response ", response)
                    console.log("formData ", formData)
                    setFormData({ heading: '', shortDesc: '', briefDesc: '' });
                    setSelectedImages([]);
                    fileInputRef.current.value = '';
                }
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false)
    }

    return (
        <>
            <Button colorScheme={"whiteAlpha"} size="sm" onClick={onOpen} ref={btnRef} className="w-[100%] bg-white">
                {/* Edit Button */}
                <FiEdit className='text-[#353baa] ml-auto cursor-pointer duration-200 transition-all hover:scale-[1.3]' onClick={handleEdit} />

            </Button>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
                size="7xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4'>
                            Edit Data
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-col gap-3'>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Cover Image</p>
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-blue-600 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                                    type="file"
                                    id="formFileMultiple"
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Thumbnail</p>
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-blue-600 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                                    type="file"
                                    id="formFileMultiple"
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Heading</p>
                                <input type={"text"} name="heading" value={formData.heading} onChange={changeHandler} className="py-2 pl-2 bg-transparent border border-blue-600 rounded-lg" />
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Short Description</p>
                                <input type={"text"} name="shortDescription" value={formData.shortDescription} onChange={changeHandler} className="py-2 pl-2 bg-transparent border border-blue-600 rounded-lg" />
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Brief Description</p>
                                <JoditEditor
                                    ref={editor}
                                    value={formData.briefDesc}
                                    tabIndex={1}
                                    onChange={newContent => setFormData((prevFormData) => {
                                        return {
                                            ...prevFormData,
                                            briefDesc: newContent
                                        }
                                    })}
                                    onBlur={newContent => setFormData((prevFormData) => {
                                        return {
                                            ...prevFormData,
                                            briefDesc: newContent
                                        }
                                    })}
                                />
                            </div>
                            {
                                loading ? (<Loader color={"black"} height={30} width={30} />) : (
                                    <button onClick={updateData} className='font-[Nunito] font-[800] text-white bg-black px-4 py-2 rounded-lg w-fit duration-200 transition-all hover:scale-[1.05] shadow-2xl'>Update Data</button>
                                )
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>
                            <p className='font-[Poppins] font-[400] tracking-wider'>Close</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditTopStories
