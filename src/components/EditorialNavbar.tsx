"use client";

import React, { useState } from "react";
import { Zap, ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

interface EditorialNavbarProps {
  onScrollToEngine?: () => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({
  onScrollToEngine,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-5 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="bg-white rounded-full border border-neutral-200/90 px-5 sm:px-7 py-3 flex items-center justify-between shadow-md shadow-neutral-900/5">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-[#12231B] text-[#E6F77B] flex items-center justify-center font-black shadow-xs">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-base font-black tracking-tight text-[#12231B]">
              NexusMind
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6EAE1] text-[#12231B] uppercase tracking-wider font-mono">
              FlashConcept v3.2
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-7 text-sm font-bold text-neutral-700">
          <a
            href="#hero"
            className="hover:text-[#12231B] transition-colors"
          >
            Overview
          </a>
          <a
            href="#pipeline"
            className="hover:text-[#12231B] transition-colors"
          >
            3-Step Pipeline
          </a>
          <a
            href="#bento"
            className="hover:text-[#12231B] transition-colors"
          >
            Bento Grid
          </a>
          <a
            href="#engine"
            onClick={(e) => {
              e.preventDefault();
              onScrollToEngine?.();
            }}
            className="text-[#12231B] font-extrabold hover:text-emerald-800 transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Interactive Engine</span>
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onScrollToEngine}
            className="btn-lemon px-5 py-2.5 text-xs sm:text-sm font-black flex items-center space-x-1.5 shadow-sm"
          >
            <span>Launch Mastery Engine</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#12231B]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white rounded-3xl p-5 border border-neutral-200 shadow-xl flex flex-col space-y-3 font-bold text-sm text-[#12231B]">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
            Overview
          </a>
          <a href="#pipeline" onClick={() => setMobileMenuOpen(false)}>
            3-Step Pipeline
          </a>
          <a href="#bento" onClick={() => setMobileMenuOpen(false)}>
            Bento Grid
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToEngine?.();
            }}
            className="btn-lemon w-full py-3 text-center text-sm font-black flex items-center justify-center space-x-1"
          >
            <span>Launch Engine</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
