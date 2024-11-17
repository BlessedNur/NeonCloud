"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  Headphones,
  Info,
  Menu,
  Search,
  Globe,
  X,
  UserCircle,
  Home,
  Server,
  RefreshCw,
  Wrench,
  Shield,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Cloud,
  DollarSign,
  Database,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Logo = ({ onclick }) => (
  <div className="flex cursor-pointer items-center" onClick={onclick}>
    <div className="relative flex items-center">
      {/* Stylized lightning bolt mark */}
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
        {/* Lightning Bolt SVG */}
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full p-2"
          style={{ filter: "drop-shadow(0 0 4px rgba(207,8,140,0.5))" }}
        >
          <path
            d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
            fill="none"
            stroke="url(#lightning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="lightning-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(207,8,140,1)" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[rgba(207,8,140,0.2)] rounded-lg blur-md"></div>
      </div>

      {/* Text part */}
      <div className="flex flex-col">
        <div className="relative">
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(207,8,140,0.3))",
            }}
          >
            NEON
          </span>
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(147,51,234,0.3))",
            }}
          >
            CLOUD
          </span>
          <div
            className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[rgba(207,8,140,0.5)] via-purple-500/50 to-blue-500/50"
            style={{
              filter: "blur(0.5px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState("EN");
  const path = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMobileDropdown(null);
    }
  };
  const toggleMobileDropdown = (label) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  const menuItems = [
    {
      href: "",
      label: "Services",
      icon: Cloud,
      submenu: [
        { href: "", label: "Web Hosting", icon: Server },
        { href: "", label: "Cloud Servers", icon: Cloud },
        { href: "", label: "SSL Certificates", icon: Shield },
      ],
    },
    {
      href: "",
      label: "Resources",
      icon: Database,
      submenu: [
        { href: "", label: "Documentation", icon: Info },
        { href: "", label: "API Reference", icon: Wrench },
        { href: "", label: "Status Page", icon: RefreshCw },
      ],
    },
  ];

  const languages = ["EN", "FR"];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const UserAvatar = () => (
    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer">
      <img
        src="https://i.pravatar.cc/100"
        alt="User"
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
  );

  return (
    <div className="max-w-[1270px] m-auto z-50 px-4 flex-col flex gap-5 relative">
      {/* Top Bar */}
      {path === "/" && (
        <div className="text-gray-300 py-2 font-light flex gap-5 justify-between max-md:hidden">
          <div className="flex gap-8">
            <div className="flex gap-2 items-center hover:text-[rgba(207,8,140,1)] transition-colors cursor-pointer">
              <Mail size={16} className="text-[rgba(207,8,140,1)]" />
              <p>neoncloud@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center hover:text-[rgba(207,8,140,1)] transition-colors cursor-pointer">
              <Phone size={16} className="text-[rgba(207,8,140,1)]" />
              +1 2345 67890
            </div>
          </div>
          <div className="flex gap-8 capitalize">
            <div className="flex items-center gap-2 hover:text-[rgba(207,8,140,1)] transition-colors cursor-pointer">
              <Headphones size={16} className="text-[rgba(207,8,140,1)]" />
              <p>Support</p>
            </div>
            <div className="flex items-center gap-2 hover:text-[rgba(207,8,140,1)] transition-colors cursor-pointer">
              <Info size={16} className="text-[rgba(207,8,140,1)]" />
              <p>Help</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div
        className={`flex justify-between items-center p-5 bg-black/50 backdrop-blur-md rounded-lg text-gray-100 border ${
          path !== "/" && "mt-8"
        } border-white/10`}
      >
        <Logo onclick={() => router.push("/")} />

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/domain"
            className="hover:text-[rgba(207,8,140,1)] transition-colors py-2"
          >
            Domain
          </Link>

          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => router.push(item.href)}
                className="flex items-center gap-1 hover:text-[rgba(207,8,140,1)] transition-colors py-2"
                onMouseEnter={() =>
                  item.submenu && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.label}
                {item.submenu && <ChevronDown size={16} />}
              </button>

              {item.submenu && activeDropdown === item.label && (
                <div
                  onMouseEnter={() =>
                    item.submenu && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-56 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 
                  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-[rgba(207,8,140,0.1)] before:to-transparent before:opacity-40 before:rounded-lg before:-z-10"
                >
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.label}
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(207,8,140,0.2)] hover:text-[rgba(207,8,140,1)] transition-colors group"
                    >
                      <subItem.icon
                        size={16}
                        className="text-[rgba(207,8,140,1)] opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="font-medium">{subItem.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/#pricing"
            className="hover:text-[rgba(207,8,140,1)] transition-colors py-2"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {/* <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Search size={20} />
          </button> */}
          <div className="relative group">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1">
              <Globe size={20} />
              <span>{language}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-24 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 hidden group-hover:block">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[rgba(207,8,140,0.2)] hover:text-[rgba(207,8,140,1)] transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-[rgba(207,8,140,1)] transition-colors py-2">
                <UserAvatar />
                <ChevronDown size={16} />
              </button>
              <div
                className="absolute top-full right-0 mt-2 w-56 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 hidden group-hover:block
                before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-[rgba(207,8,140,0.1)] before:to-transparent before:opacity-40 before:rounded-lg before:-z-10"
              >
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(207,8,140,0.2)] hover:text-[rgba(207,8,140,1)] transition-colors group"
                >
                  <UserCircle
                    size={16}
                    className="text-[rgba(207,8,140,1)] opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-medium">Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(207,8,140,0.2)] hover:text-[rgba(207,8,140,1)] transition-colors group"
                >
                  <Settings
                    size={16}
                    className="text-[rgba(207,8,140,1)] opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-medium">Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(207,8,140,0.2)] hover:text-[rgba(207,8,140,1)] transition-colors group"
                >
                  <LogOut
                    size={16}
                    className="text-[rgba(207,8,140,1)] opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <span
              onClick={() => router.push("/signin")}
              className="relative cursor-pointer group inline-block"
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r  from-[rgba(207,8,140,1)] to-purple-500 transition-all duration-300">
                Login
              </span>
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-80" />
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <UserAvatar />
                <span>User</span>
              </div>
            ) : (
              <UserCircle size={32} className="text-[rgba(207,8,140,1)]" />
            )}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-[rgba(207,8,140,1)] transition-colors"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <Link
              href="/domain"
              className="block hover:text-[rgba(207,8,140,1)] transition-colors"
            >
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                <Globe size={16} className="text-[rgba(207,8,140,1)]" />
                <p>Domain</p>
              </div>
            </Link>

            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => toggleMobileDropdown(item.label)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <item.icon size={20} className="text-[rgba(207,8,140,1)]" />
                  <span>{item.label}</span>
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`ml-auto transform transition-transform duration-200 ${
                        mobileDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.submenu && (
                  <div
                    className={`bg-white/5 overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileDropdown === item.label
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href="#"
                        className="flex items-center gap-3 px-12 py-3 text-sm hover:bg-[rgba(207,8,140,0.1)] hover:text-[rgba(207,8,140,1)] transition-colors"
                      >
                        <subItem.icon
                          size={16}
                          className="text-[rgba(207,8,140,1)] opacity-70"
                        />
                        <span>{subItem.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-white/10">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => router.push("/signin")}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
