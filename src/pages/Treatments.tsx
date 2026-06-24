import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import SEO from "../seo/SEO";
import { treatments } from "../data/treatments";

const Treatments = () => {
  return (
    <>
      <SEO 
        title="Ayur Treatments" 
        description="Explore our traditional Ayurvedic treatments: Panchakarma, Shirodhara, Abhyanga, Pizhichil, and custom detox plans."
        canonicalPath="/treatments"
      />

      {/* Header Banner */}
      <section className="relative py-24 bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            Pure Natural Detox
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-wide leading-tight">
            Ayurvedic Treatments
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-semibold mt-1">
            Rebalance your physical bio-energies (Vata, Pitta, Kapha) and cleanse organic tissues using our traditional medicated oil treatments and thermal therapies.
          </p>
        </div>
      </section>

      {/* Treatments list grid */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl glass-card glass-card-hover border border-white/60 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C7A0]/10 to-[#0088A9]/10 flex items-center justify-center text-[#0088A9] mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                
                <h3 className="font-serif text-xl font-black text-[#17332E] mb-3">
                  {treatment.title}
                </h3>
                
                <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed mb-6 flex-grow font-medium">
                  {treatment.shortDesc}
                </p>

                {/* Indications teaser */}
                <div className="mb-6 w-full">
                  <span className="text-[10px] text-[#0088A9] font-bold uppercase tracking-wider block mb-2">
                    Highly Effective For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {treatment.indications.slice(0, 2).map((ind, idx) => (
                      <span key={idx} className="bg-white px-3 py-1.5 rounded-lg text-[10px] text-[#17332E]/70 border border-[#00C7A0]/10 font-bold shadow-sm">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="group/btn inline-flex items-center gap-1.5 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] transition-colors"
                >
                  View Therapy Process
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Treatments;
