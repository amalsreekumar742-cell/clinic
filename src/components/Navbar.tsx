import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.location.pathname === "/") {
        const sections = ["hero", "about", "services", "doctor", "contact"];
        const scrollPosition = window.scrollY + 120;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveHash(`#${section}`);
              break;
            }
          }
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      setActiveHash(window.location.hash);
    } else {
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/#hero" },
    { name: "Services", path: "/#services" },
    { name: "About", path: "/#about" },
    { name: "Doctor", path: "/#doctor" },
    { name: "Contact", path: "/#contact" }
  ];

  const handleBookClick = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
    setIsOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    setIsOpen(false);
    if (location.pathname === "/" && path.startsWith("/#")) {
      const id = path.replace(/^\/#/, "");
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        window.history.pushState(null, "", path);
        setActiveHash(`#${id}`);
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
            <Link to="/" className="group flex items-center">
              <Logo className="h-10 md:h-[48px]" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const targetHash = link.path.substring(link.path.indexOf("#"));
                  const isActive = activeHash === targetHash;
                  
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className={`relative font-sans text-sm tracking-wide transition-all duration-300 py-1.5 ${
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
                const targetHash = link.path.substring(link.path.indexOf("#"));
                const isActive = activeHash === targetHash;
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => {
                      handleLinkClick(e, link.path);
                    }}
                    className={`block px-4 py-3 rounded-xl font-bold tracking-wide transition-all ${
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
