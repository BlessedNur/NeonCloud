import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, MapPin, Phone } from "lucide-react";

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

function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />

      <div className="max-w-[1270px] m-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="logo text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeonCloud
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering businesses with cutting-edge cloud solutions. Our
                innovative services drive digital transformation and enhance
                operational efficiency.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@neoncloud.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span>contact@neoncloud.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
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
              Company
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Domains</FooterLink>
              <FooterLink href="#">Client Area</FooterLink>
              <FooterLink href="#">Data Center</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h2 className="font-semibold text-lg relative">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href="#">Web Development</FooterLink>
              <FooterLink href="#">Mobile App Development</FooterLink>
              <FooterLink href="#">Digital Marketing</FooterLink>
              <FooterLink href="#">SEO & SEM</FooterLink>
              <FooterLink href="#">Content Marketing</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h2 className="font-semibold text-lg relative">
              Resources
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Case Studies</FooterLink>
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2024 NeonCloud. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;