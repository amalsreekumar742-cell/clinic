import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+916282018754";

  const message =
    "Hello Chiro Care Clinic, I'd like to book a premium consultation appointment.";

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1.5,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* Glow Ring */}
        <span className="absolute inset-[-8px] rounded-full bg-[#25D366]/20 blur-xl" />

        {/* Icon */}
        <FaWhatsapp className="relative z-10 w-8 h-8" />

        {/* Tooltip */}
        <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#17332E] text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;