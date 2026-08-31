"use client";

import React from "react";
import { ConceptIllustrationType } from "@/types";

interface ConceptIllustrationProps {
  type: ConceptIllustrationType;
  className?: string;
  isAudioPlaying?: boolean;
  parameterValue?: number; // 0 to 100 (Default: 50)
}

export const ConceptIllustration: React.FC<ConceptIllustrationProps> = ({
  type,
  className = "w-full h-44",
  isAudioPlaying = false,
  parameterValue = 50,
}) => {
  // Normalize parameter (0.0 to 1.0)
  const normParam = Math.max(0.1, Math.min(1.0, parameterValue / 100));

  switch (type) {
    case "quantum": {
      const rx1 = 50 + normParam * 45;
      const ry1 = 18 + normParam * 22;
      const rx2 = 18 + normParam * 22;
      const ry2 = 40 + normParam * 30;
      const glowOpacity = isAudioPlaying ? "0.9" : "0.5";

      return (
        <div className={`relative flex items-center justify-center bg-purple-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {/* Audio-Reactive Ambient Ring */}
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 animate-pulse pointer-events-none" />
          )}

          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[240px]">
            {/* Superposition Orbit Rings (Dynamically Morphed by Parameter) */}
            <ellipse
              cx="100"
              cy="60"
              rx={rx1}
              ry={ry1}
              fill="none"
              stroke={isAudioPlaying ? "#E6F77B" : "#CE82FF"}
              strokeWidth={isAudioPlaying ? "4.5" : "3.5"}
              strokeDasharray="6 4"
              className="animate-spin"
              style={{
                transformOrigin: "100px 60px",
                animationDuration: `${14 - normParam * 8}s`,
              }}
            />
            <ellipse
              cx="100"
              cy="60"
              rx={rx2}
              ry={ry2}
              fill="none"
              stroke={isAudioPlaying ? "#A855F7" : "#8B5CF6"}
              strokeWidth="3"
              strokeDasharray="8 4"
              className="animate-spin"
              style={{
                transformOrigin: "100px 60px",
                animationDuration: `${10 - normParam * 5}s`,
                animationDirection: "reverse",
              }}
            />

            {/* Audio Reactive Pulse Ring */}
            {isAudioPlaying && (
              <circle
                cx="100"
                cy="60"
                r="30"
                fill="none"
                stroke="#E6F77B"
                strokeWidth="2"
                className="animate-ping"
                style={{ animationDuration: "1.2s" }}
              />
            )}

            {/* Core Superposition Sphere */}
            <circle
              cx="100"
              cy="60"
              r={18 + normParam * 6}
              fill="#9333EA"
              className={isAudioPlaying ? "animate-pulse" : ""}
            />
            <circle cx="100" cy="60" r={14 + normParam * 4} fill="#CE82FF" />
            <circle cx="94" cy="54" r={4 + normParam * 2} fill="#FFFFFF" opacity={glowOpacity} />

            {/* Traveling Particles */}
            <circle
              cx={30 + normParam * 20}
              cy="60"
              r={isAudioPlaying ? 8 : 6}
              fill="#FFC800"
              className="animate-bounce"
            />
            <circle
              cx={170 - normParam * 20}
              cy="60"
              r={isAudioPlaying ? 8 : 6}
              fill="#1CB0F6"
              className="animate-bounce"
            />

            {/* Quantum Cat Emoji Icon */}
            <text x="92" y="66" fontSize={14 + normParam * 2} fill="#FFFFFF">
              🐱
            </text>
          </svg>
        </div>
      );
    }

    case "transformer": {
      // Curve tension modulated by parameterValue
      const qkCurveY = 5 + (1 - normParam) * 35; // Arch depth
      const strokeW = 2 + normParam * 3;
      const strokeColor = isAudioPlaying ? "#E6F77B" : normParam > 0.6 ? "#10B981" : "#3B82F6";

      return (
        <div className={`relative flex items-center justify-center bg-blue-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {/* Audio Reactive Pulse Flare */}
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-emerald-400/20 to-blue-400/20 animate-pulse pointer-events-none" />
          )}

          <svg viewBox="0 0 220 120" className="w-full h-full max-w-[260px]">
            {/* Attention Link Lines Morphed by Slider */}
            <path
              d={`M 40 40 Q 110 ${qkCurveY} 180 40`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeW}
              strokeDasharray={isAudioPlaying ? "none" : "5 3"}
              className={isAudioPlaying ? "animate-pulse" : ""}
            />
            <path
              d={`M 40 80 Q 110 ${120 - qkCurveY} 180 80`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeW}
              strokeDasharray={isAudioPlaying ? "none" : "5 3"}
            />
            <path d="M 40 40 L 180 80" fill="none" stroke="#93C5FD" strokeWidth="2.5" opacity={normParam} />
            <path d="M 40 80 L 180 40" fill="none" stroke="#93C5FD" strokeWidth="2.5" opacity={normParam} />

            {/* Audio Pulse Rings around Center Hub */}
            {isAudioPlaying && (
              <circle
                cx="110"
                cy="60"
                r="32"
                fill="none"
                stroke="#E6F77B"
                strokeWidth="2"
                className="animate-ping"
                style={{ animationDuration: "1.4s" }}
              />
            )}

            {/* Q & K Node Boxes */}
            <rect
              x="20"
              y="25"
              width="36"
              height="30"
              rx="8"
              fill={isAudioPlaying ? "#10B981" : "#1CB0F6"}
              className="transition-colors"
            />
            <text x="32" y="44" fontSize="12" fontWeight="bold" fill="#FFFFFF">
              Q
            </text>

            <rect
              x="20"
              y="65"
              width="36"
              height="30"
              rx="8"
              fill="#3B82F6"
            />
            <text x="33" y="84" fontSize="12" fontWeight="bold" fill="#FFFFFF">
              K
            </text>

            {/* Center Softmax Attention Hub */}
            <circle
              cx="110"
              cy="60"
              r={18 + normParam * 8}
              fill={isAudioPlaying ? "#E6F77B" : "#FFC800"}
              className="transition-all"
            />
            <text x="96" y="65" fontSize={10 + normParam * 2} fontWeight="extrabold" fill="#12231B">
              Q·Kᵀ
            </text>

            {/* Output V Node */}
            <rect
              x="164"
              y="45"
              width={34 + normParam * 8}
              height="32"
              rx="8"
              fill="#58CC02"
            />
            <text x="176" y="66" fontSize="14" fontWeight="bold" fill="#FFFFFF">
              V
            </text>
          </svg>
        </div>
      );
    }

    case "crispr": {
      const waveFreq = 40 + (1 - normParam) * 40;
      return (
        <div className={`relative flex items-center justify-center bg-emerald-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-emerald-400/20 animate-pulse pointer-events-none" />
          )}
          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[240px]">
            <path
              d={`M 20 60 Q 60 ${60 - waveFreq} 100 60 T 180 60`}
              fill="none"
              stroke="#58CC02"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 20 60 Q 60 ${60 + waveFreq} 100 60 T 180 60`}
              fill="none"
              stroke="#1CB0F6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="60" r={16 + normParam * 6} fill="#FF4B4B" className={isAudioPlaying ? "animate-bounce" : ""} />
            <text x="91" y="67" fontSize="16" fill="#FFFFFF">✂️</text>
          </svg>
        </div>
      );
    }

    case "blackhole": {
      const rDisk = 50 + normParam * 40;
      return (
        <div className={`relative flex items-center justify-center bg-amber-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-amber-400/20 animate-pulse pointer-events-none" />
          )}
          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[240px]">
            <ellipse cx="100" cy="60" rx={rDisk} ry={rDisk * 0.3} fill="#FFC800" opacity="0.4" />
            <circle cx="100" cy="60" r={18 + normParam * 10} fill="#0F172A" />
            <circle cx="100" cy="60" r={19 + normParam * 10} fill="none" stroke="#FDE68A" strokeWidth="2.5" className={isAudioPlaying ? "animate-ping" : ""} />
          </svg>
        </div>
      );
    }

    case "compound_interest": {
      const peakY = 80 - normParam * 65;
      return (
        <div className={`relative flex items-center justify-center bg-green-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-emerald-400/20 animate-pulse pointer-events-none" />
          )}
          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[240px]">
            <path
              d={`M 30 95 Q 110 90 170 ${peakY}`}
              fill="none"
              stroke="#58CC02"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="170" cy={peakY} r={12 + normParam * 6} fill="#FFC800" stroke="#DDA900" strokeWidth="2" />
            <text x="162" y={peakY + 6} fontSize="14">📈</text>
          </svg>
        </div>
      );
    }

    default: // consensus or general_brain
      return (
        <div className={`relative flex items-center justify-center bg-indigo-50 rounded-2xl p-3 overflow-hidden transition-all ${className}`}>
          {isAudioPlaying && (
            <div className="absolute inset-0 bg-indigo-400/20 animate-pulse pointer-events-none" />
          )}
          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[240px]">
            <line x1="50" y1="40" x2="150" y2="40" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" />
            <line x1="50" y1="85" x2="150" y2="85" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" />
            <line x1="50" y1="40" x2="100" y2="60" stroke="#6366F1" strokeWidth="3" />
            <line x1="150" y1="40" x2="100" y2="60" stroke="#6366F1" strokeWidth="3" />
            <line x1="50" y1="85" x2="100" y2="60" stroke="#6366F1" strokeWidth="3" />
            <line x1="150" y1="85" x2="100" y2="60" stroke="#6366F1" strokeWidth="3" />

            <circle cx="50" cy="40" r="14" fill="#1CB0F6" />
            <text x="44" y="45" fontSize="12" fill="#FFFFFF">✓</text>
            <circle cx="150" cy="40" r="14" fill="#1CB0F6" />
            <text x="144" y="45" fontSize="12" fill="#FFFFFF">✓</text>
            <circle cx="50" cy="85" r="14" fill="#1CB0F6" />
            <text x="44" y="90" fontSize="12" fill="#FFFFFF">✓</text>
            <circle cx="150" cy="85" r="14" fill="#1CB0F6" />
            <text x="144" y="90" fontSize="12" fill="#FFFFFF">✓</text>

            <circle cx="100" cy="60" r={16 + normParam * 6} fill="#58CC02" className={isAudioPlaying ? "animate-bounce" : ""} />
            <text x="92" y="66" fontSize="15" fill="#FFFFFF">👑</text>
          </svg>
        </div>
      );
  }
};
