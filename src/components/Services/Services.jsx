"use client"
import React from "react";
import {
  Shield,
  Zap,
  HeadphonesIcon,
  Rocket,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Rocket className="w-12 h-12 text-purple-500" />,
    title: "Speed",
    description: "Lightning-fast performance for your applications",
  },
  {
    icon: <Shield className="w-12 h-12 text-purple-500" />,
    title: "Security",
    description: "State-of-the-art protection for your data",
  },
  {
    icon: <HeadphonesIcon className="w-12 h-12 text-purple-500" />,
    title: "Support",
    description: "24/7 expert assistance at your fingertips",
  },
  {
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    title: "Fast",
    description: "Rapid deployment and quick iterations",
  },
  {
    icon: <RefreshCw className="w-12 h-12 text-purple-500" />,
    title: "Sync",
    description: "Seamless synchronization across all devices",
  },
];

function ServicesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0  opacity-80 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            What will you get if you join us?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We offer a wide range of cutting-edge services to help you manage
            your business more efficiently and effectively. Experience the
            future of technology with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-black/30 backdrop-blur-lg rounded-lg p-6 transition-all duration-300 hover:bg-black/50 hover:shadow-lg hover:shadow-purple-500/20 border border-gray-700"
            >
              <div className="bg-gray-900 rounded-full p-4 mb-4 transition-transform duration-300 hover:scale-110 shadow-lg shadow-purple-500/20">
                {service.icon}
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-center mb-4">
                {service.description}
              </p>
              <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 group">
                Learn More{" "}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
          >
            Get Started Now
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center opacity-20 z-0"></div>
    </section>
  );
}

export default ServicesSection;