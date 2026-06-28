import React from 'react';
import { Calendar, Clock, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function EventDetails() {
  const mapUrl = "https://maps.app.goo.gl/SnZeLxZvUH3XeCVf7";

  return (
    <section className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto w-full">
      {/* Event Information Card */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 flex flex-col justify-between border border-rose-100 shadow-xs border-l-4 border-l-[#B76E79]">
        <div>
          <span className="text-[11px] tracking-[0.25em] text-[#B76E79] uppercase block font-bold mb-3">Event Details</span>
          <h2 className="font-serif text-3xl text-[#A65A66] mb-8 leading-tight font-medium">Ceremony & Reception</h2>
          
          <div className="space-y-8">
            {/* Date Details */}
            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 text-[#B76E79]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-800">Date</h4>
                <p className="text-sm text-gray-600 mt-0.5">Wednesday, August 06, 2026</p>
                <p className="text-xs text-[#B76E79] font-medium mt-1">2026 අගෝස්තු 06 වනදා</p>
              </div>
            </div>

            {/* Time Details */}
            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 text-[#B76E79]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-800">Time</h4>
                <p className="text-sm text-gray-600 mt-0.5">4:00 PM Onwards</p>
                <p className="text-xs text-[#B76E79] font-medium mt-1">සවස 4:00 සිට ඉදිරියට</p>
              </div>
            </div>

            {/* Location Details */}
            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 text-[#B76E79]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-800">Venue</h4>
                <p className="text-sm text-gray-600 mt-0.5">Sleek Camellia, Kegalle</p>
                <p className="text-xs text-[#B76E79] font-medium mt-1">ස්ලීක් කැමෙලියා, කෑගල්ල</p>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Contact Details */}
        <div className="mt-10 pt-8 border-t border-rose-100/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">RSVP Contact</span>
            <p className="font-serif text-lg text-[#A65A66] font-semibold tracking-wide">+94 77 123 4567</p>
          </div>
          <a 
            href="tel:+94771234567" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A65A66] hover:border-[#A65A66] transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call RSVP Contact</span>
          </a>
        </div>
      </div>

      {/* Interactive Google Map Card */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col border border-rose-100 shadow-xs relative">
        <div className="p-6 bg-white/50 border-b border-rose-100/60 flex justify-between items-center">
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-800">Venue Location Map</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Shangri-La Hotel, Colombo, Sri Lanka</p>
          </div>
          <a 
            href="https://maps.app.goo.gl/SnZeLxZvUH3XeCVf7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#B76E79] hover:bg-[#A65A66] text-white text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-lg shadow-xs transition-all duration-300"
          >
            <span>Navigate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        {/* Map Container */}
        <div className="grow w-full h-full min-h-[300px] bg-slate-50 relative">
          <iframe 
            src={mapUrl}
            className="absolute inset-0 w-full h-full border-0" 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer"
            title="Shangri-La Colombo Location Map"
          />
        </div>
      </div>
    </section>
  );
}
