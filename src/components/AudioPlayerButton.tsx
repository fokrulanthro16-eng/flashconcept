"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Pause, Play, Sparkles } from "lucide-react";

interface AudioPlayerButtonProps {
  textToSpeak: string;
  topicTitle: string;
  onPlayStateChange?: (playing: boolean) => void;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  textToSpeak,
  topicTitle,
  onPlayStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      onPlayStateChange?.(false);
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.15;

    const voices = synthRef.current.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.startsWith("en") && v.name.includes("Natural")) ||
      voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    synthRef.current.speak(utterance);
  };

  return (
    <button
      onClick={handleTogglePlay}
      className={`px-5 py-3.5 rounded-2xl flex items-center justify-center space-x-2 text-sm font-black text-white transition-all shadow-md ${
        isPlaying
          ? "bg-emerald-700 ring-4 ring-emerald-300 scale-105"
          : "bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5"
      }`}
      title="Play 5-Second Voice Narration"
    >
      {isPlaying ? (
        <>
          {/* Real-time Dynamic Waveform Animation */}
          <div className="flex items-center space-x-1 h-5">
            {[40, 90, 60, 100, 50, 80, 30].map((height, idx) => (
              <span
                key={idx}
                className="w-1 bg-[#E6F77B] rounded-full animate-bounce"
                style={{
                  height: `${height}%`,
                  animationDuration: `${0.6 + (idx % 3) * 0.2}s`,
                  animationDelay: `${idx * 0.08}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[#E6F77B] font-black">Playing Audio...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span>Play Audio (5s)</span>
        </>
      )}
    </button>
  );
};
