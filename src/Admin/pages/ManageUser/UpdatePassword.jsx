import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'
import { Admins } from '../../../services/apis'
import { apiConnector } from '../../../services/apiConnector'

const UpdatePassword = ({ email }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const admin = useSelector((state) => state.admin);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const updatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({ method: "PUT", url: Admins.UpdatePassword_API + `/${email}`, bodyData: { password }, headers: { token: admin.token } })
            if (res.data.success) {
                toast.success(res.data.message);
                setPassword('');
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false);
    }

    return (
        <>
            <Button colorScheme="green" size="sm" onClick={onOpen} ref={btnRef}>
                <p className='font-[Poppins] font-[400] tracking-wider'>Update Password</p>
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
                    <ModalHeader><p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4'>
                        Update Password</p> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={updatePassword}>
                            <input type="text" value={password} required={true}
                                className='bg-indigo-50 appearance-none border-2 border-indigo-100 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-700'
                                onChange={e => setPassword(e.target.value)} placeholder='Enter new password' />
                            <Button colorScheme="facebook" size="sm" className='mt-4' type='submit' isLoading={loading} isDisabled={loading}>
                                Update
                            </Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdatePassword
