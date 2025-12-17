import React from "react";
import Tagline from "./Tagline";
import AnimatedArrowDown from "../svg/AnimatedArrowDown";
import { news } from "../assets";

const Promo = () => {
  return (
    <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-16 xl:max-w-[87.5rem]">
      <Tagline className="mt-20 text-xl">#Welcome</Tagline>
      <h1 className="h1 pl-10 mt-20 font-semibold font-poppins text-transparent text-2xl md:text-6xl text-stroker-1 text-stroke-custom">
        About Blog
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="pl-16 mt-10">
          <p className="max-w-xl text-gray-400 sm:text-xl">
            Welcome to my blog, where you can enjoy your free time reading
            interesting articles on selected topics, mainly programming,
            cryptocurrencies, and artificial intelligence. For lighter reading,
            you will find posts dedicated to nature, ecology, and a healthy
            lifestyle, always with a touch of irony and perspective.
          </p>
        </div>
        <div className="flex items-center justify-center ml-32">
          <img
            src={news}
            alt="newspaper"
            className="flex items-center justify-center h-32 w-32 md:h-52 md:w-52"
          />
        </div>
      </div>
      <div className="flex-row pb-10">
        <AnimatedArrowDown />
      </div>
    </div>
  );
};

export default Promo;
