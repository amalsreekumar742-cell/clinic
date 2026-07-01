import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle, CheckCircle, ChevronRight, Leaf, Calendar, Phone } from "lucide-react";
import SEO from "../seo/SEO";
import { treatments } from "../data/treatments";
import { getBreadcrumbSchema } from "../seo/site";

const TreatmentDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find corresponding treatment
  const treatment = treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h2 className="font-serif text-2xl font-black text-[#17332E] mb-2">Treatment Not Found</h2>
        <p className="text-xs md:text-sm text-[#17332E]/60 mb-6 font-semibold">The Ayurvedic therapy program you are looking for does not exist.</p>
        <Link to="/treatments" className="bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-6 py-3 rounded-full text-xs font-bold shadow transition-all">
          Back to Treatments
        </Link>
      </div>
    );
  }
  const treatmentFaqs = [
    {
      question: `What is ${treatment.title} used for?`,
      answer: `${treatment.title} is commonly used as Ayurvedic support for ${treatment.indications.slice(0, 3).join(", ").toLowerCase()} after a consultation.`,
    },
    {
      question: `How is ${treatment.title.toLowerCase()} planned at Chiro Care?`,
      answer: "The therapy plan is selected after reviewing symptoms, body constitution, comfort level, and clinical suitability.",
    },
    {
      question: "Where can I take this therapy?",
      answer: "You can request the therapy at Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam, Kerala.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: treatmentFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO 
        title={`${treatment.title} Therapy in Kerala`}
        description={treatment.shortDesc}
        canonicalPath={`/treatments/${treatment.slug}`}
        schemas={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Treatments", path: "/treatments" },
            { name: treatment.title, path: `/treatments/${treatment.slug}` },
          ]),
          faqSchema,
        ]}
      />

      {/* Breadcrumbs */}
      <section className="bg-[#EEF8F6] border-b border-[#00C7A0]/15 py-5 px-4 md:px-8 text-xs font-semibold relative z-10 text-left">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[#17332E]/75">
          <Link to="/" className="hover:text-[#0088A9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <Link to="/treatments" className="hover:text-[#0088A9] transition-colors">Treatments</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <span className="text-[#0088A9] font-black">{treatment.title}</span>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20 bg-[#F8FCFB] px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/treatments")}
            className="inline-flex items-center gap-2 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Treatments Catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0088A9]/10 flex items-center justify-center text-[#0088A9] shrink-0 border border-[#0088A9]/5">
                  <Leaf className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-black text-[#17332E] leading-tight">
                    {treatment.title}
                  </h1>
                  <span className="text-xs font-bold text-[#00C7A0] uppercase tracking-wider block mt-1.5">
                    Authentic Ayurvedic Therapy
                  </span>
                </div>
              </div>

              <div className="text-sm md:text-base text-[#17332E]/80 leading-relaxed font-semibold mt-4 flex flex-col gap-4">
                <p>{treatment.longDesc}</p>
                <p>
                  At Chiro Care, all Ayurvedic treatments are performed under the guidance of BAMS doctors by certified therapists using warm medicated oils formulated dynamically depending on your Vata, Pitta, or Kapha composition. This guarantees cell-level restoration and relief.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="mt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#17332E] mb-4">
                  Primary Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {treatment.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs md:text-sm text-[#17332E]/80 leading-relaxed bg-[#EEF8F6]/60 p-4 rounded-xl border border-[#00C7A0]/10 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#00C7A0] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indications */}
              <div className="mt-6 border-t border-[#00C7A0]/15 pt-8">
                <h3 className="font-serif text-lg sm:text-xl font-black text-[#17332E] mb-4">
                  Common Clinical Indications
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {treatment.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-[#EEF8F6] border border-[#00C7A0]/20 text-[#0088A9] text-xs font-bold shadow-sm"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-[#00C7A0]/15 pt-8">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#17332E] mb-4">
                  {treatment.title} Therapy Process
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Consultation",
                      text: "The team reviews your symptoms, comfort level, medical context, and Ayurvedic body constitution before therapy selection.",
                    },
                    {
                      title: "Preparation",
                      text: "Medicated oils, herbal materials, session duration, and pressure levels are chosen according to the therapy and patient tolerance.",
                    },
                    {
                      title: "Aftercare",
                      text: "You receive practical guidance on rest, hydration, food timing, movement, and follow-up scheduling for better results.",
                    },
                  ].map((item) => (
                    <article key={item.title} className="bg-white border border-[#00C7A0]/10 rounded-2xl p-5 shadow-sm">
                      <h3 className="font-serif text-base font-black text-[#0088A9] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#17332E]/75 leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-[#00C7A0]/15 pt-8">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#17332E] mb-4">
                  Questions About {treatment.title}
                </h2>
                <div className="divide-y divide-[#00C7A0]/10 border-y border-[#00C7A0]/10">
                  {treatmentFaqs.map((faq, index) => (
                    <details key={faq.question} className="py-4 group" open={index === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-[#17332E]">
                        <span>{faq.question}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF8F6] text-[#0088A9] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-xs md:text-sm text-[#17332E]/75 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </details>
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
                  Request Session
                </h4>
                <p className="text-xs text-[#17332E]/70 leading-relaxed font-semibold">
                  Arrange a session at our wellness clinic. We recommend booking in advance as slots are limited.
                </p>
                
                <div className="flex flex-col gap-3.5 mt-2">
                  <Link
                    to="/contact"
                    state={{ selectedService: treatment.title }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-[#00C7A0]/25 transition-all text-center"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Session Now
                  </Link>
                  <a
                    href="tel:+916282018754"
                    className="flex items-center justify-center gap-2 border border-[#0088A9]/20 text-[#0088A9] py-3.5 rounded-xl font-bold text-xs hover:bg-white transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00C7A0]" />
                    Call +91 6282018754
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TreatmentDetail;
