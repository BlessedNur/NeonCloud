"use client";
import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Server,
  Shield,
  Cloud,
  CreditCard,
  Settings,
  HelpCircle,
  Globe,
  Clock,
  Database,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";

const categories = [
  { id: "general", name: "General", icon: HelpCircle },
  { id: "hosting", name: "Web Hosting", icon: Server },
  { id: "security", name: "Security", icon: Shield },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "technical", name: "Technical", icon: Settings },
];

const faqs = [
  {
    category: "general",
    questions: [
      {
        q: "What is NeonCloud?",
        a: "NeonCloud is a comprehensive cloud services platform offering web hosting, cloud computing, and enterprise solutions. We provide scalable, secure, and reliable infrastructure for businesses of all sizes.",
      },
      {
        q: "How do I get started with NeonCloud?",
        a: "Getting started is simple: 1. Create an account on our platform 2. Choose your desired service plan 3. Complete the setup process with our guided workflow 4. Access your cloud resources immediately",
      },
      {
        q: "What support options are available?",
        a: "We offer 24/7 technical support through multiple channels including live chat, email, and phone. Our support team is always ready to assist you with any questions or concerns.",
      },
    ],
  },
  {
    category: "hosting",
    questions: [
      {
        q: "What types of hosting do you offer?",
        a: "We offer various hosting solutions including shared hosting, VPS hosting, dedicated servers, and managed WordPress hosting. Each option is optimized for different needs and scalability requirements.",
      },
      {
        q: "Can I upgrade my hosting plan later?",
        a: "Yes, you can easily upgrade your hosting plan at any time through your control panel. The transition is seamless and doesn't require any downtime.",
      },
      {
        q: "Do you offer domain registration services?",
        a: "Yes, we provide domain registration services with competitive pricing and free privacy protection. You can search, register, and manage domains directly through our platform.",
      },
    ],
  },
  {
    category: "security",
    questions: [
      {
        q: "How do you protect my data?",
        a: "We implement multiple layers of security including SSL/TLS encryption, DDoS protection, regular security audits, and automated backups. Our infrastructure is compliant with industry standards like ISO 27001 and GDPR.",
      },
      {
        q: "Do you offer SSL certificates?",
        a: "Yes, we provide free SSL certificates with all hosting plans. We also offer premium SSL certificates for enhanced security and business validation.",
      },
      {
        q: "How often do you backup data?",
        a: "We perform daily automated backups of all hosting accounts. These backups are retained for 30 days and can be restored at any time through your control panel.",
      },
    ],
  },
  {
    category: "billing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit cards, PayPal, and bank transfers. All transactions are processed securely through encrypted connections.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, we offer a 30-day money-back guarantee on most services. Specific terms and conditions apply based on the service type.",
      },
      {
        q: "How does billing work?",
        a: "Services are billed monthly or annually, with discounts available for annual commitments. You can view and manage all billing information through your account dashboard.",
      },
    ],
  },
  {
    category: "technical",
    questions: [
      {
        q: "What control panel do you use?",
        a: "We provide a custom-built control panel that's intuitive and powerful. It includes all the tools you need to manage your hosting, domains, and cloud services.",
      },
      {
        q: "Do you support PHP/MySQL?",
        a: "Yes, we support the latest versions of PHP and MySQL, along with many other programming languages and databases. You can easily switch between PHP versions through the control panel.",
      },
      {
        q: "What is your uptime guarantee?",
        a: "We guarantee 99.9% uptime for all our services, backed by our SLA. Our infrastructure is built with redundancy and high availability in mind.",
      },
    ],
  },
];

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border w-full border-white/10 rounded-lg overflow-hidden mb-4">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 bg-black/20 text-gray-400">{answer}</div>
      </div>
    </div>
  );
};

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const filteredFaqs = faqs
    .find((cat) => cat.category === activeCategory)
    ?.questions.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 mb-8">
              Find answers to common questions about our services. Can&apos;t find
              what you&apos;re looking for? Our support team is here to help 24/7.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,0.5)] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-[1270px] mx-auto px-6 pb-20">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`p-4 rounded-lg border transition-all ${
                  activeCategory === category.id
                    ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
                    : "border-white/10 hover:border-[rgba(207,8,140,0.5)]"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    className={`w-6 h-6 ${
                      activeCategory === category.id
                        ? "text-[rgba(207,8,140,1)]"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={
                      activeCategory === category.id
                        ? "text-white"
                        : "text-gray-400"
                    }
                  >
                    {category.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions */}
        <div className=" mx-auto">
          {filteredFaqs?.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or browse through our
                categories. You can also contact our support team for help.
              </p>
            </div>
          ) : (
            filteredFaqs?.map((faq, index) => (
              <FAQAccordion key={index} question={faq.q} answer={faq.a} />
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-20 text-center p-8 rounded-xl bg-gradient-to-b from-[rgba(207,8,140,0.1)] to-transparent border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Our support team is available 24/7 to help you with any questions
            you may have.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
            Contact Support
          </button>
        </div>
      </div>
      <Footer />
      <ParticlesComponent />
    </div>
  );
}

export default Page;
