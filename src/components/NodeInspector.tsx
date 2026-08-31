"use client";

import React from "react";
import {
  X,
  Volume2,
  Cpu,
  Zap,
  Activity,
  Share2,
} from "lucide-react";
import { CognitiveNode } from "@/types";
import { formatPercent } from "@/lib/utils";

interface NodeInspectorProps {
  node: CognitiveNode | null;
  onClose: () => void;
  onAuditionSnippet: (snippet: string) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  onClose,
  onAuditionSnippet,
}) => {
  if (!node) {
    return (
      <div className="card-studio p-5 rounded-xl border-2 border-[#222226] text-center flex flex-col items-center justify-center min-h-[320px] text-[#9CA3AF] font-mono">
        <Cpu className="w-10 h-10 mb-2 opacity-30 text-[#FFAC3F]" />
        <p className="text-xs text-white font-bold">No Kinetic Node Selected</p>
        <p className="text-[11px] text-[#9CA3AF] mt-1 max-w-[200px]">
          Click any vector node on the canvas to inspect its semantic tensor state and auditory telemetry.
        </p>
      </div>
    );
  }

  const isOrange = node.accentColor === "#FFAC3F";
  const mainAccent = isOrange ? "#FFAC3F" : "#63F78F";

  return (
    <div className="card-studio p-5 rounded-xl border-2 border-[#222226] shadow-tactile relative flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span
              className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border-2 ${
                isOrange
                  ? "border-[#FFAC3F] bg-[#FFAC3F]/15 text-[#FFAC3F]"
                  : "border-[#63F78F] bg-[#63F78F]/15 text-[#63F78F]"
              }`}
            >
              {node.category}
            </span>
            <span className="text-[10px] font-mono text-[#9CA3AF]">
              ID: {node.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-[#161618] hover:bg-[#222226] text-[#9CA3AF] hover:text-white border border-[#222226] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-sm md:text-base font-bold text-white mb-1 leading-snug">
          {node.label}
        </h3>
        <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans mb-3">
          {node.summary}
        </p>

        {/* Acoustic Snippet Audition Box */}
        <div className="p-3 bg-[#0D0D0E] rounded-lg border-2 border-[#222226] flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 overflow-hidden pr-2">
            <Volume2 className="w-4 h-4 text-[#FFAC3F] flex-shrink-0" />
            <span className="text-xs font-mono text-white truncate">
              {node.acousticSnippet}
            </span>
          </div>
          <button
            onClick={() => onAuditionSnippet(node.acousticSnippet)}
            className="btn-tactile-orange px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap"
          >
            Speak
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-xs">
          <div className="p-2 rounded-lg bg-[#0D0D0E] border border-[#222226]">
            <span className="text-[10px] text-[#9CA3AF] block font-bold">Confidence</span>
            <span className="text-[#63F78F] font-black">
              {formatPercent(node.confidence)}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#0D0D0E] border border-[#222226]">
            <span className="text-[10px] text-[#9CA3AF] block font-bold">Entropy</span>
            <span className="text-[#FFAC3F] font-black">{node.entropy}</span>
          </div>

          <div className="p-2 rounded-lg bg-[#0D0D0E] border border-[#222226]">
            <span className="text-[10px] text-[#9CA3AF] block font-bold">Latency</span>
            <span className="text-white font-black">{node.latencyMs}ms</span>
          </div>
        </div>

        {/* 8D Vector Spectrum */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#9CA3AF]">
            <span className="flex items-center space-x-1 font-bold">
              <Activity className="w-3 h-3 text-[#FFAC3F]" />
              <span>8D Vector Tensor Signature</span>
            </span>
            <span>{node.metadata?.sourceTensor || "KINETIC_0x01"}</span>
          </div>

          <div className="grid grid-cols-8 gap-1 h-9 items-end bg-[#0D0D0E] p-1.5 rounded-lg border border-[#222226]">
            {node.vectorSignature.map((val, idx) => {
              const heightPercent = Math.min(100, Math.max(20, Math.abs(val) * 100));
              const isPos = val >= 0;
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                  <div
                    className={`w-full rounded-xs transition-all ${
                      isPos ? "bg-[#FFAC3F]" : "bg-[#63F78F]"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <div className="absolute -top-6 bg-[#222226] px-1 py-0.5 rounded text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {node.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono bg-[#0D0D0E] text-[#9CA3AF] px-2 py-0.5 rounded border border-[#222226]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#222226] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
        <span className="flex items-center space-x-1">
          <Share2 className="w-3 h-3 text-[#FFAC3F]" />
          <span>Synapses:</span>
        </span>
        <span className="text-[#63F78F] font-bold">
          {node.connections.length > 0 ? `${node.connections.length} active links` : "Leaf Node"}
        </span>
      </div>
    </div>
  );
};
