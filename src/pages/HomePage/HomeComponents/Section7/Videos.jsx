import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { AiFillPlayCircle } from 'react-icons/ai'

const Videos = ({item}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <div data-aos="fade-up" data-aos-duration="2000" className='relative h-[15rem] w-[90%] md:w-[25%] shadow-2xl hover:shadow-none duration-300 hover:scale-[0.95]'>
                <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
                    <AiFillPlayCircle className='text-6xl text-violet-500 bg-white rounded-full cursor-pointer' onClick={onOpen} />
                </div>
                <img src={item?.imgUrlModelDBId?.urls[0]} className="rounded-xl h-full w-full object-cover" alt="" />
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
        </>
    )
}

export default Videos
