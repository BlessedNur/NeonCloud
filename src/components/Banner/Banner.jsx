import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <div className="relative flex items-center max-md:h-[90svh]  gap-6 mt-4 max-md:mt-0 justify-between max-w-[1270px] m-auto px-4">
      {/* Background Image for Mobile View */}
      <div className="absolute inset-0 -z-10 md:hidden">
        <img
          src={"/images/Banner 1.png"}
          className="w-full h-full object-cover opacity-40"
          alt="Background Banner"
        />
      </div>

      <div className="w-full flex flex-col gap-4 relative z-10">
        <div className="absolute z-[-1] left-10 top-[-50px] max-md:left-[-20px] max-md:top-0">
          <img src="/images/Vector.png" alt="" />
        </div>{" "}
        <h1 className="text-[40px] font-bold text-center md:text-left">
          Reliable Web Hosting Platform for Your Website
        </h1>
        <p className="text-lg text-gray-400 text-center md:text-left">
          Fully managed High Performance Web Hosting With Free Domain
        </p>
        <div className="flex max-md:flex-col gap-6 max-md:justify-center">
          <button className="bg-[rgba(207,8,140,1)] px-14 py-4 rounded-lg">
            Try for free
          </button>
          <button className="border border-[rgba(255,255,255,1)] px-8 py-4 rounded-lg">
            Choose Your plan
          </button>
        </div>
      </div>

      {/* Background Image for Desktop View */}
      <div className="hidden md:block w-full">
        <img
          src={"/images/Banner 1.png"}
          className="w-full h-full object-cover"
          alt="Background Banner"
        />
      </div>
    </div>
  );
}

export default Banner;
