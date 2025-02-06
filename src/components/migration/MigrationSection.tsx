"use client";
import Image from "next/image";
import {
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const StatItem = ({ value, label, icon: Icon }) => (
  <div className="flex-1 group bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-sm px-4 py-4 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
    <div className="flex items-center mb-2">
      <Icon className="w-5 h-5 text-purple-400 mr-2" />
      <div className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {label}
      </div>
    </div>
    <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
      {value}
    </div>
  </div>
);

const MigrationSection = () => {
  const benefits = [
    "Zero Downtime Migration",
    "Complete Data Transfer",
    "DNS Configuration",
    "Post-Migration Support",
    "SSL Certificate Setup",
    "Database Optimization",
  ];
  const router = useRouter();

  return (
    <div className="py-24 relative z-10">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <span className="text-purple-400 text-sm font-medium">
              Free Migration Service
            </span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </div>

          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Migration is not an issue with us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We handle the entire migration process, ensuring a seamless
            transition for your business with zero downtime and complete data
            integrity.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between gap-16 max-lg:flex-col">
          {/* Left Content */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Hassle-Free Migration
                <span className="text-purple-400">.</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our technical experts handle every aspect of your migration,
                from initial assessment to final deployment. We ensure your
                website transitions smoothly to our platform without any service
                interruption or data loss.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="group relative px-8 py-3 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-105" />
                <div
                  onClick={() => router.push("/contact")}
                  className="relative flex items-center gap-2"
                >
                  <span className="font-semibold text-white">
                    Contact Sales
                  </span>
                  <ArrowRight className="w-4 h-4 text-white transform transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              <button
                onClick={() => router.push("/about")}
                className="px-8 py-3 rounded-lg border border-gray-700 text-white font-semibold hover:bg-gray-800/50 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative group">
            {/* Gradient overlay */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image container */}
            <div className="relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4">
              <Image
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg transform transition-transform duration-500 group-hover:scale-[1.02]"
                src="/images/Migration 4 1.png"
                alt="Seamless Website Migration Process"
              />
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-12 left-6 right-6 flex justify-between gap-4">
              <StatItem value="100%" label="Success Rate" icon={ShieldCheck} />
              <StatItem value="24/7" label="Support" icon={Clock} />
              <StatItem value="0" label="Downtime" icon={Zap} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationSection;
