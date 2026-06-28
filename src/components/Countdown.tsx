import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date("August 06, 2026 15:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-rose-100/60 shadow-xs text-center max-w-4xl mx-auto w-full">
      {/* Decorative floral backgrounds */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-rose-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <h2 className="font-serif text-2xl md:text-3xl text-[#A65A66] mb-2 font-medium">Counting Down To Our Forever</h2>
        <p className="text-xs tracking-[0.2em] text-[#B76E79] uppercase font-semibold mb-8 flex items-center justify-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>August 06, 2026 • 3:00 PM onwards</span>
        </p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
          {/* Days */}
          <div className="bg-white/90 p-3 md:p-6 rounded-2xl border border-rose-100 shadow-xs transition-transform duration-300 hover:scale-102 hover:shadow-md">
            <span className="font-serif text-3xl md:text-5xl text-[#A65A66] block font-light leading-none mb-2 select-none">
              {timeLeft.days}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-widest block">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white/90 p-3 md:p-6 rounded-2xl border border-rose-100 shadow-xs transition-transform duration-300 hover:scale-102 hover:shadow-md">
            <span className="font-serif text-3xl md:text-5xl text-[#A65A66] block font-light leading-none mb-2 select-none">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-widest block">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white/90 p-3 md:p-6 rounded-2xl border border-rose-100 shadow-xs transition-transform duration-300 hover:scale-102 hover:shadow-md">
            <span className="font-serif text-3xl md:text-5xl text-[#A65A66] block font-light leading-none mb-2 select-none">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-widest block">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-white/90 p-3 md:p-6 rounded-2xl border border-rose-100 shadow-xs transition-transform duration-300 hover:scale-102 hover:shadow-md">
            <span className="font-serif text-3xl md:text-5xl text-[#A65A66] block font-light leading-none mb-2 select-none">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-widest block">
              Secs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
