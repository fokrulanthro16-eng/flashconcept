"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  Zap,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";
import { EnginePreset } from "@/types";
import { PRESET_DECONSTRUCTIONS } from "@/lib/constants";

interface MultimodalIngestionBarProps {
  onSubmitQuery: (query: string) => void;
  isLoading: boolean;
}

export const MultimodalIngestionBar: React.FC<MultimodalIngestionBarProps> = ({
  onSubmitQuery,
  isLoading,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setSpeechSupported(true);
    }
  }, []);

  const handleVoiceToggle = () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in this browser environment. You can type queries directly.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        onSubmitQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSubmitQuery(inputText.trim());
  };

  const handleSelectPreset = (preset: EnginePreset) => {
    setInputText(preset.prompt);
    onSubmitQuery(preset.prompt);
  };

  return (
    <div className="space-y-3">
      {/* Preset Quick Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono">
        <span className="text-xs text-[#9CA3AF] font-bold flex items-center space-x-1 flex-shrink-0">
          <Compass className="w-3.5 h-3.5 text-[#FFAC3F]" />
          <span>Presets:</span>
        </span>
        {PRESET_DECONSTRUCTIONS.map((preset) => {
          const isOrange = preset.accent === "#FFAC3F";
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isLoading}
              className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 shadow-tactile-sm ${
                isOrange
                  ? "bg-[#161618] border-[#222226] hover:border-[#FFAC3F] text-white hover:text-[#FFAC3F]"
                  : "bg-[#161618] border-[#222226] hover:border-[#63F78F] text-white hover:text-[#63F78F]"
              }`}
            >
              <span>{preset.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isOrange
                    ? "bg-[#FFAC3F]/20 text-[#FFAC3F]"
                    : "bg-[#63F78F]/20 text-[#63F78F]"
                }`}
              >
                {preset.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Ingestion Input Form */}
      <form
        onSubmit={handleFormSubmit}
        className="card-studio p-2 rounded-xl border-2 border-[#222226] shadow-tactile flex items-center space-x-2 relative focus-within:border-[#FFAC3F] transition-all"
      >
        {/* Voice Trigger */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          disabled={isLoading}
          className={`p-3 rounded-lg border-2 transition-all ${
            isListening
              ? "bg-[#FFAC3F] border-[#FFAC3F] text-black animate-pulse"
              : "bg-[#161618] border-[#222226] text-[#9CA3AF] hover:text-white hover:border-white"
          }`}
          title={isListening ? "Listening..." : "Voice Dictation"}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Input Text Box */}
        <div className="flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? "Listening to acoustic input..."
                : "Enter study concept, algorithm, or prompt to deconstruct into 3-second kinetic flashcards..."
            }
            disabled={isLoading}
            className="w-full bg-transparent border-0 text-white placeholder-[#9CA3AF] text-sm md:text-base font-sans font-medium focus:outline-none px-2 py-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="btn-tactile-orange px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{isLoading ? "Deconstructing..." : "Deconstruct (3s)"}</span>
        </button>
      </form>
    </div>
  );
};
