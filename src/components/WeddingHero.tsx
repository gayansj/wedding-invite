import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const weddingBg = "/src/assets/images/wedding_background_1782649831783.jpg";

export default function WeddingHero() {
  return (
    <header className="relative min-h-[95vh] rounded-3xl overflow-hidden flex flex-col justify-between items-center p-6 md:p-16 text-center shadow-xl border border-rose-100">
      {/* Background Image with elegant overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-105"
        style={{ 
          backgroundImage: `url(${weddingBg})`,
        }}
      />
      {/* Warm champagne overlay for rich contrast and text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFB]/95 via-[#FFFDFB]/85 to-[#FFFBF9]/95 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[#FBF7F4]/40" />

      {/* Decorative Golden Corner Borders */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-amber-500/20 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-amber-500/20 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-amber-500/20 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-amber-500/20 rounded-br-sm pointer-events-none" />

      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 pt-4"
      >
        <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#B76E79] font-bold block mb-2">ආරාධනා • Invitation</span>
        <div className="w-16 h-[1.5px] bg-amber-500/30 mx-auto" />
      </motion.div>

      {/* Center Couple Names & Decorative Elements */}
      <div className="relative z-10 py-12 flex flex-col items-center">
        {/* Heart Icon Ring */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, type: 'spring' }}
          className="w-20 h-20 rounded-full border border-amber-500/30 p-1 mb-8 flex items-center justify-center bg-white/60 shadow-xs"
        >
          <div className="w-full h-full rounded-full border border-dashed border-amber-500/20 flex items-center justify-center">
            <Heart className="w-7 h-7 text-[#B76E79] fill-rose-50 animate-pulse" />
          </div>
        </motion.div>

        {/* Bride's Name */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-cursive text-7xl md:text-9xl text-[#A65A66] drop-shadow-xs select-none leading-none mb-3"
        >
          Ishara
        </motion.h1>

        {/* Ampersand & Separator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif italic text-2xl md:text-3xl text-[#B76E79] my-3 flex items-center gap-6"
        >
          <span className="h-[1px] w-12 bg-[#B76E79]/30"></span>
          <span className="font-light">&</span>
          <span className="h-[1px] w-12 bg-[#B76E79]/30"></span>
        </motion.div>

        {/* Groom's Name */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="font-cursive text-7xl md:text-9xl text-[#A65A66] drop-shadow-xs select-none leading-none mb-6"
        >
          Gayan
        </motion.h1>

        {/* Quote */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="font-serif text-sm md:text-lg text-gray-600 max-w-md mx-auto italic leading-relaxed px-4"
        >
          "With joyful hearts, we request the honour of your presence as we unite in holy matrimony."
        </motion.p>
        
      </div>

      {/* Bottom Section - Date & Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="relative z-10 w-full max-w-md pb-4 flex flex-col items-center"
      >
        <div className="font-serif text-base md:text-lg text-[#A65A66] font-semibold uppercase tracking-[0.25em] mb-3">
          Wednesday, August 06, 2026
        </div>
        <div className="flex justify-center gap-6 text-[11px] text-gray-500 font-semibold tracking-wider mb-8 uppercase">
          <span>3:00 PM Onwards</span>
          <span className="text-amber-500/50">•</span>
          <span>Sleek Camellia, Kegalle</span>
        </div>

        <a 
          href="#rsvp-form-section" 
          className="inline-block bg-[#B76E79] hover:bg-[#A65A66] text-white font-sans text-xs uppercase tracking-widest font-semibold py-4 px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
          id="btn-hero-rsvp"
        >
          <span className="relative z-10">Reserve Your Seat</span>
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>

        {/* Silent elegant down chevron animation */}
        <div className="mt-8 text-gray-300 animate-bounce">
          <svg className="w-5 h-5 mx-auto text-[#B76E79]/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </header>
  );
}
