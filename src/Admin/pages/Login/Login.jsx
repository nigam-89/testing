import React, { useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginAdmin } from "./../../../features/AdminSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (admin._id) {
      navigate("/en/admin/welcome");
    }
  }, [navigate, admin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (formData.email.length === 0) {
      toast.error("Enter a valid Email");
      setLoading(false);
      return;
    }
    if (formData.password.length === 0) {
      toast.error("Enter a valid Password");
      setLoading(false);
      return;
    }

    // console.log(formData)

    dispatch(loginAdmin(formData)).then(() => {
      setLoading(false);
    });
    setLoading(false);
  };

  return (
    <div className="px-3 md:px-32 py-4 md:py-12 h-screen relative auth_bg flex justify-center items-center">
      <div className="flex justify-center items-center w-full max-md:px-4">
        <div className="bg-white p-4 rounded-xl w-[32rem] pt-6 pb-12">
          <form onSubmit={handleSubmit} className="">
            <div className="flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png"
                alt="logo"
                className="md:cursor-pointer w-20 md:w-28"
              />
            </div>
            <h2 className="text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide">
              ADMIN PANEL
            </h2>

            <div className="mb-4 flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-[Poppins] font-[500]"
              >
                Email
              </label>
              <input
                onChange={changeHandler}
                autoComplete="email"
                value={formData.email}
                name="email"
                type="email"
                className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
              />
            </div>

            <div className="mb-4 flex flex-col relative">
              <label
                htmlFor="password"
                className="text-sm font-[Poppins] font-[500]"
              >
                Password
              </label>
              <input
                onChange={changeHandler}
                value={formData.password}
                name="password"
                type={showPassword ? "text" : "password"}
                className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                autoComplete="current-password"
              />
              <div
                className={`absolute bottom-3 right-2 cursor-pointer ${
                  showPassword ? "text-violet-500" : "text-gray-800"
                } `}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <AiFillEye />
              </div>
            </div>

            <div className="mb-4 mt-8 flex flex-col relative">
              <button
                type="submit"
                className="border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider"
              >
                {loading ? <Loader /> : "SIGN IN"}
              </button>
            </div>
          </form>

          <div className="w-full flex justify-center items-center mt-4 relative before:absolute before:w-full before:h-[1.5px] before:top-2 before:left-0 before:bg-violet-500">
            <span className="text-sm font-[Poppins] inline z-10 bg-white rounded-full px-1 text-center font-[500] pb-4 tracking-wide">
              OR
            </span>
          </div>

          <div>
            <Link to="/">
              <button className="border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider">
                {"Back to Home"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;