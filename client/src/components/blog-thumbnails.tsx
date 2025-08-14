// Custom SVG blog thumbnails - non-copyright images
export const BlogThumbnails = {
  performance: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="performanceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="performanceBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#performanceBg)" rx="12" />
      
      {/* Performance Graph */}
      <g transform="translate(40, 40)">
        <polyline
          points="0,140 60,120 120,80 180,60 240,40 300,20"
          fill="none"
          stroke="url(#performanceGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Data points */}
        {[0, 60, 120, 180, 240, 300].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={140 - i * 20}
            r="6"
            fill="#22c55e"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
        
        {/* Speed indicator */}
        <g transform="translate(260, 100)">
          <circle cx="0" cy="0" r="30" fill="#22c55e" opacity="0.2" />
          <path
            d="M-15,-15 L15,-15 L0,15 Z"
            fill="#22c55e"
            transform="rotate(-90)"
          />
        </g>
      </g>
      
      {/* Category tag */}
      <rect x="20" y="20" width="100" height="28" rx="14" fill="#22c55e" />
      <text x="70" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Performance
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        8.8K
      </text>
    </svg>
  ),

  trends: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="trendsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="trendsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf5ff" />
          <stop offset="100%" stopColor="#f3e8ff" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#trendsBg)" rx="12" />
      
      {/* Trending arrows and blocks */}
      <g transform="translate(50, 60)">
        {/* WordPress blocks */}
        <rect x="0" y="40" width="60" height="40" rx="8" fill="#8b5cf6" opacity="0.8" />
        <rect x="80" y="20" width="60" height="60" rx="8" fill="#a855f7" opacity="0.9" />
        <rect x="160" y="0" width="60" height="80" rx="8" fill="#8b5cf6" />
        <rect x="240" y="10" width="60" height="70" rx="8" fill="#a855f7" opacity="0.7" />
        
        {/* Trend arrows */}
        <path d="M30,100 L30,120 M20,110 L30,100 L40,110" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M110,100 L110,120 M100,110 L110,100 L120,110" stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M190,100 L190,120 M180,110 L190,100 L200,110" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 2025 indicator */}
      <circle cx="320" cy="120" r="40" fill="#8b5cf6" opacity="0.2" />
      <text x="320" y="115" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="700">
        2025
      </text>
      <text x="320" y="130" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="500">
        TRENDS
      </text>
      
      {/* Category tag */}
      <rect x="20" y="20" width="70" height="28" rx="14" fill="#8b5cf6" />
      <text x="55" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Trends
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        8.2K
      </text>
    </svg>
  ),

  comparison: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="comparisonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="comparisonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="comparisonBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#comparisonBg)" rx="12" />
      
      {/* AI vs Manual comparison */}
      <g transform="translate(60, 60)">
        {/* AI side */}
        <rect x="0" y="0" width="120" height="80" rx="12" fill="url(#comparisonGrad1)" />
        <circle cx="60" cy="25" r="15" fill="white" opacity="0.9" />
        <path d="M50,20 Q60,10 70,20 Q60,30 50,30 Q55,25 50,20" fill="#3b82f6" />
        <text x="60" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          AI
        </text>
        <text x="60" y="70" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
          Automated
        </text>
        
        {/* VS indicator */}
        <circle cx="150" cy="40" r="20" fill="#6b7280" />
        <text x="150" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
          VS
        </text>
        
        {/* Manual side */}
        <rect x="180" y="0" width="120" height="80" rx="12" fill="url(#comparisonGrad2)" />
        <circle cx="240" cy="25" r="15" fill="white" opacity="0.9" />
        <rect x="235" y="15" width="10" height="20" rx="2" fill="#f59e0b" />
        <text x="240" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          Manual
        </text>
        <text x="240" y="70" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
          Custom Code
        </text>
      </g>
      
      {/* Comparison metrics */}
      <g transform="translate(80, 160)">
        <rect x="0" y="0" width="60" height="4" rx="2" fill="#3b82f6" />
        <rect x="70" y="0" width="40" height="4" rx="2" fill="#f59e0b" />
        <rect x="120" y="0" width="80" height="4" rx="2" fill="#10b981" />
        <rect x="210" y="0" width="50" height="4" rx="2" fill="#8b5cf6" />
      </g>
      
      {/* Category tag */}
      <rect x="20" y="20" width="90" height="28" rx="14" fill="#3b82f6" />
      <text x="65" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Comparison
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        6.8K
      </text>
    </svg>
  ),

  seo: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="seoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#seoBg)" rx="12" />
      
      {/* SEO elements */}
      <g transform="translate(50, 50)">
        {/* Search results */}
        <rect x="0" y="0" width="300" height="30" rx="6" fill="white" stroke="#10b981" strokeWidth="2" />
        <circle cx="15" cy="15" r="8" fill="#10b981" />
        <path d="M20,20 L28,28" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <rect x="40" y="8" width="200" height="4" rx="2" fill="#d1fae5" />
        <rect x="40" y="18" width="150" height="4" rx="2" fill="#d1fae5" />
        
        {/* Ranking bars */}
        <rect x="0" y="50" width="120" height="12" rx="6" fill="#10b981" />
        <rect x="0" y="70" width="180" height="12" rx="6" fill="#34d399" />
        <rect x="0" y="90" width="240" height="12" rx="6" fill="#6ee7b7" />
        
        {/* Traffic arrow */}
        <path d="M260,60 L280,40 L300,60 M280,40 L280,100" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      
      {/* SEO badge */}
      <circle cx="320" cy="120" r="35" fill="#10b981" opacity="0.2" />
      <text x="320" y="115" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">
        SEO
      </text>
      <text x="320" y="130" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="500">
        OPTIMIZED
      </text>
      
      {/* Category tag */}
      <rect x="20" y="20" width="60" height="28" rx="14" fill="#10b981" />
      <text x="50" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        SEO
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        7.2K
      </text>
    </svg>
  ),

  troubleshooting: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="troubleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="troubleBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef2f2" />
          <stop offset="100%" stopColor="#fee2e2" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#troubleBg)" rx="12" />
      
      {/* Troubleshooting elements */}
      <g transform="translate(60, 60)">
        {/* Error boxes */}
        <rect x="0" y="0" width="80" height="40" rx="8" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x="40" y="25" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="600">ERROR</text>
        
        <rect x="100" y="20" width="80" height="40" rx="8" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x="140" y="45" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="600">404</text>
        
        {/* Fix arrow */}
        <path d="M200,40 Q220,20 240,40" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M235,35 L240,40 L235,45" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Fixed box */}
        <rect x="260" y="20" width="80" height="40" rx="8" fill="#bbf7d0" stroke="#10b981" strokeWidth="2" />
        <circle cx="300" cy="40" r="8" fill="#10b981" />
        <path d="M296,40 L299,43 L305,37" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      
      {/* Tools */}
      <g transform="translate(80, 140)">
        <rect x="0" y="0" width="20" height="30" rx="3" fill="#ef4444" />
        <rect x="30" y="5" width="15" height="20" rx="2" fill="#f59e0b" />
        <circle cx="60" cy="15" r="10" fill="#8b5cf6" />
        <rect x="85" y="2" width="12" height="26" rx="2" fill="#06b6d4" />
      </g>
      
      {/* Category tag */}
      <rect x="20" y="20" width="110" height="28" rx="14" fill="#ef4444" />
      <text x="75" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Troubleshooting
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        5.4K
      </text>
    </svg>
  ),

  mobile: (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs>
        <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="mobileBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecfeff" />
          <stop offset="100%" stopColor="#cffafe" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="240" fill="url(#mobileBg)" rx="12" />
      
      {/* Mobile devices */}
      <g transform="translate(80, 40)">
        {/* Phone */}
        <rect x="0" y="0" width="60" height="100" rx="12" fill="white" stroke="#06b6d4" strokeWidth="3" />
        <rect x="8" y="12" width="44" height="64" rx="4" fill="#cffafe" />
        <circle cx="30" cy="85" r="6" fill="#06b6d4" />
        
        {/* Tablet */}
        <rect x="80" y="10" width="80" height="80" rx="8" fill="white" stroke="#0891b2" strokeWidth="3" />
        <rect x="88" y="18" width="64" height="48" rx="3" fill="#cffafe" />
        <circle cx="120" cy="75" r="4" fill="#0891b2" />
        
        {/* Desktop */}
        <rect x="180" y="20" width="100" height="60" rx="6" fill="white" stroke="#0e7490" strokeWidth="3" />
        <rect x="188" y="28" width="84" height="36" rx="2" fill="#cffafe" />
        <rect x="220" y="85" width="20" height="15" rx="2" fill="#0e7490" />
      </g>
      
      {/* Responsive indicators */}
      <g transform="translate(100, 160)">
        <circle cx="30" cy="0" r="4" fill="#06b6d4" />
        <circle cx="120" cy="0" r="4" fill="#0891b2" />
        <circle cx="230" cy="0" r="4" fill="#0e7490" />
        <path d="M30,0 L120,0 L230,0" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2,2" />
      </g>
      
      {/* Category tag */}
      <rect x="20" y="20" width="80" height="28" rx="14" fill="#06b6d4" />
      <text x="60" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Mobile-First
      </text>
      
      {/* View count */}
      <rect x="320" y="20" width="60" height="24" rx="12" fill="rgba(0,0,0,0.1)" />
      <text x="350" y="36" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">
        9.1K
      </text>
    </svg>
  )
};