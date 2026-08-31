"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Clock,
  Award,
  Activity,
  Cpu,
  Wifi,
  CheckCircle2,
} from "lucide-react";
import { CognitiveTelemetry } from "@/types";

interface TelemetryDeckProps {
  telemetry: CognitiveTelemetry | null;
  isSpeaking: boolean;
}

export const TelemetryDeck: React.FC<TelemetryDeckProps> = ({
  telemetry,
  isSpeaking,
}) => {
  const [liveJitter, setLiveJitter] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveJitter((Math.random() * 2 - 1) * 8);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const tps = telemetry ? Math.round(telemetry.tokensPerSec + liveJitter) : 3240;
  const latency = telemetry ? telemetry.totalLatencyMs : 1.84;
  const comprehension = telemetry ? telemetry.comprehensionScore : 96;
  const entropy = telemetry ? telemetry.meshEntropy : 0.185;
  const load = telemetry ? telemetry.computeLoad : 28.4;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
      {/* Metric 1: Deconstruction Latency */}
      <div className="card-studio p-3.5 rounded-xl border-2 border-[#222226] shadow-tactile-sm flex flex-col justify-between group hover:border-[#FFAC3F] transition-all">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
          <span className="font-bold">Deconstruct Latency</span>
          <Clock className="w-4 h-4 text-[#FFAC3F]" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-black text-[#FFAC3F] tracking-tight">
            {latency}ms
          </div>
          <span className="text-[10px] text-[#9CA3AF]">
            Ultra-Low Edge Compute
          </span>
        </div>
      </div>

      {/* Metric 2: Comprehension Score */}
      <div className="card-studio p-3.5 rounded-xl border-2 border-[#222226] shadow-tactile-sm flex flex-col justify-between group hover:border-[#63F78F] transition-all">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
          <span className="font-bold">Comprehension Index</span>
          <Award className="w-4 h-4 text-[#63F78F]" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-black text-[#63F78F] tracking-tight">
            {comprehension}%
          </div>
          <span className="text-[10px] text-[#63F78F] font-bold">
            High Active Recall
          </span>
        </div>
      </div>

      {/* Metric 3: Synthesis Throughput */}
      <div className="card-studio p-3.5 rounded-xl border-2 border-[#222226] shadow-tactile-sm flex flex-col justify-between group hover:border-white transition-all">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
          <span className="font-bold">Throughput</span>
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-black text-white tracking-tight">
            {tps.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#9CA3AF]">
            Tokens / Sec
          </span>
        </div>
      </div>

      {/* Metric 4: Mesh Entropy */}
      <div className="card-studio p-3.5 rounded-xl border-2 border-[#222226] shadow-tactile-sm flex flex-col justify-between group hover:border-[#FFAC3F] transition-all">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
          <span className="font-bold">Entropy Factor</span>
          <Activity className="w-4 h-4 text-[#FFAC3F]" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-black text-[#FFAC3F] tracking-tight">
            {entropy}
          </div>
          <span className="text-[10px] text-[#63F78F] font-bold">
            Optimal Coherence
          </span>
        </div>
      </div>

      {/* Metric 5: Peer Telemetry Mesh Sync */}
      <div className="card-studio p-3.5 rounded-xl border-2 border-[#222226] shadow-tactile-sm flex flex-col justify-between group hover:border-[#63F78F] transition-all">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
          <span className="font-bold">Peer Telemetry</span>
          <Wifi
            className={`w-4 h-4 ${
              isSpeaking ? "text-[#FFAC3F] animate-bounce" : "text-[#63F78F]"
            }`}
          />
        </div>
        <div>
          <div className="text-sm md:text-base font-black text-[#63F78F] flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>OPTIMAL SYNC</span>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">
            {telemetry?.activePeers || 8} Mesh Peers Active
          </span>
        </div>
      </div>
    </div>
  );
};
