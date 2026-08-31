"use client";

import React from "react";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Zap,
  Globe,
  Star,
  CheckCircle2,
  Cpu,
  Wifi,
  Shield,
} from "lucide-react";
import { PIPELINE_STEPS, EDITORIAL_TESTIMONIALS } from "@/lib/constants";
import { ConceptIllustration } from "./ConceptIllustration";

interface InteractiveBentoGridProps {
  onExploreConcept: (concept: string) => void;
}

export const InteractiveBentoGrid: React.FC<InteractiveBentoGridProps> = ({
  onExploreConcept,
}) => {
  return (
    <section id="pipeline" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* ================= 1. 3-STEP INTERACTIVE PIPELINE ================= */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E6F77B] text-[#12231B] border border-[#D5E768] shadow-xs">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mt-3 mb-2">
            Simplifying Complex Knowledge,{" "}
            <span className="italic font-serif-editorial text-[#12231B]">
              Step by Step.
            </span>
          </h2>
          <p className="text-sm text-neutral-600 font-medium">
            From dense multi-page documentation to instant retention in 3 frictionless stages.
          </p>
        </div>

        {/* 3 Step Solid Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PIPELINE_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between border border-neutral-200 shadow-md shadow-neutral-900/5 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-11 h-11 rounded-full bg-[#E6EAE1] text-[#12231B] font-black text-sm flex items-center justify-center font-mono">
                    {step.number}
                  </span>
                  <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-[#E6F77B] text-[#12231B] border border-[#D5E768]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#111827] tracking-tight mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center text-xs font-black text-[#12231B] group-hover:text-emerald-800 transition-colors">
                <span>Stage {idx + 1} Verified</span>
                <CheckCircle2 className="w-4 h-4 ml-1.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 2. BENTO GRID SHOWCASE & TELEMETRY ================= */}
      <div id="bento" className="pt-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white text-[#111827] border border-neutral-300 shadow-xs">
            Engine Telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mt-3 mb-2">
            Engineered for Ultra-Fast{" "}
            <span className="italic font-serif-editorial text-[#12231B]">
              Cognitive Velocity.
            </span>
          </h2>
          <p className="text-sm text-neutral-600 font-medium">
            Real-time multimodal telemetry, peer knowledge consensus, and zero-knowledge vector proofs.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Quantum Portal (4 Cols) */}
          <div className="md:col-span-4 bg-white rounded-[28px] p-6 flex flex-col justify-between border border-neutral-200 shadow-md shadow-neutral-900/5">
            <div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 uppercase tracking-wider font-mono">
                Quantum Logic
              </span>
              <h4 className="text-lg font-black text-[#111827] mt-2 mb-1">
                Quantum Superposition
              </h4>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                Simultaneous wave-particle probability collapse.
              </p>
            </div>

            <div className="oval-portal bg-purple-50 p-2 border border-purple-200/80 my-2 shadow-inner">
              <ConceptIllustration type="quantum" className="w-full h-32" />
            </div>

            <button
              onClick={() => onExploreConcept("Quantum Superposition & Schrödinger's Cat")}
              className="mt-2 text-xs font-black text-purple-900 hover:text-purple-950 flex items-center justify-between p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all"
            >
              <span>Load Quantum Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bento Card 2: Testimonial & Peer Review (4 Cols) */}
          <div className="md:col-span-4 bg-[#F4F7F2] rounded-[28px] p-6 flex flex-col justify-between border border-[#DCE4D6] shadow-md shadow-neutral-900/5">
            <div>
              <div className="flex items-center space-x-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-xs sm:text-sm font-bold text-[#111827] leading-relaxed italic mb-4">
                "{EDITORIAL_TESTIMONIALS[0].content}"
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#DCE4D6] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src={EDITORIAL_TESTIMONIALS[0].avatar}
                  alt={EDITORIAL_TESTIMONIALS[0].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h5 className="text-xs font-black text-[#111827]">
                    {EDITORIAL_TESTIMONIALS[0].name}
                  </h5>
                  <p className="text-[10px] text-neutral-600 font-bold">
                    {EDITORIAL_TESTIMONIALS[0].role}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-black bg-[#E6F77B] text-[#12231B] px-2.5 py-1 rounded-full border border-[#D5E768]">
                {EDITORIAL_TESTIMONIALS[0].metric}
              </span>
            </div>
          </div>

          {/* Bento Card 3: Real-Time Decentralized Peer Mesh (4 Cols) */}
          <div className="md:col-span-4 rounded-[28px] bg-[#12231B] text-white p-6 flex flex-col justify-between border border-[#1A3327] shadow-xl shadow-[#12231B]/30 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#E6F77B] text-[#12231B]">
                  WebRTC Gossip Mesh
                </span>
                <span className="text-xs text-emerald-300 font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#63F78F] animate-ping" />
                  <span>8 Peers Synced</span>
                </span>
              </div>

              <h4 className="text-lg font-black text-white mb-1">
                Zero-Knowledge Telemetry
              </h4>
              <p className="text-xs text-slate-200 font-normal leading-relaxed mb-4">
                Sub-millisecond state vectors multicast across peer nodes with zero cryptographic leakage.
              </p>
            </div>

            {/* Micro Packet Log */}
            <div className="space-y-1.5 bg-[#1D3529] rounded-xl p-3 border border-[#2C4E3D] font-mono text-[10px]">
              <div className="flex justify-between text-slate-200 font-bold">
                <span className="text-[#E6F77B]">BROADCAST</span>
                <span>Node-71 &bull; 0.42ms</span>
              </div>
              <div className="flex justify-between text-slate-200 font-bold">
                <span className="text-[#63F78F]">RESOLVE</span>
                <span>Relay-14 &bull; 0.28ms</span>
              </div>
              <div className="flex justify-between text-slate-200 font-bold">
                <span className="text-amber-300">PULL_WEIGHTS</span>
                <span>Peer-09 &bull; 0.88ms</span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#1A3327] flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>Throughput: <strong className="text-white">3,850 T/s</strong></span>
              <span className="text-[#E6F77B] font-bold">100% Coherent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
