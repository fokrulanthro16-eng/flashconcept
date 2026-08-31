"use client";

import React, { useState } from "react";
import { Zap, ArrowUpRight, Check, ShieldCheck } from "lucide-react";

export const EditorialFooter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-8">
      {/* Dark Forest High Contrast CTA Card */}
      <div className="rounded-[32px] bg-[#12231B] text-white p-8 sm:p-12 mb-8 relative overflow-hidden shadow-2xl shadow-[#12231B]/30 border border-[#1A3327]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6F77B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E6F77B] text-[#12231B] shadow-sm">
            ⚡ Stay in the Flow
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3 mb-3">
            Supercharge Your Learning Speed with{" "}
            <span className="text-[#E6F77B] italic font-serif-editorial">
              FlashConcept.
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
            Get weekly 5-second mental models of cutting-edge AI breakthroughs, distributed systems, and quantum theory.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full bg-[#1D3529] rounded-full px-5 py-3.5 text-xs sm:text-sm text-white placeholder-slate-300 border-2 border-[#2C4E3D] focus:outline-none focus:border-[#E6F77B] font-semibold"
            />
            <button
              type="submit"
              className="btn-lemon w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-black whitespace-nowrap flex items-center justify-center space-x-1.5 shadow-md"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-[#12231B]" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Join 24,000+</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Clean Link Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-neutral-600 pt-4 border-t border-neutral-300/80">
        <div>
          <div className="flex items-center space-x-2 text-[#12231B] font-black text-sm mb-3">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>NexusMind SaaS</span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-600 font-medium">
            Real-time multimodal cognitive mesh & peer knowledge telemetry platform.
          </p>
        </div>

        <div>
          <h5 className="font-black text-[#12231B] mb-2.5">Platform</h5>
          <ul className="space-y-1.5 font-semibold">
            <li><a href="#hero" className="hover:text-[#12231B]">Overview</a></li>
            <li><a href="#pipeline" className="hover:text-[#12231B]">3-Step Pipeline</a></li>
            <li><a href="#engine" className="hover:text-[#12231B]">Mastery Engine</a></li>
            <li><a href="#bento" className="hover:text-[#12231B]">Telemetry Mesh</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-black text-[#12231B] mb-2.5">Disciplines</h5>
          <ul className="space-y-1.5 font-semibold">
            <li><a href="#engine" className="hover:text-[#12231B]">Transformers & AI</a></li>
            <li><a href="#engine" className="hover:text-[#12231B]">Quantum Computing</a></li>
            <li><a href="#engine" className="hover:text-[#12231B]">Biotech & CRISPR</a></li>
            <li><a href="#engine" className="hover:text-[#12231B]">Distributed Quorums</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-black text-[#12231B] mb-2.5">Trust & Security</h5>
          <ul className="space-y-1.5 font-semibold">
            <li className="flex items-center space-x-1 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Zero-Knowledge Proofs</span>
            </li>
            <li><span>SOC2 Type II Certified</span></li>
            <li><span>Sub-Millisecond Edge SLA</span></li>
          </ul>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 font-semibold gap-2">
        <p>© 2026 NexusMind Protocol & FlashConcept Inc. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-[#12231B]">Privacy Policy</a>
          <a href="#" className="hover:text-[#12231B]">Terms of Service</a>
          <a href="#" className="hover:text-[#12231B]">Telemetry Status</a>
        </div>
      </div>
    </footer>
  );
};
