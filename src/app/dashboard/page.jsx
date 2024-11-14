"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  HelpCircle,
  LogOut,
  Home,
  Server,
  BarChart2,
  Settings,
  Globe,
  RefreshCw,
  Wrench,
  Shield,
  UserCog,
  CreditCard,
  Lock,
  BellRing,
  Eye,
  Menu,
  X,
  Moon,
  Sun,
  Monitor,
  Cloud,
  Zap,
  Database,
} from "lucide-react";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";

// SidebarItem component
const SidebarItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-4 py-3 md:py-4 transition-all duration-200 ${
      active
        ? "bg-white/10 text-white border-l-4 border-[rgba(207,8,140,1)]"
        : "text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
    }`}
  >
    {icon}
    <span className="font-light tracking-wide text-[13px]">{text}</span>
  </button>
);

const SidebarSection = ({ title, children }) => (
  <div className="py-2">
    <h3 className="text-[11px] font-semibold text-gray-500 uppercase px-4 mb-1">
      {title}
    </h3>
    {children}
  </div>
);

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
const UserMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer">
        <img
          src="https://i.pravatar.cc/100"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
      {isHovered && (
        <div className="absolute top-8 right-0 mt-2 w-64 bg-black/80 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/10">
          <div className="px-4 py-3 border-b border-gray-700/50">
            <p className="text-sm leading-5 font-medium text-white">
              Ilma Fortune
            </p>
            <p className="text-xs leading-4 font-medium text-gray-400 mt-1">
              blessed@gmail.com
            </p>
          </div>
          <div className="px-4 py-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Account Status</span>
              <span className="text-xs font-semibold text-green-400">
                Active
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Plan</span>
              <span className="text-xs font-semibold text-white">Pro</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Next Billing</span>
              <span className="text-xs font-semibold text-white">
                15 Dec 2024
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Storage Used</span>
              <span className="text-xs font-semibold text-white">
                75% (75GB/100GB)
              </span>
            </div>
          </div>
          <div className="border-t border-gray-700/50 mt-2 pt-2">
            <UserMenuItem icon={<Eye size={14} />} text="View Profile" />
            <UserMenuItem icon={<HelpCircle size={14} />} text="Help Center" />
            <UserMenuItem icon={<LogOut size={14} />} text="Sign Out" />
          </div>
        </div>
      )}
    </div>
  );
};

const UserMenuItem = ({ icon, text }) => (
  <a
    href="#"
    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
  >
    {icon}
    {text}
  </a>
);

// New ThemeSwitcher component// Replace the existing ThemeSwitcher component with this:
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");

    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (!savedTheme) {
      setIsDark(mediaQuery.matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    // Here you would implement the actual theme change logic
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center justify-between ">
        <span className="text-sm text-gray-400 flex items-center gap-2">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
          {isDark ? "Dark" : "Light"} Mode
        </span>
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none"
          style={{ backgroundColor: isDark ? "rgba(207,8,140,1)" : "#374151" }}
        >
          <span
            className={`${
              isDark ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
          />
        </button>
      </div>
    </div>
  );
};

function Page() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainMenuItems = [
    { icon: <Home size={16} />, text: "Home", id: "dashboard" },
    { icon: <Globe size={16} />, text: "Domains", id: "domain" },
    { icon: <Server size={16} />, text: "Web Hosting", id: "hosting" },
  ];

  const accountMenuItems = [
    { icon: <Shield size={16} />, text: "Security", id: "account" },
    { icon: <CreditCard size={16} />, text: "Billing", id: "billing" },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <header className="bg-black/50 backdrop-blur-md border-b border-white/10 p-4 flex-shrink-0 relative ">
          <div className="flex items-center justify-between mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
              <Logo />
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Bell size={18} />
              </button>
              <button className="hidden sm:block p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                <HelpCircle size={18} />
              </button>
              <UserMenu />
            </div>
          </div>
        </header>
        <div className="flex flex-1 text-white overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed lg:static inset-y-0 left-0 w-64 bg-black/50 backdrop-blur-md border-r border-white/5 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-end p-4 lg:hidden">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1">
              <div className="space-y-1 flex flex-col justify-between min-h-full">
                <SidebarSection title="Main">
                  {mainMenuItems.map((item) => (
                    <SidebarItem
                      key={item.id}
                      icon={item.icon}
                      text={item.text}
                      active={activeTab === item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                    />
                  ))}
                </SidebarSection>

                <SidebarSection title="Account">
                  {accountMenuItems.map((item) => (
                    <SidebarItem
                      key={item.id}
                      icon={item.icon}
                      text={item.text}
                      active={activeTab === item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                    />
                  ))}
                </SidebarSection>
              </div>
            </div>

            {/* Theme Switcher */}
            <ThemeToggle />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <div className="max-w-[1270px] mx-auto">
                <p>Welcome to your {activeTab} page!</p>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ParticlesComponent />
    </>
  );
}

export default Page;
