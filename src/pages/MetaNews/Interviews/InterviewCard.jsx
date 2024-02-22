import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'

const InterviewCard = ({ item }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div onClick={onOpen} className="shadow-2xl  rounded-2xl mb-16 pb-2 relative group 
                            before:absolute before:h-[6px] before:bottom-0 before:bg-gradient-to-r from-[#1a3777] to-[#1a3777] before:left-0 before:w-full
                            before:transition-all before:duration-500 hover:before:h-full before:-z-10 before:rounded-2xl
                            
                            ">
            <div className='relative'>
                <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
                    <AiFillPlayCircle className='text-6xl text-[#1a3777] bg-white rounded-full cursor-pointer' onClick={onOpen} />
                </div>
                <img className="object-cover h-[15rem] max-h-[15rem] w-full rounded-lg" src={item?.imgUrlModelDBId?.urls[0]} alt="" />
            </div>
            <div className="p-5">
                <Link>
                    <h5 className="text-black group-hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3 dark:text-white dark:group-hover:text-black">{item.heading}</h5>
                </Link>
                <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-800 mb-3 dark:text-white dark:group-hover:text-black">{moment(item.date).format('Do MMM YYYY, dddd')} / Latest Video</p>
                <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-700 mb-4  dark:text-white dark:group-hover:text-black">{item.shortDescription}</p>
                <div onClick={onOpen}>
                    <button className='bg-gradient-to-r from-[#1a3777] to-[#1a3777] text-white py-2 px-3 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-gray-100 group-hover:text-black duration-150 rounded-lg text-sm font-[Poppins] font-[500]'>
                        Watch
                    </button>
                </div>
            </div>

            {
                item.ytbUrl && item.ytbUrl.length > 0 &&
                <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
                    <ModalOverlay />
                    <ModalContent bg='rgb(255 145 3 / 1%)' p='6' rounded='xl'>
                        <ModalCloseButton color='white' bg='orange.600' fontWeight="semibold" />
                        <ModalBody mx='auto' display="flex" alignItems="center" justifyContent="center" overflow="hidden">
                            <div className='hidden md:block'>
                                <iframe width="820" height="450" src={`https://www.youtube.com/embed/${item.ytbUrl}?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                            </div>
                            <div className='md:hidden'>
                                <iframe width="300" height="400" src={`https://www.youtube.com/embed/${item.ytbUrl}?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </div>
    )
}

export default InterviewCard
