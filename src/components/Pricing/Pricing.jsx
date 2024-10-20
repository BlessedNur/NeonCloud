import { useState } from "react";
import Image from "next/image"; // Ensure you import the Image component

const plans = [
  {
    title: "Basic",
    monthlyPrice: "$10/month",
    yearlyPrice: "$100/year",
    description:
      "It offers a reliable and cost-effective hosting solution with all the essentials you need to get started.",
    features: [
      { name: "10 GB storage", icon: "/images/akar-icons_circle-check.png" },
      {
        name: "Unlimited Bandwidth",
        icon: "/images/akar-icons_circle-check.png",
      },
      { name: "99.95% Uptime", icon: "/images/akar-icons_circle-check.png" },
      { name: "24/7 Support", icon: "/images/akar-icons_circle-check.png" },
      { name: "Daily Backups", icon: "/images/Frame.png" },
      { name: "SSL Certificate", icon: "/images/Frame.png" },
      { name: "Database Support", icon: "/images/Frame.png" },
      { name: "Dedicated IP Address", icon: "/images/Frame.png" },
    ],
    isHighlighted: false,
  },
  {
    title: "Professional",
    monthlyPrice: "$69/month",
    yearlyPrice: "$159/year",
    description:
      "It includes a range of advanced features and resources to support and grow your online presence.",
    features: [
      { name: "20 GB storage", icon: "/images/akar-icons_circle-check.png" },
      {
        name: "Unlimited Bandwidth",
        icon: "/images/akar-icons_circle-check.png",
      },
      { name: "99.95% Uptime", icon: "/images/akar-icons_circle-check.png" },
      { name: "24/7 Support", icon: "/images/akar-icons_circle-check.png" },
      { name: "Daily Backups", icon: "/images/akar-icons_circle-check.png" },
      { name: "SSL Certificate", icon: "/images/akar-icons_circle-check.png" },
      { name: "Database Support", icon: "/images/akar-icons_circle-check.png" },
      { name: "Dedicated IP Address", icon: "/images/Frame.png" },
    ],
    isHighlighted: true,
  },
  {
    title: "Business",
    monthlyPrice: "$100/month",
    yearlyPrice: "$199/year",
    description:
      "It offers a reliable and cost-effective hosting solution with all the essentials you need to get started.",
    features: [
      { name: "50 GB storage", icon: "/images/akar-icons_circle-check.png" },
      {
        name: "Unlimited Bandwidth",
        icon: "/images/akar-icons_circle-check.png",
      },
      { name: "99.95% Uptime", icon: "/images/akar-icons_circle-check.png" },
      { name: "24/7 Support", icon: "/images/akar-icons_circle-check.png" },
      { name: "Daily Backups", icon: "/images/akar-icons_circle-check.png" },
      { name: "SSL Certificate", icon: "/images/akar-icons_circle-check.png" },
      { name: "Database Support", icon: "/images/akar-icons_circle-check.png" },
      {
        name: "Dedicated IP Address",
        icon: "/images/akar-icons_circle-check.png",
      },
    ],
    isHighlighted: false,
  },
];

const PlanCard = ({
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  isHighlighted,
  isMonthly,
}) => (
  <div
    className={`w-full h-full flex flex-col gap-9 ${
      isHighlighted ? "bg-custom-gradient" : "border-[0.5px] border-zinc-500"
    } p-8 rounded-xl shadow-md`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <h1 className="text-3xl font-bold text-white">
      {isMonthly ? monthlyPrice : yearlyPrice}
    </h1>
    <p>{description}</p>
    <ul className="flex flex-col gap-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <div>
            <Image
              src={feature.icon}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
          <p>{feature.name}</p>
        </li>
      ))}
      <button className="bg-custom-gradient p-4 w-fit m-auto px-14 rounded-lg ">
        Choose Plan
      </button>
    </ul>
  </div>
);

const PricingSection = ({ isMonthly }) => (
  <div className="grid gap-8 grid-cols-1 text-gray-300 sm:grid-cols-2 md:grid-cols-3">
    {plans.map((plan, index) => (
      <PlanCard key={index} {...plan} isMonthly={isMonthly} />
    ))}
  </div>
);

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true); // State to toggle between monthly and yearly

  return (
    <div className="pricing">
      <div className="max-w-[1270px] m-auto px-4 py-10 flex flex-col gap-8">
        <div className="flex flex-col text-center gap-4">
          <h2 className="text-[30px] font-semibold">Our Pricing Plans</h2>
          <p className="text-gray-400">
            Choose the plan that suits your needs and budget.
          </p>
        </div>

        {/* Toggle between Monthly and Yearly */}
        <div className="bg-white w-fit m-auto flex text-black text-center p-1 items-center rounded-lg capitalize relative">
          {/* Toggle Active Class based on state */}
          <div
            className={`absolute bg-[rgb(207,8,140)] w-[48%] h-[90%] rounded-lg transition-all duration-300 ${
              isMonthly ? "left-[2%]" : "left-[50%]"
            }`}
          ></div>
          <p
            className={`p-3 px-10 cursor-pointer z-10 ${
              isMonthly ? "text-white" : "text-black"
            }`}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </p>
          <p
            className={`p-3 px-10 cursor-pointer z-10 ${
              !isMonthly ? "text-white" : "text-black"
            }`}
            onClick={() => setIsMonthly(false)}
          >
            Yearly
          </p>
        </div>

        {/* Pricing Plans Section */}
        <PricingSection isMonthly={isMonthly} />
      </div>
    </div>
  );
};

export default Pricing;
