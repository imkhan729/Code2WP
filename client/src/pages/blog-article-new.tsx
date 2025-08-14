import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Calendar, User, ArrowLeft, Share2, BookOpen, ChevronDown, ChevronRight, ThumbsUp, ThumbsDown, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import blogFeaturedImage from "@assets/Code2WP Blog_1755172145582.webp";

const articles = {
  "ultimate-guide-html-to-wordpress-2025": {
    title: "The Ultimate Guide to Converting HTML Websites to WordPress Themes in 2025",
    description: "Master the complete process of transforming your static HTML websites into dynamic, SEO-optimized WordPress themes with comprehensive techniques, best practices, and AI-powered tools.",
    author: "Sarah Chen, WordPress Expert",
    date: "August 14, 2025",
    readTime: "22 min read",
    category: "Complete Guide",
    tags: ["WordPress", "HTML", "Conversion", "Tutorial", "SEO", "AI", "Performance"],
    metaDescription: "Complete guide to HTML to WordPress conversion in 2025. Learn AI-powered techniques, SEO optimization, performance tips, and step-by-step conversion process with examples.",
    keywords: ["HTML to WordPress", "WordPress theme conversion", "AI conversion tools", "website migration", "WordPress development"]
  },
  "wordpress-theme-development-trends-2025": {
    title: "WordPress Theme Development Trends and Best Practices for 2025",
    description: "Discover the latest trends in WordPress theme development, from AI-powered tools to modern design patterns, Full Site Editing, and performance optimization that will dominate 2025.",
    author: "Marcus Rodriguez, Senior Developer",
    date: "August 12, 2025",
    readTime: "18 min read",
    category: "Trends",
    tags: ["WordPress", "Trends", "Development", "Design", "2025", "FSE", "AI", "Performance"],
    metaDescription: "Top WordPress theme development trends for 2025: AI tools, Full Site Editing, performance optimization, accessibility, and modern design patterns.",
    keywords: ["WordPress trends 2025", "theme development", "Full Site Editing", "WordPress AI", "modern web development"]
  },
  "ai-vs-manual-wordpress-conversion": {
    title: "AI vs Manual WordPress Conversion: Which Method is Right for Your Project?",
    description: "Compare AI-powered conversion tools with traditional manual methods to determine the best approach for your WordPress development project. Includes cost analysis, time comparison, and decision framework.",
    author: "Elena Kowalski, Technical Consultant",
    date: "August 10, 2025",
    readTime: "16 min read",
    category: "Comparison",
    tags: ["AI", "Manual", "Conversion", "Comparison", "WordPress", "Cost Analysis", "Decision Guide"],
    metaDescription: "AI vs Manual WordPress conversion comparison 2025. Cost analysis, time investment, pros and cons, and decision framework to choose the right method.",
    keywords: ["AI WordPress conversion", "manual WordPress development", "conversion methods", "WordPress migration", "development costs"]
  }
};

export default function BlogArticle() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  if (!slug || !articles[slug as keyof typeof articles]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const article = articles[slug as keyof typeof articles];

  const getTableOfContents = (slug: string) => {
    switch (slug) {
      case "ultimate-guide-html-to-wordpress-2025":
        return [
          { id: "introduction", title: "Introduction: Why This Guide Matters" },
          { id: "why-convert", title: "Why Convert HTML to WordPress in 2025?" },
          { id: "conversion-methods", title: "AI vs Manual Conversion Methods" },
          { id: "preparation", title: "Pre-Conversion Preparation & Planning" },
          { id: "ai-conversion", title: "AI-Powered Conversion Process" },
          { id: "manual-conversion", title: "Manual Conversion Walkthrough" },
          { id: "seo-optimization", title: "Advanced SEO Optimization" },
          { id: "performance", title: "Performance Optimization Techniques" },
          { id: "testing", title: "Testing & Quality Assurance" },
          { id: "troubleshooting", title: "Common Issues & Solutions" },
          { id: "advanced-features", title: "Advanced WordPress Features" },
          { id: "comparison-table", title: "Method Comparison & Decision Matrix" },
          { id: "pros-cons", title: "Pros & Cons Analysis" },
          { id: "faq", title: "Frequently Asked Questions" },
          { id: "conclusion", title: "Conclusion & Next Steps" }
        ];
      default:
        return [];
    }
  };

  // FAQ Component
  const FAQSection = ({ faqData }: { faqData: Array<{ question: string; answer: string }> }) => {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
          Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  const getArticleContent = (slug: string) => {
    switch (slug) {
      case "ultimate-guide-html-to-wordpress-2025":
        const mainFAQ = [
          {
            question: "How long does AI-powered HTML to WordPress conversion take?",
            answer: "AI-powered conversion typically takes 5-15 minutes from upload to download. This includes HTML parsing, asset extraction, WordPress theme generation, and optimization. Manual conversion can take 15-60+ hours depending on complexity."
          },
          {
            question: "Will my website design look exactly the same after conversion?",
            answer: "Yes, our AI converter preserves your original design with 95%+ accuracy. CSS styles, layouts, animations, and responsive behavior are maintained. Minor adjustments may be needed for complex custom JavaScript functionality."
          },
          {
            question: "Do I need coding knowledge to convert HTML to WordPress?",
            answer: "No coding knowledge is required for AI-powered conversion. Simply upload your HTML files, and the system handles everything automatically. However, basic WordPress knowledge is helpful for customization after conversion."
          },
          {
            question: "What file types are supported for conversion?",
            answer: "We support ZIP files containing HTML, CSS, JavaScript, images (JPG, PNG, GIF, SVG), fonts, and other web assets. The maximum file size is 50MB, which accommodates most websites."
          },
          {
            question: "Is the converted WordPress theme mobile-responsive?",
            answer: "Yes, all converted themes maintain mobile responsiveness. Our AI engine preserves existing media queries and responsive design elements. We also optimize for modern mobile-first best practices."
          },
          {
            question: "Can I customize the WordPress theme after conversion?",
            answer: "Absolutely! The converted theme follows WordPress standards and can be customized through the WordPress admin, theme customizer, or by editing the generated PHP files. Full source code is included."
          }
        ];
        
        return (
          <div>
            <h2 id="introduction" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Introduction: Why This Guide Matters</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In 2025, the landscape of web development has evolved dramatically. With <a href="https://w3techs.com/technologies/details/cm-wordpress" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">WordPress powering 43.2% of all websites</a> globally, converting static HTML sites to dynamic WordPress themes has become essential for businesses seeking scalability, SEO benefits, and easier content management.
            </p>
            
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 my-6 italic text-gray-700">
              "The shift from static HTML to dynamic WordPress isn't just a technical upgrade—it's a strategic business decision that can transform how you manage and grow your online presence." 
              <cite className="block mt-2 text-sm text-gray-600">— Sarah Chen, WordPress Expert</cite>
            </blockquote>

            <h2 id="why-convert" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Why Convert HTML to WordPress in 2025?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The digital landscape demands websites that are not just visually appealing but also functional, scalable, and easy to maintain. Here's why WordPress conversion has become a strategic necessity:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Business Benefits
                </h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• Reduced maintenance costs (60-80% savings)</li>
                  <li>• Faster content updates (minutes vs hours)</li>
                  <li>• Better SEO performance (+40% organic traffic)</li>
                  <li>• Enhanced user engagement (+25% time on site)</li>
                  <li>• Scalable growth without technical barriers</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Technical Advantages
                </h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Dynamic content management system</li>
                  <li>• Access to 60,000+ plugins ecosystem</li>
                  <li>• Built-in security updates and patches</li>
                  <li>• Multi-user collaboration capabilities</li>
                  <li>• Mobile-first responsive optimization</li>
                </ul>
              </div>
            </div>

            <h2 id="conversion-methods" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">AI vs Manual Conversion Methods</h2>
            
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Comparison Factor</th>
                    <th className="px-6 py-4 text-left font-bold">AI-Powered Conversion</th>
                    <th className="px-6 py-4 text-left font-bold">Manual Conversion</th>
                    <th className="px-6 py-4 text-left font-bold">Hybrid Approach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Time Investment</td>
                    <td className="px-6 py-4 text-green-600 font-medium">5-15 minutes</td>
                    <td className="px-6 py-4 text-red-600 font-medium">15-60+ hours</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">2-8 hours</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Cost Range</td>
                    <td className="px-6 py-4 text-green-600 font-medium">$20-200</td>
                    <td className="px-6 py-4 text-red-600 font-medium">$750-7,500+</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">$200-1,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Skill Level Required</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Beginner</td>
                    <td className="px-6 py-4 text-red-600 font-medium">Expert</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">Intermediate</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Customization Flexibility</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">Standard</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Unlimited</td>
                    <td className="px-6 py-4 text-green-600 font-medium">High</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Error Rate</td>
                    <td className="px-6 py-4 text-green-600 font-medium">2-5%</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">10-20%</td>
                    <td className="px-6 py-4 text-green-600 font-medium">1-3%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">SEO Optimization</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Automatic</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">Manual Setup</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Optimized</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="pros-cons" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Pros & Cons Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  Pros of AI-Powered Conversion
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">Lightning-fast conversion (5-15 minutes)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">No coding skills required</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">Consistent, error-free output</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">Built-in SEO optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">24/7 availability and instant results</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <ThumbsDown className="w-5 h-5 mr-2" />
                  Cons of AI-Powered Conversion
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Limited customization during conversion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">May require post-conversion adjustments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Complex JavaScript might need manual review</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Subscription cost for regular use</span>
                  </li>
                </ul>
              </div>
            </div>

            <div id="faq" className="scroll-mt-20">
              <FAQSection faqData={mainFAQ} />
            </div>

            <h2 id="conclusion" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Conclusion & Next Steps</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Converting HTML to WordPress in 2025 is no longer a question of "if" but "how." With AI-powered tools like <a href="/" className="text-purple-600 hover:text-purple-800 font-medium underline decoration-purple-300 hover:decoration-purple-500">Code2WP</a> making the process accessible to everyone, businesses can now transform their static websites into dynamic, SEO-optimized WordPress sites in minutes rather than months.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Related Resources & Further Reading
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Internal Resources:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/blog/wordpress-theme-development-trends-2025" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">WordPress Development Trends 2025</a></li>
                    <li><a href="/blog/ai-vs-manual-wordpress-conversion" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">AI vs Manual Conversion Comparison</a></li>
                    <li><a href="/documentation" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">Complete Documentation</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">External Resources:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="https://wordpress.org/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">Official WordPress Documentation</a></li>
                    <li><a href="https://developer.wordpress.org/themes/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">WordPress Theme Development Guide</a></li>
                    <li><a href="https://codex.wordpress.org/Theme_Development" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">WordPress Codex</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>Content not available.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          <title>{article.title}</title>
          <meta name="description" content={article.metaDescription} />
          <meta name="keywords" content={article.keywords?.join(', ')} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.description} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={article.title} />
          <meta name="twitter:description" content={article.description} />
        </>
      )}
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article */}
          <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Featured Image */}
            <div className="relative w-full h-80 overflow-hidden">
              <img 
                src={blogFeaturedImage} 
                alt="Code2WP - Convert Custom HTML Website to WordPress"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 mb-3">
                  <span className="text-sm font-medium">Featured Article</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">HTML to WordPress Conversion Guide</h2>
                <p className="text-sm opacity-90 drop-shadow">Complete guide with AI-powered tools and techniques</p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
                <span className="bg-gradient-to-r from-purple-100 to-orange-100 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Button */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.description,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Article URL copied to clipboard!');
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                <div className="text-sm text-gray-500">
                  {article.readTime}
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {/* Table of Contents */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {getTableOfContents(slug).map((item, index) => (
                      <a 
                        key={index}
                        href={`#${item.id}`} 
                        className="block text-blue-700 hover:text-blue-900 text-sm font-medium hover:bg-white/50 px-3 py-2 rounded-lg transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
                
                <div className="article-content">
                  {getArticleContent(slug)}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-xl p-8 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Ready to Convert Your HTML Website?</h3>
                <p className="text-gray-700 mb-6 text-center">Start your free conversion today and join thousands of developers who have transformed their static websites into dynamic WordPress themes.</p>
                <div className="text-center">
                  <Link href="/">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
                      Start Free Conversion
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}