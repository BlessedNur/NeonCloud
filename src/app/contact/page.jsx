"use client";
import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Server,
  CreditCard,
  Settings,
  Globe,
  ChevronRight,
  Search,
  Clock,
  CheckCircle,
} from "lucide-react";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
const ContactCard = ({ icon: Icon, title, description, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`p-6 cursor-pointer transition-all duration-300 rounded-xl border ${
      isActive
        ? "bg-gradient-to-r from-[rgba(207,8,140,0.1)] to-purple-500/10 border-[rgba(207,8,140,1)]"
        : "bg-black/20 border-white/10 hover:border-[rgba(207,8,140,0.5)]"
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,0.2)] to-purple-500/20 flex items-center justify-center">
        <Icon className="text-[rgba(207,8,140,1)]" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

const QuickHelpCard = ({ title, description, link }) => (
  <a
    href={link}
    className="block p-6 bg-black/20 rounded-xl border border-white/10 hover:border-[rgba(207,8,140,0.5)] transition-all duration-300"
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <div className="flex items-center text-[rgba(207,8,140,1)] text-sm">
      Learn more <ChevronRight size={16} className="ml-1" />
    </div>
  </a>
);

const StatusIndicator = ({ status }) => {
  const colors = {
    operational: "bg-green-500",
    issues: "bg-yellow-500",
    down: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

function Page() {
  const [selectedCategory, setSelectedCategory] = useState("general");

  const contactCategories = [
    {
      id: "general",
      icon: HelpCircle,
      title: "General Inquiry",
      description: "Get help with general questions about our services",
    },
    {
      id: "technical",
      icon: Settings,
      title: "Technical Support",
      description:
        "Technical issues, server configuration, and hosting problems",
    },
    {
      id: "billing",
      icon: CreditCard,
      title: "Billing Support",
      description: "Questions about payments, invoices, and subscriptions",
    },
    {
      id: "sales",
      icon: Server,
      title: "Sales Inquiry",
      description: "Learn more about our products and enterprise solutions",
    },
  ];

  const quickHelp = [
    {
      title: "Getting Started Guide",
      description:
        "New to NeonCloud? Learn the basics and set up your first project",
      link: "/guides/getting-started",
    },
    {
      title: "FAQ Library",
      description: "Browse through commonly asked questions and answers",
      link: "/faq",
    },
    {
      title: "API Documentation",
      description: "Detailed documentation for developers and integration",
      link: "/docs/api",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              How Can We Help You?
            </h1>
            <p className="text-gray-400 mb-8">
              Choose a category below to find the help you need. Our support
              team is available 24/7.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search our help center..."
                className="w-full py-4 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 focus:border-[rgba(207,8,140,0.5)] outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1270px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactCategories.map((category) => (
            <ContactCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              description={category.description}
              isActive={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        <div className="bg-black/20 rounded-xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Contact Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 rounded-lg">
              <MessageCircle
                className="text-[rgba(207,8,140,1)] mb-4"
                size={24}
              />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get instant help from our support team
              </p>
              <div className="flex items-center text-green-500 text-sm">
                <Clock size={16} className="mr-2" />
                Average response time: 2 mins
              </div>
            </div>
            <div className="p-6 bg-white/5 rounded-lg">
              <Phone className="text-[rgba(207,8,140,1)] mb-4" size={24} />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-400 text-sm mb-4">
                Talk to our support specialists
              </p>
              <div className="flex items-center text-green-500 text-sm">
                <CheckCircle size={16} className="mr-2" />
                24/7 availability
              </div>
            </div>
            <div className="p-6 bg-white/5 rounded-lg">
              <Mail className="text-[rgba(207,8,140,1)] mb-4" size={24} />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-400 text-sm mb-4">
                Send us a detailed message
              </p>
              <div className="flex items-center text-green-500 text-sm">
                <Clock size={16} className="mr-2" />
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickHelp.map((item, index) => (
              <QuickHelpCard
                key={index}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))}
          </div>
        </div>

        <div className="bg-black/20 rounded-xl border border-white/10 p-8">
          <h2 className="text-2xl font-semibold mb-6">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">United States</h3>
              <p className="text-gray-400 text-sm">
                100 Tech Plaza
                <br />
                San Francisco, CA 94105
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Europe</h3>
              <p className="text-gray-400 text-sm">
                25 Innovation Street
                <br />
                London, UK EC2A 4PQ
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Asia Pacific</h3>
              <p className="text-gray-400 text-sm">
                888 Digital Tower
                <br />
                Singapore 018989
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ParticlesComponent />
    </div>
  );
}

export default Page;
