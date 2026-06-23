import { motion } from "framer-motion";
import Logo from "./Logo";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FCFB] text-[#17332E] select-none"
    >
      {/* Background radial gradient blobs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00C7A0]/5 blur-[120px] top-1/4 left-1/4 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0088A9]/5 blur-[120px] bottom-1/4 right-1/4 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8 max-w-md px-6 text-center">
        {/* Rotating & Pulsing Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* External decorative rotating spine ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-36 h-36 border border-dashed border-[#00C7A0]/20 rounded-full"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 border border-dotted border-[#0088A9]/10 rounded-full"
          />

          {/* Spine logo symbol */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: 1,
              transition: { 
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.6 }
              }
            }}
            className="w-24 h-24 relative z-10 flex items-center justify-center bg-white rounded-full shadow-[0_12px_40px_rgba(0,136,169,0.08)] border border-white"
          >
            <Logo iconOnly={true} className="h-16 w-16" />
          </motion.div>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-3xl font-black tracking-widest text-[#0088A9]"
          >
            CHIRO CARE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#00C7A0]"
          >
            Ayurvedic Clinic
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-[10px] italic tracking-wide text-[#17332E] mt-1"
          >
            Natural Healing. Lasting Wellness.
          </motion.span>
        </div>

        {/* Elegant Progress Bar */}
        <div className="w-48 h-[3px] bg-[#EEF8F6] rounded-full overflow-hidden mt-4 relative shadow-inner">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ 
              left: "100%",
              transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-0 bottom-0 w-2/3 rounded-full bg-gradient-to-r from-[#00C7A0] to-[#0088A9] shadow-[0_0_8px_rgba(0,199,160,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
