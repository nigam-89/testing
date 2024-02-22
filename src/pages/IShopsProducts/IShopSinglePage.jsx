import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/global/Footer/Footer'
import Navbar from '../../components/global/Navbar/Navbar'
import UpperNavbar from '../../components/global/UpperNavbar/UpperNavbar'
import { TbHandClick } from "react-icons/tb";
import { Button } from '@chakra-ui/react'
import toast from 'react-hot-toast'

const IShopSinglePage = () => {

    let heading = sessionStorage.getItem("heading");
    let description = sessionStorage.getItem("description");
    let discountedPrice = sessionStorage.getItem("discountedPrice");
    let productPrice = sessionStorage.getItem("productPrice");
    let productImage = JSON.parse(sessionStorage.getItem("productImage"));
    let productID = sessionStorage.getItem("productID");
    let productMaxBuyLimit = sessionStorage.getItem("productMaxBuyLimit");

    const navigate = useNavigate()

    useEffect(() => {
        if (productImage === null) {
            navigate('/ishop')
        }
    });

    const [noOfItems, setNoOfItems] = useState(1)
    const [fiinalDiscountedPrice, setFinalDiscountedPrice] = useState(Number(discountedPrice))
    const [fiinalProductPrice, setFinalProductPrice] = useState(Number(productPrice))

    function increaseQuantity() {
        if (noOfItems < productMaxBuyLimit) {
            setNoOfItems(noOfItems + 1)
            setFinalDiscountedPrice(fiinalDiscountedPrice + Number(discountedPrice))
            setFinalProductPrice(fiinalProductPrice + Number(productPrice))
        }
        else {
            toast.error(`Max Quantity is  ${productMaxBuyLimit}`)
        }
    }

    function decreaseQuantity() {
        if (noOfItems > 1) {
            setNoOfItems(noOfItems - 1)
            setFinalDiscountedPrice(fiinalDiscountedPrice - Number(discountedPrice))
            setFinalProductPrice(fiinalProductPrice - Number(productPrice))
        }
        else {
            toast.error(`Min Quantity is 1`)
        }
    }

    const [productImgSrc, setProductImgSrc] = useState(productImage?.[0])

    return (
        <div>
            <UpperNavbar />
            <Navbar />

            <div className=' md:h-[160px] relative'>
                <img alt='' src='https://res.cloudinary.com/djr2f6dlh/image/upload/v1700206101/Banner%20Images/ishop-header-image_ttaivx.webp' className='w-[100%] h-[100%]' />
                <h2 className='text-white font-[Poppins] absolute top-0 md:text-4xl font-semibold tracking-wide flex items-center justify-center w-[100%] h-[100%] '>iSHOP</h2>
            </div>
            <div className='3xl:w-[1500px] mx-auto'>
                <div className='flex flex-col md:flex-row justify-between my-16 max-md:mt-6 md:min-h-[690px] px-2 md:px-6 gap-4'>
                    {/* Product Image */}
                    <div className='w-[80%] md:w-[450px] mx-auto shadow-2xl'>
                        <div className='w-[100%] h-[450px] md:w-[100%] md:h-[600px] shadow-lg border border-black mx-auto'>
                            {/* <img src={productImage[0]} className='w-[100%] h-[100%] object-cover' /> */}
                            {
                                productImage ? (<img src={productImgSrc} alt="ishop" className='w-[100%] h-[100%]' />) : (<></>)
                            }
                        </div>
                        <div className='w-[100%] flex flex-row px-4 items-center h-[90px] mt-[5px] gap-6 bg-white overflow-x-scroll overflow-y-hidden'>
                            {
                                productImage?.map((url, index) => {
                                    return (
                                        <img key={index} src={url} alt="ishop" className='w-[80px] h-[90px] cursor-pointer transition-all duration-200 hover:scale-[1.1]' onClick={() => setProductImgSrc(url)} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Details */}
                    <div className='md:w-[60%] flex flex-col p-2 md:p-6 gap-8'>
                        <p className='text-gray-900 text-xl md:text-3xl font-semibold font-[Poppins]'>
                            {heading}
                        </p>
                        <div className='md:w-[90%]'>
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>
                        <p className='font-[500] text-green-700 text-4xl font-[Poppins]'>
                            {/* <BsFillLightningChargeFill className='mr-1 text-[#243b77] inline text-[0.8rem]' /> */}
                            &#8377;{fiinalDiscountedPrice}
                            <span className='text-lg ml-1 text-[#243b77] relative before:h-[2px] before:w-full before:absolute before:bg-[#243b77] before:top-[0.6rem] before:left-0'> &#8377;{fiinalProductPrice}</span>
                        </p>

                        <div className='flex w-fit gap-4 items-center justify-between font-[Poppins]'>
                            <Button colorScheme={"red"} size="sm" onClick={() => decreaseQuantity()}>-</Button>
                            <p>{noOfItems}</p>
                            <Button colorScheme={"green"} size="sm" onClick={() => increaseQuantity()}>+</Button>
                        </div>

                        <Link to={`/order-summary/${productID}`} onClick={() => sessionStorage.setItem("noOfItems", noOfItems)}>
                            <p className='w-[80%] max-md:mt-4 font-[Poppins] text-lg px-16 py-2 rounded-lg bg-[#243b77] text-center md:w-fit text-white shadow-2xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2'>Buy Now <span className='md:hidden max-md:animate-bounce'><TbHandClick /></span> </p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default IShopSinglePage
