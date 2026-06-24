import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SEO from "../seo/SEO";

const About = () => {
  const team = [
    {
      name: "Dr. Ananya Nair",
      role: "Chief Ayurvedic Consultant & BAMS",
      qual: "BAMS (Bachelor of Ayurvedic Medicine & Surgery), MD Ayurveda",
      exp: "14+ Years of Clinical Practice",
      desc: "Dr. Ananya Nair is a veteran Ayurvedic physician specialized in pulse diagnostics (Nadi Pariksha) and custom Panchakarma cleansing plans. She focuses on aligning bodily energies and reducing tissue inflammation naturally.",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dr. Rohan Matthews",
      role: "Senior Chiropractor & Orthopedic Consultant",
      qual: "DC (Doctor of Chiropractic - USA), MS Corrective Biomechanics",
      exp: "25+ Years of Spine Care",
      desc: "Dr. Rohan Matthews specializes in structural spinal decompression, biomechanical gait balancing, and sports injury recovery. He applies non-invasive alignment techniques to relieve deep nerve compression.",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about Chiro Care Ayurvedic Clinic's mission, philosophy, and the experienced medical team behind our Ayurveda and Chiropractic treatments."
        canonicalPath="/about"
      />

      {/* Compact Hero Banner (60-70vh) */}
      <section className="relative h-[60vh] md:h-[65vh] flex flex-col justify-center items-center bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            About Our Clinic
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Bridging Wisdom & Alignment
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-normal mt-1">
            Discover the clinical integration of structural chiropractic care and biological Ayurvedic detoxes designed for surgical-free pain recovery.
          </p>
        </div>
      </section>

      {/* Clinic Story (Highly Simplified, Reduced Text, Expanded Image) */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Story */}
          <div className="lg:col-span-7 text-left flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9]">
              Our Roots
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#17332E] leading-tight">
              The Genesis of a Healing Synthesis
            </h2>
            <p className="text-sm md:text-base text-[#17332E]/80 leading-relaxed font-normal">
              Chiro Care Ayurvedic Clinic was established in Ernakulam to resolve complex skeletal and joint wear without synthetic drugs or high-risk surgeries. 
            </p>
            <p className="text-sm md:text-base text-[#17332E]/80 leading-relaxed font-normal">
              By combining precise chiropractic decompression to correct spinal alignment with localized Ayurvedic therapies to nourish inflamed deep tissues, we provide a holistic, permanent recovery solution for chronic pain sufferers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-xs md:text-sm font-bold text-[#0088A9]">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00C7A0] shrink-0" />
                Double Diagnosis Protocol
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00C7A0] shrink-0" />
                100% Drug-Free Realignments
              </span>
            </div>
          </div>

          {/* Picture frame (Expanded by 30% visual presence) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#00C7A0]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600"
                alt="Clinic Treatment Setup"
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Profiles (Specialists Focus) */}
      <section className="py-24 bg-[#EEF8F6] px-4 md:px-8 border-t border-[#00C7A0]/15 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9]">
              Our Specialists
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#17332E] leading-tight">
              Clinical Leadership
            </h2>
            <p className="text-sm text-[#17332E]/70 max-w-md mx-auto font-normal">
              Experienced medical directors specializing in chiropractic orthopedics and biological purification.
            </p>
          </div>

          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#00C7A0]/10 shadow-md ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo (Prominent image sizing) */}
                <div className={`lg:col-span-5 rounded-[2rem] overflow-hidden h-72 relative ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700 pointer-events-none"
                  />
                </div>

                {/* Details */}
                <div className={`lg:col-span-7 text-left flex flex-col gap-3.5 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#17332E] leading-tight">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-[#0088A9] uppercase tracking-wider block mt-1">
                      {member.role}
                    </span>
                    <span className="text-[10px] text-[#17332E]/60 font-medium block mt-0.5 leading-snug">
                      {member.qual}
                    </span>
                    <span className="inline-block bg-[#EEF8F6] text-[#0088A9] text-[10px] font-bold px-3 py-1.5 rounded-lg mt-3 uppercase tracking-wide">
                      {member.exp}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed font-normal">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
