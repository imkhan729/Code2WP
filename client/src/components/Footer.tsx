import { Code, Mail, MapPin, Phone, Github, Twitter, Linkedin, Heart, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-3 rounded-xl">
                <Code className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Code2WP
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Transform your static websites into professional WordPress themes with cutting-edge AI technology. Fast, accurate, and developer-friendly.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-600 p-3 rounded-lg transition-all duration-300 group">
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-600 p-3 rounded-lg transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-600 p-3 rounded-lg transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Convert Now
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    const featuresSection = document.getElementById('features-section');
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white hover:underline transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Email Support</p>
                  <a href="mailto:support@code2wp.com" className="text-white hover:text-purple-400 transition-colors duration-200">
                    support@code2wp.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Phone Support</p>
                  <a href="tel:+15551234567" className="text-white hover:text-purple-400 transition-colors duration-200">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Headquarters</p>
                  <p className="text-white">
                    San Francisco, CA<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; 2025 Code2WP. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for developers worldwide</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
