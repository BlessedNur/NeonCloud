"use client";
import {
  Zap,
  Shield,
  Server,
  Clock,
  HeartHandshake,
  Cpu,
  Globe,
  BarChart,
  Headphones,
} from "lucide-react";

const features = [
  {
    title: "Lightning-Fast Performance",
    description:
      "Experience blazing-fast load times with our optimized infrastructure. Our advanced caching and CDN ensure your website performs at peak efficiency globally.",
    icon: Zap,
    stats: "400% Faster",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Enterprise Security",
    description:
      "Military-grade encryption and multi-layer security protocols protect your data. Regular security audits and DDoS protection keep your business safe 24/7.",
    icon: Shield,
    stats: "99.99% Protected",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Guaranteed Uptime",
    description:
      "Our redundant infrastructure and automated failover systems ensure your website stays online. Backed by our industry-leading uptime guarantee.",
    icon: Server,
    stats: "99.95% Uptime",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "24/7 Expert Support",
    description:
      "Our dedicated team of experts is available round the clock to assist you. Get professional help within minutes, not hours.",
    icon: Headphones,
    stats: "3min Response",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Global Infrastructure",
    description:
      "Strategically located data centers across the globe ensure low latency and superior performance for your visitors worldwide.",
    icon: Globe,
    stats: "12 Locations",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Smart Scaling",
    description:
      "Automatically scale resources based on your needs. Pay only for what you use with our flexible resource allocation system.",
    icon: BarChart,
    stats: "Auto-Scaling",
    gradient: "from-pink-500 to-rose-500",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="whychooseus py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose NeonCloud?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of performance, security, and
            reliability. Our cutting-edge infrastructure and dedicated support
            ensure your business thrives in the digital landscape.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50"
            >
              <div className="p-8">
                {/* Icon & Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <div className="mt-6 flex items-center">
                  <div className="h-0.5 w-12 rounded bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>

              {/* Hover Border Gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "100K+" },
            { label: "Server Uptime", value: "99.95%" },
            { label: "Data Centers", value: "12" },
            { label: "Support Response", value: "< 3 min" },
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
