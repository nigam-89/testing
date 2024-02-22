import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const SingleImage = ({ item, images }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log("images", images)

    return (
        <>
            <div data-aos="zoom-in" data-aos-duration="2000" className='mx-4 my-4  flex-[20%] h-[11rem] md:h-[12rem] group  flex justify-center items-center' onClick={onOpen}>
                <img src={item?.imgUrlModelDBId.urls[0]} alt={item?.category} className='h-full shadow-2xl hover:shadow-none w-[90%] object-cover rounded-xl group-hover:scale-[1.1] duration-300' />
            </div>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
                <ModalOverlay />
                <ModalContent bg='rgb(255 145 3 / 1%)' p='6' rounded='xl'>
                    <ModalCloseButton color='white' bg='orange.600' fontWeight="semibold" />
                    <ModalBody mx='auto' display="flex" alignItems="center" justifyContent="center" overflow="hidden">

                        {/* <div data-aos="zoom-in" data-aos-duration="2000" className='max-h-[75vh] h-full flex justify-center items-center' onClick={onOpen}>
                            <img src={item?.imgUrlModelDBId.urls[0]} alt={item?.category} className='h-full w-full object-cover rounded-xl duration-300' />
                        </div> */}

                        <div className='max-w-[800px] overflow-hidden'>
                            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                <SwiperSlide> <img src={item?.imgUrlModelDBId.urls[0]} alt={item?.category} className='h-full w-full object-cover rounded-xl duration-300' /></SwiperSlide>
                                {images.map((image, index) => (
                                    <SwiperSlide> <img key={index} src={image?.imgUrlModelDBId.urls[0]} alt={item?.category} className='h-full w-full object-cover rounded-xl duration-300' /></SwiperSlide>
                                ))}

                            </Swiper>
                        </div>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SingleImage
