import React from "react";
import Navbar from "../../components/global/Navbar/Navbar";
import UpperNavbar from "../../components/global/UpperNavbar/UpperNavbar";
import Footer from "./../../components/global/Footer/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiConnector";
import { IShopsAPI } from "../../services/apis";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "./IShopsProducts.css";
import { TbHandClick } from "react-icons/tb";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const IShopsProducts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      window.scroll(0, 0);
      setLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url: IShopsAPI.ViewProducts_API,
          headers: { token: admin.token },
        });
        setData(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    };

    getData();
  }, [admin]);

  // For Time Being Single Product Page

  function addDataToSession(
    heading,
    description,
    discountedPrice,
    productPrice,
    productImage,
    productID,
    productMaxBuyLimit
  ) {
    // Assign value to a key
    sessionStorage.setItem("productImage", JSON.stringify(productImage));
    sessionStorage.setItem("heading", heading);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("discountedPrice", discountedPrice);
    sessionStorage.setItem("productPrice", productPrice);
    sessionStorage.setItem("productID", productID);
    sessionStorage.setItem("productMaxBuyLimit", productMaxBuyLimit);
  }

  let updatedHeading = "";

  return (
    <div className="">
      <UpperNavbar />
      <Navbar />

      <div className=" md:h-[160px] relative">
        <img
          alt=""
          src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700206101/Banner%20Images/ishop-header-image_ttaivx.webp"
          className="w-[100%] h-[100%]"
        />
        <h2 className="text-white font-[Poppins] absolute top-0 md:text-4xl font-semibold tracking-wide flex items-center justify-center w-[100%] h-[100%] ">
          iSHOP
        </h2>
      </div>

      <div className="3xl:w-[1500px] mx-auto">
        <div className="w-full relative flex justify-center items-center flex-col py-5 md:pt-8">
          {loading ? (
            <>
              <div className="w-full flex items-center justify-center mt-10">
                {" "}
                <Loader color="black" width={"100"} height={"80"} />{" "}
              </div>
            </>
          ) : data?.length > 0 ? (
            <div className="flex flex-col gap-8 w-[90%] mx-auto">
              {data?.length > 0 &&
                data?.map((item, index) => {
                  updatedHeading = item?.heading.split(" ").join("-");

                  return (
                    <Link
                      to={`/ishop-single/${updatedHeading}/${item._id}`}
                      onClick={() =>
                        addDataToSession(
                          item.heading,
                          item.description,
                          item.discountedPrice,
                          item.price,
                          item?.imgUrlModelDBId?.urls,
                          item?._id,
                          item.productMaxBuyLimit
                        )
                      }
                    >
                      <div
                        key={index}
                        className="w-[100%] border overflow-hidden flex flex-col md:flex-row justify-between gap-6 md:min-h-[400px] hover:shadow-none transition-all duration-300"
                      >
                        {/* Product Image Section */}
                        <div className="w-[100%] md:w-[350px] md:max-w-[350px] h-[350px] md:h-[400px] pl-4">
                          {/* <img key={index} src={item?.imgUrlModelDBId?.urls[0]} alt="ishop" className='w-[100%] h-[100%] object-cover' /> */}
                          <Swiper
                            pagination={true}
                            modules={[Pagination]}
                            className="mySwiper"
                          >
                            {item?.imgUrlModelDBId?.urls?.map((url, index) => {
                              return (
                                <SwiperSlide key={index}>
                                  <img
                                    key={index}
                                    src={url}
                                    alt="ishop"
                                    className="mx-auto w-[100%] h-[350px] md:w-[350px] md:h-[400px] "
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>

                        {/* Product Details Section */}
                        <div className="w-[100%] md:w-[70%] flex flex-col p-4 font-[Poppins] gap-4">
                          <Link
                            to={"/ishop-single/:updatedHeading/:id"}
                            onClick={() =>
                              addDataToSession(
                                item.heading,
                                item.description,
                                item.discountedPrice,
                                item.price,
                                item?.imgUrlModelDBId?.urls,
                                item?._id
                              )
                            }
                          >
                            <p className="text-gray-900 md:text-2xl font-semibold cursor-pointer hover:underline transition-all duration-300">
                              {item.heading.length > 100
                                ? item.heading.slice(0, 100) + "..."
                                : item.heading}
                            </p>
                          
                           
                            <p className="font-normal font-[Poppins] group-hover:text-white duration-150 text-sm tracking-wide text-gray-700 mb-4">
                            {/* <div dangerouslySetInnerHTML={{ __html: item.description }}></div> */}
                            <div dangerouslySetInnerHTML={{__html: `${item.description.slice(0, 150)}...` }} />
                            {/* {item.description} */}
                            </p>

                            
                          </Link>
                          {/* <p className='text-[#243b77] text-sm md:text-lg font-[Poppins] font-norma w-[90%]'>
                                                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                                    </p> */}
                          <p className="font-[600] text-green-700 text-3xl font-[Poppins]">
                            {/* <BsFillLightningChargeFill className='mr-1 text-[#243b77] inline text-[0.8rem]' /> */}
                            &#8377;{item.discountedPrice}
                            <span className="text-sm ml-1 text-[#243b77] relative before:h-[2px] before:w-full before:absolute before:bg-[#243b77] before:top-[0.6rem] before:left-0">
                              {" "}
                              &#8377;{item.price}
                            </span>
                          </p>
                          <button className="mt-5">
                            <p className="w-[80%] max-md:mt-4 font-[Poppins] text-lg px-16 py-2 rounded-lg bg-[#243b77] text-center md:w-fit text-white shadow-2xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2">
                              Buy Now{" "}
                              <span className="md:hidden max-md:animate-bounce">
                                <TbHandClick />
                              </span>{" "}
                            </p>
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <h2 className="text-[#243b77] text-lg font-[Poppins] font-semibold md:text-4xl py-8">
              No Data Found
            </h2>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IShopsProducts;
