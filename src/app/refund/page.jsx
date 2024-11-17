"use client";
import React, { useEffect, useState } from "react";
import {
  RefreshCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  HelpCircle,
  Mail,
  FileText,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";

const PolicySection = ({ icon: Icon, title, children, id }) => (
  <div className="mb-12" id={id}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,0.2)] to-purple-500/20 flex items-center justify-center">
        <Icon className="text-[rgba(207,8,140,1)]" size={20} />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-400 leading-relaxed">{children}</div>
  </div>
);

const EligibilityCard = ({ title, description, eligible }) => (
  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {eligible ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <XCircle className="text-red-500" size={20} />
      )}
    </div>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const Timeline = ({ steps }) => (
  <div className="space-y-6">
    {steps.map((step, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[rgba(207,8,140,0.2)] flex items-center justify-center">
            <span className="text-[rgba(207,8,140,1)] font-semibold">
              {index + 1}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-0.5 h-12 bg-[rgba(207,8,140,0.2)]" />
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-2">{step.title}</h4>
          <p className="text-gray-400 text-sm">{step.description}</p>
        </div>
      </div>
    ))}
  </div>
);

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    // Get navbar height
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sidebarStyle = {
    position: "sticky",
    top: `${navHeight + 32}px`, // 32px for padding
    maxHeight: `calc(100vh - ${navHeight + 64}px)`, // 64px for padding
    overflowY: "auto",
  };

  const refundSteps = [
    {
      title: "Submit Request",
      description:
        "Contact our support team through the customer portal or email with your refund request.",
    },
    {
      title: "Review Process",
      description:
        "Our team will review your request within 24-48 hours and verify eligibility.",
    },
    {
      title: "Decision & Processing",
      description:
        "If approved, refunds are processed within 5-10 business days to the original payment method.",
    },
    {
      title: "Confirmation",
      description:
        "You'll receive an email confirmation once the refund has been processed.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Refund Policy
            </h1>
            <p className="text-gray-400">Last updated: November 16, 2024</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1270px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div>
            <PolicySection icon={RefreshCcw} id="overview" title="Overview">
              <p>
                At NeonCloud, we strive to ensure complete customer satisfaction
                with our services. This refund policy outlines the conditions
                and procedures for requesting and receiving refunds for our
                various services and products.
              </p>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <p className="text-sm">
                  Note: Different services may have specific refund terms.
                  Please refer to the relevant service agreement for detailed
                  information.
                </p>
              </div>
            </PolicySection>

            <PolicySection
              icon={Clock}
              id="timeframes"
              title="Refund Timeframes"
            >
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium mb-2">Standard Services</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request window: Within 30 days of purchase</li>
                    <li>Processing time: 5-10 business days</li>
                    <li>Credit card refunds: 2-3 billing cycles</li>
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium mb-2">Premium Services</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request window: Within 14 days of purchase</li>
                    <li>Processing time: 3-5 business days</li>
                    <li>Priority processing available</li>
                  </ul>
                </div>
              </div>
            </PolicySection>

            <PolicySection
              icon={CheckCircle}
              id="eligibility"
              title="Eligibility"
            >
              <p className="mb-6">
                Refund eligibility varies based on the service type and
                circumstances. Review the conditions below:
              </p>
              <div className="grid gap-4">
                <EligibilityCard
                  title="Unused Services"
                  description="Full refund available for unused services within the refund window"
                  eligible={true}
                />
                <EligibilityCard
                  title="Service Issues"
                  description="Eligible for refund if service doesn't meet specified requirements"
                  eligible={true}
                />
                <EligibilityCard
                  title="Partially Used Services"
                  description="Prorated refund may be available based on usage"
                  eligible={true}
                />
                <EligibilityCard
                  title="Customized Solutions"
                  description="Non-refundable once development or implementation begins"
                  eligible={false}
                />
              </div>
            </PolicySection>

            <PolicySection
              icon={AlertCircle}
              id="non-refundable"
              title="Non-Refundable Items"
            >
              <ul className="list-disc pl-6 space-y-2">
                <li>Domain name registrations and renewals</li>
                <li>SSL certificates after issuance</li>
                <li>Customized development work</li>
                <li>Setup fees and installation charges</li>
                <li>Used or activated license keys</li>
              </ul>
            </PolicySection>

            <PolicySection
              icon={CreditCard}
              id="process"
              title="Refund Process"
            >
              <p className="mb-6">
                To ensure a smooth refund process, we&apos;ve established a clear
                procedure:
              </p>
              <Timeline steps={refundSteps} />
            </PolicySection>

            <PolicySection
              icon={DollarSign}
              id="methods"
              title="Refund Methods"
            >
              <div className="space-y-4">
                <p>
                  Refunds are typically processed to the original payment method
                  used for the purchase:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Credit/Debit Cards: Full amount returned to the original
                    card
                  </li>
                  <li>PayPal: Processed through PayPal system</li>
                  <li>
                    Bank Transfer: May require additional banking information
                  </li>
                  <li>Store Credit: Available as an alternative option</li>
                </ul>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm">
                    Note: Processing times may vary depending on your payment
                    provider and location.
                  </p>
                </div>
              </div>
            </PolicySection>

            <PolicySection
              icon={ShieldAlert}
              id="special-circumstances"
              title="Special Circumstances"
            >
              <div className="space-y-4">
                <h4 className="font-medium">
                  We may consider refunds outside standard terms for:
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service outages exceeding SLA guarantees</li>
                  <li>Technical issues preventing service use</li>
                  <li>Billing errors or duplicate charges</li>
                  <li>Account termination by NeonCloud</li>
                </ul>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm">
                    Each case is reviewed individually. Contact support for
                    specific situations.
                  </p>
                </div>
              </div>
            </PolicySection>

            <PolicySection icon={Mail} id="contact" title="Contact Information">
              <p>
                For refund requests or questions about our refund policy, please
                contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-[rgba(207,8,140,1)]" size={20} />
                    <span>billing@neoncloud.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HelpCircle
                      className="text-[rgba(207,8,140,1)]"
                      size={20}
                    />
                    <span>Support Portal: support.neoncloud.com</span>
                  </div>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Sidebar */}
          <div style={sidebarStyle} className="space-y-6 hidden lg:block">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <a
                  href="#overview"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#timeframes"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Refund Timeframes
                </a>
                <a
                  href="#eligibility"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Eligibility
                </a>
                <a
                  href="#process"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Refund Process
                </a>
                <a
                  href="#methods"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Refund Methods
                </a>
                <a
                  href="#contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </nav>
            </div>

            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Our support team is available 24/7 to assist you with any
                questions about refunds.
              </p>
              <button className="w-full py-2 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors">
                Contact Support
              </button>
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
