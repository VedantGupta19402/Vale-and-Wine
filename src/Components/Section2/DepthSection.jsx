import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DepthSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#0B0B0B] overflow-hidden flex items-center justify-center">

      {/* Background slow movement */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#111] to-[#0B0B0B]"
        animate={{
          x: mouse.x * 20,
          y: mouse.y * 20,
        }}
        transition={{ type: "spring", stiffness: 20 }}
      />

      {/* Glow that follows cursor (THIS IS THE CRAZY PART) */}
      <motion.div
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full bg-[#00FF88] opacity-20 blur-3xl"
        animate={{
          x: mouse.x * 200,
          y: mouse.y * 200,
        }}
        transition={{ type: "spring", stiffness: 60 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        animate={{
          x: mouse.x * 40,
          y: mouse.y * 40,
        }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h2 className="text-2xl md:text-4xl text-white font-semibold tracking-tight">
          everything reacts.
        </h2>

        <p className="mt-4 text-gray-400 max-w-md mx-auto text-sm md:text-base">
          move your cursor and feel the shift.
        </p>
      </motion.div>

    </section>
  );
};

export default DepthSection;