"use client"
import React from "react";
import { ArrowRight } from 'lucide-react';

function Banner() {
  return (
    <div className="relative min-h-[90vh] md:min-h-0 flex items-center max-w-[1270px] mx-auto px-4 py-12">
      {/* Mobile Background */}
      <div className="absolute inset-0 -z-10 md:hidden">
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
        <img
          src="/images/Banner 1.png"
          className="w-full h-full object-cover"
          alt="Background Banner"
        />
      </div>

      <div className="flex items-center justify-between gap-12 w-full">
        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10">
          {/* Vector Background */}
          <div className="absolute z-[-1] left-10 top-[-50px] max-md:left-[-20px] max-md:top-0 opacity-60">
            <img src="/images/Vector.png" alt="" className="w-full h-auto" />
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight">
            Reliable Web Hosting Platform for Your Website
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 text-center md:text-left">
            Fully managed High Performance Web Hosting With Free Domain
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <button className="bg-[rgb(207,8,140)] px-8 py-4 rounded-lg hover:bg-[rgb(187,7,126)] transition-colors duration-300 flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-lg border border-[rgb(207,8,140)] hover:bg-[rgb(207,8,140)]/10 transition-colors duration-300">
              Learn More
            </button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-4 py-2 rounded-full bg-[rgb(207,8,140)]/10 border border-[rgb(207,8,140)]/20 text-sm">
              24/7 Support
            </span>
            <span className="px-4 py-2 rounded-full bg-[rgb(207,8,140)]/10 border border-[rgb(207,8,140)]/20 text-sm">
              99.9% Uptime
            </span>
            <span className="px-4 py-2 rounded-full bg-[rgb(207,8,140)]/10 border border-[rgb(207,8,140)]/20 text-sm">
              Free SSL Certificate
            </span>
          </div>
        </div>

        {/* Desktop Banner Image */}
        <div className="hidden lg:block w-1/2">
          <img
            src="/images/Banner 1.png"
            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
            alt="Background Banner"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;