"use client";
import React from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  Mail,
  AlertCircle,
  Clock,
  Globe,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import Navbar from "../../components/Navbar/Navbar";

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

const TableOfContents = ({ sections }) => (
  <div className="lg:sticky z-10 relative lg:top-8 p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
    <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
    <nav>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#${section.id}`}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <section.icon size={16} />
              <span>{section.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const sections = [
  { id: "introduction", title: "Introduction", icon: Shield },
  {
    id: "information-collection",
    title: "Information Collection",
    icon: Database,
  },
  { id: "information-usage", title: "Information Usage", icon: Eye },
  { id: "information-sharing", title: "Information Sharing", icon: Share2 },
  { id: "cookies", title: "Cookies Policy", icon: Cookie },
  { id: "security", title: "Data Security", icon: Lock },
  { id: "rights", title: "Your Rights", icon: AlertCircle },
  { id: "updates", title: "Policy Updates", icon: Clock },
  { id: "contact", title: "Contact Us", icon: Mail },
];

function Page() {
  const lastUpdated = "November 16, 2024";

  return (
    <div className="min-h-screen z-10 relative bg-black text-white">
      <Navbar />
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1270px] z-10 relative mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div className="order-2 lg:order-1">
            <PolicySection icon={Shield} title="Introduction" id="introduction">
              <p>
                At NeonCloud, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our cloud computing services,
                website, and related services.
              </p>
              <p>
                By using our services, you consent to the data practices
                described in this policy.
              </p>
            </PolicySection>

            <PolicySection
              icon={Database}
              title="Information Collection"
              id="information-collection"
            >
              <p>
                We collect several types of information for various purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Personal Information (name, email address, phone number)
                </li>
                <li>Usage Data (IP address, browser type, pages visited)</li>
                <li>
                  Technical Data (server configurations, performance metrics)
                </li>
                <li>
                  Payment Information (processed through secure payment
                  providers)
                </li>
              </ul>
            </PolicySection>

            <PolicySection
              icon={Eye}
              title="Information Usage"
              id="information-usage"
            >
              <p>We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Providing and maintaining our services</li>
                <li>Improving and personalizing user experience</li>
                <li>Processing transactions</li>
                <li>Sending administrative information</li>
                <li>Security and fraud prevention</li>
              </ul>
            </PolicySection>

            <PolicySection
              icon={Share2}
              title="Information Sharing"
              id="information-sharing"
            >
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </PolicySection>

            <PolicySection icon={Cookie} title="Cookies Policy" id="cookies">
              <p>
                We use cookies and similar tracking technologies to track
                activity on our service and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies for service functionality</li>
                  <li>Analytics cookies for service improvement</li>
                  <li>Preference cookies for user settings</li>
                </ul>
              </div>
            </PolicySection>

            <PolicySection icon={Lock} title="Data Security" id="security">
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>End-to-end encryption</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery procedures</li>
              </ul>
            </PolicySection>

            <PolicySection icon={AlertCircle} title="Your Rights" id="rights">
              <p>Under GDPR and CCPA, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>
            </PolicySection>

            <PolicySection icon={Clock} title="Policy Updates" id="updates">
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date.
              </p>
            </PolicySection>

            <PolicySection icon={Mail} title="Contact Us" id="contact">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-[rgba(207,8,140,1)]" size={20} />
                    <span>privacy@neoncloud.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="text-[rgba(207,8,140,1)]" size={20} />
                    <span>www.neoncloud.com/privacy</span>
                  </div>
                </div>
              </div>
            </PolicySection>
          </div>

          <div className="order-1 lg:order-2">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>
      <Footer />
      <ParticlesComponent />
    </div>
  );
}

export default Page;
