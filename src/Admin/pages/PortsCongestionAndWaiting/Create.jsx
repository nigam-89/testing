import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { apiConnector } from '../../../services/apiConnector';
import { PortsCongestionAndWaitingAPI } from '../../../services/apis';
import { Button } from '@chakra-ui/react';
  
const Create = () => {
  const [formData, setFormData] = useState({ description: '', note: '', date: '' })
  const [ports, setPorts] = useState([{ portName: '', portTimeValue: '' }]);
  const [loading, setLoading] = useState(false)
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleInputChange = (index, event) => {
    const values = [...ports];
    if (event.target.name === "portName") {
      values[index].portName = event.target.value;
    } else {
      values[index].portTimeValue = event.target.value;
    }
    setPorts(values);
  };


  const handleAddFields = () => {
    setPorts([...ports, { portName: '', portTimeValue: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...ports];
    values.splice(index, 1);
    setPorts(values);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
        let response = await apiConnector({
          method: "POST",
          url: PortsCongestionAndWaitingAPI.CreatePortsCongestionAndWaiting_API,
          bodyData: {
            description: formData.description,
            ports: ports,
            note: formData.note,
            date: formData.date,
          },
          headers: { token: admin.token }
        });
        if (response?.data?.success) {
          toast.success(response?.data?.message)
          setFormData({ description: '', note: '', date: '' });
          setPorts([{ portName: '', portTimeValue: '' }])
        }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen relative'>
      <div className='flex flex-col justify-between gap-8 py-4'>

        {/* form to create market news */}
        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center w-full max-md:px-4'>
            <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
              <form onSubmit={handleSubmit} className=''>
                <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>PORTS CONGESTION & WAITING</h2>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="description" className='text-sm font-[Poppins] font-[500]'>Description</label>
                  <input onChange={changeHandler} autoComplete="description" value={formData.description} name="description" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="note" className='text-sm font-[Poppins] font-[500]'>Note</label>
                  <input onChange={changeHandler} autoComplete="note" value={formData.note} name="note" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                  <input onChange={changeHandler} autoComplete="date" value={formData.date} max={new Date().toISOString().split('T')[0]} name="date" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor="ports" className='text-sm font-[Poppins] font-[500]'>Ports</label>
                  {ports.map((formField, index) => (
                    <div key={`${formField}-${index}`} className="flex flex-col gap-2 my-2">
                      <input
                        type="text"
                        name="portName"
                        value={formField.portName}
                        placeholder="Port Name"
                        onChange={event => handleInputChange(index, event)}
                        className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1'
                      />
                      <input
                        type="text"
                        name="portTimeValue"
                        value={formField.portTimeValue}
                        placeholder="Port Time Value"
                        onChange={event => handleInputChange(index, event)}
                        className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1'
                      />
                      <div className='flex items-center justify-end px-4'>
                        <Button colorScheme="red" size="sm" type="button" onClick={() => handleRemoveFields(index)}
                          isDisabled={ports.length <= 1}
                        >
                          <p className='font-[Poppins] font-[400] tracking-wider'>
                            Remove Field
                          </p>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className='flex items-center justify-start px-4'>
                    <Button colorScheme="green" size="sm" type="button" onClick={() => handleAddFields()}>
                      <p className='font-[Poppins] font-[400] tracking-wider'>
                        Add Field
                      </p>
                    </Button>
                  </div>
                </div>


                <div className='mb-4 mt-8 flex flex-col relative'>
                  <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                    {
                      loading ? <Loader /> : "CREATE"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div >
    </div >
  )
}

export default Create
