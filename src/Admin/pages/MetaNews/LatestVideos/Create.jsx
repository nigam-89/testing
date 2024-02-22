import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import { useRef } from "react";
import JoditEditor from "jodit-react";
import { apiConnector } from "../../../../services/apiConnector";
import { HandleImagesAPI, LatestVideosAPI } from "../../../../services/apis";

const Create = () => {
  const [formData, setFormData] = useState({
    date: "",
    heading: "",
    shortDesc: "",
    briefDesc: "",
    ytbUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const editor = useRef(null);
  const admin = useSelector((state) => state.admin);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    let images;
    try {
      const formImageData = new FormData();
      selectedImages.forEach((image) => {
        formImageData.append("images", image);
      });
      let response = await apiConnector({
        method: "POST",
        url: HandleImagesAPI.UploadImage_API,
        bodyData: formImageData,
      });
      if (response.data.success) {
        images = response?.data?.data?._id;
      }
      let videoCode = "";
      if (formData.ytbUrl.length > 4) {
        videoCode = formData.ytbUrl.split("/")[3];
      }
      if (images) {
        response = await apiConnector({
          method: "POST",
          url: LatestVideosAPI.CreateLatestVideos_API,
          bodyData: {
            imgUrlModelDBId: images,
            heading: formData.heading,
            date: formData.date,
            shortDescription: formData.shortDesc,
            briefDescription: formData.briefDesc,
            ytbUrl: videoCode,
          },
          headers: { token: admin.token },
        });
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          setFormData({
            date: "",
            heading: "",
            shortDesc: "",
            briefDesc: "",
            ytbUrl: "",
          });
          setSelectedImages([]);
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false);
  };

  // Jodit Config
  const config = useMemo(
    () => ({
      controls: {
        font: {
          list: {
            Martel: "Martel",
            "Tiro Devanagari Hindi": "Tiro Devanagari Hindi",
          },
        },
      },
    }),
    []
  );

  return (
    <div className="w-full min-h-screen relative">
      <div className="flex flex-col justify-between gap-8 py-4">
        {/* form to create market news */}
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-full max-md:px-4">
            <div className="bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900">
              <form onSubmit={handleSubmit} className="">
                <h2 className="text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide">
                  LATEST VIDEOS
                </h2>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="thumbnail"
                    className="text-sm font-[Poppins] font-[500]"
                  >
                    Thumbnail
                  </label>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                    type="file"
                    id="formFileMultiple"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-[Poppins] font-[500]"
                  >
                    Date
                  </label>
                  <input
                    onChange={changeHandler}
                    max={new Date().toISOString().split("T")[0]}
                    autoComplete="date"
                    value={formData.date}
                    name="date"
                    type="date"
                    className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="heading"
                    className="text-sm font-[Poppins] font-[500]"
                  >
                    Heading
                  </label>
                  <input
                    onChange={changeHandler}
                    autoComplete="title"
                    value={formData.heading}
                    name="heading"
                    type="heading"
                    className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="shortDesc"
                    className="text-sm font-[Poppins] font-[500]"
                  >
                    Short Desc
                  </label>
                  <input
                    onChange={changeHandler}
                    autoComplete="shortDesc"
                    value={formData.shortDesc}
                    name="shortDesc"
                    type="shortDesc"
                    className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="ytbUrl"
                    className="text-sm font-[Poppins] font-[500]"
                  >
                    Youtube URL
                  </label>
                  <input
                    onChange={changeHandler}
                    autoComplete="ytbUrl"
                    value={formData.ytbUrl}
                    name="ytbUrl"
                    type="text"
                    className="text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="briefDesc"
                    className="text-sm font-[Poppins] font-[500] mb-1"
                  >
                    Brief Desc
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={formData.briefDesc}
                    tabIndex={1}
                    config={config}
                    onChange={(newContent) =>
                      setFormData((prevFormData) => {
                        return {
                          ...prevFormData,
                          briefDesc: newContent,
                        };
                      })
                    }
                    onBlur={(newContent) =>
                      setFormData((prevFormData) => {
                        return {
                          ...prevFormData,
                          briefDesc: newContent,
                        };
                      })
                    }
                  />
                </div>

                <div className="mb-4 mt-8 flex flex-col relative">
                  <button
                    type="submit"
                    className="border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider"
                  >
                    {loading ? <Loader /> : "PUBLISH"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
