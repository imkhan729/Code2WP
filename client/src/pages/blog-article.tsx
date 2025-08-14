import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Calendar, User, ArrowLeft, Share2, BookOpen, ChevronDown, ChevronRight, ThumbsUp, ThumbsDown, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

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
  "wordpress-theme-performance-optimization": {
    title: "WordPress Theme Performance Optimization: From Good to Great",
    description: "Learn how to optimize your WordPress theme for speed, SEO, and user experience. Step-by-step guide with actionable tips, best practices, and FAQs to boost performance.",
    author: "Alex Thompson, Performance Engineer",
    date: "August 8, 2025",
    readTime: "20 min read",
    category: "Performance",
    tags: ["Performance", "Speed", "Optimization", "Core Web Vitals", "Caching", "Images"],
    metaDescription: "Complete WordPress performance optimization guide 2025. Improve Core Web Vitals, implement caching, optimize images, and boost site speed.",
    keywords: ["WordPress performance", "Core Web Vitals", "site speed optimization", "WordPress caching", "image optimization"]
  }
};

const getArticleContent = (slug: string) => {
  switch (slug) {
    case "wordpress-theme-performance-optimization":
      return (
        <div className="space-y-8">
          <section>
            <h2 id="performance-fundamentals" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Performance Fundamentals</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In today's fast-paced digital world, website performance is not just a luxury—it's a necessity. Whether you're running a blog, an online store, or a corporate site, your WordPress theme plays a critical role in determining how quickly your pages load, how smoothly users interact with your content, and how well your site ranks in search engines.
            </p>
            
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 my-6 italic text-gray-700">
              "A slow website frustrates visitors, increases bounce rates, and hurts SEO. On the flip side, a well-optimized WordPress theme can significantly enhance user experience, improve conversion rates, and boost your search engine visibility."
              <cite className="block mt-2 text-sm text-gray-600">— Alex Thompson, Performance Engineer</cite>
            </blockquote>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">&lt; 2s</div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Target Load Time</h3>
                <p className="text-green-700 text-sm">Visitors expect pages to load in under 2 seconds. Every additional second increases bounce rate significantly.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">7%</div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">Conversion Impact</h3>
                <p className="text-blue-700 text-sm">Even a 1-second delay can reduce conversions by up to 7%, according to research studies.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">60%</div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">Mobile Traffic</h3>
                <p className="text-purple-700 text-sm">Over 60% of web traffic comes from mobile devices, making responsive performance essential.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Impact</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>User Experience:</strong> Visitors expect pages to load in under 2 seconds</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>SEO Rankings:</strong> Google uses page speed as a ranking factor</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Conversion Rates:</strong> Studies show that even a 1-second delay can reduce conversions by up to 7%</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Technical Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Server Resources:</strong> Optimized themes use less CPU and memory</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Bandwidth Costs:</strong> Smaller page sizes reduce hosting expenses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Scalability:</strong> Efficient code handles traffic spikes better</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 id="audit" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Audit Your Current Theme Performance</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">Before making changes, you need to understand where your theme stands. Start with a performance audit using tools like:</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Google PageSpeed Insights</h4>
                <p className="text-gray-700 text-sm">Analyzes both mobile and desktop performance with Core Web Vitals metrics.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">GTmetrix</h4>
                <p className="text-gray-700 text-sm">Provides detailed reports on load time, page size, and performance scores.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Pingdom Tools</h4>
                <p className="text-gray-700 text-sm">Offers insights into page speed and regional load times.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 id="code-optimization" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Optimize Theme Code and Structure</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">Clean, efficient code is the backbone of a high-performing theme. Here's how to ensure your theme's code is optimized:</p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-3">1. Use Valid HTML and CSS</h4>
                <p className="text-indigo-800 mb-3">Ensure your theme follows W3C standards. Invalid markup can cause rendering issues and slow down browsers.</p>
                <ul className="space-y-1 text-indigo-700 text-sm">
                  <li>• Validate HTML with W3C Markup Validator</li>
                  <li>• Validate CSS with W3C CSS Validator</li>
                  <li>• Use semantic HTML elements</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-green-900 mb-3">2. Reduce DOM Size</h4>
                <p className="text-green-800 mb-3">A complex DOM with too many nested elements slows down rendering. Simplify your layout by removing unnecessary divs and wrappers.</p>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• Remove redundant HTML elements</li>
                  <li>• Use CSS Grid and Flexbox for layouts</li>
                  <li>• Limit DOM depth to 7 levels when possible</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-3">3. Avoid Inline CSS and JavaScript</h4>
                <p className="text-purple-800 mb-3">Inline styles and scripts increase page size and prevent caching. Instead, use external stylesheets and scripts.</p>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• Move all CSS to external files</li>
                  <li>• Use wp_enqueue_style() and wp_enqueue_script()</li>
                  <li>• Leverage browser caching for external resources</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 id="image-optimization" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Efficient Image Optimization</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">Images are often the largest assets on a webpage. Optimizing them is one of the fastest ways to improve performance.</p>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Image Optimization Best Practices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">File Format Guidelines:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>JPEG:</strong> Best for photographs and complex images</li>
                    <li><strong>PNG:</strong> Ideal for graphics with transparency</li>
                    <li><strong>WebP:</strong> Modern format offering up to 30% smaller file sizes</li>
                    <li><strong>AVIF:</strong> Next-gen format with excellent compression</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Implementation Tips:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Use srcset attributes for responsive images</li>
                    <li>• Implement lazy loading with loading="lazy"</li>
                    <li>• Compress images before upload</li>
                    <li>• Use tools like TinyPNG or ImageOptim</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 id="browser-caching" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Leverage Browser Caching</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">Browser caching stores static files (like CSS, JS, and images) locally on a visitor's device. This means returning visitors load pages faster because their browser doesn't need to re-download everything.</p>

            <div className="bg-gray-900 rounded-xl p-6 my-8">
              <h4 className="text-white font-bold mb-3">Apache .htaccess Example:</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto"><code>{`<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>`}</code></pre>
            </div>
          </section>

          <section>
            <h2 id="maintenance" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Regular Updates and Maintenance</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">Performance isn't a one-time fix—it requires ongoing attention.</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">🎯 Maintenance Checklist</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Weekly Tasks:</h4>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Monitor page speed scores</li>
                    <li>• Check for plugin updates</li>
                    <li>• Review error logs</li>
                    <li>• Test mobile performance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Monthly Tasks:</h4>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Update themes and plugins</li>
                    <li>• Clean up unused files</li>
                    <li>• Optimize database</li>
                    <li>• Review analytics data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">Final Thoughts</h3>
              <p className="text-green-800 mb-4">Optimizing your WordPress theme isn't about chasing the latest design trends—it's about building a solid, efficient foundation for your website. By focusing on clean code, image optimization, smart caching, and minimalism, you can dramatically improve your site's speed and user experience.</p>
              <p className="text-green-800">Start with an audit, apply the techniques in this guide, and monitor your progress. Small changes add up to big results. A fast, reliable WordPress theme doesn't just impress visitors—it helps you rank higher, convert better, and grow your online presence.</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog/ultimate-guide-html-to-wordpress-2025" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">Complete HTML to WordPress Guide</Link></li>
                <li><Link href="/blog/wordpress-theme-development-trends-2025" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">WordPress Development Trends 2025</Link></li>
                <li><Link href="/documentation" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">Complete Documentation</Link></li>
                <li><a href="https://developers.google.com/speed/pagespeed/insights/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500">Google PageSpeed Insights</a></li>
              </ul>
            </div>
          </section>
        </div>
      );

    default:
      return (
        <div>
          <p className="text-gray-700">Article content not found.</p>
        </div>
      );
  }
};

export default function BlogArticle() {
  const [match, params] = useRoute("/blog/:slug");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  
  if (!match || !params?.slug) return <div>Article not found</div>;
  
  const article = articles[params.slug as keyof typeof articles];
  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {article.author.split(' ')[0][0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{article.author}</div>
                  <div className="text-sm text-gray-500">Performance Expert</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "bg-yellow-50 border-yellow-200 text-yellow-800" : ""}
                >
                  <Star className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #{tag.toLowerCase().replace(' ', '')}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 prose prose-lg max-w-none">
            {getArticleContent(params.slug)}
          </div>

          {/* Article Footer */}
          <div className="p-8 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {setVotedUp(!votedUp); setVotedDown(false);}}
                    className={votedUp ? "bg-green-50 border-green-200 text-green-800" : ""}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {setVotedDown(!votedDown); setVotedUp(false);}}
                    className={votedDown ? "bg-red-50 border-red-200 text-red-800" : ""}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>2.1K views this week</span>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link href="/blog" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-sm text-purple-600 font-medium mb-2">← Previous Article</div>
              <div className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                WordPress Development Trends 2025
              </div>
            </div>
          </Link>
          
          <Link href="/blog" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-sm text-purple-600 font-medium mb-2">Next Article →</div>
              <div className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                SEO Mastery for Converted WordPress Themes
              </div>
            </div>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}