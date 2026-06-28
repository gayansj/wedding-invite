import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Send, RotateCcw } from 'lucide-react';
import { RsvpSubmission } from '../types';

interface RsvpFormProps {
  onRsvpSubmitted: (newSubmission: RsvpSubmission) => void;
}

export default function RsvpForm({ onRsvpSubmitted }: RsvpFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('1');
  const [attending, setAttending] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [targetPhone, setTargetPhone] = useState(() => {
    return localStorage.getItem('wedding_rsvp_target_phone') || '94771234567';
  });

  const handleTargetPhoneChange = (val: string) => {
    const cleaned = val.replace(/[^0-9+]/g, '');
    setTargetPhone(cleaned);
    localStorage.setItem('wedding_rsvp_target_phone', cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const submission: RsvpSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      guests: attending ? parseInt(guests) : 0,
      attending,
      notes: notes.trim() || undefined,
      submittedAt: new Date().toLocaleString()
    };

    // Retrieve previous RSVPs
    const existing = localStorage.getItem('wedding_rsvps');
    const records = existing ? JSON.parse(existing) : [];
    records.push(submission);
    localStorage.setItem('wedding_rsvps', JSON.stringify(records));

    // Propagate to main app
    onRsvpSubmitted(submission);
    setSubmitted(true);

    // Prepare and dispatch WhatsApp message
    const attendingLabel = attending ? "Joyfully Attend 💍 (සතුටින් සහභාගී වේ)" : "Regretfully Decline ✉️ (කණගාටුවෙන් යුතුව සහභාගී විය නොහැක)";
    const guestCountLabel = attending ? guests + " Person(s)" : "0";
    const notesLabel = notes.trim() ? notes.trim() : "None";
    
    const waMessage = `💍 *WEDDING RSVP CONFIRMATION* 💍\n\n` +
                      `Hello Sanduni & Kasun,\n` +
                      `I have submitted my RSVP for your wedding! Here are my details:\n\n` +
                      `👤 *Guest Name:* ${name.trim()}\n` +
                      `📞 *Contact Number:* ${phone.trim()}\n` +
                      `✨ *Response:* ${attendingLabel}\n` +
                      `👥 *Number of Guests:* ${guestCountLabel}\n` +
                      `📝 *Wishes & Notes:* ${notesLabel}\n\n` +
                      `_Thank you, and looking forward to your big day!_`;

    // Strip characters for the WhatsApp URL
    const cleanWhatsappNum = targetPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWhatsappNum}?text=${encodeURIComponent(waMessage)}`;
    
    // Trigger window open
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 300);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setGuests('1');
    setAttending(true);
    setNotes('');
    setSubmitted(false);
  };

  return (
    <section id="rsvp-form-section" className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 relative max-w-3xl mx-auto w-full shadow-lg border border-rose-100">
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-200 via-[#B76E79] to-rose-200 rounded-t-3xl" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="rsvp-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block mb-2">Kindly Respond</span>
              <h2 className="font-serif text-3xl text-[#A65A66] font-medium">Will You Celebrate With Us?</h2>
              <p className="text-xs text-gray-500 mt-2">Please respond before October 1st, 2026</p>
              <div className="w-12 h-[1px] bg-amber-500/30 mx-auto mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Host WhatsApp Config */}
              <div className="bg-rose-50/30 border border-rose-100/40 rounded-xl p-4">
                <label className="block text-[10px] uppercase tracking-widest text-[#B76E79] font-bold mb-1.5" htmlFor="target-phone-input">
                  📲 Host WhatsApp Number (for receiving RSVPs)
                </label>
                <input
                  type="text"
                  id="target-phone-input"
                  value={targetPhone}
                  onChange={(e) => handleTargetPhoneChange(e.target.value)}
                  placeholder="e.g. 94771234567"
                  className="w-full bg-white border border-rose-100/60 rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all"
                />
                <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">
                  Enter your own WhatsApp number (with country code, e.g. 94XXXXXXXXX) to test receiving guest RSVPs directly!
                </p>
              </div>

              {/* Name and Phone Input */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B76E79] font-bold mb-2.5" htmlFor="name-input">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border border-rose-100/80 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B76E79] font-bold mb-2.5" htmlFor="phone-input">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="phone-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white border border-rose-100/80 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all placeholder-gray-400"
                    placeholder="e.g. +94 77 123 4567"
                  />
                </div>
              </div>

              {/* Guests Count and Attendance */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B76E79] font-bold mb-2.5" htmlFor="guest-select">
                    Number of Guests
                  </label>
                  <select
                    id="guest-select"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    disabled={!attending}
                    className="w-full bg-white border border-rose-100/80 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all disabled:opacity-40 disabled:bg-gray-50"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                  </select>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#B76E79] font-bold mb-2.5">
                    Attendance
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`rounded-xl py-3 px-4 text-sm font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        attending
                          ? 'bg-[#B76E79]/10 border-[#B76E79] text-[#A65A66]'
                          : 'bg-white border-rose-100 text-gray-500 hover:bg-rose-50/20'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${attending ? 'bg-[#B76E79]' : 'bg-transparent border border-gray-300'}`} />
                      <span>Attending</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`rounded-xl py-3 px-4 text-sm font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        !attending
                          ? 'bg-rose-100/30 border-[#B76E79] text-[#A65A66]'
                          : 'bg-white border-rose-100 text-gray-500 hover:bg-rose-50/20'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${!attending ? 'bg-[#B76E79]' : 'bg-transparent border border-gray-300'}`} />
                      <span>Declining</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wishes & Dietary Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B76E79] font-bold mb-2.5" htmlFor="notes-textarea">
                  Wishes & Dietary Notes (Optional)
                </label>
                <textarea
                  id="notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-rose-100/80 rounded-xl px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79] transition-all placeholder-gray-400 resize-none"
                  placeholder="Share a sweet note with the couple or any food allergies/dietary restrictions..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#B76E79] hover:bg-[#A65A66] text-white text-xs font-semibold uppercase tracking-widest py-4 px-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit RSVP</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="rsvp-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center py-10 flex flex-col items-center"
          >
            {/* Celebrate check mark circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center mb-6 shadow-xs animate-bounce">
              <Check className="w-8 h-8" strokeWidth={2.5} />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-2">
              Submission Successful
            </span>
            <h3 className="font-serif text-2xl text-[#A65A66] font-semibold">Thank You, {name}!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mt-3 leading-relaxed">
              Your RSVP response has been registered. We are absolutely thrilled and cannot wait to celebrate this magical event with you in Colombo!
            </p>

            <div className="w-16 h-[1.5px] bg-amber-500/20 my-6" />

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#B76E79] hover:text-[#A65A66] font-semibold border-b border-[#B76E79] hover:border-[#A65A66] pb-0.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit another response</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
