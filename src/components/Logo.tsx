import React from "react";

const Logo = ({ className = "h-12", iconOnly = false, light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Icon */}
      <svg
        className="w-auto h-full aspect-square flex-shrink-0"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Teal/Turquoise gradient from the logo */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C7A0" />
            <stop offset="100%" stopColor="#0088A9" />
          </linearGradient>
          {/* Dark Accent shadow gradient */}
          <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0f7f4" stopOpacity="0.95" />
          </linearGradient>
          <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00C7A0" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Main "C" Symbol */}
        <path
          d="M 145,55 
             C 115,25 70,30 45,60 
             C 15,95 20,145 55,170 
             C 85,192 128,185 145,155
             C 130,165 110,168 95,160
             C 70,145 65,110 80,85
             C 92,65 118,55 145,55 Z"
          fill="url(#logoGradient)"
          filter="url(#logoGlow)"
        />

        {/* Outer dots / nerve circles on the inner curve of C */}
        <circle cx="95" cy="85" r="7" fill="#00C7A0" />
        <circle cx="85" cy="100" r="7.5" fill="#009FB5" />
        <circle cx="85" cy="118" r="7.5" fill="#009FB5" />
        <circle cx="95" cy="133" r="7" fill="#00C7A0" />

        {/* Vertebrae Spine Column */}
        <g id="spine">
          {/* Top segment */}
          <path
            d="M 125,30 C 130,30 135,33 135,38 C 135,43 130,46 125,46 C 120,46 115,43 115,38 C 115,33 120,30 125,30 Z"
            fill="url(#spineGradient)"
            stroke="#0088A9"
            strokeWidth="2"
          />
          {/* Spine links / discs */}
          <path d="M 125,38 L 122,175" stroke="#005D73" strokeWidth="6" strokeLinecap="round" />
          <path d="M 125,38 L 122,175" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Staggered Vertebrae segments along the path */}
          {/* Seg 1 */}
          <path d="M 112,48 C 112,48 123,43 134,48 C 134,51 127,56 123,56 C 119,56 112,48 112,48 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />
          {/* Seg 2 */}
          <path d="M 110,60 C 110,60 121,55 132,60 C 132,63 125,68 121,68 C 117,68 110,60 110,60 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />
          {/* Seg 3 */}
          <path d="M 108,72 C 108,72 119,67 130,72 C 130,75 123,80 119,80 C 115,80 108,72 108,72 Z" fill="#ffffff" stroke="#005D73" strokeWidth="2" />
          {/* Seg 4 */}
          <path d="M 107,85 C 107,85 118,80 129,85 C 129,88 122,93 118,93 C 114,93 107,85 107,85 Z" fill="#ffffff" stroke="#005D73" strokeWidth="2" />
          {/* Seg 5 */}
          <path d="M 107,98 C 107,98 118,93 129,98 C 129,101 122,106 118,106 C 114,106 107,98 107,98 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />
          {/* Seg 6 */}
          <path d="M 108,111 C 108,111 119,106 130,111 C 130,114 123,119 119,119 C 115,119 108,111 108,111 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />
          {/* Seg 7 */}
          <path d="M 110,124 C 110,124 121,119 132,124 C 132,127 125,132 121,132 C 117,132 110,124 110,124 Z" fill="#ffffff" stroke="#005D73" strokeWidth="2" />
          {/* Seg 8 */}
          <path d="M 112,137 C 112,137 123,132 134,137 C 134,140 127,145 123,145 C 119,145 112,137 112,137 Z" fill="#ffffff" stroke="#005D73" strokeWidth="2" />
          {/* Seg 9 */}
          <path d="M 115,150 C 115,150 125,145 135,150 C 135,153 128,158 124,158 C 120,158 115,150 115,150 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />
          {/* Seg 10 */}
          <path d="M 118,163 C 118,163 127,158 136,163 C 136,166 130,171 126,171 C 122,171 118,163 118,163 Z" fill="#ffffff" stroke="#0088A9" strokeWidth="2" />

          {/* Lower Tail / Coccyx Curve */}
          <path
            d="M 122,170 C 122,175 115,183 118,189 C 115,186 112,180 122,170 Z"
            fill="#005D73"
          />
        </g>
      </svg>

      {/* Brand Text */}
      {!iconOnly && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif font-extrabold text-base md:text-lg leading-tight tracking-wider ${
              light ? "text-white" : "text-primary"
            }`}
          >
            CHIRO CARE
          </span>
          <span
            className={`text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-bold leading-none ${
              light ? "text-secondary" : "text-secondary"
            }`}
          >
            Ayurvedic Clinic
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
