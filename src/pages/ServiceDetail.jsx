import { useParams, Link, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowLeft, Clock, AlertCircle, CheckCircle, ChevronRight, HelpCircle } from "lucide-react";
import SEO from "../seo/SEO";
import { services } from "../data/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find corresponding service
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h2 className="font-serif text-2xl font-black text-[#17332E] mb-2">Service Not Found</h2>
        <p className="text-xs md:text-sm text-[#17332E]/60 mb-6 font-semibold">The treatment you are looking for does not exist or has been renamed.</p>
        <Link to="/services" className="bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-6 py-3 rounded-full text-xs font-bold shadow transition-all">
          Back to All Services
        </Link>
      </div>
    );
  }

  const IconComp = Icons[service.iconName] || HelpCircle;

  return (
    <>
      <SEO 
        title={`${service.title} Program`}
        description={service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      {/* Breadcrumbs Banner */}
      <section className="bg-[#EEF8F6] border-b border-[#00C7A0]/15 py-5 px-4 md:px-8 text-xs font-semibold relative z-10 text-left">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[#17332E]/75">
          <Link to="/" className="hover:text-[#0088A9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <Link to="/services" className="hover:text-[#0088A9] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <span className="text-[#0088A9] font-black">{service.title}</span>
        </div>
      </section>

      {/* Main Detail Layout */}
      <section className="py-20 bg-[#F8FCFB] px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Services Catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0088A9]/10 flex items-center justify-center text-[#0088A9] shrink-0 border border-[#0088A9]/5">
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-black text-[#17332E] leading-tight">
                    {service.title}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#00C7A0] font-bold mt-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {service.duration}
                  </span>
                </div>
              </div>

              <div className="text-sm md:text-base text-[#17332E]/80 leading-relaxed font-semibold mt-4 flex flex-col gap-4">
                <p>{service.longDesc}</p>
                <p>
                  Our clinic combines chiropractic adjustments to resolve skeletal misalignments alongside Ayurvedic oil therapies and internal medicines to soothe nerve pathways and balance constitutional Doshas. This comprehensive method guarantees rapid, non-surgical relief.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="mt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#17332E] mb-4">
                  Key Benefits of Our Program
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs md:text-sm text-[#17332E]/80 leading-relaxed bg-[#EEF8F6]/60 p-4 rounded-xl border border-[#00C7A0]/10 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#00C7A0] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptoms Addressed */}
              <div className="mt-6 border-t border-[#00C7A0]/15 pt-8">
                <h3 className="font-serif text-lg sm:text-xl font-black text-[#17332E] mb-4">
                  Common Symptoms Addressed
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {service.symptoms.map((symptom, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-[#EEF8F6] border border-[#00C7A0]/20 text-[#0088A9] text-xs font-bold shadow-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Widget column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Booking widget card */}
              <div className="p-6.5 rounded-3xl border border-[#00C7A0]/15 bg-[#EEF8F6] flex flex-col gap-5 shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-[#00C7A0]/5 blur-[25px] pointer-events-none" />
                <h4 className="font-serif font-black text-[#17332E] text-lg">
                  Request Consultation
                </h4>
                <p className="text-xs text-[#17332E]/70 leading-relaxed font-semibold">
                  Book a consultation session with our chief practitioners to analyze your posture and body constitution.
                </p>
                
                <div className="flex flex-col gap-3.5 mt-2">
                  <Link
                    to="/contact"
                    state={{ selectedService: service.title }} // Pass selected state
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-[#00C7A0]/25 transition-all text-center"
                  >
                    <Icons.Calendar className="w-4 h-4" />
                    Book Service Now
                  </Link>
                  <a
                    href="tel:+916282018754"
                    className="flex items-center justify-center gap-2 border border-[#0088A9]/20 text-[#0088A9] py-3.5 rounded-xl font-bold text-xs hover:bg-white transition-all text-center"
                  >
                    <Icons.Phone className="w-3.5 h-3.5 text-[#00C7A0]" />
                    Call +91 6282018754
                  </a>
                </div>
              </div>

              {/* Informative tips */}
              <div className="p-6.5 rounded-3xl border border-[#00C7A0]/10 bg-white flex flex-col gap-4 text-xs font-semibold shadow-md">
                <h5 className="font-serif font-black text-[#17332E] text-sm">Need Clarification?</h5>
                <p className="text-[#17332E]/70 leading-relaxed">
                  Read our FAQs on the home page or talk directly to our consulting team via WhatsApp.
                </p>
                <a
                  href="https://wa.me/916282018754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00C7A0] hover:text-[#0088A9] font-bold inline-flex items-center gap-1.5 mt-1 transition-colors"
                >
                  Chat on WhatsApp
                  <Icons.ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
