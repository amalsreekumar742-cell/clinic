import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

const Logo = ({ className = "h-12", iconOnly = false, light = false }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* PNG Icon */}
      <img
        src="/logo.png"
        alt="Chiro Care Clinic Logo"
        className="w-auto h-full aspect-square object-contain flex-shrink-0"
      />


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
