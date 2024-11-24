"use client";

import React, { useState } from "react";
import {
  Search,
  Shield,
  Clock,
  Globe,
  Mail,
  Lock,
  Headphones,
  Check,
  X,
  ArrowRight,
  Zap,
  Server,
  Cloud,
  Database,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};
const Container = ({ className, children }: ContainerProps) => (
  <div className={`mx-auto max-w-[1270px] px-4 sm:px-6 ${className || ""}`}>
    {children}
  </div>
);

const DomainSearchResult = ({ domain, available, price }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-[rgba(207,8,140,1)]/30 transition-all duration-300 hover:transform hover:scale-[1.02] gap-4">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          available ? "bg-green-500/20" : "bg-red-500/20"
        }`}
      >
        {available ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <X className="w-5 h-5 text-red-400" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white break-all">{domain}</h3>
        <p
          className={`text-sm font-bold text-start ${
            available ? "text-green-400" : "text-red-400"
          }`}
        >
          {available ? "Available" : "Not Available"}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
      {available && (
        <>
          <p className="text-lg font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-400 bg-clip-text text-transparent">
            {price}
          </p>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 w-full sm:w-auto justify-center">
            <span>Select</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  </div>
);

const StatsCard = ({ value, label }) => (
  <div className="flex flex-col items-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
    <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-400 bg-clip-text text-transparent">
      {value}
    </h4>
    <p className="text-gray-400 mt-2 text-sm sm:text-base">{label}</p>
  </div>
);

const TrustBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10">
    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[rgba(207,8,140,1)]" />
    <span className="text-xs sm:text-sm text-gray-300">{text}</span>
  </div>
);

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setSearchResults([
        {
          domain: `${searchQuery}.neoncloud.io`,
          available: true,
          price: "Free",
        },
        {
          domain: `${searchQuery}-app.neoncloud.io`,
          available: true,
          price: "Free",
        },
        {
          domain: `${searchQuery}-api.neoncloud.io`,
          available: true,
          price: "Free",
        },
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Advanced DDoS protection, WAF, and SSL certificates included with every subdomain",
    },
    {
      icon: Zap,
      title: "Lightning Fast DNS",
      description:
        "Global DNS infrastructure with ultra-low latency and 100% uptime SLA",
    },
    {
      icon: Server,
      title: "Advanced DNS Controls",
      description:
        "Full DNS management with support for all record types and instant propagation",
    },
    {
      icon: Cloud,
      title: "Global CDN",
      description:
        "Built-in CDN with edge locations worldwide for blazing-fast content delivery",
    },
    {
      icon: Database,
      title: "Automated Backups",
      description:
        "Daily automated backups of all DNS records and configurations",
    },
    {
      icon: Lock,
      title: "DNSSEC Support",
      description:
        "Enhanced security with built-in DNSSEC support and monitoring",
    },
  ];

  const popularSubdomains = ["app", "api", "dev", "staging", "test", "admin"];

  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_70%)]" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[rgba(207,8,140,0.1)] to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>

        <Navbar />

        <main className="relative pt-12 sm:pt-24 pb-16">
          <Container>
            <div className="text-center mb-16">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                <TrustBadge icon={Shield} text="Enterprise Security" />
                <TrustBadge icon={Clock} text="Instant Setup" />
                <TrustBadge icon={Globe} text="Global CDN" />
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 px-4">
                Launch Your Project on NeonCloud
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 px-4">
                Get a premium subdomain with enterprise features, blazing-fast
                DNS, and world-class security.
              </p>

              <div className="max-w-3xl relative z-10 mx-auto px-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 group">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter your preferred subdomain name"
                        className="w-full h-14 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-12 text-white placeholder:text-gray-400 focus:border-[rgba(207,8,140,1)] focus:outline-none transition-all duration-300 group-hover:border-white/20"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hidden sm:block">
                        .neoncloud.io
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="h-14 px-8 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:transform hover:scale-105"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                  <span className="text-gray-400">Popular:</span>
                  {popularSubdomains.map((subdomain, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(subdomain)}
                      className="text-gray-300 hover:text-[rgba(207,8,140,1)] transition-colors"
                    >
                      {subdomain}
                    </button>
                  ))}
                </div>
              </div>

              {isSearching && (
                <div className="mt-8 flex justify-center">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {searchResults && (
                <div className="mt-8 space-y-4 px-4">
                  {searchResults.map((result, index) => (
                    <DomainSearchResult key={index} {...result} />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 px-4">
              <StatsCard value="99.99%" label="Uptime Guarantee" />
              <StatsCard value="<10ms" label="Global DNS Response" />
              <StatsCard value="24/7" label="Expert Support" />
            </div>

            <div className="relative relative z-10 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12">
                Enterprise Features Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-purple-500/20 border border-white/10 hover:transform hover:scale-[1.02]"
                  >
                    <div className="bg-gradient-to-br from-[rgba(207,8,140,0.2)] to-purple-500/20 rounded-full p-4 mb-4">
                      <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-[rgba(207,8,140,1)]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-center text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {!currentUser && (
              <div className="mt-24 text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers and businesses who trust
                  NeonCloud for their hosting needs.
                </p>
                <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
                  Create Your Free Account
                </button>
              </div>
            )}
          </Container>
        </main>

        <Footer />
      </div>
      <ParticlesComponent />
    </>
  );
};

export default Page;
