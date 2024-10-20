import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-[1270px] m-auto z-20 px-4 flex-col flex gap-5">
      {/* Top section */}
      <div className="text-gray-300 font-light flex gap-5 justify-between max-md:hidden">
        <div className="flex gap-5">
          <div className="flex gap-4 items-center">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <p>neoncloud@gmail.com</p>
          </div>
          <div className="flex gap-4 items-center">
            <i className="fa fa-phone" aria-hidden="true"></i>
            +1 2345 67890
          </div>
        </div>
        <div className="flex gap-5 capitalize">
          <div className="flex items-center gap-4">
            <i className="fas fa-headset"></i>
            <p>Support</p>
          </div>
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-circle-info"></i>
            <p>Help</p>
          </div>
        </div>
      </div>

      {/* Navbar section */}
      <div className="flex justify-between items-center p-7 bg-white bg-opacity-10 rounded-md text-gray-100">
        <div className="logo">LOGO</div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <i className="fa fa-bars text-2xl cursor-pointer"></i>
          </button>
        </div>

        {/* Desktop Navbar Links */}
        <ul className="hidden md:flex gap-4">
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Home
          </li>
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Domain
          </li>
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Web Hosting
          </li>
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Reseller History
          </li>
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Services
          </li>
          <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
            Security
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex gap-6 text-lg font-thin">
          <i
            className="fa fa-search text-lg cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out"
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-globe text-lg cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out"
            aria-hidden="true"
          ></i>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-6 buttons">
          <button className="bg-gradient-to-r px-6 py-2 rounded-xl cursor-pointer hover:scale-[1.03] transition">
            Login
          </button>
          <button className="bg-gradient-to-r px-6 py-2 rounded-xl cursor-pointer hover:scale-[1.03] transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Dark Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu - Overlay */}
      <div
        className={`fixed z-50 top-0 right-0 w-[70%] h-full bg-gray-900 text-white transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-7 relative">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white absolute top-5 right-5"
          >
            <i className="fa fa-times"></i>
          </button>

          {/* User Profile Icon */}
          <div className="absolute top-5 left-6">
            <i className="fa fa-user-circle text-3xl"></i>
          </div>

          {/* Search Bar at the Top */}
          <div className="mt-16">
            <input
              type="search"
              className="w-full outline-none bg-gray-700 p-2 rounded-md text-white"
              placeholder="Search..."
            />
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col justify-between text-gray-200">
            <ul className="flex flex-col gap-6 mt-6 text-lg">
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-home mr-2"></i> Home
              </li>
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-globe mr-2"></i> Domain
              </li>
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-server mr-2"></i> Web Hosting
              </li>
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-sync-alt mr-2"></i> Reseller History
              </li>
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-tools mr-2"></i> Services
              </li>
              <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                <i className="fa fa-shield-alt mr-2"></i> Security
              </li>
            </ul>
            <hr className="mt-10 border-0 h-[2px] bg-gray-600" />

            {/* Account Settings / Login Section at the Bottom */}
            <div className=" w-full pt-6">
              <ul className="flex flex-col gap-6 mt-6 text-lg">
                {isLoggedIn ? (
                  <>
                    <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                      <i className="fa fa-cog mr-2"></i> Account Settings
                    </li>
                    <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                      <i className="fa fa-sign-out-alt mr-2"></i> Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                      <i className="fa fa-sign-in-alt mr-2"></i> Login
                    </li>
                    <li className="cursor-pointer hover:text-[rgba(207,8,140,1)] transition-colors duration-300 ease-in-out">
                      <i className="fa fa-user-plus mr-2"></i> Sign Up
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
