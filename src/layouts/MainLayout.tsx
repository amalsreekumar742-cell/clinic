import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingHerbs from "../components/FloatingHerbs";
import LoadingScreen from "../components/LoadingScreen";
import WhatsAppButton from "../components/WhatsAppButton";

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Robust Scroll-to-Hash handler with offset and loading screen wait
  useEffect(() => {
    if (isLoading) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.replace(/^\/?#/, "");
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // Navbar height
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          // Retry if DOM elements are still rendering
          timer = setTimeout(scrollToHash, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    timer = setTimeout(scrollToHash, 150);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname, location.hash, isLoading]);

  // Handle Loading Screen Timeout on Mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds splash load
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FCFB] text-[#17332E] font-sans flex flex-col overflow-x-hidden">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Splash Loading Animation */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main App Layout */}
      {!isLoading && (
        <>
          {/* Header Navigation */}
          <Navbar />

          {/* Floating background botanical leaves */}
          <FloatingHerbs />

          {/* Layout Content Body */}
          <main className="flex-grow pt-20 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer Information */}
          <Footer />

          {/* WhatsApp Floating Button */}
          <WhatsAppButton />
        </>
      )}
    </div>
  );
};

export default MainLayout;
