import { useState } from "react";
import { Check, X, Sparkles, Tag, Clock } from "lucide-react";

const plans = [
  {
    title: "Basic - Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    discount: "0%",
    period: {
      monthly: "/month",
      yearly: "/year",
    },
    description:
      "Perfect for startups and small projects. Get all the essentials you need to get started.",
    features: [
      { name: "10 GB storage", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "99.95% Uptime", included: true },
      { name: "24/7 Support", included: true },
      { name: "Daily Backups", included: false },
      { name: "SSL Certificate", included: false },
      { name: "Database Support", included: false },
      { name: "Dedicated IP Address", included: false },
    ],
    isHighlighted: false,
    tag: "Starter Pack",
  },
  {
    title: "Professional",
    monthlyPrice: "$69",
    yearlyPrice: "$159",
    discount: "25%",
    period: {
      monthly: "/month",
      yearly: "/year",
    },
    description:
      "Ideal for growing businesses. Advanced features to scale your online presence.",
    features: [
      { name: "20 GB storage", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "99.95% Uptime", included: true },
      { name: "24/7 Support", included: true },
      { name: "Daily Backups", included: true },
      { name: "SSL Certificate", included: true },
      { name: "Database Support", included: true },
      { name: "Dedicated IP Address", included: false },
    ],
    isHighlighted: true,
    tag: "Popular",
  },
  {
    title: "Business",
    monthlyPrice: "$100",
    yearlyPrice: "$199",
    discount: "40%",
    period: {
      monthly: "/month",
      yearly: "/year",
    },
    description:
      "Enterprise-grade solution with maximum resources and premium support.",
    features: [
      { name: "50 GB storage", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "99.95% Uptime", included: true },
      { name: "24/7 Support", included: true },
      { name: "Daily Backups", included: true },
      { name: "SSL Certificate", included: true },
      { name: "Database Support", included: true },
      { name: "Dedicated IP Address", included: true },
    ],
    isHighlighted: false,
    tag: "Enterprise",
  },
];

const PlanCard = ({
  title,
  monthlyPrice,
  yearlyPrice,
  period,
  description,
  features,
  isHighlighted,
  isMonthly,
  discount,
  tag,
}) => {
  const originalPrice = isMonthly ? monthlyPrice : yearlyPrice;
  const discountedPrice = isMonthly
    ? `$${(
        parseFloat(monthlyPrice.slice(1)) *
        (1 - parseFloat(discount) / 100)
      ).toFixed(2)}`
    : `$${(
        parseFloat(yearlyPrice.slice(1)) *
        (1 - parseFloat(discount) / 100)
      ).toFixed(2)}`;

  const savings = (
    parseFloat(originalPrice.slice(1)) - parseFloat(discountedPrice.slice(1))
  ).toFixed(2);

  return (
    <div
      className={`z-[10] relative w-full h-full flex flex-col  gap-8 ${
        isHighlighted
          ? "bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl scale-105"
          : "bg-gradient-to-br from-gray-900 to-gray-800"
      } p-8 pt-14 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] border border-gray-700`}
    >
      <div className="absolute -top-4 -right-2">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-2 rounded-l-full text-sm font-bold flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4" />
            {tag}
          </div>
          <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-t-purple-800 border-r-[8px] border-r-transparent" />
        </div>
      </div>

      {parseFloat(discount) > 0 && (
        <div className="absolute top-8 left-0 right-0">
          <div className="relative">
            <div className="bg-gradient-to-r  from-yellow-400 via-orange-500 to-red-500 p-2 transform rotate-2">
              <div className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>Limited Time Deal!</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">
                  Save ${savings}
                </span>
              </div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-white/30 animate-slide-right" />
                <div className="absolute top-0 right-0 w-1 h-full bg-white/30 animate-slide-left" />
              </div>
            </div>
            <div className="absolute -left-2 top-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-yellow-600" />
            <div className="absolute -right-2 top-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-red-600" />
          </div>
        </div>
      )}

      <div className="space-y-4 mt-8 z-[10]">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {discountedPrice}
            </span>
            <span className="text-gray-400 z-[10]">
              {isMonthly ? period.monthly : period.yearly}
            </span>
          </div>
          <div className="text-gray-400 line-through text-sm">
            {originalPrice}
            {isMonthly ? period.monthly : period.yearly}
          </div>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <ul className="flex flex-col gap-4 flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm border-b border-gray-700/50 pb-2"
          >
            {feature.included ? (
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-400" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-500/20 flex items-center justify-center">
                <X className="w-3 h-3 text-gray-500" />
              </div>
            )}
            <span
              className={feature.included ? "text-gray-200" : "text-gray-400"}
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
          isHighlighted
            ? "bg-white text-purple-600 hover:bg-gray-100 shadow-xl shadow-white/10"
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-xl shadow-purple-500/20"
        }`}
      >
        Get Started Now
      </button>
    </div>
  );
};

const PricingSection = ({ isMonthly }) => (
  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {plans.map((plan, index) => (
      <PlanCard key={index} {...plan} isMonthly={isMonthly} />
    ))}
  </div>
);

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="py-20 relative z-[100]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>

        <div className="flex justify-center mb-16 z-50">
          <div className="bg-gray-800/50 p-1 rounded-xl inline-flex shadow-xl">
            <button
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                isMonthly
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                !isMonthly
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setIsMonthly(false)}
            >
              Yearly
            </button>
          </div>
        </div>

        <PricingSection isMonthly={isMonthly} />
      </div>
    </div>
  );
};

export default Pricing;
