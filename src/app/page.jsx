"use client";
import React from "react";
import Image from "next/image";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ParticlesComponent from "../components/Particles/ParticlesBackground";
import Pricing from "../components/Pricing/Pricing";
import ServicesSection from "../components/Services/Services";
import Banner from "../components/Banner/Banner";
import WhyChooseUs from "../components/whychooseus/WhyChooseUs";
import MigrationSection from "../components/migration/MigrationSection";
import DomainOfferSection from "../components/domainsearch/DomainOfferSection";
import TestimonialCarousel from "../components/testimonials/TestimonialSection";

export default function Home() {
  return (
    <>
      <section className="pt-4">
        <Navbar />
        <Banner />
        <DomainOfferSection />
        <ServicesSection />
        <Pricing />
        <WhyChooseUs />
        <MigrationSection />
        <TestimonialCarousel />
        <div className="relative mt-16">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_70%)]" />

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] shadow-lg py-16">
            <div className="max-w-[1270px] m-auto px-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-4 lg:w-1/2">
                  <div className="relative">
                    <h2 className="text-[30px] font-semibold text-center lg:text-left bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      Subscribe to our Newsletter
                    </h2>
                    <div className="absolute -bottom-2 left-0 right-0 lg:right-auto w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto lg:mx-0" />
                  </div>
                  <p className="text-gray-400 text-center lg:text-left">
                    Get Regular News and Exclusive Offers
                  </p>
                </div>

                <div className="flex flex-col gap-4 items-center lg:items-end lg:w-1/2">
                  <div
                    className="group flex items-stretch w-full max-w-md rounded-lg 
                    bg-gradient-to-r from-white/[0.05] to-white/[0.01] 
                    border border-white/[0.05] shadow-lg p-1
                    hover:border-purple-500/50 transition-all duration-300"
                  >
                    <input
                      type="email"
                      className="flex-1 px-4 bg-transparent text-white outline-none placeholder-gray-400 min-w-0"
                      placeholder="Enter your email"
                    />
                    <button
                      className="relative px-7 py-4 rounded-md cursor-pointer 
                      bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium
                      hover:opacity-90 transition-all duration-300
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600 before:to-pink-600
                      before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
                      overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-gray-400 text-center lg:text-right text-sm">
                    We&apos;ll never share your email address with a third-party.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
      <ParticlesComponent />
    </>
  );
}
