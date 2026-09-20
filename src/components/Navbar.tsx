import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import Logo from "./Logo";

interface NavLinkItem {
  name: string;
  section?: string;
  path: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section on homepage without modifying browser URL
      if (window.location.pathname === "/") {
        const sections = ["hero", "services", "about", "doctor", "contact"];
        const scrollPosition = window.scrollY + 140;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks: NavLinkItem[] = [
    { name: "Home", section: "hero", path: "/" },
    { name: "Services", section: "services", path: "/" },
    { name: "About", section: "about", path: "/" },
    { name: "Doctor", section: "doctor", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", section: "contact", path: "/" }
  ];

  const handleBookClick = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
    setIsOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent, link: NavLinkItem) => {
    setIsOpen(false);

    if (link.section) {
      e.preventDefault();
      if (location.pathname === "/") {
        // Already on home page: smooth scroll to section without touching URL hash
        if (link.section === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("hero");
        } else {
          const element = document.getElementById(link.section);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth"
            });
            setActiveSection(link.section);
          }
        }
      } else {
        // On another page: navigate to home page and pass target section in state
        navigate("/", { state: { scrollTo: link.section } });
      }
    } else {
      if (location.pathname === link.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 h-20 flex items-center select-none ${
          isScrolled
            ? "bg-[#F8FCFB]/90 backdrop-blur-lg shadow-md border-b border-[#00C7A0]/15"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Component */}
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, { name: "Home", section: "hero", path: "/" })}
              className="group flex items-center"
            >
              <Logo className="h-10 md:h-[48px]" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = link.section
                    ? location.pathname === "/" && activeSection === link.section
                    : location.pathname.startsWith(link.path);

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`relative font-sans text-sm tracking-wide transition-all duration-300 py-1.5 cursor-pointer ${
                        isActive
                          ? "text-[#0088A9] font-black"
                          : "text-[#17332E]/60 hover:text-[#0088A9] font-bold"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#00C7A0] to-[#0088A9] rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Call and Book CTA Buttons */}
              <div className="flex items-center gap-5">
                <a
                  href="tel:+916282018754"
                  className="flex items-center gap-2 text-xs text-[#0088A9] font-bold px-4 py-2.5 rounded-full border border-[#0088A9]/20 hover:bg-[#EEF8F6] transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00C7A0]" />
                  +91 6282018754
                </a>

                <button
                  onClick={handleBookClick}
                  className="btn-premium flex items-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white text-xs uppercase tracking-widest font-extrabold px-6 py-3.5 rounded-full shadow-[0_4px_15px_rgba(0,199,160,0.25)] hover:shadow-[0_8px_25px_rgba(0,199,160,0.45)] transition-all duration-300 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <a
                href="tel:+916282018754"
                className="w-10 h-10 rounded-full border border-[#00C7A0]/20 flex items-center justify-center text-[#0088A9] hover:bg-[#EEF8F6] transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center text-[#17332E] border border-[#00C7A0]/20 rounded-full hover:bg-[#EEF8F6] focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[80px] z-30 bg-[#F8FCFB]/95 backdrop-blur-lg border-b border-[#00C7A0]/20 shadow-xl lg:hidden"
          >
            <div className="px-5 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => {
                const isActive = link.section
                  ? location.pathname === "/" && activeSection === link.section
                  : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`block px-4 py-3 rounded-xl font-bold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white shadow-md shadow-[#00C7A0]/10"
                        : "text-[#17332E]/80 hover:bg-[#EEF8F6] hover:text-[#0088A9]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#EEF8F6] flex flex-col gap-3">
                <a
                  href="tel:+916282018754"
                  className="flex items-center justify-center gap-2 border border-[#0088A9]/20 text-[#0088A9] font-bold py-3.5 rounded-xl hover:bg-[#EEF8F6] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#00C7A0]" />
                  +91 6282018754
                </a>
                <button
                  onClick={handleBookClick}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl hover:opacity-95 shadow-md shadow-[#00C7A0]/25 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
