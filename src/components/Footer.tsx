import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

// Social icons as inline SVGs
interface SocialIconProps {
  className?: string;
}

const FacebookIcon = ({ className }: SocialIconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: SocialIconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: SocialIconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 8.98l5.75 3.02-5.75 3.02V8.98z" />
  </svg>
);

const Footer = () => {
  const servicesLinks = [
    { name: "Migraine Treatment", path: "/services/migraine-treatment" },
    { name: "Sciatica Relief", path: "/services/sciatica" },
    { name: "Disc Problems", path: "/services/disc-problems" },
    { name: "Cervical Spondylosis", path: "/services/cervical-spondylosis" },
    { name: "Whole Back Pain", path: "/services/whole-back-pain" },
    { name: "Panchakarma", path: "/treatments/panchakarma" }
  ];

  const quickLinks = [
    { name: "Home", path: "/#hero" },
    { name: "About Chiro Care", path: "/#about" },
    { name: "Meet Our Doctor", path: "/#doctor" },
    { name: "Ayurvedic Treatments", path: "/treatments" },
    { name: "Health Blog", path: "/blog" },
    { name: "Clinic Gallery", path: "/gallery" },
    { name: "Contact Page", path: "/contact" }
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith("/#")) {
      const id = path.replace(/^\/#/, "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-[#17332E] text-[#EEF8F6] border-t border-[#00C7A0]/25 pt-16 pb-8 relative overflow-hidden z-10 select-none">
      {/* Background organic glow shapes */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full bg-[#00C7A0]/5 blur-[70px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-[#0088A9]/5 blur-[65px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center">
              <Logo className="h-9 md:h-11" light={true} />
            </Link>
            <p className="text-xs text-[#EEF8F6]/75 leading-relaxed font-medium max-w-[200px]">
              Combining modern chiropractic techniques with traditional Ayurvedic healing to restore mobility and correct spinal alignment.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-extrabold text-sm text-[#00C7A0] tracking-wider uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#EEF8F6]/80 font-semibold">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="hover:text-[#00C7A0] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#00C7A0] shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-extrabold text-sm text-[#00C7A0] tracking-wider uppercase">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-xs text-[#EEF8F6]/80 font-medium">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Metro+Pillar+567%2C+Banerji+Rd%2C+Kaloor%2C+Ernakulam%2C+Kochi%2C+Kerala+682017"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#00C7A0] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#00C7A0] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  BRRA 46, Bank Road, Metro pillar.567, Avenue.5th, Kaloor, Ernakulam - 682017
                </span>
              </a>
              <div className="flex flex-col gap-2">
                <a href="tel:+919778084638" className="flex items-center gap-2 hover:text-[#00C7A0]">
                  <Phone className="w-3.5 h-3.5 text-[#00C7A0] shrink-0" />
                  Lijomon MJ: +91 9778084638
                </a>
                <a href="tel:+917902361210" className="flex items-center gap-2 hover:text-[#00C7A0]">
                  <Phone className="w-3.5 h-3.5 text-[#00C7A0] shrink-0" />
                  Manish (Proprietor): +91 7902361210
                </a>
                <a href="tel:+916282018754" className="flex items-center gap-2 hover:text-[#00C7A0]">
                  <Phone className="w-3.5 h-3.5 text-[#00C7A0] shrink-0" />
                  Office Desk: 6282018754
                </a>
              </div>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00C7A0] shrink-0" />
                info@chirocareclinic.in
              </span>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-extrabold text-sm text-[#00C7A0] tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#EEF8F6]/80 font-semibold">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="hover:text-[#00C7A0] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#00C7A0] shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-extrabold text-sm text-[#00C7A0] tracking-wider uppercase">
              Social Media
            </h3>
            <p className="text-xs text-[#EEF8F6]/70 leading-relaxed max-w-[180px]">
              Follow our channels for posture guides and alignment tips.
            </p>
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00C7A0] flex items-center justify-center text-white transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00C7A0] flex items-center justify-center text-white transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00C7A0] flex items-center justify-center text-white transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Hours */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-[#EEF8F6]/60 font-medium">
          <p>© {new Date().getFullYear()} Chiro Care Ayurvedic Clinic. All Rights Reserved.</p>
          <p>Operational: Mon - Sat: 9am - 8pm | Sun: 9am - 2pm</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
