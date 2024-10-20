import React from "react";

function Footer() {
  return (
    <div className="footer py-20">
      <div className="max-w-[1270px] m-auto px-4 flex flex-col lg:flex-row justify-between gap-5">
        <div className="flex flex-col gap-4 w-full lg:w-[30%]">
          <div className="logo">LOGO</div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            praesentium! Ipsam eos vero, incidunt iste voluptates ab doloremque
            eaque repellendus.
          </p>
          <div className="">
            <ul className="text-white flex text-[20px] gap-5">
              <li className="cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </li>
              <li className="cursor-pointer">
                <i className="fab fa-twitter"></i>
              </li>
              <li className="cursor-pointer">
                <i className="fab fa-instagram"></i>
              </li>
              <li className="cursor-pointer">
                <i className="fab fa-linkedin-in"></i>
              </li>
              <li className="cursor-pointer">
                <i className="fab fa-pinterest-p"></i>
              </li>
            </ul>
          </div>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[15%]">
          <h2 className="font-semibold">Company</h2>
          <ul className="text-gray-400 flex flex-col gap-3">
            <li className="cursor-pointer">
              <a href="#">About Us</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Domains</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Client Area</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Data center</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[15%]">
          <h2 className="font-semibold">Services</h2>
          <ul className="text-gray-400 flex flex-col gap-3">
            <li className="cursor-pointer">
              <a href="#">Web Development</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Mobile App Development</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Digital Marketing</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">SEO &amp; SEM</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Content Marketing</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[15%]">
          <h2 className="font-semibold">Resources</h2>
          <ul className="text-gray-400 flex flex-col gap-3">
            <li className="cursor-pointer">
              <a href="#">FAQ</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Pricing</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Case Studies</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Documentation</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[15%]">
          <h2 className="font-semibold">Legal</h2>
          <ul className="text-gray-400 flex flex-col gap-3">
            <li className="cursor-pointer">
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="cursor-pointer">
              <a href="#">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1270px] m-auto mt-24 text-center text-gray-300">
        <p>Copyright © 2024, neoncloud.online. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
