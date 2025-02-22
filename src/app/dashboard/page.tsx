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
  User,
  Sun,
  Monitor,
  Cloud,
  Zap,
  Database,
} from "lucide-react";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import DashboardContent from "../../components/dashboardContent/DashboardContent";
import DomainsContent from "../../components/domainSection/DomainsSection";
import WebHostingContent from "../../components/webhostingsection/WebHostingContent";
import ProfileContent from "../../components/profile/ProfileContent";
import { useRouter } from "next/navigation";
import { useCloudContext } from "../../context/Context";
import { useApi } from "../../services/api.profile";
import ProtectedRoute from "../../components/auth/ProtectedRoutes";
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
  <div className="py-2 ">
    <h3 className="text-[11px] font-semibold text-gray-500 uppercase px-4 mb-1">
      {title}
    </h3>
    {children}
  </div>
);

const Logo = ({ onclick }) => (
  <div className="flex items-center cursor-pointer" onClick={onclick}>
    <div className="relative flex items-center">
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
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
        <div className="absolute inset-0 bg-[rgba(207,8,140,0.2)] rounded-lg blur-md"></div>
      </div>

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
const UserMenu = ({
  currentUser,
  choosenPlan,
  logout,
  setActiveTab,
}: {
  currentUser: any;
  setActiveTab: (tab: string) => void;
  choosenPlan?: any;
  logout: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { profileApi } = useApi();

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getProfile();
        if (response.error === false && response.profile) {
          setUserProfile(response.profile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Helper function to get avatar URL
  const getAvatarUrl = () => {
    if (userProfile?.avatar) {
      return userProfile.avatar;
    }
    return "https://i.pravatar.cc/100"; // Fallback avatar
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 p-[2px] cursor-pointer">
        <div className="w-full h-full rounded-full overflow-hidden bg-black/40 backdrop-blur-sm">
          {userProfile?.avatar ? (
            <img
              src={getAvatarUrl()}
              alt={userProfile?.name || "User"}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          ) : (
            <User className="w-full h-full p-2 text-gray-400" />
          )}
        </div>
      </div>
      {isHovered && (
        <div className="absolute top-8 right-0 mt-2 w-72 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-1 z-40 border border-white/10">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/40 backdrop-blur-sm">
                  {userProfile?.avatar ? (
                    <img
                      src={getAvatarUrl()}
                      alt={userProfile?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-3 text-gray-400" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {userProfile?.name || currentUser?.email.split("@")[0]}
                </p>
                <p className="text-xs text-gray-400">{currentUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Plan</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-600 text-white">
                  {currentUser?.plan} Plan
                </span>
              </div>
              {userProfile?.location && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Globe size={12} />
                  <span>{userProfile.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 mt-2 pt-1">
            <UserMenuItem
              icon={<User size={14} />}
              text="View Profile"
              onClick={() => {
                setActiveTab("profile");
              }}
              className="text-gray-400 hover:text-white"
            />
            <UserMenuItem
              icon={<LogOut size={14} />}
              text="Sign Out"
              onClick={logout}
              className="text-red-400 hover:text-red-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const UserMenuItem = ({ icon, text, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2 ${className}`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const SignOut = ({ logout }) => {
  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return (
    <button
      onClick={logout}
      className="w-full p-4 border-t border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
    >
      <LogOut
        size={16}
        className="group-hover:text-[rgba(207,8,140,1)] transition-colors"
      />
      <span className="text-sm group-hover:text-[rgba(207,8,140,1)]">
        Sign Out
      </span>
    </button>
  );
};

function Page() {
  const { currentUser, logout, choosenPlan } = useCloudContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  console.log(currentUser);

  const mainMenuItems = [
    { icon: <Home size={16} />, text: "Home", id: "dashboard" },
    { icon: <Globe size={16} />, text: "Domains", id: "domain" },
    { icon: <Server size={16} />, text: "Web Hosting", id: "hosting" },
  ];

  const accountMenuItems = [
    { icon: <User size={16} />, text: "Profile", id: "profile" },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ProtectedRoute>
      <section className="h-screen flex flex-col overflow-hidden">
        <header className="bg-black/5 backdrop-blur-[2px] border-b border-white/10 p-4 flex-shrink-0 relative z-30 ">
          <div className="flex items-center justify-between mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
              <Logo onclick={() => router.push("/")} />
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <UserMenu
                setActiveTab={setActiveTab}
                logout={logout}
                currentUser={currentUser}
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 text-white overflow-hidden">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/5 z-50 lg:hidden"
              onClick={toggleSidebar}
            />
          )}

          <div
            className={`fixed lg:static inset-y-0 z-[60] left-0 w-64 bg-black/5 backdrop-blur-[2px] border-r border-white/5 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
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
            <SignOut logout={logout} />{" "}
          </div>

          <div className="flex-1 z-10 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <div className="max-w-[1270px] mx-auto">
                {activeTab === "dashboard" && <DashboardContent />}
                {activeTab === "domain" && <DomainsContent />}
                {activeTab === "hosting" && <WebHostingContent />}
                {activeTab === "profile" && <ProfileContent />}
              </div>
            </main>
          </div>
        </div>
      </section>
      <ParticlesComponent />
    </ProtectedRoute>
  );
}

export default Page;
