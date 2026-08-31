"use client";

import React, { useState, useRef } from "react";
import {
  Zap,
  Mic,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Volume2,
} from "lucide-react";
import { EDITORIAL_CATEGORIES } from "@/lib/constants";
import { ConceptIllustration } from "./ConceptIllustration";

interface HeroBentoSectionProps {
  onSearchSubmit: (query: string) => void;
  isLoading: boolean;
}

export const HeroBentoSection: React.FC<HeroBentoSectionProps> = ({
  onSearchSubmit,
  isLoading,
}) => {
  const [query, setQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAuditioning, setIsAuditioning] = useState<boolean>(false);

  // 3D Parallax Tilt State
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Locked smooth 60fps tilt calculations
    setTilt({
      x: parseFloat((y * -14).toFixed(2)), // rotateX
      y: parseFloat((x * 14).toFixed(2)),  // rotateY
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleVoiceToggle = () => {
    if (
      typeof window === "undefined" ||
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Voice input is not supported in this browser. You can type in the prompt bar!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      onSearchSubmit(transcript);
    };

    recognition.start();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearchSubmit(query.trim());
  };

  const handleAuditionFeatured = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      "Transformers & Self-Attention: Queries search for context, Keys match compatibility, and Values deliver the semantic payload."
    );
    utterance.rate = 1.15;

    utterance.onstart = () => setIsAuditioning(true);
    utterance.onend = () => setIsAuditioning(false);
    utterance.onerror = () => setIsAuditioning(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
      {/* Category Filter Chips Bar */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none mb-6">
        {EDITORIAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all flex items-center space-x-2 shadow-xs ${
                isActive
                  ? "bg-[#E6F77B] text-[#12231B] shadow-sm scale-105 border border-[#D5E768]"
                  : "bg-white text-neutral-800 hover:bg-[#F4F7F2] border border-neutral-300/80"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isActive
                    ? "bg-[#12231B] text-[#E6F77B]"
                    : "bg-neutral-100 text-neutral-800"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Hero Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= LEFT MAIN HERO CARD (7 Cols) ================= */}
        <div className="lg:col-span-7 rounded-[32px] bg-[#12231B] text-white p-8 sm:p-11 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-[#12231B]/30 border border-[#1A3327]">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6F77B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Micro Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E6F77B] text-[#12231B] shadow-sm">
                ⚡ Next-Gen Cognitive Mesh
              </span>
              <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#1C362A] text-emerald-300 border border-[#2B4E3E] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E6F77B]" />
                <span>Zero Cognitive Friction</span>
              </span>
            </div>

            {/* Large Crisp Typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12] mb-5">
              Mastering Complex Systems <br />
              <span className="text-[#E6F77B] italic font-serif-editorial">
                in 5 Seconds.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl mb-8">
              Transform heavy research papers, distributed consensus algorithms, and neural network architectures into crystal-clear 5-second mental models, dynamic vector illustrations, and synchronized audio.
            </p>
          </div>

          {/* Micro-Interactive Prompt Ingestion Bar with High Contrast */}
          <div className="mt-auto relative z-10">
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#1D3529] rounded-2xl p-2 border-2 border-[#2C4E3D] flex items-center space-x-2 focus-within:border-[#E6F77B] transition-all shadow-lg"
            >
              {/* Mic Icon Button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-[#12231B] text-slate-200 hover:text-white hover:bg-[#254234] border border-[#2C4E3D]"
                }`}
                title={isListening ? "Listening..." : "Voice Input"}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What concept do you want to deconstruct?"
                disabled={isLoading}
                className="w-full bg-transparent border-0 text-white placeholder-slate-300 text-sm font-semibold focus:outline-none px-2"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="btn-lemon px-5 py-3 text-xs sm:text-sm font-black flex items-center space-x-1.5 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                <span>{isLoading ? "Synthesizing..." : "Deconstruct"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Micro Stats Strip */}
            <div className="flex items-center space-x-6 mt-4 text-xs text-slate-300 font-mono">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E6F77B] animate-ping" />
                <span className="text-white font-bold">1.2ms</span>
                <span>Latency</span>
              </span>
              <span>•</span>
              <span className="text-white font-bold">98.4% Retention</span>
              <span>•</span>
              <span className="text-[#E6F77B] font-bold">WebRTC Synced</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT 3D PARALLAX TILT BENTO CARD (5 Cols) ================= */}
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            perspective: 1000,
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.08s ease-out",
          }}
          className="lg:col-span-5 rounded-[32px] bg-[#F4F7F2] border border-[#DCE4D6] p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-neutral-900/5 cursor-pointer select-none"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white text-[#111827] border border-neutral-300/80 shadow-xs flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>3D Parallax Model</span>
              </span>
              <span className="text-xs font-mono font-black text-[#12231B] bg-[#E6F77B] px-2.5 py-0.5 rounded-full border border-[#D5E768]">
                5-Sec Mastery
              </span>
            </div>

            <h3 className="text-xl font-black text-[#111827] tracking-tight mb-2">
              Transformers & Self-Attention (QKV)
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed mb-4">
              "Queries search for context, Keys match compatibility, and Values deliver the semantic payload."
            </p>
          </div>

          {/* Arch Visual Portal Frame with Live Audio Pulse Reaction */}
          <div className="arch-portal bg-white p-4 border border-neutral-200 shadow-sm my-2 relative">
            {isAuditioning && (
              <div className="absolute top-3 right-4 z-20 flex items-center space-x-1 bg-[#12231B] text-[#E6F77B] px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#E6F77B] animate-ping" />
                <span>Auditioning Active</span>
              </div>
            )}
            <ConceptIllustration
              type="transformer"
              className="w-full h-36"
              isAudioPlaying={isAuditioning}
              parameterValue={75}
            />
          </div>

          {/* Bottom Card Action */}
          <div className="pt-4 border-t border-[#DCE4D6] flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#12231B] text-[#E6F77B] flex items-center justify-center shadow-xs">
                <Volume2 className={`w-4 h-4 ${isAuditioning ? "animate-pulse" : ""}`} />
              </div>
              <div className="text-xs text-neutral-700 font-semibold">
                <span className="font-bold text-[#111827] block">Acoustic Narration</span>
                <span>{isAuditioning ? "Speaking Web Speech..." : "Synchronous Audio"}</span>
              </div>
            </div>

            <button
              onClick={handleAuditionFeatured}
              className={`px-4 py-2 rounded-full border font-extrabold text-xs transition-all shadow-xs flex items-center space-x-1.5 ${
                isAuditioning
                  ? "bg-[#12231B] text-[#E6F77B] border-[#12231B] ring-2 ring-emerald-400"
                  : "bg-white hover:bg-[#E6F77B] text-[#111827] border-neutral-300"
              }`}
            >
              <span>{isAuditioning ? "Stop" : "Audition Now"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
