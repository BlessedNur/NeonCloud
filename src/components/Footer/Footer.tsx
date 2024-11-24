"use client"
import React from "react";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Server,
  Shield,
  Cloud,
  Database,
  Info,
  Wrench,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
    >
      <span className="relative overflow-hidden">
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          {children}
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </span>
    </a>
  </li>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
  >
    <Icon size={18} />
  </a>
);
const Logo = ({ onclick }) => (
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
function Footer() {
  const [currentUser, setCurrentUser] = useState(false);
  const router = useRouter();
  return (
    <footer className="relative z-10 overflow-hidden pt-20 pb-10 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />

      <div className="max-w-[1270px] m-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="space-y-4">
              <Logo onclick={() => router.push("/")} />
              <p className="text-gray-400 leading-relaxed">
                Empowering businesses with cutting-edge cloud solutions. Our
                innovative services drive digital transformation and enhance
                operational efficiency.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:neoncloud@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>neoncloud@gmail.com</span>
              </a>
              <a
                href="tel:+12345678901"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+1 2345 67890</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>123 Cloud Street, Tech City, TC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Globe} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h2 className="font-semibold text-lg relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About us</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h2 className="font-semibold text-lg relative">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href={currentUser ? "/dashboard" : "/signin"}>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Web Hosting
                </div>
              </FooterLink>
              <FooterLink href={currentUser ? "/dashboard" : "/signin"}>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Cloud Servers
                </div>
              </FooterLink>
              <FooterLink href={currentUser ? "/dashboard" : "/signin"}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  SSL Certificates
                </div>
              </FooterLink>
              <FooterLink href="/domain">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Domain Search
                </div>
              </FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h2 className="font-semibold text-lg relative">
              Resources
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/docs">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Documentation
                </div>
              </FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2024 NeonCloud. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/refund"
                className="hover:text-white transition-colors duration-300"
              >
                Refund Policy
              </a>
              <a
                href="/terms"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
