import { motion } from "framer-motion";

const Leaf = ({ delay, duration, startX, endX, startY, scale, rotate }) => {
  return (
    <motion.div
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0, 
        rotate: 0, 
        scale: scale 
      }}
      animate={{
        y: ["105vh", "-10vh"],
        x: [startX, endX, startX],
        rotate: rotate,
        opacity: [0, 0.12, 0.12, 0],
        transition: {
          duration: duration,
          delay: delay,
          ease: "linear",
          repeat: Infinity,
        }
      }}
      className="absolute pointer-events-none text-accent/20 z-0 hidden lg:block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 1.2 5.5-3.8 11.2A7 7 0 0 1 11 20z" />
        <path d="M9 11c1.5-1.5 3-2 5-2" />
      </svg>
    </motion.div>
  );
};

const FloatingHerbs = () => {
  // Define a set of random parameters for 8 floating leaves
  const leaves = [
    { delay: 0, duration: 25, startX: "10%", endX: "15%", startY: "110vh", scale: 0.8, rotate: 360 },
    { delay: 4, duration: 30, startX: "85%", endX: "80%", startY: "110vh", scale: 1.1, rotate: -270 },
    { delay: 8, duration: 28, startX: "25%", endX: "20%", startY: "110vh", scale: 0.6, rotate: 180 },
    { delay: 12, duration: 32, startX: "70%", endX: "75%", startY: "110vh", scale: 0.9, rotate: -360 },
    { delay: 6, duration: 26, startX: "40%", endX: "45%", startY: "110vh", scale: 0.7, rotate: 120 },
    { delay: 15, duration: 24, startX: "90%", endX: "85%", startY: "110vh", scale: 0.5, rotate: -180 },
    { delay: 2, duration: 29, startX: "5%", endX: "8%", startY: "110vh", scale: 1.0, rotate: 240 },
    { delay: 10, duration: 35, startX: "60%", endX: "55%", startY: "110vh", scale: 0.75, rotate: -90 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf, index) => (
        <Leaf key={index} {...leaf} />
      ))}
    </div>
  );
};

export default FloatingHerbs;
