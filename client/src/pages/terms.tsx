import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, AlertTriangle, Shield, Gavel, CreditCard, Ban } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: FileText,
      title: "Service Description",
      content: [
        "Code2WP provides AI-powered conversion of HTML/CSS/JavaScript websites to WordPress themes",
        "Service includes file upload, URL analysis, theme generation, and download capabilities",
        "We offer both free and premium tiers with different feature sets and usage limits",
        "Service availability may vary and is provided 'as is' without warranties",
        "We reserve the right to modify or discontinue features with reasonable notice"
      ]
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "You must own or have permission to convert the websites you submit",
        "Do not upload malicious code, copyrighted content without permission, or illegal material",
        "Respect usage limits and fair use policies for your account tier",
        "Keep your account credentials secure and report any unauthorized access",
        "Use generated themes in compliance with WordPress and applicable licensing terms"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment and Billing",
      content: [
        "Premium features require paid subscription with monthly or annual billing",
        "All payments are processed securely through Stripe payment processor",
        "Subscription fees are charged in advance and are non-refundable except as required by law",
        "You may cancel your subscription at any time; access continues until the end of billing period",
        "Price changes will be communicated 30 days in advance for existing subscribers"
      ]
    },
    {
      icon: Ban,
      title: "Prohibited Uses",
      content: [
        "Reverse engineering, copying, or creating derivative works of our service",
        "Using automated tools to access our service beyond normal usage",
        "Attempting to circumvent usage limits or access controls",
        "Uploading content that violates copyright, trademark, or other intellectual property rights",
        "Using the service for any illegal or fraudulent activities"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "Service is provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid in the 12 months prior to the claim",
        "We do not guarantee conversion accuracy or theme functionality",
        "You are responsible for testing and validating generated themes before use"
      ]
    },
    {
      icon: Gavel,
      title: "Termination",
      content: [
        "We may suspend or terminate accounts for violation of these terms",
        "You may terminate your account at any time through account settings",
        "Upon termination, your access to the service and stored data will be removed",
        "Certain provisions of these terms survive termination including intellectual property and liability limitations",
        "We will provide reasonable notice before termination except for material breaches"
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
              <Gavel className="w-4 h-4 mr-2" />
              Legal Terms
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Terms of <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              These terms govern your use of Code2WP's AI-powered WordPress conversion service. Please read them carefully before using our platform.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="text-sm text-blue-800">
                <strong>Last Updated:</strong> January 15, 2025 | <strong>Effective Date:</strong> January 15, 2025
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Code2WP ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                These Terms apply to all visitors, users, and others who access or use the Service. The Service is operated by Code2WP Inc. ("Company," "we," or "us").
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> By using our service, you represent that you are at least 18 years old or have reached the age of majority in your jurisdiction.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
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

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Code2WP and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Your Content:</strong> You retain ownership of websites and files you upload</li>
                <li><strong>Generated Themes:</strong> You own the WordPress themes generated from your content</li>
                <li><strong>Our Technology:</strong> The AI algorithms and conversion technology remain our property</li>
                <li><strong>Trademarks:</strong> Code2WP and related marks are our trademarks</li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Dispute Resolution</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to conflict of law provisions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising from these Terms or your use of the Service will be resolved through binding arbitration in San Francisco, California, except for claims that may be brought in small claims court.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h3>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Material changes will be communicated via email to registered users and prominently displayed on our website.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
            <p className="text-lg opacity-90 mb-6">
              Our legal team is available to clarify any questions about these terms of service.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@code2wp.com</p>
              <p><strong>Address:</strong> Code2WP Legal Department, 123 Tech Street, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}