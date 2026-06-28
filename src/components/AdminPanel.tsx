import React, { useState } from 'react';
import { RsvpSubmission } from '../types';
import { ShieldCheck, Download, Trash2, Users, CheckCircle, XCircle, Search, Eye, EyeOff } from 'lucide-react';

interface AdminPanelProps {
  submissions: RsvpSubmission[];
  onClearAll: () => void;
}

export default function AdminPanel({ submissions, onClearAll }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculations
  const totalSubmissions = submissions.length;
  const totalAttendingGuests = submissions
    .filter(s => s.attending)
    .reduce((sum, s) => sum + (s.guests || 1), 0);
  const totalDeclined = submissions.filter(s => !s.attending).length;

  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

  const handleExport = () => {
    if (submissions.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "wedding_rsvps_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="max-w-3xl mx-auto w-full text-center mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#B76E79] hover:text-[#A65A66] hover:underline transition-all uppercase tracking-wider bg-white/40 px-4 py-2 rounded-full border border-rose-100 cursor-pointer"
        id="btn-toggle-admin"
      >
        {isOpen ? (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            <span>Hide Couple's RSVP Dashboard</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span>Access Couple's RSVP Dashboard</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="mt-6 text-left bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-rose-100 shadow-lg animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-rose-100 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-[#B76E79]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#A65A66] font-semibold">RSVP Submissions Dashboard</h3>
                <p className="text-xs text-gray-500">View live guest responses from local storage</p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleExport}
                disabled={submissions.length === 0}
                className="grow sm:grow-0 bg-rose-50 border border-rose-100 hover:bg-rose-100/50 text-xs text-[#A65A66] font-semibold px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={onClearAll}
                disabled={submissions.length === 0}
                className="grow sm:grow-0 bg-red-50 hover:bg-red-100 text-xs text-red-600 border border-red-100 font-semibold px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-amber-50/10 p-3.5 rounded-xl border border-rose-100/50 text-center">
              <Users className="w-4 h-4 mx-auto text-[#B76E79]/80 mb-1" />
              <span className="font-serif text-2xl text-[#A65A66] block font-semibold leading-none">{totalSubmissions}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mt-1 block">Submissions</span>
            </div>
            <div className="bg-emerald-50/10 p-3.5 rounded-xl border border-rose-100/50 text-center">
              <CheckCircle className="w-4 h-4 mx-auto text-emerald-500/80 mb-1" />
              <span className="font-serif text-2xl text-emerald-600 block font-semibold leading-none">{totalAttendingGuests}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mt-1 block">Attending Guests</span>
            </div>
            <div className="bg-red-50/10 p-3.5 rounded-xl border border-rose-100/50 text-center">
              <XCircle className="w-4 h-4 mx-auto text-red-400/80 mb-1" />
              <span className="font-serif text-2xl text-red-600 block font-semibold leading-none">{totalDeclined}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mt-1 block">Declined Parties</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests by name or contact number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-rose-100/80 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#B76E79] focus:border-[#B76E79]"
            />
          </div>

          {/* Responses Table */}
          <div className="overflow-x-auto rounded-xl border border-rose-100">
            <table className="w-full text-xs text-gray-600 border-collapse">
              <thead>
                <tr className="bg-rose-50/40 border-b border-rose-100 text-left text-[#A65A66] font-semibold">
                  <th className="p-3">Guest Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-center">Seat Count</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Wishes/Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/40 bg-white">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-400 italic">
                      No matching guest responses found.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((record) => (
                    <tr key={record.id} className="hover:bg-rose-50/10 transition-all">
                      <td className="p-3 font-semibold text-gray-800">{record.name}</td>
                      <td className="p-3 font-mono">{record.phone}</td>
                      <td className="p-3 text-center font-medium">{record.attending ? record.guests : '-'}</td>
                      <td className="p-3">
                        {record.attending ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Attending</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span>Declined</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 italic text-gray-500 max-w-[180px] truncate" title={record.notes}>
                        {record.notes || <span className="text-gray-300">-</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
