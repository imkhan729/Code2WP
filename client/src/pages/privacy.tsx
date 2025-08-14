import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, FileText, Clock } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (email, name) when you create an account",
        "Website files and URLs you upload for conversion",
        "Usage data and analytics to improve our service",
        "Payment information (processed securely through Stripe)",
        "Support communications and feedback"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Process your website conversions and provide our services",
        "Communicate with you about your account and our services",
        "Improve our AI algorithms and conversion accuracy",
        "Provide customer support and respond to inquiries",
        "Send important service updates and security notifications"
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "All data is encrypted in transit and at rest using industry-standard encryption",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication for all our systems",
        "Secure data centers with physical and network security",
        "Regular backups and disaster recovery procedures"
      ]
    },
    {
      icon: Eye,
      title: "Data Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Data may be shared with service providers who assist our operations",
        "Legal compliance: we may disclose information if required by law",
        "Business transfers: data may be transferred if we're acquired",
        "Anonymous, aggregated data may be used for research and analytics"
      ]
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct your information",
        "Deletion: Request deletion of your account and data",
        "Portability: Export your data in a standard format",
        "Opt-out: Unsubscribe from marketing communications"
      ]
    },
    {
      icon: Clock,
      title: "Data Retention",
      content: [
        "Account data: Retained while your account is active",
        "Conversion files: Stored for 30 days after conversion",
        "Usage logs: Retained for 12 months for analytics",
        "Support communications: Retained for 3 years",
        "Deleted data is permanently removed within 30 days"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Protection
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Privacy <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Your privacy is fundamental to everything we do. This policy explains how Code2WP collects, uses, and protects your personal information.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="text-sm text-blue-800">
                <strong>Last Updated:</strong> January 15, 2025 | <strong>Effective Date:</strong> January 15, 2025
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Code2WP ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our AI-powered WordPress conversion service.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                By using our service, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, please do not use our service.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl">
                    <section.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                You can control cookies through your browser settings, though disabling certain cookies may affect website functionality.
              </p>
            </div>
          </div>

          {/* International Users */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">International Users</h3>
            <p className="text-gray-600 leading-relaxed">
              Code2WP operates globally and complies with applicable data protection laws including GDPR (European Union), CCPA (California), and other regional privacy regulations. If you're located outside the United States, your information may be transferred to and processed in the United States, where our servers are located.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-lg opacity-90 mb-6">
              We're here to help. Contact our privacy team with any questions or concerns.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@code2wp.com</p>
              <p><strong>Address:</strong> Code2WP Privacy Team, 123 Tech Street, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}