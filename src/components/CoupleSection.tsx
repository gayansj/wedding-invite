import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function CoupleSection() {
  const defaultCoupleImage = "/src/assets/images/wedding_couple_1782650367856.jpg";
  const [coupleImage, setCoupleImage] = useState(defaultCoupleImage);

  // Load custom couple photo from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wedding_couple_photo');
    if (saved) {
      setCoupleImage(saved);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setCoupleImage(base64);
        localStorage.setItem('wedding_couple_photo', base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    if (window.confirm('Do you want to reset to the default beautiful watercolor illustration?')) {
      localStorage.removeItem('wedding_couple_photo');
      setCoupleImage(defaultCoupleImage);
    }
  };

  return (
    <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-rose-100 shadow-xs max-w-4xl mx-auto w-full">
      {/* Soft gradient background blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/10 to-transparent pointer-events-none" />

      {/* Floating Upload Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <span className="text-xs tracking-[0.25em] text-[#B76E79] uppercase font-bold mb-2 block">
          Meet the Bride & Groom
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#A65A66] mb-8 font-medium">Ishara & Gayan</h2>
        
        {/* Elegant Arch Framed Couple Photo */}
        <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-t-full border-4 border-amber-500/30 p-1.5 shadow-xl bg-white overflow-hidden mb-8 group">
          <img 
            src={coupleImage} 
            className="w-full h-full object-cover rounded-t-full transition-transform duration-700 group-hover:scale-105 select-none" 
            alt="Sanduni and Kasun couple photo" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white text-xs tracking-widest uppercase font-semibold">Forever & Always</span>
          </div>
        </div>

        <p className="font-cursive text-3.5xl text-[#B76E79] mb-3">Two Hearts, One Journey</p>
        <p className="font-sans text-xs md:text-sm text-gray-500 max-w-md italic leading-relaxed">
          "We are starting a beautiful chapter of life together, and having you witness our vows is the greatest gift we could ask for."
        </p>
      </div>
    </section>
  );
}
