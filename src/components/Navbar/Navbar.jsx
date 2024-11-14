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
  Zap,
  Database
} from 'lucide-react';


const Logo = () => (
  <div className="flex items-center">
    <div className="relative flex items-center">
      {/* Stylized lightning bolt mark */}
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
        {/* Lightning Bolt SVG */}
        <svg 
          viewBox="0 0 24 24" 
          className="absolute inset-0 w-full h-full p-2"
          style={{ filter: 'drop-shadow(0 0 4px rgba(207,8,140,0.5))' }}
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
            <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
              letterSpacing: '0.02em',
              filter: 'drop-shadow(0 0 8px rgba(207,8,140,0.3))'
            }}
          >
            NEON
          </span>
          <span 
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{ 
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: '0.02em',
              filter: 'drop-shadow(0 0 8px rgba(147,51,234,0.3))'
            }}
          >
            CLOUD
          </span>
          <div 
            className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[rgba(207,8,140,0.5)] via-purple-500/50 to-blue-500/50"
            style={{
              filter: 'blur(0.5px)'
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Home', icon: Home },
    { label: 'Domain', icon: Globe },
    { label: 'Web Hosting', icon: Server, submenu: ['Shared Hosting', 'VPS Hosting', 'Dedicated Servers'] },
    { label: 'Reseller History', icon: RefreshCw },
    { label: 'Services', icon: Wrench, submenu: ['SSL Certificates', 'Website Builder', 'Email Hosting'] },
    { label: 'Security', icon: Shield }
  ];

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

      {/* Main Navbar */}
      <div className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-md rounded-lg text-gray-100 border border-white/10">
        <Logo />

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                className="flex  items-center gap-1 hover:text-[rgba(207,8,140,1)] transition-colors py-2"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.label}
                {item.submenu && <ChevronDown size={16} />}
              </button>
              
              {item.submenu && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-2">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-[rgba(207,8,140,0.1)] hover:text-[rgba(207,8,140,1)] transition-colors"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Globe size={20} />
          </button>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-[rgba(207,8,140,1)] transition-colors py-2">
                <UserAvatar />
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-2 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[rgba(207,8,140,0.1)] hover:text-[rgba(207,8,140,1)] transition-colors">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[rgba(207,8,140,0.1)] hover:text-[rgba(207,8,140,1)] transition-colors">Settings</a>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-[rgba(207,8,140,0.1)] hover:text-[rgba(207,8,140,1)] transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <button className="bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleMenu} />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <UserAvatar />
                <span>User</span>
              </div>
            ) : (
              <UserCircle size={32} className="text-[rgba(207,8,140,1)]" />
            )}
            <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-[rgba(207,8,140,1)] transition-colors"
              />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                  <item.icon size={20} className="text-[rgba(207,8,140,1)]" />
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown size={16} className="ml-auto" />}
                </button>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-white/10">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button className="w-full bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;