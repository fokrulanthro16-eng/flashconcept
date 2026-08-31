"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Zap,
  Radio,
  Sliders,
} from "lucide-react";
import { AcousticNarrative } from "@/types";

interface AudioNarratorProps {
  narrative: AcousticNarrative | null;
  activeNodeSnippet?: string | null;
  onSpeechStatusChange?: (isSpeaking: boolean) => void;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({
  narrative,
  activeNodeSnippet,
  onSpeechStatusChange,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeBulletIndex, setActiveBulletIndex] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.25); // Fast rate for kinetic study
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis & Load Voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length > 0) {
          setAvailableVoices(voices);
          const preferred =
            voices.find((v) => v.lang.startsWith("en") && v.name.includes("Natural")) ||
            voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) ||
            voices.find((v) => v.lang.startsWith("en")) ||
            voices[0];
          if (preferred && !selectedVoice) {
            setSelectedVoice(preferred.name);
          }
        }
      };

      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Sync speech state to parent
  useEffect(() => {
    onSpeechStatusChange?.(isSpeaking);
  }, [isSpeaking, onSpeechStatusChange]);

  const speakText = (text: string, bulletIdx: number | null = null) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;

    if (selectedVoice) {
      const voiceObj = availableVoices.find((v) => v.name === selectedVoice);
      if (voiceObj) utterance.voice = voiceObj;
    }

    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setActiveBulletIndex(bulletIdx);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveBulletIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveBulletIndex(null);
    };

    synthRef.current.speak(utterance);
  };

  const handlePlayFull = () => {
    if (!narrative) return;
    if (isPaused && synthRef.current) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }
    speakText(narrative.fullTranscript, null);
  };

  const handlePause = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveBulletIndex(null);
    }
  };

  return (
    <div className="card-studio p-5 rounded-xl border-2 border-[#222226] shadow-tactile relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-lg border-2 ${
                isSpeaking
                  ? "bg-[#FFAC3F] border-[#FFAC3F] text-black shadow-tactile-sm"
                  : "bg-[#161618] border-[#222226] text-[#9CA3AF]"
              } transition-all duration-200`}
            >
              <Radio className={`w-4 h-4 ${isSpeaking ? "animate-pulse" : ""}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  Kinetic Acoustic Player
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFAC3F]/20 text-[#FFAC3F] font-bold border border-[#FFAC3F]/40 font-mono">
                  {speechRate}x Speed
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Synchronized Speech Synthesis & Waveform
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-lg border-2 text-xs font-mono transition-all ${
              showSettings
                ? "bg-[#FFAC3F] text-black border-[#FFAC3F]"
                : "bg-[#161618] border-[#222226] text-[#9CA3AF] hover:text-white"
            }`}
            title="Calibrate Acoustic Voice"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Voice Calibration Drawer */}
        {showSettings && (
          <div className="mb-4 p-3.5 bg-[#0D0D0E] border-2 border-[#222226] rounded-xl space-y-3 font-mono text-xs animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] text-[#9CA3AF] block mb-1 font-bold">
                Speech Voice Engine:
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-[#161618] border-2 border-[#222226] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-[#FFAC3F]"
              >
                {availableVoices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mb-1">
                  <span>Speed:</span>
                  <span className="text-[#FFAC3F] font-bold">{speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.0"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full accent-[#FFAC3F] h-2 bg-[#222226] rounded cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mb-1">
                  <span>Pitch:</span>
                  <span className="text-[#63F78F] font-bold">{speechPitch}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  className="w-full accent-[#63F78F] h-2 bg-[#222226] rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Interactive Tactile Waveform Simulation */}
        <div className="w-full h-12 bg-[#0D0D0E] rounded-xl border-2 border-[#222226] px-4 flex items-center justify-between mb-4 overflow-hidden">
          <div className="flex items-center space-x-1.5 w-full h-full justify-around">
            {[...Array(26)].map((_, i) => {
              const activeHeight = isSpeaking
                ? `${Math.max(20, Math.sin(i * 0.45 + Date.now() * 0.006) * 80 + Math.random() * 20)}%`
                : "12%";
              return (
                <div
                  key={i}
                  className={`w-1.5 rounded-xs transition-all duration-100 ${
                    isSpeaking
                      ? i % 2 === 0
                        ? "bg-[#FFAC3F]"
                        : "bg-[#63F78F]"
                      : "bg-[#222226]"
                  }`}
                  style={{ height: activeHeight }}
                />
              );
            })}
          </div>
        </div>

        {/* Bullets List */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#9CA3AF] font-bold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFAC3F]" />
              <span>Acoustic Knowledge Bullets</span>
            </span>
            <span className="text-[10px] font-mono text-[#63F78F]">
              {narrative?.bullets.length || 0} bullets ready
            </span>
          </div>

          {narrative ? (
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {narrative.bullets.map((bullet, idx) => {
                const isThisActive = activeBulletIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => speakText(bullet, idx)}
                    className={`w-full text-left p-2.5 rounded-lg border-2 text-xs font-mono transition-all flex items-start space-x-2 ${
                      isThisActive
                        ? "bg-[#FFAC3F]/15 border-[#FFAC3F] text-white shadow-tactile-sm"
                        : "bg-[#0D0D0E] border-[#222226] text-[#9CA3AF] hover:text-white hover:border-[#333339]"
                    }`}
                  >
                    <span className="w-4 h-4 rounded bg-[#222226] text-[10px] text-[#FFAC3F] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed flex-1">{bullet}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-3 rounded-lg border-2 border-dashed border-[#222226] text-center text-[#9CA3AF] font-mono text-xs">
              Deconstruct a topic to synthesize speech.
            </div>
          )}
        </div>
      </div>

      {/* Playback Action Buttons */}
      <div className="pt-3 border-t-2 border-[#222226] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isSpeaking ? (
            <button
              onClick={handlePause}
              className="btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#FFAC3F] flex items-center space-x-1.5"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handlePlayFull}
              disabled={!narrative}
              className="btn-tactile-orange px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Synthesize Audio</span>
            </button>
          )}

          <button
            onClick={handleStop}
            disabled={!isSpeaking && !isPaused}
            className="btn-tactile p-2 rounded-lg text-[#9CA3AF] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="Stop Playback"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#9CA3AF]">
          Est: <strong className="text-[#FFAC3F]">~{narrative?.estimatedDurationSec || 0}s</strong>
        </span>
      </div>
    </div>
  );
};
