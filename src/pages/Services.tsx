import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Inbox } from "lucide-react";
import SEO from "../seo/SEO";
import { services } from "../data/services";
import { Service } from "../types/Service";
import { getIconForName } from "../components/IconForName";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Spine & Disc", "Head & Neck", "Joints & Muscles", ];

  // Helper function to match categories
  const matchesCategory = (service: Service, category: string) => {
    const spineDiscIds = [3, 5, 6, 7, 9, 19]; // Disc Problems, Sciatica, Scoliosis, Leg Length, Whole Back Pain, Slip Disc
    const headNeckIds = [1, 2, 8, 11];        // Migraine, Headache, Cervical Spondylosis, Neck Pain (Removed 17: Facial Paralysis Support)
    const jointsMusclesIds = [4, 10, 12, 13, 16]; // Shoulder, Joint Pain, Arthritis, Sports Injury, Knee Pain

    if (category === "All") {
      const activeIds = [...spineDiscIds, ...headNeckIds, ...jointsMusclesIds];
      return activeIds.includes(service.id);
    }

    if (category === "Spine & Disc") return spineDiscIds.includes(service.id);
    if (category === "Head & Neck") return headNeckIds.includes(service.id);
    if (category === "Joints & Muscles") return jointsMusclesIds.includes(service.id);
    return false;
  };

  const filteredServices = services.filter((service: any) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = matchesCategory(service, selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <SEO 
        title="Ayurvedic Pain Treatment Services in Kerala" 
        description="Browse Chiro Care's Ayurveda-informed chiropractic services for migraine, back pain, sciatica, disc problems, shoulder pain, cervical spondylosis, and joint pain in Ernakulam, Kerala."
        canonicalPath="/services"
      />

      {/* Compact Hero Banner (60-70vh) */}
      <section className="relative h-[60vh] md:h-[65vh] flex flex-col justify-center items-center bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] left-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            Complete Clinical Care
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Our Clinical Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-normal mt-1">
            We provide targeted, non-surgical therapies to address structural bone issues, muscle spasms, and metabolic toxicity.
          </p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="py-12 bg-[#EEF8F6] px-4 md:px-8 relative z-10 border-b border-[#00C7A0]/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Categories Tab list */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white shadow-md shadow-[#00C7A0]/20"
                    : "bg-white text-[#0088A9] border border-[#00C7A0]/20 hover:bg-[#EEF8F6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0088A9]/60" />
            <input
              type="text"
              placeholder="Search services (e.g. sciatica)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-11 pr-4 py-3 rounded-full text-xs font-semibold placeholder-[#0088A9]/50 outline-none shadow-sm focus:ring-2 focus:ring-[#00C7A0] border border-[#00C7A0]/10"
            />
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service: any) => {
                const IconComp = getIconForName(service.iconName) as React.ComponentType<any>;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 rounded-3xl glass-card glass-card-hover border border-white/60 flex flex-col items-start text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C7A0]/10 to-[#0088A9]/10 flex items-center justify-center text-[#0088A9] mb-6">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-black text-[#17332E] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed mb-6 flex-grow font-medium">
                      {service.shortDesc}
                    </p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="group/btn inline-flex items-center gap-1.5 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] transition-colors mt-auto"
                    >
                      Learn Detailed Treatment
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#00C7A0]/10 shadow-sm max-w-lg mx-auto">
              <Inbox className="w-16 h-16 text-[#00C7A0]/30 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-black text-[#17332E] mb-2">No Treatments Found</h3>
              <p className="text-xs md:text-sm text-[#17332E]/60 font-semibold">
                Try searching for other terms or selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
