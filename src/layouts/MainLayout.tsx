import { Suspense, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingHerbs from "../components/FloatingHerbs";
import LoadingScreen from "../components/LoadingScreen";
import WhatsAppButton from "../components/WhatsAppButton";
import { AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const [isLoading] = useState(false);
  const location = useLocation();

  // Clean scroll handler and cross-page section scrolling without hash
  useEffect(() => {
    if (isLoading) return;

    const targetSection = (location.state as any)?.scrollTo;
    if (targetSection && location.pathname === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth"
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (location.hash) {
      const id = location.hash.replace(/^\/?#/, "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
      // Strip any hash from browser address bar for clean canonical URLs
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash, location.state, isLoading]);

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
            <Suspense
              fallback={
                <div className="min-h-[55vh] flex items-center justify-center bg-[#F8FCFB]">
                  <div className="w-10 h-10 border-4 border-[#00C7A0]/30 border-t-[#0088A9] rounded-full animate-spin" />
                </div>
              }
            >
              <div key={location.pathname} className="page-fade-in">
                <Outlet />
              </div>
            </Suspense>
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
