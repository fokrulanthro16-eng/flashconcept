"use client";

import React, { useState } from "react";
import { Sparkles, Layers, Activity, Eye, Zap } from "lucide-react";

interface AttentionMatrixVisualizerProps {
  className?: string;
}

const SAMPLE_TOKENS = [
  "The",
  "robot",
  "scanned",
  "the",
  "vector",
  "mesh",
  "because",
  "it",
  "was",
  "fast",
];

// Pre-computed normalized attention weights for "it" (index 7) and other tokens
const ATTENTION_WEIGHTS: Record<number, number[]> = {
  0: [0.35, 0.25, 0.15, 0.05, 0.05, 0.05, 0.04, 0.02, 0.02, 0.02],
  1: [0.08, 0.45, 0.22, 0.05, 0.06, 0.04, 0.04, 0.02, 0.02, 0.02],
  2: [0.04, 0.18, 0.42, 0.06, 0.12, 0.08, 0.04, 0.02, 0.02, 0.02],
  3: [0.05, 0.05, 0.08, 0.32, 0.38, 0.06, 0.02, 0.02, 0.01, 0.01],
  4: [0.03, 0.06, 0.12, 0.08, 0.48, 0.15, 0.03, 0.02, 0.02, 0.01],
  5: [0.02, 0.05, 0.14, 0.06, 0.22, 0.44, 0.03, 0.01, 0.02, 0.01],
  6: [0.02, 0.03, 0.04, 0.02, 0.05, 0.08, 0.52, 0.12, 0.06, 0.06],
  7: [0.04, 0.48, 0.06, 0.03, 0.05, 0.08, 0.06, 0.12, 0.03, 0.05], // "it" attends heavily to "robot" (0.48)!
  8: [0.02, 0.04, 0.05, 0.02, 0.03, 0.04, 0.08, 0.24, 0.38, 0.10],
  9: [0.02, 0.32, 0.08, 0.02, 0.06, 0.08, 0.04, 0.08, 0.12, 0.18],
};

export const AttentionMatrixVisualizer: React.FC<AttentionMatrixVisualizerProps> = ({
  className = "",
}) => {
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(7); // Default to "it"
  const [activeHead, setActiveHead] = useState<number>(1);

  const activeWeights = ATTENTION_WEIGHTS[selectedTokenIdx] || ATTENTION_WEIGHTS[7];

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-xl space-y-6 ${className}`}>
      {/* Header & Dimension Ticker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
              Interactive Attention Matrix
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500">
              Head #{activeHead} of 8
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#111827] mt-1.5">
            Query-Key Attention Weight Dynamics
          </h3>
        </div>

        {/* Vector Tensor Dimensions Pill */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono font-bold bg-[#F4F7F2] p-2 rounded-2xl border border-[#DCE4D6]">
          <span className="text-neutral-500">Tensor Shape:</span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-emerald-800">
            Batch=1
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-blue-800">
            Seq=10
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-purple-800">
            D_model=512
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-amber-800">
            d_k=64
          </span>
        </div>
      </div>

      {/* Head Selector Tabs */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-neutral-600">
          Multi-Head Attention Heads:
        </span>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((head) => (
            <button
              key={head}
              onClick={() => setActiveHead(head)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                activeHead === head
                  ? "bg-[#12231B] text-[#E6F77B] shadow-xs scale-105"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              {head}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Token Stream */}
      <div>
        <span className="text-xs font-black text-neutral-600 block mb-2">
          👉 Hover or click a Query token to inspect attention distribution:
        </span>
        <div className="flex flex-wrap gap-2 p-3 bg-[#F8FAFC] rounded-2xl border border-neutral-200">
          {SAMPLE_TOKENS.map((token, idx) => {
            const isSelected = selectedTokenIdx === idx;
            const weight = activeWeights[idx] || 0;
            const bgIntensity = Math.min(1, Math.max(0.1, weight * 2));

            return (
              <button
                key={idx}
                onMouseEnter={() => setSelectedTokenIdx(idx)}
                onClick={() => setSelectedTokenIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#12231B] text-[#E6F77B] shadow-md scale-105"
                    : "bg-white text-neutral-800 border border-neutral-200 hover:border-neutral-400"
                }`}
                style={{
                  backgroundColor: !isSelected && weight > 0.15 ? `rgba(28, 176, 246, ${bgIntensity})` : undefined,
                  color: !isSelected && weight > 0.25 ? "#FFFFFF" : undefined,
                }}
              >
                <span>{token}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    isSelected
                      ? "bg-[#E6F77B] text-[#12231B]"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {(weight * 100).toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Heatmap / Weight Breakdown */}
      <div className="p-4 bg-[#F4F7F2] rounded-2xl border border-[#DCE4D6] space-y-3">
        <div className="flex items-center justify-between text-xs font-black text-[#111827]">
          <span>
            Attention from Query Token: <strong className="text-emerald-800 text-sm font-mono">"{SAMPLE_TOKENS[selectedTokenIdx]}"</strong>
          </span>
          <span className="text-neutral-500 font-mono text-[11px]">
            Softmax(Q·Kᵀ / √64)
          </span>
        </div>

        {/* Horizontal Attention Weight Bars */}
        <div className="space-y-1.5">
          {SAMPLE_TOKENS.map((keyToken, keyIdx) => {
            const weight = activeWeights[keyIdx] || 0;
            const percent = (weight * 100).toFixed(1);
            const isHeavy = weight > 0.25;

            return (
              <div key={keyIdx} className="flex items-center space-x-3 text-xs font-mono">
                <span className="w-16 text-right font-bold text-neutral-700 truncate">
                  {keyToken}:
                </span>
                <div className="flex-1 bg-white h-5 rounded-lg border border-neutral-200 overflow-hidden relative">
                  <div
                    className={`h-full rounded-md transition-all duration-300 ${
                      isHeavy
                        ? "bg-gradient-to-r from-emerald-500 to-[#E6F77B]"
                        : "bg-blue-400"
                    }`}
                    style={{ width: `${Math.max(4, weight * 100)}%` }}
                  />
                  <span className="absolute right-2 top-0.5 text-[10px] font-bold text-neutral-700">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Natural Language Pedagogical Takeaway */}
        <div className="pt-2 text-xs font-medium text-neutral-700">
          💡 <strong>Pedagogical Insight:</strong> When the query token is{" "}
          <strong className="text-neutral-900">"{SAMPLE_TOKENS[selectedTokenIdx]}"</strong>, the model directs{" "}
          <strong className="text-emerald-800 font-bold">
            {(Math.max(...activeWeights) * 100).toFixed(0)}%
          </strong>{" "}
          of its attention weight toward{" "}
          <strong className="text-neutral-900">
            "{SAMPLE_TOKENS[activeWeights.indexOf(Math.max(...activeWeights))]}"
          </strong>{" "}
          to resolve coreference and semantic alignment.
        </div>
      </div>
    </div>
  );
};
