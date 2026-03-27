import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 + scrollY / 2000; 
  const rotate = scrollY / 50; 

  return (
    <section className="">

      <motion.div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#00FF88] opacity-20"
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-[#FF00FF] opacity-20"
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ scale, rotate }}
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">
          new drop
        </p>
        <h1 className="text-2xl text-white md:text-4xl font-bold leading-snug max-w-md mx-auto">
          bend time, feel the flow.
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          an interactive journey in motion.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-[#00FF88] text-black px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_15px_#00FF88]">
            Start Journey
          </button>
          <button className="border text-white border-gray-600 px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:border-white hover:scale-[1.05]">
            Explore
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
