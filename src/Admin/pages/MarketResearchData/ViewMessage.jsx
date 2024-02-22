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

const ViewMessage = ({ item }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen} ref={btnRef}>
        <p className='font-[Poppins] font-[400] tracking-wider' >
          View
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
              Message by <span className='ml-1  tracking-wider underline text-blue-600'>{item.name}</span>
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col gap-3'>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Name</p>
                <p>{item.name}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Email</p>
                <p>{item.email}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Mobile</p>
                <p>{item.mobile}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Country</p>
                <p>{item.country}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>State</p>
                <p>{item.state}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>City</p>
                <p>{item.city}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Address</p>
                <p>{item.address}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Industry</p>
                <p>{item.industry}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Designation</p>
                <p>{item.designation}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Occupation</p>
                <p>{item.occupation}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Organisation</p>
                <p>{item.organisation}</p>
              </div>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Assignment Request</p>
                <p>{item.assignmentRequest}</p>
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

export default ViewMessage