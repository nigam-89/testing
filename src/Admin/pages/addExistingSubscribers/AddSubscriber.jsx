import React from 'react'
import Sidebar from '../../components/Sidebar/SideBar';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import ParseExcelAndMakeReqForSubAdd from './ParseExcelAndMakeReqForSubAdd';
import AddSubscriberManually from './AddSubscriberManually';

const AddSubscriber = () => {
    return (
        <div className='overflow-x-hidden'>
            <Sidebar>
                <div className='flex justify-center items-center'>
                    <Tabs isFitted variant='enclosed' className='w-[100%] md:w-[100%]'>
                        <TabList mb='1em'>
                            <Tab _selected={{ color: 'white', bg: '#38a169' }}>
                                <p className='font-[Poppins] font-[500] tracking-wide text-gray-300'>Add Subscriber Manually</p>
                            </Tab>

                            <Tab _selected={{ color: 'white', bg: '#38a169' }}>
                                <p className='font-[Poppins] font-[500] tracking-wide text-gray-300'>Add Subsriber from CSV File</p>
                            </Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
                            height="3px"
                            bg="#38a169"
                            borderRadius="10px"
                        />
                        <TabPanels>
                            <TabPanel className='flex justify-start items-center'>
                                <AddSubscriberManually />
                            </TabPanel>

                            <TabPanel className='flex justify-start items-center'>
                                <ParseExcelAndMakeReqForSubAdd />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </Sidebar>
        </div>
    )
}

export default AddSubscriber
