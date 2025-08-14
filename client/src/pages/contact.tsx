import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, Bug, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@code2wp.com",
      availability: "24/7"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available in app",
      availability: "Mon-Fri, 9AM-6PM PST"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical team",
      contact: "+1 (555) 123-4567",
      availability: "Business hours only"
    }
  ];

  const supportCategories = [
    {
      icon: Headphones,
      title: "General Support",
      description: "Account questions, billing, and general help"
    },
    {
      icon: Bug,
      title: "Technical Issues",
      description: "Conversion problems, bugs, and technical errors"
    },
    {
      icon: Lightbulb,
      title: "Feature Requests",
      description: "Suggestions for new features and improvements"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              We're Here to Help
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Contact <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Our Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Have questions about Code2WP? Need technical support? Want to share feedback? Our dedicated support team is ready to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="general">General Support</option>
                    <option value="technical">Technical Issues</option>
                    <option value="billing">Billing & Account</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Please provide as much detail as possible about your question or issue..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 py-4 text-lg font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-3 rounded-lg mr-4">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{method.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                        <p className="text-primary font-medium">{method.contact}</p>
                        <p className="text-gray-500 text-sm flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {method.availability}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Categories */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Support Categories</h3>
                <div className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{category.title}</h4>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Office Location</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Code2WP Headquarters</h4>
                      <p className="text-gray-600">
                        123 Tech Street<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                        Saturday - Sunday: Closed<br />
                        <span className="text-sm text-gray-500">Email support available 24/7</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How quickly do you respond to support requests?</h4>
                <p className="text-gray-600 text-sm mb-4">We typically respond to email inquiries within 24 hours during business days. Live chat responses are usually immediate during business hours.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer phone support?</h4>
                <p className="text-gray-600 text-sm">Yes, phone support is available for technical issues and urgent matters during business hours (9 AM - 6 PM PST, Monday-Friday).</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I request new features?</h4>
                <p className="text-gray-600 text-sm mb-4">Absolutely! We love hearing from our users. Please use the contact form above with the "Feature Request" category to share your ideas.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Is there a knowledge base or documentation?</h4>
                <p className="text-gray-600 text-sm">Yes, check our Documentation page for comprehensive guides, tutorials, and troubleshooting tips.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}