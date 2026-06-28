import React, { useState, useEffect } from 'react';
import WeddingHero from './components/WeddingHero';
import CoupleSection from './components/CoupleSection';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import RsvpForm from './components/RsvpForm';
import AdminPanel from './components/AdminPanel';
import ExportDrawer from './components/ExportDrawer';
import { RsvpSubmission } from './types';

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function App() {
  const [submissions, setSubmissions] = useState<RsvpSubmission[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);

  // Initialize petals background
  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 24 }, (_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      size: Math.random() * 10 + 6,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 8,
    }));
    setPetals(generated);
  }, []);

  // Load RSVPs on mount
  useEffect(() => {
    const loaded = localStorage.getItem('wedding_rsvps');
    if (loaded) {
      try {
        setSubmissions(JSON.parse(loaded));
      } catch (err) {
        console.error('Failed to parse RSVPs', err);
      }
    }
  }, []);

  // Callback when guest submits RSVP
  const handleRsvpSubmitted = (newSubmission: RsvpSubmission) => {
    setSubmissions((prev) => [...prev, newSubmission]);
  };

  // Clear all RSVPs (Admin action)
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all registered RSVPs? This action is irreversible.')) {
      localStorage.removeItem('wedding_rsvps');
      setSubmissions([]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F3] font-sans text-gray-700 selection:bg-[#B76E79]/20 overflow-x-hidden">
      {/* 1. Interactive Falling Petals Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute bg-linear-to-tr from-[#FFF5F5] to-[#B76E79]/30 rounded-tl-full rounded-br-full petal-fall"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              top: '-30px',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 2. Main content wrap */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col gap-16 md:gap-24 relative z-30">
        
        {/* Entrance Hero Card */}
        <WeddingHero />

        {/* Meet the Couple portrait section */}
        <CoupleSection />

        {/* Live Countdown Clock */}
        <Countdown />

        {/* Ceremonial Details & Map Locator */}
        <EventDetails />

        {/* RSVP Registration Box */}
        <RsvpForm onRsvpSubmitted={handleRsvpSubmitted} />

        {/* Admin Dashboard */}
        <AdminPanel submissions={submissions} onClearAll={handleClearAll} />

        {/* Footer Area */}
        <footer className="text-center py-8 border-t border-rose-100/60 mt-4 flex flex-col items-center gap-4">
          <p className="font-cursive text-4xl text-[#B76E79] select-none">Sanduni & Kasun</p>
          <div className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold">
            Designed with Love • Made for our beautiful union
          </div>
        </footer>

      </main>

      {/* 3. Floating Standalone HTML Code Generator Drawer */}
      <ExportDrawer />
    </div>
  );
}
