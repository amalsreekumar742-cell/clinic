import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Calendar, Sparkles } from "lucide-react";
import SEO from "../seo/SEO";

interface GalleryItem {
  id: number;
  category: "Clinic & Facility" | "Treatments & Therapies";
  title: string;
  alt: string;
  description: string;
  img: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = ["All", "Clinic & Facility", "Treatments & Therapies"];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: "Clinic & Facility",
      title: "Clinic Exterior & Entrance",
      alt: "Chiro Care Ayurvedic Clinic building exterior with sign board at Kaloor Ernakulam Kochi",
      description: "Exterior view and welcoming entrance of Chiro Care Ayurvedic Clinic located on Bank Road, Avenue 5, Kaloor, Kochi.",
      img: "/gallery/chiro-care-ayurvedic-clinic-exterior-kaloor-kochi.jpg",
    },
    {
      id: 2,
      category: "Clinic & Facility",
      title: "Reception & Front Office",
      alt: "Chiro Care Clinic reception desk and patient enquiry area in Kaloor Kochi",
      description: "Comfortable reception and enquiry front office with patient registration desk and Ayurvedic health displays.",
      img: "/gallery/chiro-care-clinic-reception-front-office-kochi.webp",
    },
    {
      id: 3,
      category: "Clinic & Facility",
      title: "Chiropractic Adjusting Room",
      alt: "Chiropractic adjustment table and private therapy room at Chiro Care Clinic Kaloor",
      description: "Private clinical room equipped with specialized spine adjusting table, air conditioning, and anatomical guides.",
      img: "/gallery/chiropractic-treatment-room-adjustment-table-kaloor.webp",
    },
    {
      id: 4,
      category: "Clinic & Facility",
      title: "Classical Ayurvedic Medicines",
      alt: "Genuine classical Ayurvedic medicines and herbal formulations at Chiro Care Clinic",
      description: "Prescribed authentic herbal formulations, kashayams, and medicated oils from certified Ayurvedic pharmacies.",
      img: "/gallery/authentic-ayurvedic-medicines-balarishtam-punarnavadi-kerala.webp",
    },
    {
      id: 5,
      category: "Treatments & Therapies",
      title: "Spinal & Postural Assessment",
      alt: "Dr. Lijomon MJ performing spinal posture assessment and consultation at Chiro Care Clinic Kochi",
      description: "Detailed physical examination and spinal biomechanical evaluation conducted by Dr. Lijomon MJ.",
      img: "/gallery/chiropractic-consultation-spine-assessment-kochi.webp",
    },
    {
      id: 6,
      category: "Treatments & Therapies",
      title: "Spinal Decompression & Alignment",
      alt: "Chiropractic thoracic spinal adjustment and decompression therapy session in Ernakulam",
      description: "Precise chiropractic spinal mobilization targeting vertebrae restriction, muscle tension, and postural misalignments.",
      img: "/gallery/cervical-spine-adjustment-chiropractic-therapy-ernakulam.webp",
    },
    {
      id: 7,
      category: "Treatments & Therapies",
      title: "Warm Herbal Kizhi Therapy",
      alt: "Therapist administering warm Ayurvedic herbal Kizhi bolus therapy for back pain relief in Kochi",
      description: "Traditional warm medicated poultice treatment for reducing inflammation, deep back stiffness, and joint pain.",
      img: "/gallery/ayurvedic-kizhi-therapy-back-pain-treatment-kochi.webp",
    },
    {
      id: 8,
      category: "Treatments & Therapies",
      title: "Cupping & Myofascial Release",
      alt: "Cupping therapy and myofascial decompression on the back at Chiro Care Clinic Kerala",
      description: "Targeted myofascial decompression therapy improving lymphatic drainage, blood circulation, and muscle recovery.",
      img: "/gallery/cupping-therapy-back-pain-myofascial-release-kerala.webp",
    },
    {
      id: 9,
      category: "Treatments & Therapies",
      title: "Cervical Spine & Neck Adjustment",
      alt: "Chiropractic cervical spine and neck adjustment for migraine and neck pain in Kochi",
      description: "Gentle cervical spinal alignment therapy delivering lasting relief for chronic neck pain, headaches, and migraines.",
      img: "/gallery/chiropractic-neck-adjustment-cervical-spine-relief-kochi.webp",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const activeImage = activeIndex !== null ? filteredItems[activeIndex] : null;

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [activeIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [activeIndex, filteredItems.length]);

  // Lock body scroll when modal is open and handle keyboard events
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, handlePrev, handleNext]);

  return (
    <>
      <SEO
        title="Clinic & Treatment Gallery | Chiro Care Ayurvedic Clinic Kochi"
        description="Take a visual tour of Chiro Care Ayurvedic Clinic in Kaloor, Kochi. Real photos of our treatment rooms, chiropractic setups, Ayurvedic Kizhi therapy, cupping, and consultation."
        canonicalPath="/gallery"
      />

      {/* Header Banner - Compact & Responsive on Mobile */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 md:py-24 bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/gallery/chiropractic-treatment-room-adjustment-table-kaloor.webp')" }}
        />
        <div className="absolute bottom-[-20%] right-[10%] w-72 md:w-96 h-72 md:h-96 bg-[#00C7A0]/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00C7A0] font-extrabold flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C7A0]" />
            Real Clinic Photographs
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-wide leading-tight px-2">
            Clinic & Treatment Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed font-medium px-2">
            Browse authentic photographs of our modern chiropractic adjustment rooms, traditional Ayurvedic therapy spaces, consultation suites, and natural medicine dispensary in Kaloor, Kochi.
          </p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/80 font-semibold px-2">
            <MapPin className="w-3.5 h-3.5 text-[#00C7A0] shrink-0" />
            <span className="truncate max-w-[320px] sm:max-w-none">Bank Road, Avenue 5, Metro Pillar 567, Kaloor, Ernakulam</span>
          </div>
        </div>
      </section>

      {/* Category selector - Mobile horizontally scrollable with visible padding and no cutoff */}
      <section className="py-4 sm:py-6 md:py-8 bg-[#EEF8F6] px-4 sm:px-6 md:px-8 relative z-10 border-b border-[#00C7A0]/15">
        <div className="max-w-7xl mx-auto">
          {/* Scrollable pill container with padding and left-alignment on mobile, centered on desktop */}
          <div className="flex items-center justify-start md:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none snap-x touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(null);
                }}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 snap-start active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white shadow-md shadow-[#00C7A0]/25 ring-2 ring-[#00C7A0]/30"
                    : "bg-white text-[#0088A9] border border-[#00C7A0]/20 hover:bg-[#EEF8F6]"
                }`}
              >
                {cat}
                <span className="ml-1.5 sm:ml-2 text-[10px] opacity-80 font-semibold">
                  ({cat === "All" ? galleryItems.length : galleryItems.filter((i) => i.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid - 1 Col on Mobile, 2 on Tablet, 3 on Desktop */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#F8FCFB] px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border border-[#00C7A0]/15 bg-[#EEF8F6] transition-all duration-300 active:scale-[0.98]"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Persistent caption bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#17332E]/95 via-[#17332E]/60 to-transparent p-4 sm:p-5 text-left text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#00C7A0] font-extrabold block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#00C7A0]/90 text-white flex items-center justify-center shrink-0 ml-2 shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover Backdrop overlay on desktop */}
                  <div className="hidden md:flex absolute inset-0 bg-[#005D73]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-6 text-left text-white">
                    <div className="w-10 h-10 rounded-full bg-[#00C7A0] text-white flex items-center justify-center mb-3 shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#00C7A0] font-black">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-black text-lg leading-snug mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-white/90 font-medium line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-[#00C7A0] font-bold mt-2 inline-flex items-center gap-1">
                      Click to expand full preview →
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Fully Responsive on Mobile & Desktop, z-[100] above floating WhatsApp */}
      <AnimatePresence>
        {activeImage && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 bg-[#17332E]/95 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
          >
            {/* Desktop Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white hover:text-[#00C7A0] w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all z-50 cursor-pointer border border-white/10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Desktop Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white hover:text-[#00C7A0] w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all z-50 cursor-pointer border border-white/10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Content Card */}
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20 max-h-[92vh] my-auto"
            >
              {/* Close Button - Always Accessible */}
              <button
                onClick={() => setActiveIndex(null)}
                aria-label="Close image preview"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-[#00C7A0] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all z-30 cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container with In-Frame Mobile Navigation */}
              <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={activeImage.img}
                  alt={activeImage.alt}
                  decoding="async"
                  className="w-full h-auto max-h-[38vh] sm:max-h-[46vh] md:max-h-[80vh] object-contain"
                />

                {/* Mobile Navigation Arrows (Inside Image Frame, Never Overlapping Text) */}
                <div className="md:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous image"
                    className="pointer-events-auto w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:text-[#00C7A0] backdrop-blur-sm shadow-md active:scale-90 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next image"
                    className="pointer-events-auto w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:text-[#00C7A0] backdrop-blur-sm shadow-md active:scale-90 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Info Column */}
              <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 text-left flex flex-col justify-between bg-[#EEF8F6] overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-[11px] text-[#0088A9] font-bold uppercase tracking-wider bg-[#0088A9]/10 px-2.5 sm:px-3 py-1 rounded-full">
                      {activeImage.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#17332E]/60 font-bold">
                      {activeIndex + 1} of {filteredItems.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#17332E] leading-tight">
                    {activeImage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#17332E]/75 leading-relaxed mt-2 sm:mt-4 font-medium">
                    {activeImage.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#00C7A0]/15 flex flex-col gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#17332E]/70 font-semibold">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0088A9] shrink-0" />
                      <span>Kaloor, Ernakulam, Kerala</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#0088A9] shrink-0" />
                      <span>Doctor-Supervised Sessions</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-8 flex flex-col gap-2.5 sm:gap-3">
                  <Link
                    to="/contact"
                    onClick={() => setActiveIndex(null)}
                    className="bg-gradient-to-r from-[#00C7A0] to-[#0088A9] hover:opacity-95 text-white py-3 sm:py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors w-full text-center shadow-md shadow-[#00C7A0]/25 flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Link>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="border border-[#17332E]/20 text-[#17332E]/75 hover:bg-white py-2 sm:py-2.5 rounded-xl font-semibold text-xs transition-colors w-full text-center cursor-pointer active:scale-98"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
