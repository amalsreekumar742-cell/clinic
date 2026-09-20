import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Compass, ArrowRight, Home, Stethoscope } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Chiro Care Ayurvedic Clinic</title>
        <meta
          name="description"
          content="The page you are looking for does not exist or has been moved. Explore our Ayurvedic therapies and chiropractic care services at Chiro Care Clinic in Kaloor, Kochi."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center bg-[#F8FCFB] px-4 py-20 relative overflow-hidden text-center">
        {/* Decorative blur elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00C7A0]/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0088A9]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00C7A0]/15 to-[#0088A9]/15 flex items-center justify-center text-[#0088A9] border border-[#00C7A0]/20 shadow-inner">
            <Compass className="w-10 h-10 text-[#0088A9]" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9] block mb-2">
              Error 404
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#17332E] leading-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#17332E]/70 max-w-md mx-auto mt-3 leading-relaxed font-medium">
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-[#00C7A0]/30 text-[#0088A9] px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#EEF8F6] transition-all shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              View Clinical Services
            </Link>
          </div>

          <div className="pt-6 border-t border-[#00C7A0]/15 w-full text-xs text-[#17332E]/65 flex flex-wrap items-center justify-center gap-4 font-semibold">
            <span>Popular pages:</span>
            <Link to="/treatments" className="text-[#0088A9] hover:underline inline-flex items-center gap-1">
              Ayurvedic Treatments <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/about" className="text-[#0088A9] hover:underline inline-flex items-center gap-1">
              About Clinic <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/contact" className="text-[#0088A9] hover:underline inline-flex items-center gap-1">
              Contact Us <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
