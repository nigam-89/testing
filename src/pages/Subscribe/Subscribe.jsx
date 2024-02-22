import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar/Navbar";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import UpperNavbar from "../../components/global/UpperNavbar/UpperNavbar";

import { AiTwotoneStar } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import Footer from "../../components/global/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { PaymentAPI } from "../../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './Subscribe.css';

const Subscribe = () => {
  const navigate = useNavigate();
  const subscriptions = useSelector((state) => state?.subscriptions?.data);
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    window.scroll(0, 400);
  }, []);

  const handlePayment = async (id) => {
    // console.log(id)
    try {
      const productData = {
        productDbId: id,
        category: "Subscription",
      };

      const orderResponse = await apiConnector({
        method: "POST",
        url: PaymentAPI.IShopPayment_API,
        bodyData: productData,
      });

      initPayment(orderResponse.data.data, id);
    } catch (error) {
      console.error("Error processing payment: ", error);
      toast.error("Error processing payment");
    }
  };

  const initPayment = async (data, id) => {
    const price = data.amount;
    // console.log(price);

    // Fetch the Razorpay key_id from your backend
    try {
      const keyResponse = await apiConnector({
        method: "GET",
        url: PaymentAPI.getPaymentKey_API,
      });

      if (!keyResponse.data.success) {
        console.error("Failed to retrieve key_id.");
        return;
      }

      const key_id = keyResponse.data.key;
      // console.log("key_id: " + key_id);

      const options = {
        key: key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Subscriptions",
        description: "MyMetaLogic Subscriptions",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await apiConnector({
              method: "POST",
              url: PaymentAPI.VerifyPayment_API,
              bodyData: response,
            });
            // console.log(verifyResponse.data);

            savePayment(verifyResponse.data, id, price);
          } catch (error) {
            console.error("Error verifying payment: ", error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error fetching key_id: ", error);
    }
  };

  const savePayment = async (data, id, price) => {
    // console.log({ data, orderId });
    // console.log(data?.data);
    // console.log(price);
    const { razorpay_order_id, razorpay_payment_id } = data?.data;
    if (razorpay_order_id && razorpay_payment_id) {
      try {
        await apiConnector({
          method: "POST",
          url: PaymentAPI.savePaymentInfoForSubscriptionPurchase_API,
          bodyData: {
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            productDBId: id,
            amount: price,
            userDBId: user._id,
          },
        });

        // console.log(res);
        toast.success("Payment Done");
        navigate("/dashboard/profile");
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      toast.error("Payment not verified");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tableSize, setTableSize] = useState("md");

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    console.log("windowWidth", windowWidth);

    if (windowWidth < 430) {
      setTableSize("xs");
    } else {
      setTableSize("md");
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  const isPhone = window.innerWidth <= 767;
  return (
    <div>
      <UpperNavbar />
      <Navbar />
      <div className="w-[100%] bg-gray-100">
        <div className="w-full pb-8 ">
  {/* <img
    src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816941/MyMetalogic/Subscription_page_x29xrd.jpg"
    alt="metalogic"
    className="object-cover w-full h-auto "
  /> */}
   <img
    src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1700816941/MyMetalogic/Subscription_page_x29xrd.jpg"
    alt="metalogic"
    className={`object-cover w-full h-auto ${isPhone ? 'scale-up' : ''}`}
  />
</div>
        <div className="3xl:w-[1500px] mx-auto">
          <div className="w-[95%] mx-auto flex flex-col lg:flex-row gap-4 justify-between items-center mt-8">
            {/* left area */}
            <div className="flex flex-col justify-between gap-16 w-[100%]">
              <div className="min-w-[80%] border py-8 px-2 md:px-4 bg-white rounded-2xl shadow-2xl">
                <TableContainer className="w-[100%]">
                  <Table variant="striped" size={tableSize}>
                    <Thead>
                      <Tr>
                        <Th className="max-[430px]:text-xs">Features</Th>
                        <Th className="max-[430px]:text-xs">Free</Th>
                        <Th
                          className="text-center flex justify-center items-center max-[430px]:text-xs"
                          style={{ color: "#fd3737" }}
                        >
                          + Membership
                        </Th>
                        {/* <Th className='w-[100%]' style={{ color: "#fd3737" }}><img src={plusLogo} className="w-[80%]"/></Th> */}
                      </Tr>
                    </Thead>
                    <Tbody className="">
                      {
                        <>
                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">Top Stories</Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>

                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">
                              Price Movement
                            </Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>

                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">Market News</Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>
                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">MetaWeekly</Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>

                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">Opinion Box</Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>
                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">
                              Govt. Notifications
                            </Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>

                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">
                              Events Reports
                            </Td>
                            <Td>
                              {
                                <MdOutlineCancel className="opacity-[0.4] max-[400px]:text-xs md:text-2xl" />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>

                          <Tr className="font-[Rubik]">
                            <Td className="text-xs md:text-md">
                              Latest Videos
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto  max-[400px]:text-xs md:text-2xl "
                                  icon={faCheck}
                                />
                              }
                            </Td>
                            <Td>
                              {
                                <FontAwesomeIcon
                                  className="text-[#243b77] mx-auto  max-[400px]:text-xs md:text-2xl text-center flex font-extrabold"
                                  icon={faCheck}
                                />
                              }
                            </Td>
                          </Tr>
                        </>
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://metalogicpms.com/"
              >
                <div
                  className="min-w-[100%] max-w-[100%] mb-12 rounded-[2rem] min-h-[400px] md:min-h-[600px] md:max-h-[600px] relative z-10 text-white overflow-hidden md:shadow-2xl bg-[url('https://res.cloudinary.com/djr2f6dlh/image/upload/v1701082861/About%20Page/event_banner_dbni9u.webp')] bg-center bg-contain bg-no-repeat"
                  style={{ boxShadow: "3px 3px 10px [#232323]" }}
                >
                  {/* <img src='https://mymetalogic.com/wp-content/uploads/2023/06/NTP08747.jpg' alt='' className='h-[600px] object-fit' /> */}
                  {/* <div className='bg-[#000000dc] opacity-[0.5] w-[100%] h-[600px] rounded-[2rem] absolute -z-20'></div> */}
                  <div className="w-[100%] text-center pt-12">
                    {/* <p className='font-[Mooli] font-semibold text-[1.2rem] ' style={{ textShadow: "2px 2px black" }}>upcoming</p>
                                        <h2 className='font-[Poppins] font-semibold text-[1.8rem]' style={{ textShadow: "2px 2px black" }}>Conference Banner</h2> */}
                  </div>
                </div>
              </a>
            </div>

            {/* right area */}
            <div className="flex flex-col justify-between items-center gap-8">
              <div className="w-[100%]">
                <img
                  src={
                    "https://res.cloudinary.com/djr2f6dlh/image/upload/v1703584823/banner_bndge_wd2th6.webp"
                  }
                  alt="metalogic"
                  className="w-[100%] rounded-[2rem]"
                  style={{ boxShadow: "2px 2px 10px black" }}
                />
              </div>

              <div className="w-[100%] cursor-pointer hover:shadow-sm duration-300 transition-all bg-white border pt-8 md:pt-24 pb-4 px-8 flex max-[400px]:flex-col flex-row items-center gap-4 justify-between md:items-end md:flex-row md:gap-0 rounded-[2rem] shadow-lg relative overflow-x-hidden">
                {/* <div className='bg-[#243b77] w-[120px] h-[120px] rounded-full absolute -top-10 -left-10'></div> */}
                <div className="max-[400px]:w-[60%] w-[40%]  md:w-[40%] h-[50px] max-h-[50px] absolute top-5 left-0">
                  <img
                    src={
                      "https://res.cloudinary.com/djr2f6dlh/image/upload/v1700817072/MyMetalogic/badgeMetalogic_z1ah8k.png"
                    }
                    alt="metalogic"
                    className="h-[100%] w-[100%]"
                  />
                  <AiTwotoneStar className="absolute top-[30%] left-[5%] md:left-[5%] md:text-2xl text-yellow-400 animate-pulse" />
                  <p className="text-sm text-white font-[Rubik] absolute top-[30%] left-[20%] md:left-[20%]">
                    Recommended
                  </p>
                </div>

                <div className="flex flex-col justify-between items-start gap-2 font-[Rubik] mt-12 md:mt-0">
                  <p className="font-semibold text-xl ">12 Months</p>
                  <div>
                    <p className="flex items-center gap-2 font-extrabold text-3xl text-green-600">
                      {" "}
                      INR 8,000
                      <span className="text-sm  text-black font-[Poppins]">
                        Save 20%
                      </span>
                    </p>
                    <p className="font-extrabold text-sm line-through text-black font-[Mooli]">
                      INR 10,000
                    </p>
                    <p className="text-xs font-[Mooli] my-[4px]">
                      plus 18% GST
                    </p>
                  </div>
                </div>
                {user?.token ? (
                  <p
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white"
                    onClick={() => handlePayment(subscriptions[0]._id)}
                  >
                    Pay Now
                  </p>
                ) : (
                  <Link
                    to="/sign-in"
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white"
                  >
                    Pay Now
                  </Link>
                )}
              </div>

              <div className="w-[100%] cursor-pointer hover:shadow-sm duration-300 transition-all bg-white border pt-8 md:pt-20 pb-8 px-8 flex max-[400px]:flex-col flex-row items-center gap-4 justify-between md:items-end md:flex-row md:gap-0 rounded-[2rem] shadow-lg relative overflow-x-hidden">
                {/* <div className='bg-[#243b77] w-[120px] h-[120px] rounded-full absolute -top-10 -left-10'></div> */}

                <div className="flex flex-col justify-between items-start gap-2 font-[Rubik]">
                  <p className="font-semibold text-xl">6 Months</p>
                  <div>
                    <p className="flex items-center gap-2 font-extrabold text-3xl text-green-600">
                      INR 4,500
                      <span className="text-sm  text-black font-[Poppins]">
                        Save 10%
                      </span>
                    </p>
                    <p className="font-extrabold text-sm line-through text-black font-[Mooli]">
                      INR 5,000
                    </p>
                    <p className="text-xs font-[Mooli]">plus 18% GST</p>
                  </div>
                </div>
                {user?.token ? (
                  <p
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white "
                    onClick={() => handlePayment(subscriptions[1]._id)}
                  >
                    Pay Now
                  </p>
                ) : (
                  <Link
                    to="/sign-in"
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white "
                  >
                    Pay Now
                  </Link>
                )}
              </div>

              <div className="w-[100%] cursor-pointer hover:shadow-sm duration-300 transition-all bg-white border pt-8 md:pt-20 pb-8 px-8 flex max-[400px]:flex-col flex-row items-center gap-4 justify-between md:items-end md:flex-row md:gap-0 rounded-[2rem] shadow-lg relative overflow-x-hidden">
                {/* <div className='bg-[#243b77] w-[120px] h-[120px] rounded-full absolute -top-10 -left-10'></div> */}

                <div className="flex flex-col justify-between items-start gap-2 font-[Rubik]">
                  {/* <p>Recommended</p> */}
                  <p className="font-semibold text-xl">3 Months</p>
                  <div>
                    <p className="flex items-center gap-2 font-extrabold text-3xl text-green-600">
                      INR 2,500
                    </p>
                    <p className="text-xs font-[Mooli]">plus 18% GST</p>
                  </div>
                </div>
                {user?.token ? (
                  <p
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white "
                    onClick={() => handlePayment(subscriptions[2]._id)}
                  >
                    Pay Now
                  </p>
                ) : (
                  <Link
                    to="/sign-in"
                    className="border px-4 py-2 rounded-lg bg-[#243b77] text-white "
                  >
                    Pay Now
                  </Link>
                )}
              </div>

              <div className="w-[100%] rounded-[2rem] bg-white py-8 px-8 my-4 flex flex-col items-start justify-between gap-4 font-[Rubik] shadow-2xl">
                <p className="font-semibold text-xl tracking-wider ">
                  For Assistance:
                </p>

                <div>
                  <p className="text-lg font-semibold font-[Roboto]">
                    Mannu Chaulia (Market Analyst & Sr. Manager Operations)
                  </p>
                  <a href="mailto:mannu@metalogicpms.com" className="text-sm ">
                    mannu@metalogicpms.com
                  </a>
                </div>
                <div>
                  <p className="text-lg font-semibold font-[Roboto]">
                    Ruchi Tripathi (Executive - Sales & Marketing)
                  </p>
                  <a href="mailto:ruchi@metalogicpms.com" className="text-sm ">
                    ruchi@metalogicpms.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscribe;
