"use client";

import { motion } from "framer-motion";
import { Palmtree } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center font-montserrat">
      <div className="relative flex flex-col items-center">
        
        {/* Ikon Kelapa/Palem yang Goyang Lucu */}
        <motion.div
          animate={{ 
            rotate: [0, -15, 15, -15, 0],
            y: [0, -20, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-teal-500 mb-8 p-6 bg-teal-50 rounded-full"
        >
          {/* Anda bisa ganti ini dengan ikon kelapa jika ada, sementara pakai Palmtree */}
          <Palmtree size={60} strokeWidth={1.5} />
        </motion.div>

        {/* Teks Loading yang Lucu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h2 className="font-lobster text-4xl text-slate-800 tracking-tight">
            Hang on tight!
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animation-pulse">
            Getting your Bali vibe ready...
          </p>
        </motion.div>
        
        {/* Progress Bar Tipis ala Sambil Lalu */}
        <motion.div 
          className="absolute -bottom-16 w-48 h-1 bg-slate-100 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-teal-500"
            animate={{ x: [-200, 200] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}