import React from "react";
import "./Section8.css";
import { useSelector } from "react-redux";
import SingleImage from "./SingleImage";

const Section8 = () => {
  const gallery = useSelector((state) => state?.gallery?.data);
  return (
    <div className="px-4 md:px-16 py-3 md:py-6 h-full w-full md:relative md:section8_bg">
      <h2 className="font-[Poppins] tracking-wider text-3xl text-center font-[600] py-2">
        PHOTO GALLERY
      </h2>
      <div className="w-full p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 ">
        {gallery &&
          gallery.length > 0 &&
          gallery
            .slice(0, 8)
            .map((item, index) => (
              <SingleImage key={index} item={item} images={gallery} />
            ))}
      </div>
    </div>
  );
};

export default Section8;
