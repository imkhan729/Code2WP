import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Code, Users, Zap, Globe, Award, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  const values = [
    {
      icon: Code,
      title: "Innovation First",
      description: "We leverage cutting-edge AI technology to solve complex web development challenges with elegant solutions."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Every feature we build is designed to make our users more productive and successful in their projects."
    },
    {
      icon: Heart,
      title: "Quality Obsessed",
      description: "We maintain the highest standards in code quality, user experience, and conversion accuracy."
    },
    {
      icon: Globe,
      title: "Accessible Technology",
      description: "Making advanced WordPress development tools accessible to developers and agencies worldwide."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Websites Converted" },
    { number: "99.9%", label: "Conversion Accuracy" },
    { number: "150+", label: "Countries Served" },
    { number: "24/7", label: "Support Available" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      description: "Former WordPress Core contributor with 10+ years in web development"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder", 
      description: "AI/ML expert who led conversion algorithm development at major tech companies"
    },
    {
      name: "Elena Kowalski",
      role: "Head of Product",
      description: "UX designer turned product leader, passionate about developer experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Mission
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transforming Web Development with <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">AI Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Code2WP was founded on the belief that powerful technology should be accessible to everyone. We're democratizing WordPress theme development by making AI-powered conversion tools available to developers, agencies, and businesses worldwide.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Code2WP began in 2023 when our founders, frustrated by the time-consuming process of manually converting HTML websites to WordPress themes, decided to build something better.
                  </p>
                  <p>
                    What started as a weekend project quickly evolved into a sophisticated AI platform that could analyze complex websites and generate production-ready WordPress themes in minutes, not hours.
                  </p>
                  <p>
                    Today, we're proud to serve developers and agencies in over 150 countries, helping them deliver high-quality WordPress solutions faster than ever before.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-orange-500 rounded-3xl p-12 text-white">
                <div className="text-center">
                  <Award className="w-16 h-16 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Industry Recognition</h3>
                  <p className="text-lg opacity-90 mb-6">
                    Winner of the 2024 WordPress Innovation Award for Best Developer Tool
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.9/5</div>
                      <div className="text-sm opacity-80">User Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm opacity-80">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do, from product development to customer support
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 ml-4">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the experts behind Code2WP's innovative AI technology and user experience
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-primary font-medium mb-4">{member.role}</div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Experience the Future of WordPress Development?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of developers who are already transforming their workflow with Code2WP
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    Start Converting Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}