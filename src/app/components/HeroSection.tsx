"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')" }}
      />
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-slate-950 via-black/40 to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 drop-shadow-lg"
        >
          Welcome to <span className="font-semibold text-amber-200">Aurora</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl font-light drop-shadow-md"
        >
          Experience unparalleled luxury where the ocean meets the sky.
        </motion.p>
        
        <motion.button
          onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer"
        >
          Explore Rooms
        </motion.button>
      </div>
    </section>
  );
};
