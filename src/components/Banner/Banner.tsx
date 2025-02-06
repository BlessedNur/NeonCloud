"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Banner() {
  const router = useRouter();
  return (
    <div className="relative min-h-[90vh] md:min-h-0 flex items-center max-w-[1270px] mx-auto px-4 py-12">
      <div className="absolute inset-0 -z-10 md:hidden">
        <div className="absolute inset-0 bg-black/60" />
        <img
          src="/images/Banner 1.png"
          className="w-full h-full object-cover"
          alt="Background Banner"
        />
      </div>

      <div className="flex items-center justify-between gap-12 w-full">
        <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10">
          <div className="absolute z-[-1] left-10 top-[-50px] max-md:left-[-20px] max-md:top-0 opacity-60">
            <img src="/images/Vector.png" alt="" className="w-full h-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight">
            Reliable Web Hosting Platform for Your Website
          </h1>

          <p className="text-lg md:text-xl text-gray-400 text-center md:text-left">
            Fully managed High Performance Web Hosting With Free Domain
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            {/* Primary button matching the provided gradient */}
            <button
              onClick={() => router.push("#pricing")}
              className="bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(207,8,140,0.3)]"
            >
              <span className="font-medium">Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary button with complementary styling */}
            <button
              onClick={() => router.push("/about")}
              className="px-6 py-3 rounded-lg border border-[rgba(207,8,140,0.3)] hover:bg-[rgba(207,8,140,0.1)] transition-all duration-300 shadow-[0_0_15px_rgba(207,8,140,0.1)]"
            >
              Learn More
            </button>
          </div>

          {/* Feature badges with matching theme */}
          <div className="flex flex-wrap gap-4 mt-4">
            {["24/7 Support", "99.9% Uptime", "Free SSL Certificate"].map(
              (feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-[rgba(207,8,140,0.2)] text-sm font-medium hover:border-[rgba(207,8,140,0.4)] transition-colors duration-300"
                >
                  {feature}
                </span>
              )
            )}
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r rounded-full from-[rgba(207,8,141,0.04)] to-purple-500/20 blur-2xl" />
            <Image
              width={1000}
              height={1000}
              src="/images/Banner 1.png"
              className="relative w-full h-auto object-cover rounded-2xl  border-[rgba(207,8,140,0.2)]"
              alt="Background Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
