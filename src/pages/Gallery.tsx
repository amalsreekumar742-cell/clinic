import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SEO from "../seo/SEO";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);

  const categories = ["All", "Clinic Rooms", "Treatments", "Herbal Pharmacy"];

  const galleryItems = [
    {
      id: 1,
      category: "Clinic Rooms",
      title: "Premium Consult Room",
      img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      category: "Treatments",
      title: "Shirodhara Therapy Session",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      category: "Herbal Pharmacy",
      title: "Traditional Medicated Oils",
      img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      category: "Clinic Rooms",
      title: "Zen Recovery Lounge",
      img: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      category: "Treatments",
      title: "Chiropractic Spinal Correction",
      img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      category: "Herbal Pharmacy",
      title: "Crushed Ayurvedic Herbs",
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 7,
      category: "Clinic Rooms",
      title: "Reception Area",
      img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 8,
      category: "Treatments",
      title: "Warm Herbal Kizhi Bolus",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <>
      <SEO 
        title="Clinic Gallery" 
        description="Take a visual tour of Chiro Care Ayurvedic Clinic, featuring our treatment rooms, chiropractic setups, herbal pharmacy, and wellness lounges."
        canonicalPath="/gallery"
      />

      {/* Header Banner */}
      <section className="relative py-24 bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            Visual Experience
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-wide leading-tight">
            Clinic Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-semibold mt-1">
            Browse high-definition photography showcasing our clean, peaceful, and fully equipped therapy spaces, herbal pharmacy, and clinical rooms.
          </p>
        </div>
      </section>

      {/* Category selector */}
      <section className="py-8 bg-[#EEF8F6] px-4 md:px-8 relative z-10 border-b border-[#00C7A0]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white shadow-md shadow-[#00C7A0]/25"
                  : "bg-white text-[#0088A9] border border-[#00C7A0]/20 hover:bg-[#EEF8F6]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveImage(item)}
                  className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-[#00C7A0]/10"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Backdrop overlay */}
                  <div className="absolute inset-0 bg-[#005D73]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left text-white">
                    <ZoomIn className="w-6 h-6 text-[#00C7A0] mb-2" />
                    <h4 className="font-serif font-black text-sm leading-snug">{item.title}</h4>
                    <span className="text-[9px] uppercase tracking-widest text-[#00C7A0] font-extrabold mt-1">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-[#17332E]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[#00C7A0] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20"
            >
              <div className="md:w-2/3 aspect-[4/3] bg-black">
                <img
                  src={activeImage.img}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-8 text-left flex flex-col justify-center bg-[#EEF8F6]">
                <span className="text-[10px] text-[#0088A9] font-bold uppercase tracking-wider">
                  {activeImage.category}
                </span>
                <h3 className="font-serif text-2xl font-black text-[#17332E] mt-2 leading-tight">
                  {activeImage.title}
                </h3>
                <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed mt-4 font-semibold">
                  Experience clean, medical-grade, and peaceful spaces when receiving therapies at Chiro Care Clinic, Outer Ring Road, Bellandur.
                </p>
                <button
                  onClick={() => setActiveImage(null)}
                  className="mt-8 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] hover:opacity-95 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors w-full text-center shadow-md shadow-[#00C7A0]/25"
                >
                  Close Lightbox
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
