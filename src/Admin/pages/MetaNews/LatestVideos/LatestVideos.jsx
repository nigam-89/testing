import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import View from './View';
import Create from './Create';

const LatestVideos = () => {
  return (
    <>
      <div className='w-full min-h-screen relative'>
        <div className='flex justify-center items-center'>
          <Tabs isFitted variant='enclosed' className='w-[100%] md:w-[100%]'>
            <TabList mb='1em'>
              <Tab _selected={{ color: 'white', bg: '#38a169' }}>
                <p className='font-[Poppins] font-[500] tracking-wide text-gray-300'>Create</p>
              </Tab>

              <Tab _selected={{ color: 'white', bg: '#38a169' }}>
                <p className='font-[Poppins] font-[500] tracking-wide text-gray-300'>View</p>
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
                <Create />
              </TabPanel>

              <TabPanel className='flex justify-start items-center'>
                <View />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default LatestVideos
