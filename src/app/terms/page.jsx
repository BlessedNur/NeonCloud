"use client"
import React from 'react';
import { 
  ScrollText, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Scale,
  Ban,
  Clock,
  CreditCard,
  Mail,
  Globe,
  Server,
  UserX,
  Lock,
  Bookmark
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ParticlesComponent from '../../components/Particles/ParticlesBackground';

const TermsSection = ({ icon: Icon, title, children, id }) => (
  <div className="mb-12" id={id}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[rgba(207,8,140,0.2)] to-purple-500/20 flex items-center justify-center">
        <Icon className="text-[rgba(207,8,140,1)]" size={20} />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-400 leading-relaxed">
      {children}
    </div>
  </div>
);

const TableOfContents = ({ sections }) => (
  <div className="lg:sticky lg:top-8 p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
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
  { id: 'agreement', title: 'Agreement to Terms', icon: ScrollText },
  { id: 'services', title: 'Services Description', icon: Server },
  { id: 'account', title: 'Account Terms', icon: UserX },
  { id: 'payment', title: 'Payment Terms', icon: CreditCard },
  { id: 'usage', title: 'Acceptable Use', icon: ShieldCheck },
  { id: 'content', title: 'Content Guidelines', icon: FileText },
  { id: 'prohibited', title: 'Prohibited Activities', icon: Ban },
  { id: 'liability', title: 'Limitation of Liability', icon: Scale },
  { id: 'termination', title: 'Termination', icon: AlertTriangle },
  { id: 'changes', title: 'Changes to Terms', icon: Clock },
  { id: 'contact', title: 'Contact Information', icon: Mail }
];

function Page() {
  const lastUpdated = "November 16, 2024";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="max-w-[1270px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1270px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="order-2 lg:order-1">
            <TermsSection icon={ScrollText} title="Agreement to Terms" id="agreement">
              <p>
                By accessing or using NeonCloud's services, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you 
                are prohibited from using or accessing our services.
              </p>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <p className="text-sm">
                  Please read these terms carefully before using our services. By using NeonCloud, you 
                  acknowledge that you have read and understood these terms.
                </p>
              </div>
            </TermsSection>

            <TermsSection icon={Server} title="Services Description" id="services">
              <p>
                NeonCloud provides cloud computing services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Cloud hosting and storage solutions</li>
                <li>Computing resources and virtual machines</li>
                <li>Database management services</li>
                <li>Content delivery networks</li>
                <li>Security and monitoring tools</li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of our services 
                with or without notice.
              </p>
            </TermsSection>

            <TermsSection icon={UserX} title="Account Terms" id="account">
              <p>To use our services, you must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Account Security</h4>
                <p className="text-sm">
                  You are responsible for all activities that occur under your account. We recommend 
                  enabling two-factor authentication and using strong passwords.
                </p>
              </div>
            </TermsSection>

            <TermsSection icon={CreditCard} title="Payment Terms" id="payment">
              <p>
                By using our paid services, you agree to pay all fees associated with your chosen plan.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>All fees are exclusive of taxes unless stated otherwise</li>
                <li>Payments are non-refundable unless specified</li>
                <li>Subscription fees are billed in advance</li>
                <li>Usage-based services are billed in arrears</li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Billing Cycles</h4>
                <p className="text-sm">
                  Monthly subscriptions are billed on the same date each month. Annual subscriptions 
                  are billed on the anniversary of your subscription start date.
                </p>
              </div>
            </TermsSection>

            <TermsSection icon={ShieldCheck} title="Acceptable Use" id="usage">
              <p>
                You agree to use our services only for lawful purposes and in accordance with these Terms.
              </p>
              <div className="mt-4 space-y-4">
                <h4 className="font-medium">You agree NOT to:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Distribute malicious software</li>
                  <li>Engage in unauthorized access attempts</li>
                  <li>Interfere with service operations</li>
                </ul>
              </div>
            </TermsSection>

            <TermsSection icon={FileText} title="Content Guidelines" id="content">
              <p>
                You retain all rights to any content you upload to our services. However, by using 
                our services, you grant us a license to store and process your content as necessary 
                to provide our services.
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium mb-2">Content Restrictions</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No illegal or harmful content</li>
                  <li>No unauthorized copyrighted material</li>
                  <li>No personal information of others without consent</li>
                  <li>No spam or malicious content</li>
                </ul>
              </div>
            </TermsSection>

            <TermsSection icon={Ban} title="Prohibited Activities" id="prohibited">
              <p>The following activities are strictly prohibited:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Unauthorized access or attempts to bypass security measures</li>
                <li>Distribution of malware or harmful code</li>
                <li>Network abuse or excessive resource usage</li>
                <li>Hosting illegal content or services</li>
                <li>Reselling services without authorization</li>
              </ul>
            </TermsSection>

            <TermsSection icon={Scale} title="Limitation of Liability" id="liability">
              <p>
                NeonCloud shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use or inability to use our services.
              </p>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Service Level Agreement</h4>
                <p className="text-sm">
                  Our liability is limited to the terms specified in our Service Level Agreement (SLA) 
                  for your specific service plan.
                </p>
              </div>
            </TermsSection>

            <TermsSection icon={AlertTriangle} title="Termination" id="termination">
              <p>
                We may terminate or suspend your account and access to our services immediately, 
                without prior notice or liability, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violation of these Terms</li>
                <li>Non-payment of fees</li>
                <li>Fraudulent or illegal activities</li>
                <li>Upon your request</li>
              </ul>
            </TermsSection>

            <TermsSection icon={Clock} title="Changes to Terms" id="changes">
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through our services.
              </p>
              <div className="p-4 bg-white/5 rounded-lg mt-4">
                <p className="text-sm">
                  Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </TermsSection>

            <TermsSection icon={Mail} title="Contact Information" id="contact">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-[rgba(207,8,140,1)]" size={20} />
                    <span>legal@neoncloud.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="text-[rgba(207,8,140,1)]" size={20} />
                    <span>www.neoncloud.com/terms</span>
                  </div>
                </div>
              </div>
            </TermsSection>
          </div>

          {/* Sidebar */}
          <div className="order-1 lg:order-2">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>
      <Footer />
      <ParticlesComponent/>
    </div>
  );
}

export default Page;