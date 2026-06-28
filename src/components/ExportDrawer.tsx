import React, { useState } from 'react';
import { Copy, Check, Code, X, Sparkles, Download, FileText } from 'lucide-react';
import { HTML_TEMPLATE } from '../htmlTemplate';

export default function ExportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HTML_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([HTML_TEMPLATE], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding_invitation_sanduni_kasun.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating Action Button for Code Export */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-rose-500 to-amber-500 text-white rounded-full p-4 shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold text-xs uppercase tracking-widest border border-white/20 hover:shadow-rose-500/20"
        title="Get standalone HTML Code"
        id="btn-export-code"
      >
        <Code className="w-4 h-4" />
        <span>Get HTML Code</span>
      </button>

      {/* Full screen modal backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FDFBF9] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] border border-amber-500/10">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#FFF5F5] to-[#FFFBF9] border-b border-rose-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 text-rose-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-rose-950 font-bold">Copy Standalone HTML Code</h3>
                  <p className="text-xs text-gray-500">Single-file combined HTML, styled CSS and JS</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area with preview instructions and code snippet */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 text-xs text-amber-900 leading-relaxed space-y-2">
                <p className="font-semibold flex items-center gap-1.5 text-amber-950">
                  <FileText className="w-4 h-4 shrink-0 text-amber-600" />
                  Your Ready-To-Use Invitation File
                </p>
                <p>
                  As requested, we have prepared a premium, single-file HTML bundle. This file contains the complete interactive wedding invitation page with internal modern responsive styling (via Tailwind CSS CDN) and the fully functional countdown and RSVP engine!
                </p>
                <p className="font-medium text-amber-950">
                  💡 How to use: Simply click the Copy Code button, paste it into any file named <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">wedding.html</code>, and open it in any browser!
                </p>
              </div>

              {/* Code viewer block */}
              <div className="relative">
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="bg-white/90 hover:bg-white text-gray-700 hover:text-rose-600 text-xs px-3 py-1.5 rounded-md shadow-sm border border-gray-200 font-semibold flex items-center gap-1.5 transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy HTML</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-rose-650 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-md shadow-sm font-semibold flex items-center gap-1.5 transition-all duration-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-900 shadow-inner">
                  <div className="bg-gray-850 px-4 py-2 border-b border-gray-800 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    <span className="text-[10px] font-mono text-gray-500 ml-2">wedding.html</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] font-mono text-gray-300 leading-relaxed max-h-[300px]">
                    {HTML_TEMPLATE}
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleCopy}
                className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Invitation Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
