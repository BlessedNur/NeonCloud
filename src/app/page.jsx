"use client";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Pricing from "@/components/Pricing/Pricing";
import ServicesSection from "@/components/Services/Services";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <section className=" pt-4">
      <Navbar />
      <Banner />
      <div className="bg-white bg-opacity-10 mt-16">
        <div className="max-w-[1270px] m-auto px-4 py-10 flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-2 mb-6 lg:mb-0">
            <h2 className="text-[30px] font-semibold text-center lg:text-left">
              Get 10% Off Today
            </h2>
            <p className="text-gray-400 text-center lg:text-left">
              Grab the holiday Offer. This will end in 3 days. Hurry Up!
            </p>
            <p className="text-gray-400 text-center lg:text-left">
              Get your perfect domain from 148/Mo
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center lg:items-end">
            <div className="flex items-center gap-2 bg-white text-black w-fit p-2 pl-4 rounded-lg">
              <input
                type="text"
                className="bg-transparent w-[20em] outline-none max-md:w-[100%]"
                placeholder="Type Your Domain Name"
              />
              <span className="font-semibold text-sm">.neoncloud.online</span>
              <button className="domainbtn text-white px-7 py-3 rounded-lg cursor-pointer hover:scale-[1.03] transition">
                Search
              </button>
            </div>
            <p className="text-gray-400 text-center lg:text-left">
              Only sub-domains are available at the moment tune it for upcoming
              updates !!
            </p>
          </div>
        </div>
      </div>

      <ServicesSection />
      <Pricing />
      <div className="whychooseus">
        <div className="max-w-[1270px] m-auto px-4 py-10">
          <h2 className="text-4xl font-semibold text-center text-white">
            Why Choose NeonCloud ?
          </h2>
          <p className="text-center text-sm text-gray-300 m-4">
            With NeonCloud stand apart in the sphere of World Wide Web with
            maximum flexibility offering elevated packages for all your business
            needs ensuring smooth execution of your business activities.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="grid gap-8 grid-cols-1 text-gray-300 sm:grid-cols-2 md:grid-cols-3">
              <div className=" bg-secondary-gradient p-10 relative rounded-lg  flex flex-col items-left gap-3 mt-16">
                <div className="absolute bg-category-gradient p-5 rounded-full grid place-content-center top-[-50px]">
                  <Image
                    src={"/images/internet-speed-icon 1.png"}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold ">Loading Speed</h3>
                <p className="">
                  Our super-fast network with latest and modern technology
                  ensures accelerated response time and processing along with
                  swift website page loading speed.{" "}
                </p>
              </div>
              <div className=" bg-secondary-gradient p-10 relative rounded-lg  flex flex-col items-left gap-3 mt-16">
                <div className="absolute bg-category-gradient p-5 rounded-full grid place-content-center top-[-50px]">
                  <Image
                    src={"/images/cloud-computing-icon 1.png"}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold ">Network Security</h3>
                <p className="">
                  Our Certified Tier III and Green Data centers in India have
                  the lowest latency with 4 different layers in our Software
                  Defined Network.
                </p>
              </div>
              <div className=" bg-secondary-gradient p-10 relative rounded-lg  flex flex-col items-left gap-3 mt-16">
                <div className="absolute bg-category-gradient p-5 rounded-full grid place-content-center top-[-50px]">
                  <Image
                    src={"/images/secure-icon 1.png"}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold ">Hosting Reliability</h3>
                <p className="">
                  Equipped with an advanced infrastructure and server
                  architectures together with sufficient resources help create a
                  robust platform that ensures business continuity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="max-w-[1270px] m-auto px-4 py-10 max-">
          <h2 className="text-4xl font-semibold text-center text-white">
            Migration is not an issue with us{" "}
          </h2>
          <p className="text-center text-sm text-gray-300 m-4">
            We provied free migration service so that ours customers can manage
            their work easily
          </p>
          <div className="flex items-center justify-between gap-5  max-md:flex-col max-md:text-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-[25px] w-full">Hassle Free Migration</h3>
              <p className="text-gray-300">
                Our technical expert team will help you to migrate your site
                from your current hosting provider to Host.co.in, You don't have
                to worry about any of the migration issues.
              </p>
              <button className="bg-custom-gradient max-md:m-auto p-3 px-10 cursor-pointer rounded-lg w-fit">
                Contact Sales
              </button>
            </div>
            <div className="grid place-content-center w-full">
              <Image
                width={500}
                height={500}
                className="w-full h-full object-contain"
                src={"/images/Migration 4 1.png"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 mt-16">
        <div className="max-w-[1270px] m-auto px-4 py-10 flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-2 mb-6 lg:mb-0">
            <h2 className="text-[30px] font-semibold text-center lg:text-left">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-400 text-center lg:text-left">
              Get Regularly News and Exclusive Offers
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center lg:items-end">
            <div className="flex items-center gap-2 bg-white text-black w-fit p-2 pl-4 rounded-lg">
              <input
                type="text"
                className="bg-transparent w-[20em] outline-none max-md:w-[100%]"
                placeholder="Email"
              />
              <button className="domainbtn text-white px-7 py-3 rounded-lg cursor-pointer hover:scale-[1.03] transition">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-center lg:text-left">
              We’ll never share your email address with a third-party.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
