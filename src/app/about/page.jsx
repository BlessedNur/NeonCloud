"use client";
import React, { useState } from "react";
import {
  Users,
  Target,
  Award,
  Shield,
  Globe,
  Cloud,
  Server,
  Zap,
  CheckCircle,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";

const StatCard = ({ number, label }) => (
  <div className="flex flex-col items-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[rgba(207,8,140,0.5)] transition-colors group">
    <span className="text-4xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 bg-clip-text text-transparent mb-2">
      {number}
    </span>
    <span className="text-gray-400 group-hover:text-white transition-colors">
      {label}
    </span>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[rgba(207,8,140,0.5)] transition-all duration-300 hover:transform hover:-translate-y-1">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,0.2)] to-purple-500/20 flex items-center justify-center mb-4">
      <Icon className="text-[rgba(207,8,140,1)]" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="group relative overflow-hidden rounded-xl">
    <div className="aspect-w-3 aspect-h-4">
      <img
        src={image}
        alt={name}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-[rgba(207,8,140,1)]">{role}</p>
    </div>
  </div>
);

function Page() {
  const [currentUser, setCurrentUser] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none" />

        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Powering the Future of Cloud Computing
            </h1>
            <p className="text-xl text-gray-400">
              At NeonCloud, we&apos;re revolutionizing how businesses harness the
              power of cloud technology. Our mission is to make enterprise-grade
              cloud solutions accessible to everyone.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <StatCard number="10K+" label="Active Users" />
            <StatCard number="99.9%" label="Uptime" />
            <StatCard number="24/7" label="Support" />
            <StatCard number="15+" label="Data Centers" />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <section className="py-20 relative">
        <div className="max-w-[1270px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard
              icon={Shield}
              title="Security First"
              description="We prioritize your data security with enterprise-grade protection and compliance measures."
            />
            <ValueCard
              icon={Zap}
              title="Lightning Fast"
              description="Experience unprecedented speed with our optimized cloud infrastructure."
            />
            <ValueCard
              icon={Globe}
              title="Global Reach"
              description="Connect to your audience anywhere with our worldwide data center network."
            />
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 relative bg-black/40">
        <div className="max-w-[1270px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Founded in 2020, NeonCloud emerged from a vision to
                  democratize cloud computing. What started as a small team of
                  passionate developers has grown into a global provider of
                  cutting-edge cloud solutions.
                </p>
                <p>
                  Today, we serve thousands of businesses worldwide, from
                  startups to enterprises, helping them scale their operations
                  efficiently and securely in the cloud.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[rgba(207,8,140,1)]" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[rgba(207,8,140,1)]" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[rgba(207,8,140,1)]" />
                  <span>SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Data Center"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 relative">
        <div className="max-w-[1270px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember
              name="Sarah Johnson"
              role="CEO & Founder"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            />
            <TeamMember
              name="Michael Chang"
              role="CTO"
              image="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            />
            <TeamMember
              name="David Wilson"
              role="Head of Operations"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            />
            <TeamMember
              name="Emily Chen"
              role="Head of Security"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
      <Footer />
      <ParticlesComponent />
    </div>
  );
}

export default Page;
