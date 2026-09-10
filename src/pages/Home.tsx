import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Phone, ArrowRight, CheckCircle,
  MapPin, Clock, X, ChevronDown, ChevronUp,
  Award, Users, GraduationCap
} from "lucide-react";
import SEO from "../seo/SEO";
import { services } from "../data/services";
import { treatments } from "../data/treatments";
import { faqs, getFaqSchema } from "../seo/site";
import { getIconForName } from "../components/IconForName";

const CATEGORIES = [
  { id: "all", name: "All Programs" },
  { id: "spine-disc", name: "Spine & Disc" },
  { id: "head-neck", name: "Head & Neck" },
  { id: "joints-muscles", name: "Joints & Muscles" },
  { id: "ayurvedic", name: "Ayurvedic Therapies" },
  // { id: "wellness", name: "Wellness & Detox" }
];

const itemCategoryMap: Record<string, string> = {
  // Spine & Disc Care
  "disc-problems": "spine-disc",
  "sciatica": "spine-disc",
  "scoliosis": "spine-disc",
  "leg-length-measurement": "spine-disc",
  "slip-disc": "spine-disc",
  "whole-back-pain": "spine-disc",

  // Head & Neck
  "migraine-treatment": "head-neck",
  "headache-treatment": "head-neck",
  "cervical-spondylosis": "head-neck",
  "neck-pain": "head-neck",
  // "facial-paralysis": "head-neck",

  // Joints & Muscles
  "shoulder-pain": "joints-muscles",
  "knee-pain": "joints-muscles",
  "arthritis-treatment": "joints-muscles",
  "sports-injury": "joints-muscles",
  "whole-body-joint-pain": "joints-muscles",

  // Ayurvedic Therapies
  "panchakarma": "ayurvedic",
  "abhyanga": "ayurvedic",
  "kizhi-therapy": "ayurvedic",
  // "njavarakizhi": "ayurvedic",
  "shirodhara": "ayurvedic",
  "pizhichil": "ayurvedic",
  "nasya": "ayurvedic",
  "steam-bath": "ayurvedic",
  "full-body-massage": "ayurvedic",

  // Wellness & Detox
//   "stress-anxiety": "wellness",
//   "weight-loss": "wellness",
//   "detox-programs": "wellness",
//   "weight-management": "wellness",
//   "skin-care": "wellness",
//   "parkinson-support": "wellness"
};

// Unsplash high-end wellness/therapy images specifically chosen for the treatments (all unique, realistic)
const serviceImages: Record<string, string> = {
  // Spine & Disc
  "disc-problems": "/disc problems.webp",
  "sciatica": "/sciatica.webp",
  "scoliosis": "/scoliosis.webp",
  "leg-length-measurement": "/leg-length-measurement.webp",
  "slip-disc": "slip-disc.webp",
  "whole-back-pain": "whole-back-pain.webp",

  // Head & Neck
  "migraine-treatment": "migrain.webp",
  "headache-treatment": "/headache.webp",
  "cervical-spondylosis":"cervical-spondylosis.webp",
  "neck-pain": "/neck-pain.webp",
  // "facial-paralysis": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",

  // Joints & Muscles
  "shoulder-pain": "shoulder-pain.webp",
  "knee-pain": "knee_pain.webp",
  "arthritis-treatment": "/arthritis.webp",
  "sports-injury": "sports-pain.webp",
  "whole-body-joint-pain": "/whole-body-joint-pain.webp",

  // Ayurvedic Therapies
  "panchakarma": "panchakarma.webp",
  "abhyanga": "abhyanga.webp",
  "kizhi-therapy": "kizhi-therapy.webp",
  // "njavarakizhi": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600",
  "shirodhara": "shirodhara.webp",
  "pizhichil": "pizhichil.webp",
  "nasya": "nasya.webp",
  "steam-bath": "steam-bath.webp",
  "full-body-massage": "full-body-massage.webp",

  // Wellness & Detox / Other Support
  // "stress-anxiety": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
  // "weight-loss": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
  // "detox-programs": "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&q=80&w=600",
  // "weight-management": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
  // "skin-care": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
  // "parkinson-support": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
};

// Spine Motif background element
const SpineBackgroundPattern = () => (
  <div className="absolute right-[5%] top-[120vh] w-32 h-[450vh] opacity-4 pointer-events-none z-0 hidden lg:block select-none">
    <svg className="w-full h-full" viewBox="0 0 100 1200" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50,0 L 50,1200" stroke="#0088A9" strokeWidth="2.5" strokeDasharray="12 16" strokeLinecap="round" />
      {Array.from({ length: 18 }).map((_: any, i: number) => (
        <g key={i} transform={`translate(0, ${i * 65 + 60})`}>
          <circle cx="50" cy="10" r="5" fill="#00C7A0" />
          <path d="M 38,15 C 38,15 50,10 62,15 C 62,18 55,22 50,22 C 45,22 38,15 38,15 Z" fill="#0088A9" stroke="#ffffff" strokeWidth="1" />
        </g>
      ))}
    </svg>
  </div>
);

interface AnimatedCounterProps {
  value: string;
  label: string;
}

// Scroll-triggered Counter Component for Trust bar
const AnimatedCounter = ({ value, label }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let startTime: number | null = null;
    let animationFrame: number | undefined;

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const duration = 2000; // 2 seconds

            const animate = (timestamp: number) => {
              if (startTime === null) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);

              // Cubic ease-out curve
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setCount(Math.floor(easeOut * numericValue));

              if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
              } else {
                setCount(numericValue);
              }
            };

            animationFrame = requestAnimationFrame(animate);
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-4 flex flex-col items-center"
    >
      <span className="font-serif text-4xl md:text-5xl font-extrabold text-[#0088A9] block leading-none tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] text-[#17332E]/60 uppercase tracking-widest font-extrabold mt-2.5 block text-center max-w-[120px]">
        {label}
      </span>
    </motion.div>
  );
};

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAllServicesOpen, setIsAllServicesOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: ""
  });

  // Track cursor movement for subtle parallax in hero
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 75;
    const y = (clientY - innerHeight / 2) / 75;
    setMousePosition({ x, y });
  };

  // Open booking modal
  const handleBookClick = (preselectedService = "") => {
    setBookingData(prev => ({ ...prev, service: preselectedService }));
    setIsBookingOpen(true);
  };

  // Listen to the global Event Dispatcher for booking modal triggers
  useEffect(() => {
    const handleOpenModal = () => handleBookClick();
    window.addEventListener("open-booking-modal", handleOpenModal);
    return () => window.removeEventListener("open-booking-modal", handleOpenModal);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const formattedText = `Hello Chiro Care Clinic, I would like to book an appointment.

Booking Details:
- Name: ${bookingData.name}
- Phone: ${bookingData.phone}
- Email: ${bookingData.email}
- Treatment: ${bookingData.service}
- Preferred Date: ${bookingData.date}
${bookingData.message && bookingData.message.trim() ? `- Description: ${bookingData.message}` : ""}`;

    const whatsappUrl = `https://wa.me/916282018754?text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp URL in a new window/tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsConfirmed(true);
    setTimeout(() => {
      setBookingData({ name: "", phone: "", email: "", service: "", date: "", message: "" });
    }, 500);
  };

  // Unify all programs into one list
  const allPrograms = [
    ...services
      .map((s: any) => ({ ...s, type: "service", categoryId: itemCategoryMap[s.slug] }))
      .filter((s: any) => s.categoryId !== undefined),
    ...treatments
      .map((t: any) => ({ ...t, type: "treatment", categoryId: itemCategoryMap[t.slug] }))
      .filter((t: any) => t.categoryId !== undefined)
  ];

  // Active category filter state
  const [activeCategory, setActiveCategory] = useState("all");

  // Get matching programs
  const filteredPrograms = allPrograms.filter(
    (program) => activeCategory === "all" || program.categoryId === activeCategory
  );

  // For "all" category, we paginate with "isAllServicesOpen"
  // Let's show first 6 by default, and expand when open.
  // For other categories, we show all of them directly.
  const displayPrograms = activeCategory === "all"
    ? (isAllServicesOpen ? filteredPrograms : filteredPrograms.slice(0, 6))
    : filteredPrograms;

  const renderServiceCard = (service: any) => {
    const IconComponent = getIconForName(service.iconName) as React.ComponentType<any>;
    const imgUrl = serviceImages[service.slug];

    return (
      <div
        key={`${service.type}-${service.id}`}
        onClick={() => handleBookClick(service.title)}
        className="relative overflow-hidden rounded-[2rem] bg-white border border-[#00C7A0]/10 shadow-sm hover:shadow-xl hover:border-[#00C7A0]/35 transition-all duration-400 flex flex-col h-full group hover:-translate-y-1.5 cursor-pointer"
      >
        {/* Card Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={imgUrl}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-extrabold text-[#0088A9] tracking-wider uppercase border border-white/50 shadow-sm">
            {service.duration}
          </div>
        </div>

        {/* Card Content with Improved Text Sizing and Styling */}
        <div className="p-6 flex-grow flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#EEF8F6] text-[#0088A9] flex items-center justify-center border border-[#00C7A0]/10 group-hover:bg-[#00C7A0] group-hover:text-white transition-all shrink-0">
                <IconComponent className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#17332E] group-hover:text-[#0088A9] transition-colors leading-tight">
                {service.title}
              </h3>
            </div>

            {/* 3 Key Benefits with enlarged, readable text */}
            <ul className="space-y-2 mt-4 mb-5">
              {service.benefits.slice(0, 3).map((benefit: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#17332E]/90 font-medium leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={service.type === "treatment" ? `/treatments/${service.slug}` : `/services/${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="border-t border-[#00C7A0]/10 pt-4 flex items-center justify-between mt-auto w-full text-xs md:text-sm font-bold text-[#0088A9] group-hover:text-[#005D73] transition-colors text-left"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        title="Best Ayurvedic Clinic in Kerala for Back Pain & Panchakarma"
        description="Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam combines Ayurveda-informed chiropractic care, Panchakarma therapies, and non-surgical pain relief for back pain, migraine, sciatica, disc problems, and joint pain."
        canonicalPath="/"
        schemas={[getFaqSchema()]}
      />

      {/* ==================== 1. HERO SECTION ==================== */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        id="hero"
        className="relative min-h-fit lg:min-h-screen flex flex-col lg:justify-center pt-20 pb-0 overflow-hidden select-none"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a2a2a 100%)" }}
      >
        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        {/* Deep glowing orbs */}
        <div className="absolute top-[-15%] left-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none blob-float-1" style={{ background: "radial-gradient(circle, rgba(0,199,160,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full pointer-events-none blob-float-2" style={{ background: "radial-gradient(circle, rgba(0,136,169,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-[30%] left-[30%] w-[500px] h-[500px] rounded-full pointer-events-none blob-float-3" style={{ background: "radial-gradient(circle, rgba(0,199,160,0.06) 0%, transparent 70%)" }} />

        {/* Floating particles */}
        {[...Array(8)].map((_: any, i: number) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20 - i * 5, 0], x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 3), 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 11}%`,
              background: i % 2 === 0 ? "rgba(0,199,160,0.5)" : "rgba(0,136,169,0.5)",
              boxShadow: i % 2 === 0 ? "0 0 8px rgba(0,199,160,0.6)" : "0 0 8px rgba(0,136,169,0.6)"
            }}
          />
        ))}

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-[35%] w-px h-full opacity-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,199,160,0.8), transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full pt-1 pb-8 lg:py-0">
          {/* Left Column Content */}
          <div className="lg:col-span-6 flex flex-col items-start gap-3.5 sm:gap-4 md:gap-5 text-left">

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#00C7A0]/30 text-[10px] font-extrabold tracking-widest uppercase"
              style={{ background: "rgba(0,199,160,0.08)", backdropFilter: "blur(20px)", color: "#00C7A0" }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C7A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C7A0]"></span>
              </span>
              Trusted Chiropractic & Ayurvedic Care
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="font-serif font-extrabold leading-[0.9] tracking-tighter text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              Pain-Free<br />
              Movement<br />
              <span style={{ background: "linear-gradient(90deg, #00C7A0, #0088A9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Starts Here.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-base md:text-lg font-semibold leading-snug"
              style={{ color: "rgba(0,199,160,0.85)" }}
            >
              Advanced Chiropractic &amp; Ayurvedic Care<br />for Lasting Relief.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-sm md:text-base leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Personalized treatments for back pain, neck pain, sciatica, posture correction, and long-term wellness.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-1"
            >
              <button
                onClick={() => handleBookClick()}
                className="group flex items-center justify-center gap-2.5 text-white text-xs uppercase tracking-widest font-extrabold px-9 py-4.5 rounded-full cursor-pointer transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #00C7A0, #0088A9)", boxShadow: "0 0 30px rgba(0,199,160,0.35), 0 8px 32px rgba(0,136,169,0.3)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,199,160,0.5), 0 12px 40px rgba(0,136,169,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,199,160,0.35), 0 8px 32px rgba(0,136,169,0.3)"; }}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-extrabold px-9 py-4 rounded-full transition-all duration-300"
                style={{ border: "1.5px solid rgba(0,199,160,0.35)", color: "rgba(0,199,160,0.9)", background: "rgba(0,199,160,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,199,160,0.12)"; e.currentTarget.style.borderColor = "rgba(0,199,160,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,199,160,0.05)"; e.currentTarget.style.borderColor = "rgba(0,199,160,0.35)"; }}
              >
                View Services
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Trust mini-strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-4 mt-2 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex -space-x-2">
                {["#00C7A0", "#0088A9", "#005D73"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white/10 flex items-center justify-center text-[8px] font-black text-white" style={{ background: c }}>P</div>
                ))}
              </div>
              <p className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span style={{ color: "#00C7A0", fontWeight: 800 }}>10,000+</span> patients recovered this year
              </p>
            </motion.div>
          </div>

          {/* Right Column: Doctor Portrait + Floating Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 min-h-[520px] lg:min-h-[620px]">

            {/* Outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{ width: "88%", height: "88%", background: "radial-gradient(circle, rgba(0,199,160,0.15) 0%, transparent 70%)", filter: "blur(20px)" }}
            />
            {/* Inner ring decoration */}
            <div className="absolute pointer-events-none rounded-full" style={{ width: "72%", height: "72%", border: "1px solid rgba(0,199,160,0.12)" }} />
            <div className="absolute pointer-events-none rounded-full" style={{ width: "88%", height: "88%", border: "1px solid rgba(0,136,169,0.08)" }} />

            {/* Doctor portrait main frame */}
            <motion.div
              style={{ x: mousePosition.x * 0.25, y: mousePosition.y * 0.25, width: "82%", maxWidth: "420px" }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Frame border glow */}
              <div className="absolute -inset-1 rounded-[3rem] pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,199,160,0.5), rgba(0,136,169,0.5), transparent)", filter: "blur(8px)" }} />
              <div className="relative aspect-[4/5] rounded-[2.8rem] overflow-hidden" style={{ border: "2px solid rgba(0,199,160,0.3)", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,199,160,0.1)" }}>
                <img
                  src="/Dr.Neena James.webp?auto=format&fit=crop&q=80&w=800"
                  alt="Dr.Neena James "
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, rgba(10,22,40,0.2) 40%, transparent 70%)" }} />
                {/* Name badge at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                  <p className="text-white font-extrabold text-base font-serif leading-tight">Dr. Neena James</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#00C7A0" }}>BAMS</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1: 25+ Years — Top Left */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: mousePosition.x * -0.7, y: mousePosition.y * -0.7 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute top-[6%] -left-4 sm:-left-10 z-20"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,199,160,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,199,160,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,199,160,0.2), rgba(0,136,169,0.2))", border: "1px solid rgba(0,199,160,0.3)" }}>
                  <Award className="w-5 h-5" style={{ color: "#00C7A0" }} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-extrabold text-white text-sm">25+</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: "rgba(0,199,160,0.7)" }}>Years Exp.</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: 10000+ Patients — Top Right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              style={{ x: mousePosition.x * 0.6, y: mousePosition.y * -0.6 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute top-[22%] -right-4 sm:-right-10 z-20"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,136,169,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,136,169,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,136,169,0.2), rgba(0,93,115,0.2))", border: "1px solid rgba(0,136,169,0.3)" }}>
                  <Users className="w-5 h-5" style={{ color: "#0088A9" }} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-extrabold text-white text-sm">10,000+</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: "rgba(0,136,169,0.8)" }}>Patients</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3: 98% Success — Bottom Left */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              style={{ x: mousePosition.x * -0.5, y: mousePosition.y * 0.5 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute bottom-[20%] -left-4 sm:-left-10 z-20"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,199,160,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,199,160,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,199,160,0.2), rgba(0,93,115,0.2))", border: "1px solid rgba(0,199,160,0.3)" }}>
                  <CheckCircle className="w-5 h-5" style={{ color: "#00C7A0" }} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-extrabold text-white text-sm">98%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: "rgba(0,199,160,0.7)" }}>Success Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 4: USA Trained — Bottom Right */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              style={{ x: mousePosition.x * 0.6, y: mousePosition.y * 0.6 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute bottom-[8%] -right-4 sm:-right-10 z-20"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,136,169,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,136,169,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,136,169,0.2), rgba(0,93,115,0.2))", border: "1px solid rgba(0,136,169,0.3)" }}>
                  <GraduationCap className="w-5 h-5" style={{ color: "#0088A9" }} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-extrabold text-white text-sm">USA</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: "rgba(0,136,169,0.8)" }}>Trained Specialist</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(248,252,251,0.95))" }} />
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-b from-[#F8FCFB] to-[#EEF8F6] py-10 px-4 md:px-8 border-y border-[#00C7A0]/10 select-none relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedCounter value="5+" label="Years Experience" />
          <AnimatedCounter value="100+" label="Patients Treated" />
          <AnimatedCounter value="98%" label="Success Rate" />
          <AnimatedCounter value="3+ Years" label="Local Trust" />
        </div>
      </motion.section>

      {/* ==================== 3. OUR SERVICES ==================== */}
      <section id="services" className="py-8 md:py-16 lg:py-24 bg-[#EEF8F6]/30 px-4 md:px-8 relative z-10 select-none">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9] block mb-3">
              Core Healing Programs
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#17332E] leading-[0.95]">
              Our Healing Programs
            </h2>
            <p className="text-xs sm:text-sm text-[#17332E]/70 mt-3 max-w-md mx-auto leading-relaxed">
              Specialized treatments for pain relief, posture correction, and long-term wellness. Zero surgical intervention.
            </p>
          </div>

          {/* Category Tabs Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-3 scrollbar-none max-w-5xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsAllServicesOpen(false); // Reset expansion on tab change
                  }}
                  className="relative px-5 py-2.5 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer overflow-hidden border border-[#00C7A0]/15"
                  style={{
                    color: isActive ? "#ffffff" : "#0088A9"
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-[#00C7A0] to-[#0088A9]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Services/Programs Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayPrograms.map((program: any) => (
                <motion.div
                  key={`${program.type}-${program.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderServiceCard(program)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Large CTA: View All Services (Toggles Inline Grid Expansion) */}
          {activeCategory === "all" && filteredPrograms.length > 6 && (
            <div className="text-center mt-6 md:mt-10 lg:mt-12">
              <button
                onClick={() => setIsAllServicesOpen(!isAllServicesOpen)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-8 py-4.5 rounded-full font-extrabold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
              >
                {isAllServicesOpen ? "Show Less" : "View All Services"}
                {isAllServicesOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================== 4. ABOUT CHIRO CARE ==================== */}
      <section id="about" className="py-8 md:py-16 lg:py-24 bg-white px-4 md:px-8 relative z-10 select-none border-t border-[#EEF8F6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Column: Overlapping Images Collage (30% larger visual weight) */}
          <div className="lg:col-span-6 relative h-[340px] sm:h-[420px] md:h-[500px] w-full mt-6 lg:mt-0">
            {/* Soft glowing background element */}
            <div className="absolute inset-0 bg-[#0088A9]/5 rounded-full blur-3xl -z-10 scale-90" />

            {/* Main Image (Large, central left): Spinal adjustment */}
            <motion.div
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute left-[5%] top-[10%] w-[55%] aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/90 z-10"
            >
              <img
                src="sirodhara_main.webp"
                alt="Chiropractor performing spinal adjustment"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17332E]/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Supporting Image 1: Ayurvedic Therapy (Top Right, overlapping) */}
            <motion.div
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute right-[5%] top-0 w-[42%] aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/90 z-20 transform rotate-[3deg]"
            >
              <img
                src="kizhi.webp"
                alt="Ayurvedic therapy treatment"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17332E]/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Supporting Image 2: Clinical Consultation (Bottom Right, overlapping) */}
            <motion.div
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute right-[10%] bottom-[5%] w-[45%] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/90 z-20 transform rotate-[-4deg]"
            >
              <img
                src="steam-bath.webp"
                alt="Doctor consulting patient"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17332E]/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: Text content (Strict 2-3 sentences) */}
          <div className="lg:col-span-6 text-left flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#00C7A0]">
              Spine Alignment & Natural Healing
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#17332E] leading-[0.95]">
              Natural Alignment. <br />
              Purified Release.
            </h2>
            <p className="text-sm md:text-base text-[#17332E]/80 leading-relaxed font-normal mt-2">
              Combining modern chiropractic techniques with traditional Ayurvedic healing, Chiro Care helps patients achieve lasting relief, improved mobility, and better quality of life. We address structural spinal issues alongside natural biological purification to ensure drug-free, non-surgical recovery.
            </p>

            <div className="mt-4">
              <button
                onClick={() => handleBookClick()}
                className="inline-flex items-center gap-2 bg-[#0088A9] text-white hover:bg-[#005D73] px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Schedule consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. MEET OUR DOCTORS ==================== */}
      <section id="doctor" className="py-8 md:py-16 lg:py-24 bg-[#EEF8F6]/30 px-4 md:px-8 relative z-10 border-t border-[#EEF8F6] select-none">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9] block mb-3">
              Clinical Excellence
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#17332E] leading-[0.95]">
              Meet Our Medical Experts
            </h2>
            <p className="text-xs sm:text-sm text-[#17332E]/70 mt-3 max-w-md mx-auto leading-relaxed">
              Our specialists lead your non-surgical recovery by integrating advanced structural alignment with traditional biological rejuvenation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-6xl mx-auto">

            {/* Doctor 1: Dr. Neena James */}
            <div className="flex flex-col sm:flex-row bg-white p-5 rounded-[2.2rem] border border-[#00C7A0]/10 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-[540px] mx-auto w-full gap-5 items-stretch">
              {/* Doctor Portrait Frame */}
              <div className="relative w-full sm:w-[42%] aspect-[4/5] sm:aspect-auto rounded-[1.8rem] bg-gradient-to-tr from-[#00C7A0]/15 to-[#0088A9]/15 overflow-hidden shadow-md border-4 border-white shrink-0 min-h-[360px]">
                <img
                  src="/Dr.Neena James.webp?auto=format&fit=crop&q=80&w=800"
                  alt="Dr. Neena James BAMS"
                  className="w-full h-full object-cover pointer-events-none hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0088A9]/10 to-transparent pointer-events-none" />
              </div>

              {/* Doctor Info */}
              <div className="text-left flex flex-col flex-grow gap-3 justify-between py-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0088A9] block mb-0.5">
                    Ayurvedic Physician & Consultant
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#17332E] leading-tight">
                    Dr. Neena James             

                  </h3>
                </div>

                {/* Bullet Credentials */}
                <div className="flex flex-col gap-2 mt-1 font-semibold text-[#17332E] text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>BAMS Degree Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Nadi Pariksha (Pulse Diagnosis)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Panchakarma & Detox Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Spine & Joint Care Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Biological Rejuvenation Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>5+ Years Clinical Exp.</span>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2 flex">
                  <button
                    onClick={() => handleBookClick("Ayurvedic Consultation")}
                    className="btn-premium w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 rounded-full shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book Ayurvedic Session
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2: Mr. Lijomon MJ */}
            <div className="flex flex-col sm:flex-row bg-white p-5 rounded-[2.2rem] border border-[#00C7A0]/10 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-[540px] mx-auto w-full gap-5 items-stretch">
              {/* Doctor Portrait Frame */}
              <div className="relative w-full sm:w-[42%] aspect-[4/5] sm:aspect-auto rounded-[1.8rem] bg-gradient-to-tr from-[#00C7A0]/15 to-[#0088A9]/15 overflow-hidden shadow-md border-4 border-white shrink-0 min-h-[360px]">
                <img
                  src="/Dr.Lijomon M J.webp?auto=format&fit=crop&q=80&w=800"
                  alt="Mr. Lijomon MJ (Chiropractor)"
                  className="w-full h-full object-cover pointer-events-none hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0088A9]/10 to-transparent pointer-events-none" />
              </div>

              {/* Doctor Info */}
              <div className="text-left flex flex-col flex-grow gap-3 justify-between py-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0088A9] block mb-0.5">
                    Lead Spine Chiropractor
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#17332E] leading-tight">
                    Mr. Lijomon MJ (Chiropractor)
                  </h3>
                </div>

                {/* Bullet Credentials */}
                <div className="flex flex-col gap-2 mt-1 font-semibold text-[#17332E] text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Dip. in marma and massage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>USA-Trained Spinal Manipulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Spine & Joint Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Pain Management Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>Ayurvedic Marma Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00C7A0] shrink-0" />
                    <span>5+ Years Experience</span>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2 flex">
                  <button
                    onClick={() => handleBookClick("Chiropractic Consultation")}
                    className="btn-premium w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 rounded-full shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book Chiropractic Session
                  </button>
                </div>
              </div>
            </div>  </div>

          </div>
      </section>

      {/* ==================== 6. LOCATION & CONTACT ==================== */}
      <section id="contact" className="py-8 md:py-16 lg:py-24 bg-white px-4 md:px-8 relative z-10 border-t border-[#EEF8F6] overflow-hidden select-none">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9] block mb-3">
              Visit Center
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#17332E] leading-[0.95]">
              Visit Chiro Care
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 lg:items-stretch">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:justify-between justify-start text-left">
              <div className="flex flex-col gap-4">
                <a
                  href="https://maps.google.com/?q=10.003362,76.299104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 bg-[#EEF8F6]/40 p-4.5 rounded-2xl border border-[#00C7A0]/5 hover:bg-[#EEF8F6]/75 transition-colors cursor-pointer group"
                >
                  <MapPin className="w-5.5 h-5.5 text-[#0088A9] group-hover:text-[#00C7A0] shrink-0 mt-0.5 transition-colors" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#17332E] mb-1">Clinic Address</h4>
                    <p className="text-[11px] text-[#17332E]/80 leading-relaxed font-semibold">
                      BRRA 46, Bank Road, Metro pillar.567, Avenue.5th, Kaloor, Ernakulam - 682017
                    </p>
                    <span className="text-[9px] text-[#0088A9] font-bold uppercase tracking-wider mt-1 block">
                      Open in Google Maps →
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 bg-[#EEF8F6]/40 p-4.5 rounded-2xl border border-[#00C7A0]/5">
                  <Phone className="w-5.5 h-5.5 text-[#0088A9] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#17332E] mb-1">Direct Contacts</h4>
                    <p className="text-xs font-bold text-[#17332E]/90 leading-relaxed">
                      Lijomon MJ (Chiropractor): <span className="text-[#0088A9]">+91 9778084638</span> <br />
                      Manish (Proprietor): <span className="text-[#0088A9]">+91 7902361210</span> <br />
                      Office Desk: <span className="text-[#0088A9]">6282018754</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-[#EEF8F6]/40 p-4.5 rounded-2xl border border-[#00C7A0]/5">
                  <Clock className="w-5.5 h-5.5 text-[#0088A9] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#17332E] mb-1">Working Hours</h4>
                    <p className="text-[11px] text-[#17332E]/70 font-semibold leading-relaxed">
                      Mon - Sat: 9:00 AM - 8:00 PM <br />
                      Sunday: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <a
                  href="tel:+916282018754"
                  className="flex items-center justify-center gap-2 bg-[#EEF8F6] text-[#0088A9] hover:bg-[#0088A9]/10 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-[#00C7A0]/10 text-center cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call Clinic
                </a>
                <a
                  href="https://wa.me/916282018754?text=Hello%20Chiro%20Care%20Clinic,%20I'd%20like%20to%20schedule%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-[#25D366]/10 text-center cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l148.4-38.9c32.4 17.7 68.9 27 105.8 27 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65.3-157c-1.3-1.3-1.3-1.3-2.6-2.6zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Panel */}
            <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-[#00C7A0]/15 shadow-xl relative min-h-[350px] bg-[#EEF8F6] flex items-stretch w-full">
              {/* Working Google Map Embed Frame */}
              <iframe
                title="Chiro Care Clinic Location Map"
                src="https://maps.google.com/maps?q=10.003362,76.299104&z=17&output=embed"
                className="w-full h-full border-0 min-h-[350px]"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. CONSULTATION CTA ==================== */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white select-none border-t border-[#EEF8F6] relative z-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#00C7A0]/10 blur-[75px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-[#EEF8F6]/5 rounded-[3rem] border border-white/10 relative overflow-hidden p-6 md:p-14 shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              {/* Text */}
              <div className="lg:col-span-8 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
                  Reservations Desk
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[0.95]">
                  Ready To Start Healing?
                </h2>
                <p className="text-sm md:text-base text-white/80 font-normal mt-2.5 max-w-lg leading-relaxed">
                  Book your consultation today with Chiropractor Lijomon MJ and begin your recovery journey.
                </p>
              </div>

              {/* CTAs */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 justify-start lg:justify-end w-full">
                <button
                  onClick={() => handleBookClick("Consultation Request")}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#00C7A0] hover:bg-white hover:text-[#0088A9] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-full transition-all shadow-md cursor-pointer text-center w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
                <a
                  href="tel:+916282018754"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/10 border border-white/30 text-white hover:bg-white hover:text-[#005D73] font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-full transition-all text-center w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-8 md:py-14 bg-white px-4 md:px-8 relative z-10 border-t border-[#EEF8F6] select-none">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-6">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9] block mb-2">
              Patient Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#17332E] leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#00C7A0]/12 border-y border-[#00C7A0]/12 text-left">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group py-4" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm md:text-base font-extrabold text-[#17332E]">
                  <span>{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF8F6] text-[#0088A9] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-xs md:text-sm text-[#17332E]/75 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* ==================== PREMIUM BOOKING MODAL ==================== */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsBookingOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="w-full max-w-lg bg-[#F8FCFB] rounded-[2.5rem] border border-[#00C7A0]/25 shadow-2xl p-6 md:p-8 text-left relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-[#EEF8F6] text-[#17332E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {isConfirmed ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#EEF8F6] border border-[#00C7A0]/25 flex items-center justify-center text-[#00C7A0] mb-4 shadow-inner">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#17332E] leading-tight">
                    Booking Confirmed!
                  </h3>
                  <p className="text-xs md:text-sm text-[#17332E]/70 max-w-sm leading-relaxed mt-2.5 font-semibold">
                    Thank you. Lijomon MJ's assistant will call you on your provided number shortly to confirm your consultation slot.
                  </p>
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setIsBookingOpen(false);
                    }}
                    className="mt-6 bg-[#0088A9] text-white text-xs uppercase tracking-widest font-extrabold px-8 py-3.5 rounded-full cursor-pointer hover:bg-[#005D73] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#17332E] mb-1.5 leading-tight">
                    Book Appointment
                  </h3>
                  <p className="text-[10px] text-[#0088A9] mb-5 font-black uppercase tracking-widest">
                    Chiro Care Ayurvedic Clinic
                  </p>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      />
                      <input
                        type="date"
                        required
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold text-[#17332E]/70"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      />
                    </div>

                    <select
                      required
                      className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold text-[#17332E]/70"
                      value={bookingData.service}
                      onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                    >
                      <option value="">Select Treatment Required</option>
                      {allPrograms.map((p: any) => (
                        <option key={`${p.type}-${p.id}`} value={p.title}>
                          {p.title} ({p.type === "treatment" ? "Ayurvedic" : "Chiropractic"})
                        </option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Brief description of symptoms (optional)"
                      rows={3}
                      className="w-full bg-white px-4 py-3.5 rounded-xl text-xs font-semibold"
                      value={bookingData.message}
                      onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                    />

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white text-xs uppercase tracking-widest font-extrabold py-4 rounded-xl shadow-lg mt-2 cursor-pointer"
                    >
                      Request Appointment
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
