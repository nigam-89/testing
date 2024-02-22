import React from 'react'
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

const OrderDetails = ({ item }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    return (
        <>
            <Button colorScheme='green' size="sm" onClick={onOpen} ref={btnRef}>
                <p className='font-[Poppins] font-[400] tracking-wider'
                >
                    View Details
                </p>
            </Button>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4'>
                            Order Details
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-col gap-3 '>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Order Status</p>
                                <p>{item?.orderStatus}</p>
                            </div>

                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Name</p>
                                <p>{item?.orderedBy?.name?.firstname}{" "}{item?.orderedBy?.name?.lastname}</p>
                            </div>

                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Email</p>
                                <p>{item?.orderedBy?.email}</p>
                            </div>

                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Product</p>
                                <p>{item?.productId?.heading}</p>
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Product Price</p>
                                <p>{item?.productId?.price}</p>
                            </div>
                            <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-blue-600'>Product Discounted Price</p>
                                <p>{item?.productId?.discountedPrice}</p>
                            </div>

                            <div className='flex font-[Nunito] flex-col gap-2 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                <p className='font-[800] text-center text-blue-600'>Product Shipping Address</p>

                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>Shipping Address</p>
                                    <p>{item?.shippingInfo?.address}</p>
                                </div>

                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>City</p>
                                    <p>{item?.shippingInfo?.city}</p>
                                </div>
                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>State</p>
                                    <p>{item?.shippingInfo?.state}</p>
                                </div>
                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>Country</p>
                                    <p>{item?.shippingInfo?.country}</p>
                                </div>
                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>Pin Code</p>
                                    <p>{item?.shippingInfo?.pincode}</p>
                                </div>
                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>Name</p>
                                    <p>{item?.shippingInfo?.name}</p>
                                </div>

                                <div className='flex font-[Nunito] flex-col gap-2 p-2 font-[600] rounded-lg border-2 border-white text-gray-900 bg-gray-200'>
                                    <p className='font-[800] text-blue-600'>Contact Number</p>
                                    <p>{item?.shippingInfo?.phoneNumber}</p>
                                </div>
                            </div>
                           
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>
                            <p className='font-[Poppins] font-[400] tracking-wider'
                            >
                                Close</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrderDetails
